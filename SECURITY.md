# Security Policy — VoteSmart AI

## Supported Versions

| Version | Supported |
|---|---|
| 2.x (current) | ✅ Actively maintained |
| 1.x | ❌ No longer supported |

---

## Security Architecture

VoteSmart AI is a **client-side React SPA** with a **Google Cloud Functions** backend proxy. This design ensures:

### 1. API Key Protection
- The **Gemini AI API key is never exposed to the browser**
- All AI requests are proxied through Google Cloud Functions
- The key lives exclusively in the server-side environment variable (`GEMINI_API_KEY`)
- Even if someone inspects the browser's network requests, they will only see the Cloud Functions URL, never the API key

### 2. Content Security Policy (CSP)
Enforced via `<meta>` tag in `index.html`:
```
default-src 'self';
script-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://www.googletagmanager.com;
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src 'self' https://fonts.gstatic.com;
img-src 'self' data: https://lh3.googleusercontent.com;
connect-src 'self' https://firebase.googleapis.com https://www.googletagmanager.com;
```

### 3. XSS Prevention
- **Zero** `dangerouslySetInnerHTML` usage across all components
- All user inputs rendered via React's JSX (auto-escaped)
- Markdown-like formatting parsed manually with whitelist approach in `ChatAssistant.jsx`

### 4. Input Validation
- All user inputs trimmed and validated client-side before API submission
- Maximum message length enforced (500 chars for chat, 300 for myth checker)
- Myth checker input sanitized before sending to Gemini

### 5. Rate Limiting
- Cloud Functions enforces **30 AI requests per minute per IP**
- Prevents API abuse and cost escalation

### 6. CORS Policy
- Cloud Functions restricts `Access-Control-Allow-Origin` to whitelisted production domains only
- No wildcard CORS in production

### 7. HTTPS Enforcement
- Google Cloud Run automatically redirects all HTTP → HTTPS
- Strict Transport Security (HSTS) applied

### 8. Dependency Security
- Development dependencies (Vite/esbuild) have non-critical known vulnerabilities
- These **only affect the local dev server** and are NOT present in production builds
- `npm audit` is run before each production deployment

---

## Reporting a Vulnerability

If you discover a security vulnerability in VoteSmart AI, please **do NOT** open a public GitHub issue.

Instead, contact the maintainer directly:

**Maintainer:** Abhishek Kumar  
**GitHub:** [@xbhishekh](https://github.com/xbhishekh)

Please include:
1. Description of the vulnerability
2. Steps to reproduce
3. Potential impact
4. Suggested fix (if any)

We will respond within **72 hours** and provide a fix within **7 days** for critical issues.

---

## Security Best Practices for Deployers

If you fork or self-host VoteSmart AI:

1. **Never commit `.env` files** — use CI/CD environment variables
2. **Rotate API keys** periodically via Google Cloud Console
3. **Enable Cloud Armor** on Cloud Run for WAF protection
4. **Set up alerts** in Google Cloud Monitoring for anomalous usage
5. **Enable Firebase App Check** if adding Firebase Authentication
