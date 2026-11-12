/**
 * InsightScene — animated headline + bullet points with evidence.
 * Supports: headline, points (array of strings), source_note.
 */
const React = require('react');
const { AbsoluteFill, useCurrentFrame, useVideoConfig } = require('remotion');
const { presence, slideY, slideX, staggerItem, BG_DARK, CYAN, AMBER, WHITE, MUTED, FONT } = require('./transitions');

const getInsightHeadFontSize = (len, hasImage) => {
  if (hasImage) {
    if (len > 50) return '44px';
    if (len > 35) return '50px';
    return '58px';
  }
  if (len > 55) return '48px';
  if (len > 38) return '56px';
  return '66px';
};

const InsightScene = ({ scene }) => {
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
      for (const p of parts.slice(0, 3)) {
        if (!points.includes(p)) points.push(p);
      }
    }
  }
  points = points.slice(0, 5);
  const sourceNote = String(s.source_note || '');
  const imageUrl   = String(s.image_url || '');
  const hasImage   = imageUrl.length > 0;

  // Headline
  const headAlpha = presence(frame, 0,  20, totalF, 18);
  const headY     = slideY(frame, 0, 20, 40);

  // Divider line
  const lineAlpha = presence(frame, 16, 14, totalF, 16);

  // Bullet points
  const pt0 = staggerItem(frame, 26, 14, 0, 18);
  const pt1 = staggerItem(frame, 26, 14, 1, 18);
  const pt2 = staggerItem(frame, 26, 14, 2, 18);
  const pt3 = staggerItem(frame, 26, 14, 3, 18);
  const pt4 = staggerItem(frame, 26, 14, 4, 18);
  const ptItems = [pt0, pt1, pt2, pt3, pt4];

  // Source note
  const noteAlpha = presence(frame, 26 + points.length * 14 + 16, 16, totalF, 14);

  return React.createElement(
    AbsoluteFill,
    { style: { background: BG_DARK, overflow: 'hidden', fontFamily: FONT } },

    // Scan lines
    React.createElement('div', { style: {
      position: 'absolute', inset: 0, pointerEvents: 'none',
      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(255,179,0,0.008) 4px, rgba(255,179,0,0.008) 8px)',
    }}),

    // Amber glow left
    React.createElement('div', { style: {
      position: 'absolute', left: '-150px', top: '20%',
      width: '700px', height: '700px', borderRadius: '50%',
      background: `radial-gradient(ellipse, rgba(255,179,0,0.08) 0%, transparent 65%)`,
      opacity: headAlpha,
    }}),

    // Source badge
    React.createElement('div', { style: {
      position: 'absolute', top: '60px', left: '80px',
      color: `rgba(255,179,0,0.9)`, fontSize: '26px', fontWeight: 800,
      letterSpacing: '4px', textTransform: 'uppercase', opacity: headAlpha,
    }}, '💡 PHÂN TÍCH CHUYÊN SÂU'),

    // Main content container with boxSizing border-box
    React.createElement('div', { style: {
      display: 'flex', flexDirection: 'row', alignItems: 'stretch',
      height: '100%', width: '100%', boxSizing: 'border-box',
    }},

      // LEFT: text column
      React.createElement('div', { style: {
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '110px 60px 80px 80px', boxSizing: 'border-box',
        flex: hasImage ? '0 0 58%' : '1',
        maxWidth: hasImage ? '58%' : '1680px',
      }},

        // Headline
        React.createElement('h1', { style: {
          color: AMBER, margin: '0 0 24px',
          fontSize: getInsightHeadFontSize(headline.length, hasImage),
          fontWeight: 900, lineHeight: 1.15, letterSpacing: '-0.5px',
          textShadow: `0 0 48px rgba(255,179,0,0.35)`,
          wordBreak: 'break-word', overflowWrap: 'break-word',
          opacity: headAlpha, transform: `translateY(${headY}px)`,
        }}, headline),

        // Divider
        React.createElement('div', { style: {
          width: '120px', height: '4px',
          background: `linear-gradient(90deg, ${AMBER} 0%, transparent 100%)`,
          marginBottom: '28px', borderRadius: '2px',
          opacity: lineAlpha,
        }}),

        // Bullet points inside styled card
        React.createElement('div', { style: {
          display: 'flex', flexDirection: 'column', gap: '16px',
          background: 'rgba(6,12,28,0.7)', border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '20px', padding: '24px 28px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }},
          points.map((point, i) => {
            const { alpha, offsetY } = ptItems[i] || { alpha: 0, offsetY: 30 };
            return React.createElement('div', { key: i, style: {
              display: 'flex', alignItems: 'flex-start', gap: '16px',
              opacity: alpha, transform: `translateY(${offsetY}px)`,
            }},
              React.createElement('div', { style: {
                flexShrink: 0, width: '10px', height: '10px',
                borderRadius: '50%', background: AMBER,
                marginTop: '12px',
                boxShadow: `0 0 12px rgba(255,179,0,0.8)`,
              }}),
              React.createElement('p', { style: {
                color: WHITE, fontSize: hasImage ? '28px' : '34px', fontWeight: 500,
                lineHeight: 1.38, margin: 0, flex: 1,
                wordBreak: 'break-word', overflowWrap: 'break-word',
              }}, point)
            );
          })
        ),

        // Source note
        sourceNote && React.createElement('p', { style: {
          color: 'rgba(175,210,230,0.6)', fontSize: '22px', fontWeight: 500,
          marginTop: '24px', marginBottom: 0, fontStyle: 'italic',
          opacity: noteAlpha,
        }}, `📌 Nguồn tài liệu: ${sourceNote}`)
      ),

      // RIGHT: image column
      hasImage && React.createElement('div', { style: {
        flex: '0 0 42%', position: 'relative', overflow: 'hidden',
        opacity: headAlpha,
      }},
        React.createElement('img', {
          src: imageUrl,
          style: {
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center',
            display: 'block',
          },
        }),
        React.createElement('div', { style: {
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, rgba(6,6,20,0.92) 0%, rgba(6,6,20,0.15) 30%, transparent 60%)',
          pointerEvents: 'none',
        }}),
        React.createElement('div', { style: {
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '180px',
          background: 'linear-gradient(0deg, rgba(6,6,20,0.7) 0%, transparent 100%)',
          pointerEvents: 'none',
        }})
      )
    ),

    // Watermark
    React.createElement('div', { style: {
      position: 'absolute', bottom: '44px', right: '80px',
      color: 'rgba(255,255,255,0.22)', fontSize: '20px',
      fontWeight: 600, letterSpacing: '3px', opacity: headAlpha,
    }}, 'HUYBRID NETWORK')
  );
};

module.exports = { InsightScene };
