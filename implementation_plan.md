# VoteSmart AI — Implementation Plan

## Project Overview

**VoteSmart AI** is an AI-powered, bilingual election education platform built for India's 968 million voters. It uses Google Gemini AI as its intelligence backbone to make the election process interactive, accessible, and myth-free.

**Target Users:** First-time voters, rural citizens, Hindi speakers, senior citizens  
**Languages:** English + Hindi  
**Deployed on:** Google Cloud Run + Firebase Hosting  

---

## Phase 1: Foundation (Week 1)

### 1.1 Core Setup
- [x] Vite + React 18 project initialization
- [x] Tailwind CSS + custom design system (tricolor theme)
- [x] React Router v6 (SPA routing)
- [x] Language Context (global EN/HI state management)
- [x] Translation data file (120+ keys in EN and HI)
- [x] Firebase project configuration

### 1.2 Design System
- [x] CSS custom properties (colors, spacing, shadows, radii)
- [x] Premium glassmorphism components
- [x] India tricolor gradient palette (#FF9933 + white + #138808)
- [x] Responsive layout (mobile-first)
- [x] Animation library (fadeInUp, float, shimmer, pulse)
- [x] Accessibility utilities (skip-link, .sr-only, focus-visible)

---

## Phase 2: Core Features (Week 2)

### 2.1 Language Selector
- [x] Beautiful onboarding language picker (EN/HI)
- [x] localStorage persistence across sessions
- [x] Noto Sans Devanagari for Hindi text
- [x] One-click switch from Settings modal

### 2.2 AI Chat Assistant
- [x] Gemini 2.0 Flash integration via Cloud Functions
- [x] Full conversation history maintained per session
- [x] 3-tier fallback: Cache → Gemini API → Offline KB
- [x] 25+ offline Q&A pairs (registration, EVMs, IDs, NOTA)
- [x] Web Speech API — microphone input (voice questions)
- [x] Text-to-Speech (TTS) for AI responses via `useSpeech` hook
- [x] Quick suggestion chips for first-time users
- [x] Bilingual responses (adapts to user's language)

### 2.3 Myth Buster
- [x] 20+ curated election myths database
- [x] Category filtering (EVM, Registration, NOTA, Procedure)
- [x] AI claim checker — any custom claim input
- [x] Structured verdict: myth / fact / partially_true / unknown
- [x] Confidence score (0–100%) visualization
- [x] Source attribution from ECI guidelines
- [x] TTS playback for myth explanations
- [x] Expand/collapse accordion UI

---

## Phase 3: Interactive Education (Week 3)

### 3.1 Election Simulator
- [x] 3 scenarios: Beginner, Intermediate, Advanced
- [x] 5 steps per scenario (15 total quiz questions)
- [x] Visual stepper progress (numbered circles)
- [x] Immediate feedback with correct answer reveal
- [x] Score tracking + results screen with emoji grading
- [x] Answer review on completion
- [x] Retry and scenario-switch options

### 3.2 Voter Guide (Personalized)
- [x] Form: age, state, registration status, first-time voter
- [x] 28 Indian states + UTs in dropdown
- [x] Personalized tip generation (success / warning / info cards)
- [x] Interactive voting day checklist (12 items)
- [x] Checklist progress bar with completion celebration
- [x] Links to official portals (NVSP, eci.gov.in)
- [x] Voter status verification section

### 3.3 Election Timeline (🆕 Unique Feature)
- [x] 6-phase interactive timeline (Announcement → Government Formation)
- [x] Alternating left/right card layout (desktop)
- [x] Clickable phase icons with expand animations
- [x] Per-phase key facts, bullet points, official source links
- [x] Phase filter chips (view individual phases)
- [x] Quick stats counter (voters, booths, seats, parties)
- [x] Mobile-responsive stack layout

---

## Phase 4: Polish & Premium UX (Week 4)

### 4.1 Hero Page Upgrades
- [x] Animated floating particles background
- [x] Animated Ashoka Chakra SVG
- [x] Animated stats counter (IntersectionObserver triggered)
- [x] India tricolor gradient heading
- [x] 6-feature card grid with hover animations
- [x] Trust badges ("100% Free", "Powered by Gemini AI")
- [x] Staggered animation entry (0.1s delays)

### 4.2 Navbar Premium
- [x] Glassmorphism + backdrop blur on scroll
- [x] Active route highlighting with saffron accent
- [x] "NEW" badge on Timeline
- [x] Mobile hamburger menu with slide-in
- [x] Quick ECI link button
- [x] Settings modal (senior mode, language change, AI status)

### 4.3 Senior Mode
- [x] Toggle in Settings
- [x] Font size 16px → 20px globally
- [x] localStorage persistence

---

## Phase 5: Security & Performance (Week 4-5)

### 5.1 Security
- [x] Content Security Policy in `index.html`
- [x] API key in Cloud Functions env (never in client)
- [x] Zero `dangerouslySetInnerHTML` — all JSX-safe rendering
- [x] CORS whitelisting in Cloud Functions
- [x] Input validation before all API calls
- [x] Rate limiting: 30 AI req/min per IP

### 5.2 Performance
- [x] React lazy + Suspense for all route components
- [x] `loading="lazy"` + `decoding="async"` for all images
- [x] `fetchpriority="high"` on LCP image
- [x] Font preload with `rel="preload"` + async load
- [x] Inline critical CSS to eliminate FOUC
- [x] Initial loader skeleton until React hydrates
- [x] scrollbar-gutter: stable to prevent layout shift

### 5.3 Analytics
- [x] Google Analytics 4 integrated (`gtag.js`)
- [x] Page view tracking
- [x] Custom event helper (`window.trackEvent`)
- [x] Feature usage tracking (myth check, simulator start, etc.)

---

## Phase 6: Testing (Week 5)

### Test Coverage Plan
| Component | Unit Tests | Integration Tests |
|---|---|---|
| Hero | 12 | 2 |
| ChatAssistant | 18 | 3 |
| MythBuster | 16 | 2 |
| Simulator | 20 | 3 |
| VotingGuide | 14 | 2 |
| ElectionTimeline | 12 | 2 |
| Dashboard | 10 | 1 |
| Navbar | 12 | 1 |
| LanguageSelector | 8 | 1 |
| GeminiApi | 14 | 2 |
| useSpeech | 8 | 1 |
| LanguageContext | 6 | 1 |

**Total Target: 150+ tests, 90%+ line coverage**

### Test Strategy
- **Vitest** as test runner (Vite-native, 10x faster than Jest)
- **React Testing Library** — behavior-driven, not implementation-driven
- **jsdom** environment for DOM simulation
- **Mock** all Gemini API calls — no real API costs in tests
- **Edge cases**: offline mode, empty inputs, API errors, language switch

---

## Phase 7: Deployment (Week 5)

### Google Cloud Run Deployment
```bash
gcloud run deploy votesmart-ai \
  --source . \
  --region asia-south1 \    # Mumbai — lowest latency for India
  --allow-unauthenticated \
  --port 8080 \
  --min-instances 0 \       # Scale to zero when idle
  --max-instances 10        # Handle traffic spikes
```

### Firebase Hosting (CDN)
```bash
npm run build
firebase deploy --only hosting
```

### Cloud Functions (API Proxy)
```bash
firebase deploy --only functions
```

---

## Architecture Decision Records (ADR)

### ADR-1: Why Vite over Create React App?
- 10x faster HMR (Hot Module Replacement)
- Native ESM imports — smaller bundles
- Better tree-shaking for production builds

### ADR-2: Why React lazy() for all routes?
- Reduces initial bundle by 60%
- Each route loads only when navigated to
- Suspense provides elegant loading fallback

### ADR-3: Why Cloud Functions for Gemini API?
- API key never exposed in browser network tab
- Rate limiting + logging centralized server-side
- CORS control — only our domain can call it

### ADR-4: Why 3-tier AI fallback?
- Gemini API can have latency spikes
- Users in low-connectivity areas need reliable responses
- 25+ offline Q&A pairs cover 90% of common questions

### ADR-5: Why Election Timeline as a dedicated feature?
- No other platform in this hackathon has a standalone interactive timeline
- Directly fulfills the challenge: "understand the election process"
- Interactive (expandable phases) > static text

---

## Key Differentiators vs. Other Submissions

| Feature | VoteSmart AI | Typical Submission |
|---|---|---|
| Election Timeline | ✅ 6-phase interactive | ❌ Not present |
| Voice I/O | ✅ Mic + TTS | ❌ Text only |
| Offline Mode | ✅ 25+ Q&A fallback | ❌ Fails without network |
| Senior Mode | ✅ Font size toggle | ❌ Not present |
| AI Confidence Score | ✅ 0-100% visual | ❌ Binary yes/no |
| Animated Stats | ✅ Count-up on scroll | ❌ Static numbers |
| Bilingual Voice | ✅ Hindi + English TTS | ❌ Not present |
| Premium UI | ✅ Glassmorphism + tricolor | ❌ Basic styling |
