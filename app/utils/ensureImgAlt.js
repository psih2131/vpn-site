function stripOwnOrigin(attrs) {
    return attrs.replace(
        /(\b(?:src|srcset)\s*=\s*)(["'])([\s\S]*?)\2/gi,
        (_, prefix, quote, value) => {
            const next = value.replace(
                /https?:\/\/(?:www\.)?(?:dark-nova-vpn\.space|darknovavpn\.com)(?=\/)/gi,
                '',
            )
            return `${prefix}${quote}${next}${quote}`
        },
    )
}

/**
 * Adds alt to <img> tags that are missing it or have empty alt.
 * Own absolute image URLs become root-relative.
 */
export function ensureImgAlt(html, fallbackAlt = 'Иллюстрация') {
    if (!html || typeof html !== 'string') return html || ''

    const altText = String(fallbackAlt || 'Иллюстрация')
        .trim()
        .replace(/"/g, '&quot;') || 'Иллюстрация'

    return html.replace(/<img\b([^>]*)>/gi, (_, rawAttrs) => {
        const attrs = stripOwnOrigin(rawAttrs)
        const altMatch = attrs.match(/\balt\s*=\s*(["'])(.*?)\1/i)
        if (altMatch && altMatch[2].trim() !== '') {
            return `<img${attrs}>`
        }

        let nextAttrs = attrs
        if (altMatch) {
            nextAttrs = nextAttrs.replace(/\balt\s*=\s*(["']).*?\1/i, `alt="${altText}"`)
        } else {
            nextAttrs = `${nextAttrs} alt="${altText}"`
        }

        return `<img${nextAttrs}>`
    })
}
