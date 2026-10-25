<template>
    <span class="server-flag">
        <!-- Netherlands -->
        <svg v-if="code === 'nl'" class="server-flag__svg" viewBox="0 0 24 24" aria-hidden="true">
            <rect width="24" height="8" fill="#AE1C28"/>
            <rect y="8" width="24" height="8" fill="#FFFFFF"/>
            <rect y="16" width="24" height="8" fill="#21468B"/>
        </svg>

        <!-- Germany -->
        <svg v-else-if="code === 'de'" class="server-flag__svg" viewBox="0 0 24 24" aria-hidden="true">
            <rect width="24" height="8" fill="#000000"/>
            <rect y="8" width="24" height="8" fill="#DD0000"/>
            <rect y="16" width="24" height="8" fill="#FFCE00"/>
        </svg>

        <!-- Finland -->
        <svg v-else-if="code === 'fi'" class="server-flag__svg" viewBox="0 0 24 24" aria-hidden="true">
            <rect width="24" height="24" fill="#FFFFFF"/>
            <rect x="7" width="4" height="24" fill="#003580"/>
            <rect y="10" width="24" height="4" fill="#003580"/>
        </svg>

        <!-- Sweden -->
        <svg v-else-if="code === 'se'" class="server-flag__svg" viewBox="0 0 24 24" aria-hidden="true">
            <rect width="24" height="24" fill="#006AA7"/>
            <rect x="7" width="3" height="24" fill="#FECC00"/>
            <rect y="10.5" width="24" height="3" fill="#FECC00"/>
        </svg>

        <!-- USA -->
        <svg v-else-if="code === 'us'" class="server-flag__svg" viewBox="0 0 24 24" aria-hidden="true">
            <rect width="24" height="24" fill="#FFFFFF"/>
            <rect y="0" width="24" height="1.846" fill="#B22234"/>
            <rect y="3.692" width="24" height="1.846" fill="#B22234"/>
            <rect y="7.385" width="24" height="1.846" fill="#B22234"/>
            <rect y="11.077" width="24" height="1.846" fill="#B22234"/>
            <rect y="14.769" width="24" height="1.846" fill="#B22234"/>
            <rect y="18.462" width="24" height="1.846" fill="#B22234"/>
            <rect y="22.154" width="24" height="1.846" fill="#B22234"/>
            <rect width="10" height="12.923" fill="#3C3B6E"/>
        </svg>

        <!-- Russia -->
        <svg v-else-if="code === 'ru'" class="server-flag__svg" viewBox="0 0 24 24" aria-hidden="true">
            <rect width="24" height="8" fill="#FFFFFF"/>
            <rect y="8" width="24" height="8" fill="#0039A6"/>
            <rect y="16" width="24" height="8" fill="#D52B1E"/>
        </svg>

        <!-- Czech Republic -->
        <svg v-else-if="code === 'cz'" class="server-flag__svg" viewBox="0 0 24 24" aria-hidden="true">
            <rect width="24" height="12" fill="#FFFFFF"/>
            <rect y="12" width="24" height="12" fill="#D7141A"/>
            <polygon points="0,0 12,12 0,24" fill="#11457E"/>
        </svg>

        <!-- Spain -->
        <svg v-else-if="code === 'es'" class="server-flag__svg" viewBox="0 0 24 24" aria-hidden="true">
            <rect width="24" height="6" fill="#AA151B"/>
            <rect y="6" width="24" height="12" fill="#F1BF00"/>
            <rect y="18" width="24" height="6" fill="#AA151B"/>
        </svg>

        <!-- White list LTE -->
        <svg v-else-if="code === 'lte'" class="server-flag__svg server-flag__svg--icon" viewBox="0 0 24 24" aria-hidden="true">
            <rect width="24" height="24" rx="12" fill="#1a1a1e"/>
            <rect x="5" y="14" width="3" height="5" rx="1" fill="#00d981"/>
            <rect x="10" y="11" width="3" height="8" rx="1" fill="#00d981"/>
            <rect x="15" y="7" width="3" height="12" rx="1" fill="#00d981"/>
        </svg>

        <!-- Whitelist bypass -->
        <svg v-else-if="code === 'globe'" class="server-flag__svg server-flag__svg--icon" viewBox="0 0 24 24" aria-hidden="true">
            <rect width="24" height="24" rx="12" fill="#1a1a1e"/>
            <circle cx="12" cy="12" r="7" fill="none" stroke="#00d981" stroke-width="1.5"/>
            <ellipse cx="12" cy="12" rx="3" ry="7" fill="none" stroke="#00d981" stroke-width="1.5"/>
            <line x1="5" y1="12" x2="19" y2="12" stroke="#00d981" stroke-width="1.5"/>
        </svg>
    </span>
</template>

<script setup>
defineProps({
    code: {
        type: String,
        required: true,
    },
})
</script>

<style scoped>
.server-flag {
    display: flex;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;
}

.server-flag__svg {
    width: 100%;
    height: 100%;
    display: block;
}
</style>
