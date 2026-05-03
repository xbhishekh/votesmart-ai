import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const timelineSteps = [
  {
    id: 1,
    phase: 'Announcement',
    phaseHi: 'घोषणा',
    icon: '📢',
    color: '#FF9933',
    gradient: 'linear-gradient(135deg, #FF9933, #FFB347)',
    title: 'Election Announcement',
    titleHi: 'चुनाव की घोषणा',
    duration: 'Day 1',
    durationHi: 'दिन 1',
    body: 'The Election Commission of India (ECI) announces the election schedule. The Model Code of Conduct (MCC) comes into effect immediately, restricting government actions and political parties.',
    bodyHi: 'भारत निर्वाचन आयोग (ECI) चुनाव कार्यक्रम की घोषणा करता है। आदर्श आचार संहिता (MCC) तुरंत लागू होती है।',
    facts: [
      { icon: '📋', text: 'Model Code of Conduct activated' },
      { icon: '🏛️', text: 'ECI takes full control of security forces' },
      { icon: '📰', text: 'Dates for nominations, voting & counting fixed' },
    ],
    factsHi: [
      { icon: '📋', text: 'आदर्श आचार संहिता लागू' },
      { icon: '🏛️', text: 'ECI सुरक्षा बलों का पूर्ण नियंत्रण' },
      { icon: '📰', text: 'नामांकन, मतदान और मतगणना की तिथियाँ' },
    ],
    link: 'https://eci.gov.in',
    keyFact: '543 Lok Sabha constituencies notified simultaneously',
    keyFactHi: '543 लोकसभा क्षेत्रों को एक साथ अधिसूचित किया जाता है',
  },
  {
    id: 2,
    phase: 'Nomination',
    phaseHi: 'नामांकन',
    icon: '📝',
    color: '#7B2FF7',
    gradient: 'linear-gradient(135deg, #7B2FF7, #F107A3)',
    title: 'Filing Nominations',
    titleHi: 'नामांकन दाखिल करना',
    duration: '~2 weeks',
    durationHi: '~2 सप्ताह',
    body: 'Candidates file nomination papers with the Returning Officer. They must submit security deposit (₹25,000 for general, ₹12,500 for SC/ST candidates). Nominations are then scrutinized for validity.',
    bodyHi: 'उम्मीदवार रिटर्निंग ऑफिसर के पास नामांकन पत्र दाखिल करते हैं। सामान्य के लिए ₹25,000 और SC/ST उम्मीदवारों के लिए ₹12,500 जमानत राशि।',
    facts: [
      { icon: '💰', text: '₹25,000 security deposit (General)' },
      { icon: '🔍', text: 'Scrutiny of nomination documents' },
      { icon: '❌', text: 'Last date for withdrawal of candidature' },
    ],
    factsHi: [
      { icon: '💰', text: '₹25,000 जमानत राशि (सामान्य)' },
      { icon: '🔍', text: 'नामांकन दस्तावेज़ों की जाँच' },
      { icon: '❌', text: 'उम्मीदवारी वापस लेने की अंतिम तिथि' },
    ],
    link: 'https://eci.gov.in/candidate',
    keyFact: 'Criminal background must be declared in affidavit',
    keyFactHi: 'आपराधिक पृष्ठभूमि हलफनामे में घोषित करना अनिवार्य',
  },
  {
    id: 3,
    phase: 'Campaign',
    phaseHi: 'प्रचार',
    icon: '📣',
    color: '#138808',
    gradient: 'linear-gradient(135deg, #138808, #38ef7d)',
    title: 'Election Campaign',
    titleHi: 'चुनाव प्रचार',
    duration: '3-4 weeks',
    durationHi: '3-4 सप्ताह',
    body: 'Candidates and parties campaign across constituencies. Campaign spending limits apply (₹95 lakh for Lok Sabha). All campaigns must stop 48 hours before polling — this is called "Silence Period".',
    bodyHi: 'उम्मीदवार और दल निर्वाचन क्षेत्रों में प्रचार करते हैं। लोकसभा के लिए खर्च सीमा ₹95 लाख है। मतदान से 48 घंटे पहले "मौन अवधि"।',
    facts: [
      { icon: '🚫', text: '48-hour "Silence Period" before polling' },
      { icon: '💸', text: '₹95 lakh spending limit per candidate' },
      { icon: '📱', text: 'Social media ads need ECI approval' },
    ],
    factsHi: [
      { icon: '🚫', text: 'मतदान से 48 घंटे पहले "मौन अवधि"' },
      { icon: '💸', text: 'प्रति उम्मीदवार ₹95 लाख खर्च सीमा' },
      { icon: '📱', text: 'सोशल मीडिया विज्ञापनों को ECI की मंजूरी' },
    ],
    link: 'https://eci.gov.in/mcc',
    keyFact: 'No voter inducements — cash, gifts or liquor distribution is illegal',
    keyFactHi: 'मतदाताओं को नकद, उपहार या शराब देना अवैध है',
  },
  {
    id: 4,
    phase: 'Polling Day',
    phaseHi: 'मतदान दिवस',
    icon: '🗳️',
    color: '#0077B6',
    gradient: 'linear-gradient(135deg, #0077B6, #00B4D8)',
    title: 'Voting Day',
    titleHi: 'मतदान दिवस',
    duration: '7 AM – 6 PM',
    durationHi: 'सुबह 7 – शाम 6 बजे',
    body: 'Voters go to their assigned polling booth. They verify their identity, get their finger inked with indelible ink, and press the EVM button for their chosen candidate. VVPAT provides a paper slip verification.',
    bodyHi: 'मतदाता अपने नियत बूथ पर जाते हैं। पहचान सत्यापन के बाद, उंगली पर स्याही लगाई जाती है और EVM बटन दबाया जाता है। VVPAT पर्ची से सत्यापन।',
    facts: [
      { icon: '🖊️', text: 'Indelible ink marks your left index finger' },
      { icon: '📟', text: 'EVM + VVPAT — tamper-proof voting system' },
      { icon: '🆔', text: '12 valid photo ID documents accepted' },
    ],
    factsHi: [
      { icon: '🖊️', text: 'बाईं तर्जनी पर अमिट स्याही' },
      { icon: '📟', text: 'EVM + VVPAT — छेड़छाड़ रोधी प्रणाली' },
      { icon: '🆔', text: '12 वैध फोटो पहचान पत्र स्वीकार्य' },
    ],
    link: 'https://eci.gov.in/voter-id',
    keyFact: 'EVMs have NO internet, Wi-Fi or Bluetooth — completely standalone',
    keyFactHi: 'EVM में कोई इंटरनेट, Wi-Fi या Bluetooth नहीं — पूरी तरह स्वतंत्र',
  },
  {
    id: 5,
    phase: 'Counting',
    phaseHi: 'मतगणना',
    icon: '🔢',
    color: '#FF6B6B',
    gradient: 'linear-gradient(135deg, #FF6B6B, #FF8E53)',
    title: 'Vote Counting',
    titleHi: 'मतगणना',
    duration: 'Counting Day',
    durationHi: 'मतगणना दिवस',
    body: 'EVMs are transported under heavy security to counting centers. Results are tallied round by round for each constituency. The winning candidate must secure the most votes (First-Past-The-Post system).',
    bodyHi: 'EVM को भारी सुरक्षा में मतगणना केंद्रों पर लाया जाता है। प्रत्येक निर्वाचन क्षेत्र के लिए दौर-दर-दौर परिणाम। सर्वाधिक मत पाने वाला उम्मीदवार विजयी।',
    facts: [
      { icon: '🔐', text: 'EVMs sealed with tamper-proof tags' },
      { icon: '👥', text: 'All party agents present during counting' },
      { icon: '📊', text: 'VVPAT cross-verification done for 5 booths/seat' },
    ],
    factsHi: [
      { icon: '🔐', text: 'EVM छेड़छाड़ रोधी टैग से सील' },
      { icon: '👥', text: 'मतगणना में सभी दलों के एजेंट' },
      { icon: '📊', text: 'प्रति सीट 5 बूथों पर VVPAT जाँच' },
    ],
    link: 'https://results.eci.gov.in',
    keyFact: 'Results declared within hours for all 543 seats',
    keyFactHi: 'सभी 543 सीटों के परिणाम घंटों में घोषित',
  },
  {
    id: 6,
    phase: 'Results',
    phaseHi: 'परिणाम',
    icon: '🏆',
    color: '#FFD700',
    gradient: 'linear-gradient(135deg, #f7971e, #ffd200)',
    title: 'Government Formation',
    titleHi: 'सरकार गठन',
    duration: 'Post-Results',
    durationHi: 'परिणाम के बाद',
    body: 'The President invites the leader of the majority party/coalition to form the government. The Prime Minister and Cabinet are sworn in. The new government begins its 5-year term.',
    bodyHi: 'राष्ट्रपति बहुमत दल/गठबंधन के नेता को सरकार बनाने का निमंत्रण देते हैं। प्रधानमंत्री और कैबिनेट शपथ लेते हैं। नई सरकार 5 साल का कार्यकाल शुरू करती है।',
    facts: [
      { icon: '🤝', text: '272+ seats needed for majority (Lok Sabha)' },
      { icon: '🏛️', text: 'President appoints Prime Minister' },
      { icon: '📅', text: '5-year government term begins' },
    ],
    factsHi: [
      { icon: '🤝', text: 'लोकसभा में बहुमत के लिए 272+ सीटें' },
      { icon: '🏛️', text: 'राष्ट्रपति प्रधानमंत्री की नियुक्ति' },
      { icon: '📅', text: '5 साल का सरकारी कार्यकाल' },
    ],
    link: 'https://pmindia.gov.in',
    keyFact: 'If no majority, President may invite coalition to prove majority via confidence vote',
    keyFactHi: 'यदि बहुमत नहीं, तो गठबंधन को विश्वासमत द्वारा बहुमत सिद्ध करना होगा',
  },
];

