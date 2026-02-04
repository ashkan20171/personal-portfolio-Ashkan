# Ashkan Static Site (EN default) — Blog CMS + AI Chatbot

## Default language
- English (LTR) is default.
- Users can switch to FA; preference is stored in `localStorage`.

## Blog (CMS)
This project includes **Decap CMS** (formerly Netlify CMS) at `/admin/`.

### Recommended deployment
1. Deploy on **Netlify**
2. Enable **Identity** + **Git Gateway**
3. Visit: `/admin/` and login
4. Edit content:
   - Blog posts: `assets/data/blog.json`
   - Certificates: `assets/data/certificates.json`
   - Chatbot KB: `assets/data/chatbot_kb.json`

> Note: CMS writes to your Git repo. For local testing you can enable `local_backend: true` in `admin/config.yml`.

## AI Chatbot
Frontend calls `/.netlify/functions/chat`.

### Setup
In Netlify dashboard set environment variables:
- `OPENAI_API_KEY` (required)
- `OPENAI_MODEL` (optional, default: `gpt-4o-mini`)

If the AI endpoint is not available, the chatbot automatically falls back to the local KB (`assets/data/chatbot_kb.json`).

## Local run
Because this site loads JSON with `fetch()`, run via a local server (not `file://`):
- VS Code Live Server
- or: `python -m http.server 8080`

Then open: `http://localhost:8080/`
"# personal-portfolio-Ashkan" 
