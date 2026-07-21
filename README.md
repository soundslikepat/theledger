[README.md](https://github.com/user-attachments/files/30243449/README.md)
# The Ledger

A personal contact database for three lists you're building:
- Post Production companies (US, then Europe)
- Indie record labels & management (hip-hop / metal-rock-grunge / electronic-house, US & Europe)
- Indie publishing companies with a JV or imprint at a major or mid-tier rights holder

It's one static page (`index.html`) plus one small Netlify Function (`netlify/functions/ledger.js`)
that reads and writes your data using **Netlify Blobs** — Netlify's built-in storage, no external
database needed.

## Deploy it

**Option A — drag and drop (fastest):**
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag this whole folder in
3. Done — Netlify builds the function automatically and gives you a live URL

**Option B — from a Git repo (better for ongoing edits):**
1. Push this folder to a new GitHub repo
2. In Netlify: **Add new site → Import an existing project** → pick the repo
3. Build settings are already set in `netlify.toml` — no changes needed
4. Deploy

Either way, no environment variables or extra setup are required — Netlify Blobs is
zero-configuration and is available automatically to functions running on your site.

## How your data is stored

Every add, edit, and delete calls `/.netlify/functions/ledger`, which reads/writes a single
JSON record in a Netlify Blobs store called `ledger`. That store lives on Netlify's
infrastructure, tied to your site — not your browser — so the data:
- persists across visits and devices
- survives new deploys (Blobs are site-scoped, not deploy-scoped)
- is only reachable through your site's own function endpoint

**One thing worth knowing:** as shipped, that endpoint isn't password-protected — anyone who
finds the URL and knows to call it directly could read or overwrite the data. For a personal
tool this is usually a fine trade-off, but if you want to lock it down, the simplest option is
turning on Netlify's site-wide password protection in **Site settings → Visitor access**.

## Local development

```
npm install
npx netlify dev
```

This runs the site and function together at `http://localhost:8888` with a local Blobs store,
so you can test changes before deploying.

## Exporting your data

The **Export CSV** buttons in the sidebar still work exactly as before — they pull whatever's
currently loaded in the browser and download it as a `.csv`, regardless of where the data lives.