const quickFacts = [
  { icon: '🗓️', value: '44', label: 'Days min. between announcement & counting', labelHi: 'न्यूनतम दिन: घोषणा से मतगणना तक' },
  { icon: '🌍', value: '#1', label: 'Largest democratic election on earth', labelHi: 'पृथ्वी पर सबसे बड़ा लोकतांत्रिक चुनाव' },
  { icon: '👮', value: '4M+', label: 'Security personnel deployed', labelHi: 'तैनात सुरक्षा कर्मी' },
  { icon: '📱', value: '12', label: 'Valid ID documents for voting', labelHi: 'मतदान के लिए वैध पहचान पत्र' },
];

export default function ElectionTimeline() {
  const { language } = useLanguage();
  const [activeStep, setActiveStep] = useState(null);
  const [filter, setFilter] = useState('all');

  const isHi = language === 'hi';

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', paddingBottom: '80px' }}>

      {/* Hero Header */}
      <div style={{
        background: 'linear-gradient(135deg, #FF9933 0%, #fff 50%, #138808 100%)',
        padding: '60px 24px 40px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(2px)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(255,153,51,0.12)', border: '1.5px solid rgba(255,153,51,0.3)',
            padding: '6px 18px', borderRadius: '100px', marginBottom: '16px',
          }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#cc7700', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {isHi ? 'पूर्ण गाइड' : 'Complete Guide'}
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 900, color: '#1a1a2e', marginBottom: '12px' }}>
            {isHi ? '🇮🇳 भारतीय चुनाव समयरेखा' : '🇮🇳 Indian Election Timeline'}
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#4a4a6a', maxWidth: '560px', margin: '0 auto' }}>
            {isHi
              ? 'घोषणा से सरकार गठन तक — पूरी चुनाव प्रक्रिया का इंटरेक्टिव विवरण'
              : 'From announcement to government formation — the complete election process, explained interactively'}
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '48px' }}>

        {/* Quick Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '48px' }}>
          {quickFacts.map((fact, i) => (
            <div key={i} className="premium-card" style={{ padding: '24px', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{fact.icon}</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#FF9933', fontFamily: 'var(--font-heading)' }}>{fact.value}</div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.4 }}>
                {isHi ? fact.labelHi : fact.label}
              </p>
            </div>
          ))}
        </div>

        {/* Phase selector */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '40px', justifyContent: 'center' }}>
          <button
            onClick={() => setFilter('all')}
            className={`chip chip-saffron ${filter === 'all' ? 'active' : ''}`}
            id="filter-all"
          >
            {isHi ? 'सभी चरण' : 'All Phases'}
          </button>
          {timelineSteps.map(step => (
            <button
              key={step.id}
              onClick={() => setFilter(step.id.toString())}
              className={`chip ${filter === step.id.toString() ? 'active' : ''}`}
              style={{
                borderColor: step.color,
                color: filter === step.id.toString() ? 'white' : step.color,
                background: filter === step.id.toString() ? step.color : `${step.color}10`,
              }}
              id={`filter-phase-${step.id}`}
            >
              {step.icon} {isHi ? step.phaseHi : step.phase}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Center line */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: 0, bottom: 0,
            width: '3px',
            background: 'linear-gradient(180deg, #FF9933, #138808)',
            transform: 'translateX(-50%)',
            borderRadius: '4px',
          }} className="timeline-center-line" />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {timelineSteps
              .filter(s => filter === 'all' || filter === s.id.toString())
              .map((step, i) => {
                const isLeft = i % 2 === 0;
                const isActive = activeStep === step.id;

                return (
                  <div
                    key={step.id}
                    style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', position: 'relative', gap: '0' }}
                    id={`timeline-step-${step.id}`}
                  >
                    {/* Left content */}
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', paddingRight: '40px' }}>
                      {isLeft && (
                        <StepCard step={step} isHi={isHi} isActive={isActive} onToggle={() => setActiveStep(isActive ? null : step.id)} />
                      )}
                    </div>

                    {/* Center dot */}
                    <div style={{
                      position: 'relative', zIndex: 2, flexShrink: 0,
                      width: '60px', height: '60px',
                      borderRadius: '50%',
                      background: step.gradient,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '24px',
                      boxShadow: `0 0 0 4px white, 0 0 0 6px ${step.color}40`,
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                      transform: isActive ? 'scale(1.15)' : 'scale(1)',
                    }}
                      onClick={() => setActiveStep(isActive ? null : step.id)}
                    >
                      {step.icon}
                    </div>

                    {/* Right content */}
                    <div style={{ flex: 1, paddingLeft: '40px' }}>
                      {!isLeft && (
                        <StepCard step={step} isHi={isHi} isActive={isActive} onToggle={() => setActiveStep(isActive ? null : step.id)} />
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="premium-card" style={{
          marginTop: '60px',
          padding: '40px',
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(255,153,51,0.06), rgba(19,136,8,0.06))',
          border: '1.5px solid rgba(255,153,51,0.2)',
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🤖</div>
          <h2 style={{ fontWeight: 800, fontSize: '1.6rem', marginBottom: '10px' }}>
            {isHi ? 'कोई सवाल है?' : 'Still have questions?'}
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', maxWidth: '480px', margin: '0 auto 24px' }}>
            {isHi
              ? 'हमारा AI सहायक चुनाव प्रक्रिया के बारे में किसी भी सवाल का जवाब दे सकता है।'
              : 'Our AI assistant can answer any question about the election process in detail.'}
          </p>
          <a href="/chat" className="btn-primary" style={{ display: 'inline-flex', fontSize: '1rem', padding: '14px 32px' }}>
            🤖 {isHi ? 'AI से पूछें' : 'Ask AI Assistant'}
          </a>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .timeline-center-line { display: none; }
        }
      `}</style>
    </div>
  );
}

function StepCard({ step, isHi, isActive, onToggle }) {
  return (
    <div
      className="premium-card"
      style={{
        maxWidth: '440px',
        width: '100%',
        cursor: 'pointer',
        border: isActive ? `2px solid ${step.color}` : undefined,
        transition: 'all 0.3s',
      }}
      onClick={onToggle}
    >
      <div style={{ padding: '24px' }}>
        {/* Phase badge */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{
            display: 'inline-block', padding: '4px 12px', borderRadius: '100px',
            fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em',
            background: step.gradient, color: 'white',
          }}>
            Phase {step.id}: {isHi ? step.phaseHi : step.phase}
          </span>
          <span style={{ fontSize: '0.78rem', fontWeight: 600, color: step.color }}>
            {isHi ? step.durationHi : step.duration}
          </span>
        </div>

        {/* Title */}
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '10px', color: 'var(--text-primary)' }}>
          {isHi ? step.titleHi : step.title}
        </h3>

        {/* Body */}
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '12px' }}>
          {isHi ? step.bodyHi : step.body}
        </p>

        {/* Key fact */}
        <div style={{
          background: `${step.color}10`, border: `1px solid ${step.color}30`,
          borderRadius: '10px', padding: '10px 14px', marginBottom: isActive ? '16px' : '0',
          fontSize: '0.82rem', color: step.color, fontWeight: 600,
        }}>
          💡 {isHi ? step.keyFactHi : step.keyFact}
        </div>

        {/* Expanded facts */}
        {isActive && (
          <div className="animate-fade-in" style={{ marginTop: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              {(isHi ? step.factsHi : step.facts).map((fact, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', background: '#f9fafb', borderRadius: '10px' }}>
                  <span style={{ fontSize: '1.2rem' }}>{fact.icon}</span>
                  <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>{fact.text}</span>
                </div>
              ))}
            </div>
            <a
              href={step.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '8px 16px', background: step.gradient, color: 'white',
                borderRadius: '100px', fontSize: '0.82rem', fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              {isHi ? 'आधिकारिक स्रोत' : 'Official Source'} →
            </a>
          </div>
        )}

        {/* Expand indicator */}
        <div style={{ textAlign: 'center', marginTop: '8px', color: step.color, fontSize: '0.78rem', fontWeight: 600 }}>
          {isActive ? (isHi ? '▲ कम दिखाएं' : '▲ Show Less') : (isHi ? '▼ अधिक देखें' : '▼ Learn More')}
        </div>
      </div>
    </div>
  );
}
