import { readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import sharp from 'sharp'

const tmp = tmpdir()
const out = 'app/assets/images'

const icons = [
    { slug: 'android', color: '#3ddc84', file: 'icon-android.png' },
    { slug: 'apple', color: '#f5f5f7', file: 'icon-apple.png' },
    { slug: 'windows', color: '#00a4ef', file: 'icon-windows.png' },
]

for (const icon of icons) {
    const svg = readFileSync(join(tmp, `si-${icon.slug}.svg`), 'utf8')
        .replace('<svg ', `<svg fill="${icon.color}" `)
    const png = await sharp(Buffer.from(svg), { density: 600 })
        .resize(256, 256, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toBuffer()
    writeFileSync(join(out, icon.file), png)
    console.log(icon.file, png.length)
}

const tux = await sharp(join(tmp, 'tux.png'))
    .trim()
    .resize(256, 256, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer()
writeFileSync(join(out, 'icon-linux.png'), tux)
console.log('icon-linux.png', tux.length)
