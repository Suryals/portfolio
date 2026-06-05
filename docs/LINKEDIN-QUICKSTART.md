# LinkedIn Post Embedding - Quick Start Guide

## Summary
For embedding LinkedIn posts in your Apple-inspired portfolio, use the **Screenshot + Link Method** - it's most reliable and matches your clean design aesthetic.

## Files Created
- `README-LINKEDIN-EMBED.md` - Complete guide with all 3 methods
- `linkedin-post-examples.html` - Working HTML examples to copy
- `images/linkedin-posts/` - Directory for your screenshots

## Implementation (3 Steps)

### 1. Take Screenshots
Capture your LinkedIn posts and save in `images/linkedin-posts/`

### 2. Add HTML to index.html (Thought Leadership section)
```html
<article class="article-card linkedin-post">
    <div class="linkedin-preview">
        <img src="images/linkedin-posts/your-post.png" alt="LinkedIn Post">
    </div>
    <span class="date">2025-06</span>
    <h3>Your Post Title</h3>
    <p>Short description...</p>
    <div class="linkedin-meta">
        <span>👍 243 Likes</span>
        <span>💬 45 Comments</span>
    </div>
    <a href="YOUR_LINKEDIN_URL" class="read-more">View on LinkedIn →</a>
</article>
```

### 3. CSS Already Added
The styles in `style.css` are already updated with LinkedIn post support.

## Files Reference

### README-LINKEDIN-EMBED.md
Complete guide with:
- Method 1: Screenshot + Link (RECOMMENDED)
- Method 2: LinkedIn Official Embed
- Method 3: Responsive Iframe
- Full code examples for each method

### linkedin-post-examples.html
Ready-to-use HTML snippets:
- LinkedIn Post Card (Method 1)
- LinkedIn Custom Component
- LinkedIn Iframe Embed

## Directory Structure
```
ai-engineer-portfolio/
├── index.html              (add LinkedIn cards here)
├── style.css               (LinkedIn styles already added ✅)
├── README-LINKEDIN-EMBED.md
├── linkedin-post-examples.html
└── images/
    └── linkedin-posts/     (save your screenshots here)
```

## Next Steps
1. Create screenshots of your LinkedIn posts
2. Save them in `images/linkedin-posts/`
3. Copy HTML from `linkedin-post-examples.html` into your `index.html`
4. Test by opening in browser

## Recommendation
Use **Method 1 (Screenshot + Link)** because:
- ✅ Matches Apple-inspired design
- ✅ No JavaScript dependencies
- ✅ Faster loading
- ✅ Works everywhere
- ✅ Full control over presentation
