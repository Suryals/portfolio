#!/bin/bash

# Portfolio Validator Script
echo "🚀 AI Engineer Portfolio Validation"

cd /Users/surya/ai-engineer-portfolio

echo "📋 Checking file structure..."
files=("index.html" "style.css" "script.js" "enhanced.css" "README.md")
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        size=$(wc -c < "$file")
        echo "✅ $file ($size bytes)"
    else
        echo "❌ $file MISSING"
    fi
done

echo ""
echo "🔍 Validating HTML syntax..."
if grep -q "<!DOCTYPE html>" index.html; then
    echo "✅ HTML5 DOCTYPE present"
fi

if grep -q "</html>" index.html; then
    echo "✅ HTML closing tag present"
fi

echo ""
echo "🎨 Checking CSS files..."
if grep -q ":root" style.css; then
    echo "✅ CSS variables defined"
fi

if grep -q "@media" style.css; then
    echo "✅ Responsive media queries present"
fi

echo ""
echo "⚡ Validating JavaScript..."
if grep -q "DOMContentLoaded" script.js; then
    echo "✅ DOM ready handler present"
fi

if grep -q "addEventListener" script.js; then
    echo "✅ Event listeners present"
fi

echo ""
echo "📊 File sizes:"
total_size=0
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        size=$(wc -c < "$file")
        total_size=$((total_size + size))
    fi
done

kb_total=$((total_size / 1024))
mb_total=$((total_size / 1048576))

if [ $kb_total -lt 1 ]; then
    echo "📦 Total portfolio size: ${total_size} bytes (~0.0${total_size} MB)"
else
    echo "📦 Total portfolio size: ${kb_total} KB (~${mb_total}.${total_size % 1024} MB)"
fi

echo ""
echo "✅ Portfolio validation complete!"
echo ""
echo "🌐 To view your portfolio:"
echo "   1. Open index.html in any web browser"
echo "   2. Or run: open index.html"
echo ""
echo "🎯 Next steps:"
echo "   - Customize the content in index.html"
echo "   - Update colors in style.css (search for --accent-ai)"
echo "   - Add your real project information"
echo "   - Deploy to GitHub Pages, Netlify, or Vercel"
