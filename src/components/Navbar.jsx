import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export default function Navbar({ onSettingsClick }) {
  const { language } = useLanguage();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isHi = language === 'hi';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const navItems = [
    { path: '/', label: isHi ? 'होम' : 'Home', icon: '🏠' },
    { path: '/simulator', label: isHi ? 'सिमुलेटर' : 'Simulator', icon: '🎮' },
    { path: '/timeline', label: isHi ? 'समयरेखा' : 'Timeline', icon: '📅', isNew: true },
    { path: '/myths', label: isHi ? 'मिथक बस्टर' : 'Myth Buster', icon: '🧠' },
    { path: '/guide', label: isHi ? 'गाइड' : 'Guide', icon: '📋' },
    { path: '/chat', label: isHi ? 'AI चैट' : 'AI Chat', icon: '🤖' },
  ];

  return (
    <>
      <nav
        id="main-navbar"
        role="navigation"
        aria-label="Main navigation"
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 1000,
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px',
          background: scrolled
            ? 'rgba(253,249,243,0.92)'
            : 'rgba(253,249,243,0.7)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: scrolled
            ? '1px solid rgba(255,153,51,0.2)'
            : '1px solid transparent',
          boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.06)' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          id="nav-logo"
          style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            textDecoration: 'none', flexShrink: 0,
          }}
        >
          <div style={{
            width: '38px', height: '38px', borderRadius: '12px',
            background: 'linear-gradient(135deg, #FF9933, #FFB347)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '18px', boxShadow: '0 4px 12px rgba(255,153,51,0.3)',
          }}>
            🗳️
          </div>
          <div>
            <div style={{
              fontFamily: 'var(--font-heading)', fontWeight: 800,
              fontSize: '1.15rem', color: 'var(--text-primary)', lineHeight: 1.1,
            }}>
              Vote<span style={{ color: '#FF9933' }}>Smart</span> AI
            </div>
            <div style={{ fontSize: '0.62rem', fontWeight: 700, color: '#138808', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {isHi ? 'सीखें • खेलें • सत्यापित करें' : 'LEARN • PLAY • VERIFY'}
            </div>
          </div>
        </Link>

        {/* Desktop nav links */}
        <div
          style={{
            flex: 1, display: 'flex', justifyContent: 'center', gap: '4px',
          }}
          className="desktop-nav"
        >
          {navItems.map(item => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                id={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                style={{
                  display: 'flex', alignItems: 'center', gap: '5px',
                  padding: '7px 13px', borderRadius: '100px',
                  fontSize: '0.85rem', fontWeight: active ? 700 : 500,
                  color: active ? '#FF9933' : 'var(--text-secondary)',
                  background: active ? 'rgba(255,153,51,0.1)' : 'transparent',
                  border: active ? '1.5px solid rgba(255,153,51,0.3)' : '1.5px solid transparent',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  position: 'relative',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => {
                  if (!active) {
                    e.currentTarget.style.background = 'rgba(255,153,51,0.06)';
                    e.currentTarget.style.color = '#FF9933';
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }
                }}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
                {item.isNew && (
                  <span style={{
                    fontSize: '0.58rem', fontWeight: 800, color: 'white',
                    background: '#138808', padding: '1px 5px', borderRadius: '100px',
                    textTransform: 'uppercase', letterSpacing: '0.05em',
                  }}>
                    NEW
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          {/* Settings */}
          <button
            onClick={onSettingsClick}
            id="settings-btn"
            aria-label="Open settings"
            style={{
              width: '38px', height: '38px', borderRadius: '10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'transparent', border: '1.5px solid rgba(255,153,51,0.25)',
              color: 'var(--text-secondary)', fontSize: '16px',
              cursor: 'pointer', transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,153,51,0.08)';
              e.currentTarget.style.borderColor = 'rgba(255,153,51,0.5)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(255,153,51,0.25)';
            }}
          >
            ⚙️
          </button>

          {/* ECI Link */}
          <a
            href="https://www.eci.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            id="eci-link"
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '7px 14px', borderRadius: '100px',
              background: 'linear-gradient(135deg, #FF9933, #FFB347)',
              color: 'white', fontSize: '0.8rem', fontWeight: 700,
              textDecoration: 'none', boxShadow: '0 3px 12px rgba(255,153,51,0.3)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(255,153,51,0.4)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 3px 12px rgba(255,153,51,0.3)';
            }}
          >
            🏛️ {isHi ? 'ECI' : 'ECI'}
          </a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            id="mobile-menu-btn"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className="mobile-menu-btn"
            style={{
              width: '38px', height: '38px', borderRadius: '10px',
              display: 'none', alignItems: 'center', justifyContent: 'center',
              background: mobileOpen ? 'rgba(255,153,51,0.1)' : 'transparent',
              border: '1.5px solid rgba(255,153,51,0.25)',
              cursor: 'pointer', fontSize: '18px',
            }}
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed', top: '72px', left: 0, right: 0,
            background: 'rgba(253,249,243,0.97)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255,153,51,0.2)',
            zIndex: 999,
            padding: '16px 20px 24px',
            animation: 'fadeInDown 0.2s ease-out forwards',
          }}
          id="mobile-menu"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {navItems.map(item => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '12px 16px', borderRadius: '12px',
                    color: active ? '#FF9933' : 'var(--text-primary)',
                    background: active ? 'rgba(255,153,51,0.1)' : 'transparent',
                    textDecoration: 'none', fontWeight: active ? 700 : 500,
                    fontSize: '1rem',
                  }}
                >
                  <span style={{ fontSize: '1.3rem' }}>{item.icon}</span>
                  <span>{item.label}</span>
                  {item.isNew && (
                    <span style={{
                      marginLeft: 'auto', fontSize: '0.65rem', fontWeight: 800,
                      color: 'white', background: '#138808',
                      padding: '2px 8px', borderRadius: '100px',
                    }}>
                      NEW
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
          <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255,153,51,0.15)', display: 'flex', gap: '12px' }}>
            <button
              onClick={() => { onSettingsClick(); setMobileOpen(false); }}
              style={{
                flex: 1, padding: '10px', borderRadius: '10px',
                border: '1.5px solid rgba(255,153,51,0.3)', background: 'transparent',
                color: 'var(--text-secondary)', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem',
              }}
            >
              ⚙️ {isHi ? 'सेटिंग्स' : 'Settings'}
            </button>
            <a
              href="https://www.eci.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1, padding: '10px', borderRadius: '10px', textAlign: 'center',
                background: 'linear-gradient(135deg, #FF9933, #FFB347)',
                color: 'white', fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem',
              }}
            >
              🏛️ ECI Official
            </a>
          </div>
        </div>
      )}

      {/* Spacer */}
      <div style={{ height: '72px' }} aria-hidden="true" />

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          #eci-link { display: none !important; }
        }
      `}</style>
    </>
  );
}
