/**
 * @fileoverview Application-wide constants for VoteSmart AI
 * @module constants
 * @author Abhishek Kumar
 */

/** Supported application languages */
export const LANGUAGES = /** @type {const} */ ({
  ENGLISH: 'en',
  HINDI: 'hi',
});

/** localStorage keys */
export const STORAGE_KEYS = /** @type {const} */ ({
  LANGUAGE: 'votesmart_language',
  SENIOR_MODE: 'votesmart_senior_mode',
  SIMULATOR_PROGRESS: 'votesmart_simulator_progress',
  CHAT_HISTORY: 'votesmart_chat_history',
});

/** API endpoints (relative to /api) */
export const API_ENDPOINTS = /** @type {const} */ ({
  CHAT: '/chat',
  MYTH: '/myth',
  SPEAK: '/speak',
  HEALTH: '/health',
});

/** AI response sources */
export const AI_SOURCES = /** @type {const} */ ({
  AI: 'ai',
  OFFLINE: 'offline',
  CACHE: 'cache',
});

/** Myth verdict types */
export const VERDICTS = /** @type {const} */ ({
  MYTH: 'myth',
  FACT: 'fact',
  PARTIALLY_TRUE: 'partially_true',
  UNKNOWN: 'unknown',
});

/** Simulator scenario IDs */
export const SCENARIOS = /** @type {const} */ ({
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
});

/** ECI official resources */
export const ECI_LINKS = /** @type {const} */ ({
  MAIN: 'https://www.eci.gov.in',
  NVSP: 'https://www.nvsp.in',
  VOTER_HELPLINE: 'https://www.nvsp.in/voter-helpline',
  FORM_6: 'https://www.nvsp.in/Form/form6',
});

/** Google Analytics event categories */
export const GA_CATEGORIES = /** @type {const} */ ({
  SIMULATOR: 'simulator',
  MYTH_BUSTER: 'myth_buster',
  CHAT: 'chat',
  GUIDE: 'guide',
  TIMELINE: 'timeline',
  ACCESSIBILITY: 'accessibility',
});

/** App metadata */
export const APP_META = /** @type {const} */ ({
  NAME: 'VoteSmart AI',
  TAGLINE: 'Learn • Play • Verify',
  VERSION: '2.0.0',
  AUTHOR: 'Abhishek Kumar',
  GITHUB: 'https://github.com/xbhishekh/votesmart-ai',
  VOTERS_COUNT: '96.8 Cr',
  BOOTHS_COUNT: '10.5 Lakh',
  PHASES_COUNT: '7',
  PARTIES_COUNT: '2293',
});

/** UI timing constants (ms) */
export const TIMING = /** @type {const} */ ({
  ANIMATION_DELAY_BASE: 100,
  STATS_ANIMATION_DURATION: 2000,
  VOTER_STATUS_DELAY: 1500,
  TOAST_DURATION: 3000,
  DEBOUNCE_DELAY: 300,
});

/** Input limits */
export const LIMITS = /** @type {const} */ ({
  CHAT_MESSAGE_MAX: 500,
  MYTH_CLAIM_MAX: 300,
  SEARCH_MIN: 3,
  HISTORY_MAX: 50,
});
