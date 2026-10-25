<template>
    <div class="regions-map">
        <div ref="mapEl" class="regions-map__canvas"></div>

        <aside class="regions-map__aside">
            <button
                v-for="region in regions"
                :key="region.id"
                type="button"
                class="regions-map__region"
                :class="{ 'is-active': activeRegion === region.id }"
                @click="selectRegion(region.id)"
            >
                <span class="regions-map__region-dot"></span>
                {{ region.label }}
            </button>
        </aside>

        <div
            v-if="tooltip.visible"
            class="regions-map__tooltip"
            :style="{ left: `${tooltip.x}px`, top: `${tooltip.y}px` }"
        >
            <div class="regions-map__tooltip-head">
                <ServerFlag :code="tooltip.flag" class="regions-map__tooltip-flag" />
                <span class="regions-map__tooltip-title">{{ tooltip.label }}</span>
            </div>
            <div class="regions-map__tooltip-status">
                <span class="regions-map__tooltip-status-dot"></span>
                <span class="regions-map__tooltip-status-text">Доступен</span>
                <span class="regions-map__tooltip-online">Online</span>
            </div>
            <div class="regions-map__tooltip-line"></div>
        </div>

        <p v-if="errorText" class="regions-map__error">{{ errorText }}</p>
    </div>
</template>

<script setup>
import {
    Map as MapLibreMap,
    NavigationControl,
    setWorkerUrl,
} from 'maplibre-gl'
import maplibreWorkerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?url'
import 'maplibre-gl/dist/maplibre-gl.css'

setWorkerUrl(maplibreWorkerUrl)

const servers = [
    { id: 'fi', flag: 'fi', city: 'Хельсинки', country: 'Финляндия', lng: 24.9384, lat: 60.1699 },
    { id: 'nl', flag: 'nl', city: 'Амстердам', country: 'Нидерланды', lng: 4.9041, lat: 52.3676 },
    { id: 'de', flag: 'de', city: 'Берлин', country: 'Германия', lng: 10.4515, lat: 51.1657 },
    { id: 'cz', flag: 'cz', city: 'Прага', country: 'Чехия', lng: 14.4378, lat: 50.0755 },
    { id: 'ru', flag: 'ru', city: 'Москва', country: 'Россия', lng: 37.6173, lat: 55.7558 },
    { id: 'us', flag: 'us', city: 'Нью-Йорк', country: 'США', lng: -74.006, lat: 40.7128 },
]

const regions = [
    { id: 'europe', label: 'Европа', center: [15, 54], zoom: 3.4 },
    { id: 'baltic', label: 'Балтика', center: [22, 59], zoom: 4.2 },
    { id: 'west', label: 'Запад', center: [6, 50], zoom: 4.4 },
    { id: 'cis', label: 'СНГ', center: [37, 55], zoom: 3.8 },
    { id: 'na', label: 'Северная Америка', center: [-95, 40], zoom: 3.2 },
    { id: 'asia', label: 'Азия', center: [90, 40], zoom: 2.8 },
    { id: 'latam', label: 'Лат. Америка', center: [-60, -15], zoom: 2.6 },
    { id: 'oceania', label: 'Океания', center: [145, -25], zoom: 2.8 },
    { id: 'me', label: 'Бл. Восток', center: [45, 28], zoom: 3.4 },
]

const PULSE_DURATION_MS = 2800
const HOVER_LAYERS = ['servers-dot', 'servers-pulse']

const serversGeoJson = {
    type: 'FeatureCollection',
    features: servers.map((server, index) => ({
        type: 'Feature',
        properties: {
            id: server.id,
            flag: server.flag,
            label: `${server.city}, ${server.country}`,
            phase: index / servers.length,
            pulseRadius: 8,
            pulseOpacity: 0.3,
        },
        geometry: {
            type: 'Point',
            coordinates: [server.lng, server.lat],
        },
    })),
}

const mapEl = ref(null)
const activeRegion = ref('europe')
const errorText = ref('')
const tooltip = reactive({
    visible: false,
    x: 0,
    y: 0,
    flag: 'nl',
    label: '',
})

let map = null
let rafId = 0
let pulseStartedAt = 0

function easeOutCubic(t) {
    return 1 - (1 - t) ** 3
}

