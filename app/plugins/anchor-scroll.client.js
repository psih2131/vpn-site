const OFFSET = 91;

const scrollToHash = (hash) => {
    const id = decodeURIComponent(String(hash || '').replace(/^#/, ''));
    if (!id) return;

    const el = document.getElementById(id);
    if (!el) return;

    const top = Math.max(0, window.scrollY + el.getBoundingClientRect().top - OFFSET);
    window.scrollTo({ top, behavior: 'smooth' });
};

export default defineNuxtPlugin(() => {
    const onClick = (event) => {
        if (event.defaultPrevented || event.button !== 0) return;
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

        const link = event.target.closest('a[href^="#"]');
        if (!link || link.target === '_blank') return;

        const href = link.getAttribute('href');
        if (!href || href === '#') return;

        const id = decodeURIComponent(href.slice(1));
        if (!document.getElementById(id)) return;

        event.preventDefault();
        history.pushState(null, '', href);
        scrollToHash(href);
    };

    document.addEventListener('click', onClick, true);

    const onReady = () => {
        if (location.hash) {
            requestAnimationFrame(() => scrollToHash(location.hash));
        }
    };

    if (document.readyState === 'complete') onReady();
    else window.addEventListener('load', onReady, { once: true });
});
