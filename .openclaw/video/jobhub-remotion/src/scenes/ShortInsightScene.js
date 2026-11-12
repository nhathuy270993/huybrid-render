/**
 * ShortInsightScene — vertical (1080×1920) content/insight card.
 * Large readable text for mobile, supports background image.
 */
const React = require('react');
const { AbsoluteFill, useCurrentFrame, useVideoConfig } = require('remotion');
const { presence, slideY, staggerItem, BG_DARK, AMBER, WHITE, FONT } = require('./transitions');

const getHeadlineFontSize = (len) => {
  if (len > 50) return '44px';
  if (len > 35) return '52px';
  return '62px';
};

const ShortInsightScene = ({ scene }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const s = scene || {};
  const totalF = durationInFrames;

  const headline   = String(s.headline || s.title || 'Key Insight');
  let points       = Array.isArray(s.points) ? [...s.points] : [];
  if (points.length === 0) {
    if (s.subtitle) points.push(String(s.subtitle));
    if (s.text) points.push(String(s.text));
    if (s.voice_segment) {
      const parts = String(s.voice_segment).split(/[.!?]/).map(p => p.trim()).filter(p => p.length > 10);
      for (const p of parts.slice(0, 2)) {
        if (!points.includes(p)) points.push(p);
      }
    }
  }
  points = points.slice(0, 4);
  const sourceNote = String(s.source_note || '');
  const imageUrl   = String(s.image_url || '');
  const hasImage   = imageUrl.length > 0;
  const accent     = String(s.accent || AMBER);

  // Animations
  const headAlpha = presence(frame, 0, 18, totalF, 18);
  const headY     = slideY(frame, 0, 18, 45);
  const lineAlpha = presence(frame, 12, 14, totalF, 16);

  const ptItems = points.map((_, i) => staggerItem(frame, 22, 12, i, 18));
  const noteAlpha = presence(frame, 22 + points.length * 12 + 12, 16, totalF, 14);

  return React.createElement(
    AbsoluteFill,
    { style: { background: BG_DARK, overflow: 'hidden', fontFamily: FONT } },

    // Background image (top half)
    hasImage && React.createElement('img', {
      src: imageUrl,
      style: {
        position: 'absolute', top: 0, left: 0, right: 0,
        width: '100%', height: '58%',
        objectFit: 'cover', objectPosition: 'center',
        opacity: headAlpha * 0.45,
      },
    }),

    // Gradient overlay on image for readability
    hasImage && React.createElement('div', { style: {
      position: 'absolute', top: 0, left: 0, right: 0, height: '64%',
      background: 'linear-gradient(180deg, rgba(6,6,20,0.35) 0%, rgba(6,6,20,0.78) 60%, rgba(6,6,20,1) 100%)',
      pointerEvents: 'none',
    }}),

    // Scan lines
    React.createElement('div', { style: {
      position: 'absolute', inset: 0, pointerEvents: 'none',
      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(255,179,0,0.006) 4px, rgba(255,179,0,0.006) 8px)',
    }}),

    // Accent glow
    React.createElement('div', { style: {
      position: 'absolute', left: '-100px', top: '25%',
      width: '600px', height: '600px', borderRadius: '50%',
      background: `radial-gradient(ellipse, ${accent}12 0%, transparent 60%)`,
      opacity: headAlpha, pointerEvents: 'none',
    }}),

    // Badge top
    React.createElement('div', { style: {
      position: 'absolute', top: '80px', left: '60px',
      color: accent, fontSize: '26px', fontWeight: 800,
      letterSpacing: '3px', textTransform: 'uppercase', opacity: headAlpha,
      display: 'inline-flex', alignItems: 'center', gap: '8px',
    }}, '💡 ĐIỂM CỐT LÕI'),

    // Content container with boxSizing border-box
    React.createElement('div', { style: {
      position: 'absolute', inset: 0,
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      padding: '160px 60px 100px', boxSizing: 'border-box',
      width: '100%', height: '100%',
    }},

      // Headline
      React.createElement('h1', { style: {
        color: accent, margin: '0 0 20px',
        fontSize: getHeadlineFontSize(headline.length),
        fontWeight: 900, lineHeight: 1.15, letterSpacing: '-0.5px',
        textShadow: `0 0 48px ${accent}44`,
        maxWidth: '960px',
        wordBreak: 'break-word',
        overflowWrap: 'break-word',
        opacity: headAlpha, transform: `translateY(${headY}px)`,
      }}, headline),

      // Divider
      React.createElement('div', { style: {
        width: '120px', height: '4px',
        background: `linear-gradient(90deg, ${accent} 0%, transparent 100%)`,
        marginBottom: '28px', borderRadius: '2px',
        opacity: lineAlpha,
      }}),

      // Bullet points inside glass card
      React.createElement('div', { style: {
        display: 'flex', flexDirection: 'column', gap: '16px',
        background: 'rgba(6,12,28,0.72)', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '24px', padding: '28px 32px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
      }},
        points.map((point, i) => {
          const { alpha, offsetY } = ptItems[i] || { alpha: 0, offsetY: 30 };
          return React.createElement('div', { key: i, style: {
            display: 'flex', alignItems: 'flex-start', gap: '16px',
            opacity: alpha, transform: `translateY(${offsetY}px)`,
          }},
            React.createElement('div', { style: {
              flexShrink: 0, width: '12px', height: '12px',
              borderRadius: '50%', background: accent,
              marginTop: '12px',
              boxShadow: `0 0 14px ${accent}`,
            }}),
            React.createElement('p', { style: {
              color: WHITE, fontSize: '32px', fontWeight: 500,
              lineHeight: 1.35, margin: 0, flex: 1,
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
            }}, point)
          );
        })
      ),

      // Source note
      sourceNote && React.createElement('p', { style: {
        color: 'rgba(175,210,230,0.6)', fontSize: '22px', fontWeight: 500,
        marginTop: '24px', marginBottom: 0, fontStyle: 'italic',
        opacity: noteAlpha,
      }}, `📌 Nguồn: ${sourceNote}`)
    ),

    // Watermark
    React.createElement('div', { style: {
      position: 'absolute', bottom: '50px', left: 0, right: 0,
      textAlign: 'center',
      color: 'rgba(255,255,255,0.2)', fontSize: '20px',
      fontWeight: 600, letterSpacing: '4px', opacity: headAlpha,
    }}, 'HUYBRID NETWORK')
  );
};

module.exports = { ShortInsightScene };
