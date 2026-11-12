/**
 * OutroScene — elegant CTA outro with channel branding.
 */
const React = require('react');
const { AbsoluteFill, useCurrentFrame, useVideoConfig } = require('remotion');
const { presence, slideY, BG_DARK, CYAN, CYAN2, WHITE, FONT } = require('./transitions');

const OutroScene = ({ scene }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const s = scene || {};
  const totalF = durationInFrames;

  const cta     = String(s.cta || 'Bấm Đăng ký kênh để không bỏ lỡ các phân tích chiến lược');
  const channel = String(s.channel || 'Huybrid Network');
  const tagline = String(s.tagline || 'Phân tích • Thời sự • Dự báo chiến lược');

  const glowAlpha    = presence(frame, 0,  24, totalF, 0);
  const logoAlpha    = presence(frame, 6,  18, totalF, 16);
  const logoY        = slideY(frame, 6, 18, 30);
  const ctaAlpha     = presence(frame, 14, 20, totalF, 16);
  const ctaY         = slideY(frame, 14, 20, 25);
  const cardsAlpha   = presence(frame, 22, 18, totalF, 14);
  const cardsY       = slideY(frame, 22, 18, 30);
  const pulseBtn     = 1 + Math.sin(frame * 0.18) * 0.03;

  return React.createElement(
    AbsoluteFill,
    { style: { background: BG_DARK, overflow: 'hidden', fontFamily: FONT } },

    // Radial center glow
    React.createElement('div', { style: {
      position: 'absolute', inset: 0, pointerEvents: 'none',
      background: `radial-gradient(ellipse at 50% 50%, rgba(0,212,255,${glowAlpha * 0.12}) 0%, transparent 60%)`,
    }}),

    // Top accent bar
    React.createElement('div', { style: {
      position: 'absolute', top: 0, left: 0, right: 0, height: '6px',
      background: `linear-gradient(90deg, ${CYAN} 0%, #0088cc 55%, ${CYAN2} 100%)`,
      opacity: logoAlpha,
    }}),

    // Bottom accent bar
    React.createElement('div', { style: {
      position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px',
      background: `linear-gradient(90deg, transparent 0%, ${CYAN} 30%, ${CYAN2} 70%, transparent 100%)`,
      opacity: logoAlpha,
    }}),

    // Two-column layout for Long-form Endscreen conversion
    React.createElement('div', { style: {
      display: 'flex', flexDirection: 'row', alignItems: 'center',
      justifyContent: 'space-between',
      padding: '80px 100px', boxSizing: 'border-box',
      width: '100%', height: '100%', gap: '60px',
    }},

      // LEFT COLUMN: Channel Info + CTA + Subscribe Button
      React.createElement('div', { style: {
        flex: '1', maxWidth: '900px',
        display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
      }},

        // Channel Brand Pill
        React.createElement('div', { style: {
          display: 'inline-flex', alignItems: 'center', gap: '14px',
          background: 'rgba(0,212,255,0.12)', border: '1px solid rgba(0,212,255,0.4)',
          borderRadius: '40px', padding: '10px 24px', marginBottom: '24px',
          opacity: logoAlpha, transform: `translateY(${logoY}px)`,
        }},
          React.createElement('span', { style: { fontSize: '24px' } }, '⚡'),
          React.createElement('span', { style: {
            color: CYAN, fontSize: '26px', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase',
          } }, channel),
          React.createElement('span', { style: {
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: '22px', height: '22px', borderRadius: '50%',
            background: CYAN, color: '#060614', fontSize: '14px', fontWeight: 900,
          } }, '✓')
        ),

        // Tagline
        React.createElement('div', { style: {
          color: 'rgba(175,210,230,0.65)', fontSize: '22px', fontWeight: 500,
          letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '28px',
          opacity: logoAlpha,
        }}, tagline),

        // Provocative Closing Question / CTA
        React.createElement('h1', { style: {
          color: WHITE, fontSize: cta.length > 55 ? '40px' : '48px',
          fontWeight: 800, lineHeight: 1.25, margin: '0 0 24px',
          wordBreak: 'break-word', overflowWrap: 'break-word',
          opacity: ctaAlpha, transform: `translateY(${ctaY}px)`,
        }}, cta),

        // Engagement hook
        React.createElement('p', { style: {
          color: 'rgba(175,210,230,0.85)', fontSize: '26px', fontWeight: 500,
          margin: '0 0 36px', opacity: ctaAlpha,
        }}, '💬 Hãy để lại góc nhìn của bạn ở phần bình luận bên dưới.'),

        // Prominent Animated Subscribe Button
        React.createElement('div', { style: {
          display: 'inline-flex', alignItems: 'center', gap: '18px',
          background: 'linear-gradient(135deg, #ff0000 0%, #cc0000 100%)',
          color: '#fff', padding: '18px 44px', borderRadius: '50px',
          fontSize: '28px', fontWeight: 900, letterSpacing: '1px',
          boxShadow: '0 8px 32px rgba(255,0,0,0.45)',
          opacity: ctaAlpha, transform: `translateY(${ctaY}px) scale(${pulseBtn})`,
        }},
          React.createElement('span', null, 'ĐĂNG KÝ KÊNH'),
          React.createElement('span', { style: { fontSize: '28px' } }, '🔔')
        )
      ),

      // RIGHT COLUMN: YouTube End-Screen Video Placeholders (invites binge watching)
      React.createElement('div', { style: {
        flex: '0 0 680px',
        display: 'flex', flexDirection: 'column', gap: '24px',
        opacity: cardsAlpha, transform: `translateY(${cardsY}px)`,
      }},

        // Recommended Video Card
        React.createElement('div', { style: {
          background: 'rgba(10,24,45,0.75)', border: '1px solid rgba(0,212,255,0.3)',
          borderRadius: '20px', padding: '24px 28px',
          display: 'flex', alignItems: 'center', gap: '20px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
        }},
          React.createElement('div', { style: {
            width: '120px', height: '80px', borderRadius: '12px',
            background: 'linear-gradient(135deg, rgba(0,212,255,0.2) 0%, rgba(0,136,204,0.3) 100%)',
            border: '1px solid rgba(0,212,255,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '36px', color: CYAN,
          }}, '▶'),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: {
              color: CYAN, fontSize: '18px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '6px',
            }}, 'VIDEO ĐỀ XUẤT TIẾP THEO'),
            React.createElement('div', { style: {
              color: WHITE, fontSize: '24px', fontWeight: 600, lineHeight: 1.3,
            }}, 'Xem ngay tập phân tích liên quan trên màn hình kết thúc')
          )
        ),

        // Playlist Card
        React.createElement('div', { style: {
          background: 'rgba(10,24,45,0.75)', border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '20px', padding: '24px 28px',
          display: 'flex', alignItems: 'center', gap: '20px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
        }},
          React.createElement('div', { style: {
            width: '120px', height: '80px', borderRadius: '12px',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '32px', color: '#fff',
          }}, '📂'),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', { style: {
              color: 'rgba(175,210,230,0.7)', fontSize: '18px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '6px',
            }}, 'DANH SÁCH PHÁT TOÀN DIỆN'),
            React.createElement('div', { style: {
              color: WHITE, fontSize: '24px', fontWeight: 600, lineHeight: 1.3,
            }}, 'Khám phá chuỗi phóng sự chuyên sâu tại kênh Huybrid')
          )
        )
      )
    )
  );
};

module.exports = { OutroScene };