function tuneBasemapLayers() {
    const layers = map.getStyle()?.layers || []
    const countryLabelIds = new Set([
        'place_country_major',
        'place_country_minor',
        'place_country_other',
    ])

    layers.forEach((layer) => {
        if (layer.id === 'boundary_state') {
            map.setLayoutProperty(layer.id, 'visibility', 'none')
            return
        }

        if (layer.type === 'symbol' && !countryLabelIds.has(layer.id)) {
            map.setLayoutProperty(layer.id, 'visibility', 'none')
        }
    })
}

function hideTooltip() {
    tooltip.visible = false
    if (map) map.getCanvas().style.cursor = ''
}

function showTooltip(feature, point) {
    tooltip.visible = true
    tooltip.x = point.x
    tooltip.y = point.y
    tooltip.flag = feature.properties.flag
    tooltip.label = feature.properties.label
    map.getCanvas().style.cursor = 'pointer'
}

function bindHover() {
    map.on('mousemove', HOVER_LAYERS, (event) => {
        const feature = event.features?.[0]
        if (!feature) {
            hideTooltip()
            return
        }

        showTooltip(feature, event.point)
    })

    map.on('mouseleave', HOVER_LAYERS, () => {
        hideTooltip()
    })
}

function addServerLayers() {
    tuneBasemapLayers()

    map.addSource('servers', {
        type: 'geojson',
        data: serversGeoJson,
    })

    map.addLayer({
        id: 'servers-pulse',
        type: 'circle',
        source: 'servers',
        paint: {
            'circle-radius': ['get', 'pulseRadius'],
            'circle-color': '#00d981',
            'circle-opacity': ['get', 'pulseOpacity'],
            'circle-blur': 0.35,
        },
    })

    map.addLayer({
        id: 'servers-dot',
        type: 'circle',
        source: 'servers',
        paint: {
            'circle-radius': 5,
            'circle-color': '#00d981',
            'circle-stroke-width': 2,
            'circle-stroke-color': 'rgba(0, 217, 129, 0.55)',
        },
    })

    // Невидимая зона для удобного наведения
    map.addLayer({
        id: 'servers-hit',
        type: 'circle',
        source: 'servers',
        paint: {
            'circle-radius': 18,
            'circle-color': '#00d981',
            'circle-opacity': 0,
        },
    })

    HOVER_LAYERS.push('servers-hit')
    bindHover()
    startPulse()
}

function startPulse() {
    pulseStartedAt = performance.now()

    const tick = (now) => {
        if (!map) return

        const source = map.getSource('servers')
        if (!source) return

        const elapsed = now - pulseStartedAt

        serversGeoJson.features.forEach((feature) => {
            const phase = feature.properties.phase || 0
            const local = ((elapsed / PULSE_DURATION_MS) + phase) % 1
            const eased = easeOutCubic(local)

            feature.properties.pulseRadius = 6 + eased * 20
            feature.properties.pulseOpacity = 0.38 * (1 - eased)
        })

        source.setData(serversGeoJson)
        rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
}

function selectRegion(id) {
    activeRegion.value = id
    const region = regions.find((item) => item.id === id)
    if (!map || !region) return

    map.flyTo({
        center: region.center,
        zoom: region.zoom,
        essential: true,
        duration: 900,
    })
}

function initMap() {
    if (!mapEl.value || map) return

    try {
        map = new MapLibreMap({
            container: mapEl.value,
            style: 'https://tiles.openfreemap.org/styles/dark',
            center: [15, 54],
            zoom: 3.4,
            attributionControl: true,
            dragRotate: false,
            pitchWithRotate: false,
        })

        map.addControl(new NavigationControl({ showCompass: false }), 'bottom-left')

        map.on('load', () => {
            map.resize()
            addServerLayers()
        })

        map.on('error', (event) => {
            const message = event?.error?.message || 'Не удалось загрузить карту'
            errorText.value = message
            console.error('[regions-map]', event?.error || event)
        })

        requestAnimationFrame(() => map?.resize())
        setTimeout(() => map?.resize(), 200)
    } catch (error) {
        errorText.value = error?.message || 'Ошибка инициализации карты'
        console.error('[regions-map]', error)
    }
}

onMounted(async () => {
    await nextTick()
    initMap()
})

onBeforeUnmount(() => {
    if (rafId) cancelAnimationFrame(rafId)
    map?.remove()
    map = null
})
</script>
