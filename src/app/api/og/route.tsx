import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Palette written out here: these routes cannot read the CSS tokens (ink, bone, accent).
const INK = '#0B0B0A';
const BONE = '#ECE7DE';
const ACCENT = '#EC2A45';

const pill = {
    padding: '10px 24px',
    border: `1.5px solid rgba(236, 231, 222, 0.42)`,
    borderRadius: '999px',
    fontSize: '20px',
    fontWeight: 500,
    color: BONE,
} as const;

export async function GET() {
    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    backgroundColor: INK,
                    color: BONE,
                    padding: '72px',
                    position: 'relative',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '24px', letterSpacing: '0.08em' }}>
                    <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: ACCENT }} />
                    <span>PATRICK BARTOSIK</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', fontSize: '112px', fontWeight: 700, lineHeight: 0.95, letterSpacing: '-0.04em' }}>
                    <span>AI Engineer</span>
                    <span style={{ color: ACCENT }}>& Full Stack</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', gap: '16px' }}>
                        <div style={pill}>LLM · Agents · RAG</div>
                        <div style={pill}>SaaS · Web</div>
                    </div>
                    <div style={{ fontSize: '24px', opacity: 0.66 }}>patrick.bartosik.fr</div>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}
