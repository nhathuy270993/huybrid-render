/**
 * TitleScene — intro card for TechInsight videos.
 * frame is 0-based within its Remotion Sequence.
 */
const React = require('react');
const { AbsoluteFill, useCurrentFrame, useVideoConfig } = require('remotion');
const { presence, slideY, staggerItem, BG_DARK, CYAN, CYAN2, FONT } = require('./transitions');

const getLongTitleFontSize = (len) => {
  if (len > 70) return '54px';
  if (len > 50) return '64px';
  if (len > 35) return '74px';
  return '84px';
};

const TitleScene = ({ scene }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const s = scene || {};

  const title      = String(s.title || 'Tech Insight');
  const subtitle   = String(s.subtitle || '');
  const badge      = String(s.source_badge || 'HUYBRID SPECIAL REPORT');
  const imageUrl   = String(s.image_url || '');
  const hasImage   = imageUrl.length > 0;
  const totalF     = durationInFrames;

  const badgeAlpha  = presence(frame, 0,  14, totalF, 14);
  const lineAlpha   = presence(frame, 8,  16, totalF, 14);
  const titleAlpha  = presence(frame, 14, 22, totalF, 18);
  const titleY      = slideY(frame, 14, 22, 45);
  const subAlpha    = presence(frame, 26, 18, totalF, 16);
  const subY        = slideY(frame, 26, 18, 25);
  const { alpha: tag1Alpha, offsetY: tag1Y } = staggerItem(frame, 38, 8, 0);
  const { alpha: tag2Alpha, offsetY: tag2Y } = staggerItem(frame, 38, 8, 1);
  const { alpha: tag3Alpha, offsetY: tag3Y } = staggerItem(frame, 38, 8, 2);
  const tags = Array.isArray(s.tags) ? s.tags.slice(0, 3) : [];
  const tagAlphas = [tag1Alpha, tag2Alpha, tag3Alpha];
  const tagYs     = [tag1Y,     tag2Y,     tag3Y];

  return React.createElement(
    AbsoluteFill,
    { style: { background: BG_DARK, overflow: 'hidden', fontFamily: FONT } },

    // Background image (full bleed, fades in with title)
    hasImage && React.createElement('img', {
      src: imageUrl,
      style: {
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        objectFit: 'cover', objectPosition: 'center',
        opacity: titleAlpha * 0.38,
      },
    }),

    // Dark vignette over background image
    hasImage && React.createElement('div', { style: {
      position: 'absolute', inset: 0, pointerEvents: 'none',
      background: 'radial-gradient(ellipse at center, rgba(6,6,20,0.45) 0%, rgba(6,6,20,0.8) 70%, rgba(6,6,20,0.96) 100%)',
    }}),

    // Scan-line overlay
    React.createElement('div', { style: {
      position: 'absolute', inset: 0, pointerEvents: 'none',
      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0,212,255,0.012) 4px, rgba(0,212,255,0.012) 8px)',
    }}),

    // Top accent bar
    React.createElement('div', { style: {
      position: 'absolute', top: 0, left: 0, right: 0, height: '6px',
      background: `linear-gradient(90deg, ${CYAN} 0%, #0088cc 55%, ${CYAN2} 100%)`,
      opacity: lineAlpha,
    }}),

    // Glow blob center-left
    React.createElement('div', { style: {
      position: 'absolute', left: '-200px', top: '30%',
      width: '800px', height: '600px', borderRadius: '50%',
      background: `radial-gradient(ellipse, rgba(0,212,255,0.08) 0%, transparent 70%)`,
      opacity: titleAlpha,
    }}),

    // Badge top-left
    React.createElement('div', { style: {
      position: 'absolute', top: '60px', left: '80px',
      color: `rgba(0,212,255,0.9)`, fontSize: '26px', fontWeight: 800,
      letterSpacing: '4px', textTransform: 'uppercase', opacity: badgeAlpha,
      display: 'inline-flex', alignItems: 'center', gap: '10px',
    }}, `⚡ ${badge}`),

    // Content center with boxSizing border-box
    React.createElement('div', { style: {
      position: 'absolute', inset: 0,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', textAlign: 'center',
      padding: '120px 80px 80px', boxSizing: 'border-box',
      width: '100%', height: '100%',
    }},

      // Title
      React.createElement('h1', { style: {
        color: '#fff', margin: '0 0 28px',
        fontSize: getLongTitleFontSize(title.length),
        fontWeight: 900, lineHeight: 1.15, letterSpacing: '-0.5px',
        textShadow: '0 4px 48px rgba(0,0,0,0.95)',
        maxWidth: '1600px',
        wordBreak: 'break-word',
        overflowWrap: 'break-word',
        opacity: titleAlpha, transform: `translateY(${titleY}px)`,
      }}, title),

      // Subtitle
      subtitle && React.createElement('p', { style: {
        color: 'rgba(175,210,230,0.85)', margin: '0 0 36px',
        fontSize: subtitle.length > 70 ? '30px' : '36px',
        fontWeight: 400, lineHeight: 1.4, maxWidth: '1400px',
        wordBreak: 'break-word',
        overflowWrap: 'break-word',
        opacity: subAlpha, transform: `translateY(${subY}px)`,
      }}, subtitle),

      // Tags
      tags.length > 0 && React.createElement('div', { style: {
        display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap',
      }},
        tags.map((tag, i) =>
          React.createElement('span', { key: i, style: {
            background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.4)',
            color: 'rgba(0,212,255,0.95)', padding: '8px 24px', borderRadius: '30px',
            fontSize: '24px', fontWeight: 600, letterSpacing: '0.5px',
            opacity: tagAlphas[i], transform: `translateY(${tagYs[i]}px)`,
          }}, `#${tag}`)
        )
      )
    ),

    // Watermark
    React.createElement('div', { style: {
      position: 'absolute', bottom: '44px', right: '80px',
      color: 'rgba(255,255,255,0.25)', fontSize: '22px',
      fontWeight: 600, letterSpacing: '3px', opacity: badgeAlpha,
    }}, 'HUYBRID NETWORK')
  );
};

module.exports = { TitleScene };
