// Renders the site's Open Graph image to public/og/og-image.png (no generator exists for this file).
// Run it again after a design change: bun --no-env-file scripts/render-og.ts
//
// The image is a static file on purpose. Rendering it on request went through sharp, and the
// Next.js image optimizer blocks SVG decoding in sharp for the whole server process, so the
// route failed as soon as one optimized image had been served.
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createElement as h, type CSSProperties } from 'react';
import { ImageResponse } from 'next/og';

const WIDTH = 1200;
const HEIGHT = 630;
const OUTPUT = path.join(process.cwd(), 'public', 'og', 'og-image.png');

// Palette written out here: this script cannot read the CSS tokens (ink, bone, accent).
const INK = '#0B0B0A';
const BONE = '#ECE7DE';
const ACCENT = '#EC2A45';

const pill: CSSProperties = {
  padding: '10px 24px',
  border: '1.5px solid rgba(236, 231, 222, 0.42)',
  borderRadius: '999px',
  fontSize: '20px',
  fontWeight: 500,
  color: BONE,
};

const image = h(
  'div',
  {
    style: {
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: INK,
      color: BONE,
      padding: '72px',
      position: 'relative',
    },
  },
  h(
    'div',
    { style: { display: 'flex', alignItems: 'center', gap: '16px', fontSize: '24px', letterSpacing: '0.08em' } },
    h('div', { style: { width: '14px', height: '14px', borderRadius: '50%', background: ACCENT } }),
    h('span', null, 'PATRICK BARTOSIK'),
  ),
  h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        fontSize: '112px',
        fontWeight: 700,
        lineHeight: 0.95,
        letterSpacing: '-0.04em',
      },
    },
    h('span', null, 'AI Engineer'),
    h('span', { style: { color: ACCENT } }, '& Full Stack'),
  ),
  h(
    'div',
    { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
    h(
      'div',
      { style: { display: 'flex', gap: '16px' } },
      h('div', { style: pill }, 'LLM · Agents · RAG'),
      h('div', { style: pill }, 'SaaS · Web'),
    ),
    h('div', { style: { fontSize: '24px', opacity: 0.66 } }, 'patrick.bartosik.fr'),
  ),
);

const png = Buffer.from(await new ImageResponse(image, { width: WIDTH, height: HEIGHT }).arrayBuffer());

// PNG header: 8 signature bytes, then the IHDR chunk with width and height at bytes 16 to 23.
const isPng = png.subarray(1, 4).toString('latin1') === 'PNG';
if (!isPng || png.readUInt32BE(16) !== WIDTH || png.readUInt32BE(20) !== HEIGHT) {
  throw new Error('The rendered Open Graph image is not a 1200x630 PNG.');
}

await mkdir(path.dirname(OUTPUT), { recursive: true });
await writeFile(OUTPUT, png);
console.log(`Wrote ${path.relative(process.cwd(), OUTPUT)} (${WIDTH}x${HEIGHT}, ${png.length} bytes)`);
