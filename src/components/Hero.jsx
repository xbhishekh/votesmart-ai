import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../data/translations';
import { useEffect, useRef, useState } from 'react';

// Animated counter hook
function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function ParticlesBackground() {
  return (
    <div className="particles-bg" aria-hidden="true">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            width: `${20 + (i * 13) % 40}px`,
            height: `${20 + (i * 13) % 40}px`,
            left: `${(i * 8.3)}%`,
            top: `${(i * 7.7) % 90}%`,
            background: i % 3 === 0 ? '#FF9933' : i % 3 === 1 ? '#138808' : '#000080',
            animationDuration: `${4 + (i % 4)}s`,
            animationDelay: `${(i * 0.4) % 3}s`,
          }}
        />
      ))}
    </div>
  );
}

function AshokChakra() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full chakra-spin" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" stroke="#000080" strokeWidth="4" fill="none"/>
      <circle cx="50" cy="50" r="6" fill="#000080"/>
      {[...Array(24)].map((_, i) => {
        const angle = (i * 15) * Math.PI / 180;
        const x1 = 50 + 7 * Math.cos(angle);
        const y1 = 50 + 7 * Math.sin(angle);
        const x2 = 50 + 43 * Math.cos(angle);
        const y2 = 50 + 43 * Math.sin(angle);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#000080" strokeWidth="1.5"/>;
      })}
    </svg>
  );
}

