# Contributing to VoteSmart AI

Thank you for your interest in contributing to **VoteSmart AI**! This guide explains how to set up the project, follow our coding standards, and submit changes.

---

## 🚀 Getting Started

```bash
git clone https://github.com/xbhishekh/votesmart-ai.git
cd votesmart-ai
npm install
npm run dev
```

---

## 📐 Code Standards

### Style Guide
- **Formatting**: Prettier (2-space indent, single quotes, semicolons)
- **Linting**: ESLint with `jsx-a11y` and `react-hooks` plugins (run `npm run lint`)
- **Naming**: camelCase for variables/functions, PascalCase for components

### JSDoc Requirements
All exported functions **must** have JSDoc comments:

```javascript
/**
 * Brief description of what the function does.
 * @param {string} message - Description of the parameter
 * @param {'en'|'hi'} [language='en'] - Optional param with default
 * @returns {Promise<{text: string}>} What it returns
 * @example
 * const result = await myFunction('hello', 'hi');
 */
export async function myFunction(message, language = 'en') { ... }
```

### Component Template
```jsx
/**
 * @component MyComponent
 * @description Brief description of what this component does
 * @param {Object} props
 * @param {string} props.title - The title to display
 * @returns {JSX.Element}
 */
export default function MyComponent({ title }) {
  return <div>{title}</div>;
}
```

---

## 🧪 Testing

All new features **must** include tests:

```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

- Write tests in `src/components/__tests__/` using **Vitest** + **React Testing Library**
- Test behavior, not implementation details
- Mock all API calls — no real API costs in tests
- Target: **90%+ line coverage** for new code

---

## ♿ Accessibility Requirements

All UI components must:
- Have semantic HTML (`<button>`, `<nav>`, `<main>`, etc.)
- Include `aria-label` on all interactive elements
- Support keyboard navigation (Tab, Enter, Escape)
- Pass `jsx-a11y` ESLint rules

---

## 📁 Project Structure

```
src/
├── components/     # UI components (each with a matching .test.jsx)
├── constants/      # All app constants (no magic strings/numbers)
├── contexts/       # React contexts (LanguageContext)
├── data/           # Static data (myths, translations, simulator steps)
├── hooks/          # Custom React hooks
├── services/       # API service layer (apiService.js)
├── utils/          # Utility functions (geminiApi, validators)
└── test/           # Test setup files
```

---

## 🔀 Branching Strategy

- `main` — Production-ready code only (single branch for hackathon)
- All commits must be meaningful: `feat:`, `fix:`, `test:`, `docs:`, `chore:`

---

## 📝 Pull Request Checklist

- [ ] All tests pass (`npm test`)
- [ ] No ESLint errors (`npm run lint`)
- [ ] JSDoc added for all new exports
- [ ] Bilingual text added (both EN and HI) for any new UI strings
- [ ] ARIA labels on all new interactive elements
- [ ] `SECURITY.md` updated if adding new API integrations

---

## 👤 Maintainer

**Abhishek Kumar** — [@xbhishekh](https://github.com/xbhishekh)
