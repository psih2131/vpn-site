import { defineSitemapEventHandler } from '#imports'

export default defineSitemapEventHandler(() => {
    return [
        { loc: '/', _sitemap: 'pages' },
        { loc: '/blog', _sitemap: 'pages' },
        // { loc: '/docs/license', _sitemap: 'pages' },
        // { loc: '/docs/privacy', _sitemap: 'pages' },
        // { loc: '/docs/cookies', _sitemap: 'pages' },
        // { loc: '/docs/refund', _sitemap: 'pages' },
    ]
})