export default function Hero() {
  const { language } = useLanguage();
  const L = (key) => t(language, key);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  const voters = useCountUp(968, 1800, statsVisible);
  const booths = useCountUp(1050, 2000, statsVisible);
  const seats = useCountUp(543, 1500, statsVisible);
  const parties = useCountUp(4000, 2200, statsVisible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: '🎮',
      title: language === 'hi' ? 'इलेक्शन सिमुलेटर' : 'Election Simulator',
      desc: language === 'hi' ? 'इंटरेक्टिव मतदान यात्रा का अनुभव करें' : 'Experience your voting journey interactively',
      path: '/simulator',
      gradient: 'linear-gradient(135deg, #FF9933, #FFB347)',
      glowColor: 'rgba(255,153,51,0.3)',
      delay: '0.1s',
    },
    {
      icon: '🧠',
      title: language === 'hi' ? 'मिथक बस्टर' : 'Myth Buster',
      desc: language === 'hi' ? 'AI से चुनावी मिथकों को तोड़ें' : 'Bust election myths with AI verification',
      path: '/myths',
      gradient: 'linear-gradient(135deg, #138808, #2ECC40)',
      glowColor: 'rgba(19,136,8,0.3)',
      delay: '0.2s',
    },
    {
      icon: '🤖',
      title: language === 'hi' ? 'AI सहायक' : 'AI Assistant',
      desc: language === 'hi' ? 'चुनाव के बारे में कुछ भी पूछें' : 'Ask anything about elections & voting',
      path: '/chat',
      gradient: 'linear-gradient(135deg, #000080, #4444AA)',
      glowColor: 'rgba(0,0,128,0.25)',
      delay: '0.3s',
    },
    {
      icon: '📋',
      title: language === 'hi' ? 'मतदाता गाइड' : 'Voter Guide',
      desc: language === 'hi' ? 'आपके लिए व्यक्तिगत मतदान गाइड' : 'Personalized guide to register & vote',
      path: '/guide',
      gradient: 'linear-gradient(135deg, #FF6B6B, #FF8E53)',
      glowColor: 'rgba(255,107,107,0.25)',
      delay: '0.4s',
    },
    {
      icon: '📊',
      title: language === 'hi' ? 'चुनाव डैशबोर्ड' : 'Election Dashboard',
      desc: language === 'hi' ? 'लाइव चुनाव डेटा और आँकड़े' : 'Live election data and statistics',
      path: '/dashboard',
      gradient: 'linear-gradient(135deg, #7B2FF7, #F107A3)',
      glowColor: 'rgba(123,47,247,0.25)',
      delay: '0.5s',
    },
    {
      icon: '📅',
      title: language === 'hi' ? 'चुनाव कैलेंडर' : 'Election Timeline',
      desc: language === 'hi' ? 'पूरी चुनाव प्रक्रिया की समयरेखा' : 'Complete election process timeline',
      path: '/timeline',
      gradient: 'linear-gradient(135deg, #11998e, #38ef7d)',
      glowColor: 'rgba(17,153,142,0.25)',
      delay: '0.6s',
    },
  ];

  const stats = [
    { value: voters, suffix: ' Cr+', label: language === 'hi' ? 'पंजीकृत मतदाता' : 'Registered Voters', icon: '🗳️' },
    { value: booths, suffix: ' L+', label: language === 'hi' ? 'मतदान केंद्र' : 'Polling Stations', icon: '🏛️' },
    { value: seats, suffix: '', label: language === 'hi' ? 'लोकसभा सीटें' : 'Lok Sabha Seats', icon: '🏛' },
    { value: parties, suffix: '+', label: language === 'hi' ? 'राजनीतिक दल' : 'Political Parties', icon: '🎖️' },
  ];

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      <ParticlesBackground />

      {/* Hero Section */}
      <section style={{ paddingTop: '80px', paddingBottom: '60px', position: 'relative', zIndex: 1 }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '24px' }}>

            {/* Badge */}
            <div className="animate-fade-in-up stagger-1" style={{ animationFillMode: 'forwards' }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                padding: '8px 20px', borderRadius: '100px',
                background: 'rgba(255,153,51,0.1)',
                border: '1.5px solid rgba(255,153,51,0.25)',
              }}>
                <div className="pulse-dot" />
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#cc7700', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {language === 'hi' ? 'AI-संचालित नागरिक शिक्षा मंच' : 'AI-Powered Civic Education Platform'}
                </span>
              </div>
            </div>

            {/* Main heading */}
            <div className="animate-fade-in-up stagger-2" style={{ animationFillMode: 'forwards' }}>
              <h1 style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: 900, lineHeight: 1.05, maxWidth: '800px' }}>
                <span className="gradient-text">VoteSmart</span>
                <span style={{ color: 'var(--text-primary)' }}> AI</span>
                <br />
                <span style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2.2rem)', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  {language === 'hi' ? 'सीखें • खेलें • सत्यापित करें' : 'Learn • Play • Verify'}
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <div className="animate-fade-in-up stagger-3" style={{ animationFillMode: 'forwards' }}>
              <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: 'var(--text-secondary)', maxWidth: '600px', lineHeight: 1.6 }}>
                {language === 'hi'
                  ? 'भारत का सबसे उन्नत AI-संचालित मतदाता शिक्षा मंच। चुनाव प्रक्रिया को इंटरेक्टिव, मजेदार और आसान बनाएं।'
                  : "India's most advanced AI-powered voter education platform. Make election literacy interactive, fun and accessible for every citizen."}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="animate-fade-in-up stagger-4" style={{ animationFillMode: 'forwards', display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link to="/simulator" className="btn-primary" id="start-simulator-btn" style={{ fontSize: '1.05rem', padding: '16px 36px' }}>
                🎮 {language === 'hi' ? 'सिमुलेटर शुरू करें' : 'Start Simulator'}
              </Link>
              <Link to="/chat" className="btn-secondary" id="ask-ai-btn" style={{ fontSize: '1.05rem', padding: '14px 32px' }}>
                🤖 {language === 'hi' ? 'AI से पूछें' : 'Ask AI'}
              </Link>
            </div>

            {/* Trust bar */}
            <div className="animate-fade-in-up stagger-5" style={{ animationFillMode: 'forwards', display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '8px' }}>
              {['🔒 100% Free', '🌐 Hindi + English', '⚡ Powered by Gemini AI'].map((item, i) => (
                <span key={i} style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section style={{ padding: '40px 0 60px', position: 'relative', zIndex: 1 }} id="features-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 800 }}>
              {language === 'hi' ? '✨ सब कुछ एक जगह' : '✨ Everything You Need'}
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
              {language === 'hi' ? 'चुनाव शिक्षा के लिए 6 शक्तिशाली उपकरण' : '6 powerful tools for complete election education'}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {features.map((feat, i) => (
              <Link
                key={feat.path}
                to={feat.path}
                id={`feature-card-${i}`}
                className="premium-card"
                style={{
                  display: 'block',
                  padding: '28px',
                  textDecoration: 'none',
                  animation: `fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${feat.delay} forwards`,
                  opacity: 0,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '18px' }}>
                  <div style={{
                    width: '60px', height: '60px', borderRadius: '16px',
                    background: feat.gradient,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '28px', flexShrink: 0,
                    boxShadow: `0 8px 24px ${feat.glowColor}`,
                  }}>
                    {feat.icon}
                  </div>
                  <div>
                    <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '6px', color: 'var(--text-primary)' }}>
                      {feat.title}
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                      {feat.desc}
                    </p>
                    <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '4px', color: '#FF9933', fontWeight: 600, fontSize: '0.85rem' }}>
                      {language === 'hi' ? 'शुरू करें' : 'Explore'} <span>→</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        ref={statsRef}
        style={{
          margin: '0 0 60px',
          padding: '60px 0',
          background: 'linear-gradient(135deg, rgba(255,153,51,0.05) 0%, rgba(19,136,8,0.05) 100%)',
          borderTop: '1px solid rgba(255,153,51,0.12)',
          borderBottom: '1px solid rgba(255,153,51,0.12)',
          position: 'relative', zIndex: 1,
        }}
        id="stats-section"
      >
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: 800 }}>
              🇮🇳 {language === 'hi' ? "भारत के चुनाव आँकड़े" : "India's Election by Numbers"}
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '24px' }}>
            {stats.map((stat, i) => (
              <div key={i} className="premium-card" style={{ padding: '32px 20px', textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>{stat.icon}</div>
                <div className="stat-number">{stat.value.toLocaleString()}{stat.suffix}</div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', fontWeight: 500, marginTop: '6px' }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ashoka Chakra showcase */}
      <section style={{ padding: '20px 0 80px', position: 'relative', zIndex: 1 }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '60px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{ width: '180px', height: '180px', opacity: 0.15 }}>
              <AshokChakra />
            </div>
            <div style={{ maxWidth: '520px' }}>
              <div className="india-stripe" style={{ marginBottom: '20px' }} />
              <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 800, marginBottom: '14px' }}>
                {language === 'hi' ? '🗳️ हर वोट मायने रखता है' : '🗳️ Every Vote Matters'}
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '24px', fontSize: '1rem' }}>
                {language === 'hi'
                  ? 'VoteSmart AI आपको चुनाव प्रक्रिया की पूरी समझ देता है — पंजीकरण से लेकर मतगणना तक। AI-संचालित सहायक, इंटरेक्टिव सिमुलेशन और तथ्य-जाँच के साथ।'
                  : 'VoteSmart AI gives you complete understanding of the election process — from registration to counting. With AI-powered assistant, interactive simulations and real-time fact-checking.'}
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link to="/timeline" className="btn-primary" id="view-timeline-btn">
                  📅 {language === 'hi' ? 'चुनाव समयरेखा' : 'Election Timeline'}
                </Link>
                <Link to="/myths" className="btn-secondary" id="bust-myths-btn">
                  🧠 {language === 'hi' ? 'मिथक बस्टर' : 'Myth Buster'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid rgba(255,153,51,0.12)',
        padding: '32px 0',
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: '0.82rem',
        position: 'relative', zIndex: 1,
      }}>
        <div className="container">
          <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'center', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontWeight: 700, color: '#FF9933' }}>VoteSmart AI</span>
            <span>•</span>
            <span>Powered by Gemini AI</span>
            <span>•</span>
            <a href="https://www.eci.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: '#138808', fontWeight: 500 }}>
              ECI Official
            </a>
          </div>
          <p style={{ maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
            This platform is for educational purposes. For official information, refer to the Election Commission of India.
          </p>
        </div>
      </footer>
    </div>
  );
}
