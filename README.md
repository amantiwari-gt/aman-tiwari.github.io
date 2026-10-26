# Aman Tiwari — portfolio

Static HTML, CSS, and JavaScript. No package installation or build step is needed.

## Local preview

From this directory, run `python preview.py` and open `http://127.0.0.1:4174/`. The preview server binds only to this computer and mirrors the GitHub Pages project path. No packages are required. Use `python preview.py --port 4175` if the default port is occupied.

## Structure

- `index.html`: homepage
- `case-studies/`: four standalone case studies
- `assets/`: original conceptual SVG illustrations, social preview, and favicon
- `style.css`, `script.js`: shared styling and small progressive enhancements
- `Aman_Tiwari_Resume.pdf`: PDF prepared from the user's finalized resume
- `404.html`, `sitemap.xml`, `robots.txt`: navigation and discovery

## Editing and publication

Use relative links for site assets and navigation, including from nested case-study pages. The current public base URL is `https://amantiwari-gt.github.io/aman-tiwari.github.io/`. If that changes, update canonical URLs, Open Graph URLs, sitemap, robots.txt, and the 404 home link together.

The current GitHub Pages setup serves the static site. This redesign does not change publishing settings. Merge to the publishing branch only after reviewing the local preview and approving release.

## Content rules

The finalized resume is the factual source. Preserve personal workstream ownership, initial implementation, engineering handoff, and collaborative attribution. The 11,000+ km figure is program scale. The imagery-loading comparison is approximate and is not a formal benchmark. Do not reintroduce unsupported throughput claims or describe the academic flood prototype as live monitoring.

Every diagram is an original conceptual illustration. No production data, exact project geography, or internal infrastructure is included. Replace figures only with approved public material; check labels, metadata, and incidental identifiers before publication.

## Review checklist

- Confirm resume, roles, dates, metrics, attribution, and disclosure permissions.
- Check home and every case-study page, nested links, PDF download, and 404 page.
- Review keyboard access, visible focus, menu Escape behavior, screen-reader order, both themes, reduced motion, 320px reflow, zoom, and print.
- Check network/console errors and page performance after any new media or third-party scripts.

System fonts and original local vectors keep the site usable without external font or map services. JavaScript is optional for content and navigation. There are no analytics, tracking scripts, forms, API calls, or map tokens.
