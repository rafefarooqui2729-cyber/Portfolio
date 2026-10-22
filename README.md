# Abdul Rafe Farooqui — Portfolio

Static site: no build step needed.

## Run locally
Open `index.html`, or run `python3 -m http.server 8000` in this folder and visit http://localhost:8000

## Edit
- **Project links, skills, journey dates, contact:** top of `js/main.js` (set `PROJECTS.jobmatch.demo` / `.repo` to real URLs and the buttons activate).
- **Colours, fonts, spacing:** `:root` variables at the top of `css/style.css`.
- **Portrait:** replace `assets/portrait-cutout.webp` (transparent, ~820x1495). If the proportions change, update `aspect-ratio` / `width` / `height` values for `.fig` and `.pf` in the CSS and HTML.
- **Text and sections:** `index.html`.

## Deploy
Drag this folder onto Netlify, Vercel or Cloudflare Pages, or push it to GitHub and enable GitHub Pages.
After you have a domain: add `<link rel="canonical">`, an `og:image` and a `sitemap.xml`.
