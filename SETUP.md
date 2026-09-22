# New Project Setup

## 1. Copy this folder
```bash
cp -r ~/site-template ~/new-project-name
cd ~/new-project-name
```

## 2. Find & replace these placeholders

| Placeholder | Replace with | Files |
|---|---|---|
| `COMPANY NAME` | Your company name | All HTML files, sitemap.xml |
| `YOURDOMAIN.com` | Your actual domain | All HTML files, robots.txt, sitemap.xml |
| `800-000-0000` | Company phone number | index.html, login.html, register.html, verify.html |
| `support@YOURDOMAIN.com` | Company email | index.html, login.html, register.html, verify.html |
| `CHANGE-ME` | Project slug (no spaces) | wrangler.toml, package.json |

## 3. Add your assets
Drop these into `public/assets/`:
- `logo.jpeg` — company logo
- `carousel-1.jpg` — homepage hero image 1
- `carousel-2.jpg` — homepage hero image 2

## 4. Customize colors
Edit CSS variables in `public/css/styles.css` (line ~9):
```css
:root {
  --maroon: #850025;      /* primary brand color */
  --maroon-dark: #70001e;  /* hover state */
  --pink: #e81e63;         /* search button */
  /* ... etc */
}
```

## 5. Install & deploy
```bash
npm install
```

### Cloudflare Pages setup:
1. Create new Pages project in Cloudflare dashboard
2. Connect your GitHub repo OR use direct upload
3. Set build output: `public`
4. Add environment variables:
   - `DATABASE_URL` — Neon Postgres connection string
   - `TELEGRAM_BOT_TOKEN` — comma-separated bot tokens
   - `TELEGRAM_CHAT_ID` — comma-separated chat IDs
   - `CRON_SECRET` — random string for auto-decline endpoint

### Telegram webhook:
```
https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://YOURDOMAIN.com/api/telegram/webhook
```

### IndexNow (Bing instant indexing):
1. Generate a key at https://www.bing.com/indexnow
2. Save key file as `public/<key>.txt`
3. Submit: POST to `https://api.indexnow.org/indexnow` with your URLs

### Cloudflare WAF rule (for crawler access):
- Rule: `Known Bots = true` → Action: `Skip` (all security)

## 6. Git init
```bash
git init
git add .
git commit -m "Initial setup"
```

## File structure
```
project/
├── public/                  # Static files (served by Cloudflare Pages)
│   ├── index.html           # Homepage
│   ├── login.html           # Login page
│   ├── register.html        # Registration page
│   ├── verify.html          # 2FA verification flow
│   ├── dashboard.html       # Admin control panel
│   ├── robots.txt           # Crawler rules
│   ├── sitemap.xml          # SEO sitemap
│   ├── css/styles.css       # All styles
│   ├── js/main.js           # Homepage carousel/interactions
│   └── assets/              # Logo, images
├── functions/               # Cloudflare Pages Functions (serverless API)
│   ├── _db.js               # Neon DB connection
│   ├── _telegram.js         # Telegram notifications (fancy format)
│   ├── _middleware.js       # IP/referrer gates (disabled by default)
│   └── api/
│       ├── tasks.js          # POST new task, GET all tasks
│       ├── tasks/[id].js     # GET/PATCH single task
│       ├── telegram/webhook.js  # Telegram approve/deny callbacks
│       └── cron/auto-decline-tasks.js  # Auto-decline expired tasks
├── wrangler.toml            # Cloudflare config
├── package.json
└── .gitignore
```
