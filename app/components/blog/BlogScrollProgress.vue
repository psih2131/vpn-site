<template>
    <aside
        class="blog-scroll-progress"
        aria-hidden="true"
    >
        <div class="blog-scroll-progress__track">
            <div
                class="blog-scroll-progress__fill"
                :style="{ height: `${progress}%` }"
            />
            <div
                class="blog-scroll-progress__thumb"
                :style="{ top: `${progress}%` }"
            >
                <span class="blog-scroll-progress__dot" />
                <span class="blog-scroll-progress__label">{{ progress }}%</span>
            </div>
        </div>
    </aside>
</template>

<script setup>
const progress = ref(0)

function updateProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    const docHeight = document.documentElement.scrollHeight - window.innerHeight

    if (docHeight <= 0) {
        progress.value = 0
        return
    }

    progress.value = Math.min(100, Math.max(0, Math.round((scrollTop / docHeight) * 100)))
}

onMounted(() => {
    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)
})

onBeforeUnmount(() => {
    window.removeEventListener('scroll', updateProgress)
    window.removeEventListener('resize', updateProgress)
})
</script>
