# suryal.dev — Suryaprakash Lakshmanan

Personal site for **Suryaprakash Lakshmanan**, Staff Engineer, AI Enablement & Cloud.
Static site (vanilla HTML/CSS/JS, no build step), live at **https://suryal.dev**.

This is the revamped edition of the site: an editorial, content-first layout that
leads with outcomes, operating principles, open-source work, and writing.

## Structure

```
index.html       # home page
style.css        # design system + home page + shared header/footer
script.js        # header state, mobile navigation, footer year
articles/        # long-form articles (index.html is the listing)
articles.css     # article listing + reading styles (inherits tokens from style.css)
articles.js      # reading progress, category filter
images/          # article figures, social card
feed.xml         # RSS
sitemap.xml
robots.txt
CNAME            # custom domain for GitHub Pages (suryal.dev)
```

## Editing

- **Home page content** lives entirely in `index.html`. Sections: hero, selected work,
  operating principles, open source, writing, experience, expertise, contact.
- **Design tokens** (paper, ink, accent, type) are at the top of `style.css`. The
  article pages use the same tokens, so a palette change applies everywhere.
- **Adding an article**: copy an existing page in `articles/`, add a row to
  `articles/index.html`, the writing list in `index.html`, `feed.xml`, and `sitemap.xml`.

## Local preview

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Deployment

Hosted on **GitHub Pages** from the `main` branch (root). DNS for `suryal.dev` lives in
Cloudflare in "DNS only" mode so GitHub can issue and renew the TLS certificate:

| Type  | Name  | Value               |
|-------|-------|---------------------|
| A     | `@`   | `185.199.108.153`   |
| A     | `@`   | `185.199.109.153`   |
| A     | `@`   | `185.199.110.153`   |
| A     | `@`   | `185.199.111.153`   |
| CNAME | `www` | `suryals.github.io` |

GitHub Pages → Enforce HTTPS: on.
