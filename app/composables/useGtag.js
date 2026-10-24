export function useGtag() {
    function trackEvent(name, params = {}) {
        if (!import.meta.client) return
        if (typeof window.gtag !== 'function') return

        window.gtag('event', name, {
            page_path: window.location.pathname,
            ...params,
        })
    }

    return { trackEvent }
}
