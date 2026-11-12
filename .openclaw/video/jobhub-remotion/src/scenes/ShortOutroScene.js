/**
 * ShortOutroScene — vertical (1080×1920) CTA / closing card.
 * Minimal, clean, with animated accent line.
 */
const React = require('react');
const { AbsoluteFill, useCurrentFrame, useVideoConfig } = require('remotion');
const { presence, slideY, BG_DARK, CYAN, WHITE, FONT } = require('./transitions');

const ShortOutroScene = ({ scene }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const s = scene || {};
  const totalF = durationInFrames;

  const cta      = String(s.cta || 'Đăng ký kênh để theo dõi phân tích mới');
  const channel  = String(s.channel || 'Huybrid Network');
  const tagline  = String(s.tagline || 'Phân tích • Dự báo • Độc lập');
  const accent   = String(s.accent || CYAN);

  const logoAlpha = presence(frame, 0, 16, totalF, 14);
  const logoScale = Math.min(1, frame / 16);
  const ctaAlpha  = presence(frame, 10, 18, totalF, 16);
  const ctaY      = slideY(frame, 10, 18, 35);
  const subAlpha  = presence(frame, 20, 16, totalF, 14);
  const subY      = slideY(frame, 20, 16, 25);
  const pulseBtn  = 1 + Math.sin(frame * 0.2) * 0.035;

  return React.createElement(
    AbsoluteFill,
    { style: { background: BG_DARK, overflow: 'hidden', fontFamily: FONT } },

    // Glow center
    React.createElement('div', { style: {
      position: 'absolute', left: '50%', top: '42%',
      width: '760px', height: '760px', borderRadius: '50%',
      transform: 'translate(-50%, -50%)',
      background: `radial-gradient(ellipse, ${accent}18 0%, transparent 60%)`,
      opacity: logoAlpha, pointerEvents: 'none',
    }}),

    // Content container with boxSizing border-box
    React.createElement('div', { style: {
      position: 'absolute', inset: 0,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', textAlign: 'center',
      padding: '120px 60px 80px', boxSizing: 'border-box',
      width: '100%', height: '100%',
    }},

      // Glowing Channel Avatar + Verified Check
      React.createElement('div', { style: {
        width: '120px', height: '120px', borderRadius: '50%',
        background: `linear-gradient(135deg, ${accent} 0%, #06182c 100%)`,
        border: `3px solid ${accent}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: `0 0 36px ${accent}66`,
        marginBottom: '20px',
        opacity: logoAlpha, transform: `scale(${logoScale})`,
      }},
        React.createElement('span', { style: { fontSize: '56px' } }, '⚡')
      ),

      // Channel name + Verified badge
      React.createElement('div', { style: {
        display: 'inline-flex', alignItems: 'center', gap: '12px',
        fontSize: '48px', fontWeight: 900, color: WHITE,
        letterSpacing: '-0.5px', marginBottom: '8px',
        opacity: logoAlpha,
      }},
        React.createElement('span', null, channel),
        React.createElement('span', { style: {
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: '32px', height: '32px', borderRadius: '50%',
          background: accent, color: '#060614', fontSize: '20px', fontWeight: 900,
        }}, '✓')
      ),

      // Tagline
      React.createElement('div', { style: {
        color: `${accent}bb`, fontSize: '24px', fontWeight: 600,
        letterSpacing: '3px', textTransform: 'uppercase',
        marginBottom: '40px',
        opacity: logoAlpha,
      }}, tagline),

      // Debatable question / hook prompt
      React.createElement('div', { style: {
        background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: '24px', padding: '28px 36px', maxWidth: '900px',
        marginBottom: '42px',
        opacity: ctaAlpha, transform: `translateY(${ctaY}px)`,
      }},
        React.createElement('p', { style: {
          color: WHITE, fontSize: cta.length > 50 ? '34px' : '40px', fontWeight: 700,
          lineHeight: 1.35, margin: '0 0 16px',
          wordBreak: 'break-word', overflowWrap: 'break-word',
        }}, cta),
        React.createElement('div', { style: {
          color: 'rgba(175,210,230,0.85)', fontSize: '24px', fontWeight: 600,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
        }}, '💬 BÌNH LUẬN Ý KIẾN BÊN DƯỚI 👇')
      ),

      // High-Converting YouTube/Reels Subscribe Button with Bell
      React.createElement('div', { style: {
        display: 'inline-flex', alignItems: 'center', gap: '16px',
        background: 'linear-gradient(135deg, #ff0000 0%, #cc0000 100%)',
        color: '#fff', padding: '18px 48px', borderRadius: '60px',
        fontSize: '32px', fontWeight: 900, letterSpacing: '1px',
        boxShadow: '0 8px 36px rgba(255,0,0,0.5)',
        marginBottom: '36px',
        opacity: subAlpha, transform: `translateY(${subY}px) scale(${pulseBtn})`,
      }},
        React.createElement('span', null, 'ĐĂNG KÝ KÊNH'),
        React.createElement('span', { style: { fontSize: '32px' } }, '🔔')
      ),

      // Bridge to Long-Form Pillar Video
      React.createElement('div', { style: {
        display: 'inline-flex', alignItems: 'center', gap: '14px',
        background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)',
        color: '#a0e8ff', padding: '14px 32px', borderRadius: '40px',
        fontSize: '24px', fontWeight: 700, maxWidth: '880px',
        opacity: subAlpha, transform: `translateY(${subY}px)`,
      }},
        React.createElement('span', { style: { fontSize: '26px' } }, '🎬'),
        React.createElement('span', null, 'Bản phân tích chuyên sâu 10 phút đã có trên kênh — Xem ngay!')
      )
    ),

    // Bottom accent line
    React.createElement('div', { style: {
      position: 'absolute', bottom: 0, left: 0, right: 0, height: '6px',
      background: `linear-gradient(90deg, transparent 10%, ${accent} 50%, transparent 90%)`,
      opacity: logoAlpha,
    }})
  );
};

module.exports = { ShortOutroScene };
