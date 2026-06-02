import fs from 'fs';
import path from 'path';
import { BLOG_POSTS } from './src/data';

// Determine dist directory
const distDir = path.resolve(process.cwd(), 'dist');
const indexHtmlPath = path.resolve(distDir, 'index.html');

console.log("[POST-BUILD] Starting auto pre-rendering for SEO and Pinterest compatibility...");

if (!fs.existsSync(indexHtmlPath)) {
  console.error("[POST-BUILD] ERR: No dist/index.html found! Run index.html build first.");
  process.exit(1);
}

const originalHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

// Ensure dist/blog directory exists
const blogListDir = path.join(distDir, 'blog');
if (!fs.existsSync(blogListDir)) {
  fs.mkdirSync(blogListDir, { recursive: true });
}

// Copy primary index to dist/blog/index.html for general /blog fallback
fs.copyFileSync(indexHtmlPath, path.join(blogListDir, 'index.html'));

// Generate a physical folder/index.html mirror for each blog post
for (const post of BLOG_POSTS) {
  const postDir = path.join(distDir, 'blog', post.slug);
  if (!fs.existsSync(postDir)) {
    fs.mkdirSync(postDir, { recursive: true });
  }

  // Define SEO parameters for this specific post
  const postTitle = `${post.title} | AI Income for Women | TechWithKathim`;
  const postDesc = post.excerpt;
  const postUrl = `https://linkamarket.co.tz/blog/${post.slug}`;
  const postImg = post.image;

  // Build elegant pre-rendered fallback markup so social crawlers (Pinterest, Googlebot)
  // receive structured semantic content instantly on land, with proper styles.
  const staticBlogHtml = `
    <header style="padding: 1.5rem; max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(0,0,0,0.05); font-family: sans-serif;">
      <a href="/" style="color: #F43F8F; text-decoration: none; font-size: 1.5rem; font-weight: bold;">LinkaMarket</a>
      <nav style="display: flex; gap: 1.5rem; font-weight: bold;">
        <a href="/#products" style="color: #2D2D2D; text-decoration: none;">Products</a>
        <a href="/#free-guide" style="color: #2D2D2D; text-decoration: none;">Free Guide</a>
        <a href="/#blog" style="color: #2D2D2D; text-decoration: none;">Blog</a>
      </nav>
    </header>
    
    <main style="max-width: 800px; margin: 3rem auto; padding: 0 1.5rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #2D2D2D; line-height: 1.8;">
      <a href="/" style="color: #F43F8F; text-decoration: none; font-weight: bold; font-size: 0.9rem;">← Back to Home</a>
      <h1 style="font-size: 2.5rem; color: #1A1A2E; margin: 1.5rem 0 1rem 0; line-height: 1.25; font-family: Georgia, serif;">${post.title}</h1>
      <div style="color: #666; font-size: 0.9rem; margin-bottom: 2rem;">Published: ${post.date} • ${post.readTime}</div>
      
      <img src="${post.image}" alt="${post.title}" style="width: 100%; max-height: 400px; object-fit: cover; border-radius: 1.5rem; margin-bottom: 2.5rem; box-shadow: 0 10px 30px rgba(0,0,0,0.05);" />
      
      <p style="font-size: 1.25rem; font-style: italic; color: #4F4F4F; border-left: 4px solid #F43F8F; padding-left: 1.25rem; margin-bottom: 2.5rem; line-height: 1.6; font-family: Georgia, serif;">${post.intro}</p>
      
      <div class="article-content">
        ${post.sections.map(sec => {
          if (sec.type === 'h2') {
            return `<h2 style="font-size: 1.8rem; color: #1A1A2E; margin-top: 2.5rem; margin-bottom: 1rem; font-family: Georgia, serif;">${sec.text}</h2>`;
          } else if (sec.type === 'h3') {
            return `<h3 style="font-size: 1.4rem; color: #1A1A2E; margin-top: 2rem; margin-bottom: 0.75rem; font-family: Georgia, serif;">${sec.text}</h3>`;
          } else if (sec.type === 'p') {
            return `<p style="margin-bottom: 1.5rem; font-size: 1.1rem; color: #4F4F4F; font-weight: 300;">${sec.text}</p>`;
          } else if (sec.type === 'quote') {
            return `<blockquote style="border-left: 5px solid #F43F8F; padding-left: 1.5rem; font-style: italic; color: #1A1A2E; font-size: 1.25rem; margin: 2.5rem 0; font-family: Georgia, serif;">"${sec.text}"</blockquote>`;
          } else if (sec.type === 'list') {
            const listItems = (sec.items || []).map(item => `<li style="margin-bottom: 0.75rem; font-size: 1.1rem; color: #4F4F4F;">✓ ${item}</li>`).join('');
            return `
              <p style="font-weight: bold; margin-top: 1.5rem; margin-bottom: 0.75rem; color: #1A1A2E;">${sec.text}</p>
              <ul style="padding-left: 0; list-style-type: none; margin-bottom: 1.8rem;">
                ${listItems}
              </ul>
            `;
          }
          return '';
        }).join('')}
      </div>
      
      <section style="margin-top: 5rem; padding: 2.5rem; background: #FFF6FA; border: 1px solid rgba(244, 63, 143, 0.1); border-radius: 2rem; text-align: center; box-shadow: 0 4px 20px rgba(244,63,143,0.03);">
        <h3 style="font-size: 1.6rem; color: #1A1A2E; margin-top: 0; font-family: Georgia, serif;">AI Income Starter Kit</h3>
        <p style="color: #4F4F4F; font-size: 1rem; margin-bottom: 1.5rem;">Join other smart women building an online passive stream with beautiful, automated smartphone tactics.</p>
        <p style="font-size: 1.5rem; margin-bottom: 1.5rem;"><strong style="color: #F43F8F;">Special Price: $6</strong> <span style="text-decoration: line-through; opacity: 0.4; font-size: 1.1rem;">$47</span></p>
        <a href="https://gumroad.com/l/ai-income-kit" style="background: #F43F8F; color: white; padding: 0.9rem 2rem; border-radius: 9999px; text-decoration: none; font-weight: bold; display: inline-block; transition: background 0.2s;">Join VIP Waitlist Now</a>
      </section>
    </main>
  `;

  let postHtml = originalHtml;

  // 1. Replace the generic title tag with the specific post title
  postHtml = postHtml.replace(
    /<title>.*?<\/title>/,
    `<title>${postTitle}</title>`
  );

  // 2. Replace the generic description meta tag
  postHtml = postHtml.replace(
    /<meta name="description" content=".*?" \/>/,
    `<meta name="description" content="${postDesc}" />`
  );

  // 3. Inject OpenGraph tags into the header for advanced Crawlers and Pinterest rich pin extraction
  const openGraphTags = `
    <!-- Pre-rendered OpenGraph metadata for Pinterest and search crawlers -->
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${postTitle.replace(/"/g, '&quot;')}" />
    <meta property="og:description" content="${postDesc.replace(/"/g, '&quot;')}" />
    <meta property="og:url" content="${postUrl}" />
    <meta property="og:image" content="${postImg}" />
    <meta property="og:site_name" content="LinkaMarket" />
    <meta property="article:published_time" content="${post.date}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${postTitle.replace(/"/g, '&quot;')}" />
    <meta name="twitter:description" content="${postDesc.replace(/"/g, '&quot;')}" />
    <meta name="twitter:image" content="${postImg}" />
  `;

  postHtml = postHtml.replace('</head>', `${openGraphTags}</head>`);

  // 4. Inject physical fallback content inside the raw HTML's mounting point
  postHtml = postHtml.replace(
    /<div id="root">([\s\S]*?)<\/div>/,
    `<div id="root">${staticBlogHtml}</div>`
  );

  // Save html files
  fs.writeFileSync(path.join(postDir, 'index.html'), postHtml, 'utf-8');
}

console.log(`[POST-BUILD] SUCCESS! Dynamically mirrored ${BLOG_POSTS.length} blog masterclasses into standalone crawler-friendly pages!`);
