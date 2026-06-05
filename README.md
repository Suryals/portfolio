# suryal.dev — Suryaprakash Lakshmanan

Personal portfolio for **Suryaprakash Lakshmanan**, Staff AI Platform & Cloud Engineer.
Single-page static site (vanilla HTML/CSS/JS, no build step), live at **https://suryal.dev**.

## Structure

```
index.html      # the entire page
style.css        # styles (editorial field-notes aesthetic)
script.js        # nav, scroll reveals, project filter
images/          # og-image, harness-mask, linkedin-posts/
CNAME            # custom domain for GitHub Pages (suryal.dev)
docs/            # reference notes (LinkedIn embed guides)
_archive/        # superseded earlier stylesheets
```

## Local preview

It's static — just open `index.html`, or serve it:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Deployment

Hosted on **GitHub Pages** from the `main` branch (root), repo
[`Suryals/portfolio`](https://github.com/Suryals/portfolio). Any push to `main`
redeploys automatically.

### Domain (suryal.dev, DNS on Cloudflare)

DNS lives in Cloudflare, **set to "DNS only" (grey cloud) — not proxied**, so GitHub
can serve and renew the TLS certificate. `.dev` is HSTS-preloaded, so HTTPS is mandatory.

| Type  | Name | Value                                              | Proxy    |
|-------|------|----------------------------------------------------|----------|
| A     | `@`  | `185.199.108.153`                                  | DNS only |
| A     | `@`  | `185.199.109.153`                                  | DNS only |
| A     | `@`  | `185.199.110.153`                                  | DNS only |
| A     | `@`  | `185.199.111.153`                                  | DNS only |
| CNAME | `www`| `suryals.github.io`                                | DNS only |

GitHub Pages → **Enforce HTTPS: on**. The cert (`CN=suryal.dev`) covers both the apex
and `www`; `www.suryal.dev` 301-redirects to the apex.

> Do **not** switch the records to proxied (orange cloud) — it breaks GitHub's cert
> issuance/renewal. The Cloudflare SSL/TLS "encryption mode" setting is irrelevant while
> records are DNS-only.

## Updating the site

Edit `index.html` / `style.css` / `script.js`, then:

```bash
git add -A && git commit -m "your message" && git push
```

Live within a minute or two. The `images/og-image.png` (1200×630) is the social-share card.
