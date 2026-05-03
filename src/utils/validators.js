/**
 * @fileoverview Input validation utilities for VoteSmart AI
 * @module validators
 * @author Abhishek Kumar
 */

import { LIMITS } from '../constants/index.js';

/**
 * Validates a chat message before sending to AI
 * @param {string} message - The user's message
 * @returns {{ valid: boolean, error: string|null }} Validation result
 */
export function validateChatMessage(message) {
  if (!message || typeof message !== 'string') {
    return { valid: false, error: 'Message is required' };
  }
  const trimmed = message.trim();
  if (trimmed.length === 0) {
    return { valid: false, error: 'Message cannot be empty' };
  }
  if (trimmed.length > LIMITS.CHAT_MESSAGE_MAX) {
    return { valid: false, error: `Message must be under ${LIMITS.CHAT_MESSAGE_MAX} characters` };
  }
  return { valid: true, error: null };
}

/**
 * Validates a myth/claim input before sending to AI
 * @param {string} claim - The claim to verify
 * @returns {{ valid: boolean, error: string|null }} Validation result
 */
export function validateMythClaim(claim) {
  if (!claim || typeof claim !== 'string') {
    return { valid: false, error: 'Claim is required' };
  }
  const trimmed = claim.trim();
  if (trimmed.length < LIMITS.SEARCH_MIN) {
    return { valid: false, error: `Claim must be at least ${LIMITS.SEARCH_MIN} characters` };
  }
  if (trimmed.length > LIMITS.MYTH_CLAIM_MAX) {
    return { valid: false, error: `Claim must be under ${LIMITS.MYTH_CLAIM_MAX} characters` };
  }
  return { valid: true, error: null };
}

/**
 * Sanitizes user input by trimming and removing control characters
 * @param {string} input - Raw user input
 * @returns {string} Sanitized input string
 */
export function sanitizeInput(input) {
  if (!input || typeof input !== 'string') return '';
  // Remove control characters, keep Unicode (Hindi/Devanagari safe)
  return input.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '').trim();
}

/**
 * Validates a language code
 * @param {string} lang - Language code to validate
 * @returns {boolean} True if valid ('en' or 'hi')
 */
export function isValidLanguage(lang) {
  return lang === 'en' || lang === 'hi';
}

/**
 * Validates voter status form data
 * @param {{ name: string, state: string }} formData - Form data to validate
 * @returns {{ valid: boolean, errors: Object }} Validation result with per-field errors
 */
export function validateVoterStatusForm(formData) {
  const errors = {};
  if (!formData.name || formData.name.trim().length < 2) {
    errors.name = 'Please enter your full name (min 2 characters)';
  }
  if (!formData.state) {
    errors.state = 'Please select your state';
  }
  return { valid: Object.keys(errors).length === 0, errors };
}
