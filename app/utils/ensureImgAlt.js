/**
 * Adds alt to <img> tags that are missing it or have empty alt.
 */
export function ensureImgAlt(html, fallbackAlt = 'Иллюстрация') {
    if (!html || typeof html !== 'string') return html || ''

    const altText = String(fallbackAlt || 'Иллюстрация')
        .trim()
        .replace(/"/g, '&quot;') || 'Иллюстрация'

    return html.replace(/<img\b([^>]*)>/gi, (full, attrs) => {
        const altMatch = attrs.match(/\balt\s*=\s*(["'])(.*?)\1/i)
        if (altMatch && altMatch[2].trim() !== '') {
            return full
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
