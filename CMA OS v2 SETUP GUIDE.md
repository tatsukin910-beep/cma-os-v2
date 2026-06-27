# Cognitive CMA OS v2 — Setup & Deployment Guide

## Overview

**Cognitive CMA OS v2** is a Progressive Web App (PWA) designed for service users to privately document Complex Multilayered Abuse patterns and generate structured evidence summaries for advocates or practitioners.

All data is stored **locally on the user's device** using IndexedDB. There are **no network calls, no cloud storage, no data transmission**—complete privacy by design.

---

## What This Tool Does

### Core Workflow

1. **Log Incidents**: Users record incidents with date, people involved, free-text description, and CMA layer tags
2. **Tag Patterns**: Each incident is marked with one or more CMA layers:
   - **Institutional/Administrative**: Policies, systems, protocols used against user
   - **Practitioner Judgment**: Individual decisions, what person chose to do/not do
   - **Environmental/Visibility**: What's hidden, what can't be seen, what's not talked about
3. **View Patterns**: Dashboard shows incidents grouped by:
   - Chronological timeline
   - By CMA layer + patterns within each
   - Statistics (counts per layer)
4. **Export Evidence**: Generate a structured text summary ready to share with practitioners/advocates/legal

### Key Features

- ✅ **Offline-first**: Works without internet. Service worker caches all assets.
- ✅ **Private by default**: IndexedDB stores data locally. No sync, no cloud, no tracking.
- ✅ **Installable**: Users can "install" the app on phone/desktop (home screen icon, standalone view)
- ✅ **Sparse, somatic interface**: Minimal, focused on what happened—not analysis or judgment
- ✅ **Export to text**: Copy to clipboard or download as `.txt` file for sharing

---

## Deployment

### Option 1: Self-Hosted (Recommended for Privacy)

1. **Create a folder** on a web server:
   ```
   /var/www/cma-os/
   ├── index.html
   ├── sw.js
   ├── manifest.json
   └── icon-512.png
   ```

2. **Ensure HTTPS**: Service workers require HTTPS (or localhost for development)
   - Use Let's Encrypt for free SSL certificates
   - Most modern hosting (Vercel, Netlify, GitHub Pages) provide HTTPS by default

3. **Example with GitHub Pages**:
   - Push files to a GitHub repo
   - Enable GitHub Pages in repo settings
   - App is live at `https://yourusername.github.io/cma-os/`

### Option 2: Static Hosting (Vercel, Netlify, etc.)

**Vercel** (recommended for minimal config):
```bash
npm install -g vercel
vercel --prod
```

**Netlify**:
- Drag & drop folder into Netlify dashboard
- Automatic HTTPS, preview URLs, etc.

---

## Browser Support

| Browser | Platform | Support |
|---------|----------|---------|
| Chrome  | Mobile   | ✅ Full |
| Safari  | iOS 15+  | ✅ Full |
| Firefox | Mobile   | ✅ Full |
| Edge    | Desktop  | ✅ Full |

**Note**: iOS PWAs have some limitations (no background sync), but offline use works fine.

---

## How to Use

### First Time (Setup)

1. Open app in browser
2. Click "📝 Log Incident"
3. Fill out form:
   - **Date & Time**: When it happened
   - **People Involved**: Names/roles (optional)
   - **CMA Layers**: Select 1+ layers that apply
   - **Description**: What happened (sparse, somatic detail OK)
4. Click "Save Incident"
5. Data is saved locally—no submission needed

### Viewing & Analyzing

- **📅 Timeline**: See all incidents in chronological order
- **🔍 By Layers**: Group by CMA layer, see patterns
- **📊 Stats**: Quick count of incidents per layer

### Sharing Evidence

1. Go to **📤 Export**
2. View structured summary (organized chronologically + by layer)
3. **Copy to Clipboard** (paste into email, document, etc.)
   - Or **Download as Text** (save `.txt` file to device)
4. Share with advocate/practitioner/lawyer

### Clearing Data

- Click **🗑️ Clear All** to delete everything
- Confirm deletion (cannot be undone)
- Useful if device is shared or you're starting fresh

---

## Data Model

### Incident Object

```json
{
  "id": 1,
  "date": "2025-06-28T14:30",
  "people": "Staff member name or role",
  "description": "Free text description of what happened",
  "layers": ["institutional", "practitioner", "environmental"],
  "created": "2025-06-28T14:30:00.000Z"
}
```

### Storage

- **Where**: IndexedDB on user's device
- **Size limit**: Typically 50-100 MB per site (plenty for text)
- **Persistence**: Survives browser restart, only deleted if:
  - User clears browser storage
  - User clicks "Clear All" in app
  - Browser is uninstalled (on mobile)

---

## Customization (For Researchers)

### Changing the Theme

Edit the CSS variables in `index.html` `<style>` block:

```css
:root {
  --bg: #0a0a14;           /* Background (dark indigo) */
  --surface: #1a1a24;      /* Cards/surfaces */
  --accent: #7c7cff;       /* Primary color (lavender) */
  --accent-alt: #ff7c9c;   /* Secondary (pink) */
  /* ... etc */
}
```

### Adding Custom Layer Labels

In `index.html`, find the `layerLabels` object (in JavaScript):

```javascript
const layerLabels = {
  institutional: 'Your Custom Label',
  practitioner: 'Your Custom Label',
  environmental: 'Your Custom Label'
};
```

### Modifying Export Format

Edit the `generateExportText()` function in `index.html` to change how the evidence summary is formatted.

---

## Privacy & Security Notes

- ✅ **No cloud**: Data never leaves the device
- ✅ **No analytics**: No tracking, no telemetry
- ✅ **No API calls**: No external dependencies (except service worker for offline)
- ⚠️ **Device security**: If device is shared, use browser's private/incognito mode or set a screen lock
- ⚠️ **Backup**: Data is not synced. If device is lost/factory reset, data is lost.
  - Consider: Periodic manual export (download as text) and store securely

---

## Technical Stack

- **HTML5**: Semantic structure
- **CSS3**: Dark theme, responsive design
- **Vanilla JavaScript**: No frameworks, lightweight
- **IndexedDB**: Local structured storage
- **Service Worker**: Offline capability
- **PWA**: Installable on mobile/desktop

**Total size**: ~50 KB (minified + gzipped)

---

## Troubleshooting

### "App not saving data"
- Check if IndexedDB is enabled in browser settings
- Clear browser cache and reload
- Try a different browser (Safari, Chrome, etc.)

### "Can't install as PWA"
- Ensure you're using HTTPS (not HTTP)
- Ensure `manifest.json` is properly linked in `index.html`
- On iOS: Use "Add to Home Screen" (not "Install")

### "Service worker not working"
- Ensure HTTPS is enabled
- Check browser DevTools > Application > Service Workers
- Uninstall and reinstall the app

### "Export button not working"
- Ensure pop-up blocker allows the app
- Try "Copy to Clipboard" instead of "Download"
- Check browser console for errors

---

## Academic/Research Context

This tool embodies the CMA (Complex Multilayered Abuse) framework—a theoretical model for understanding abuse that operates across three structural layers simultaneously. By enabling service users to document and recognize these layers, the tool:

- **Validates lived experience**: Patterns become visible
- **Supports advocacy**: Structured evidence for negotiations with institutions
- **Advances CMA theory**: Real-world use data informs framework refinement

For theoretical background, see:
- Zenodo preprint: 10.5281/zenodo.20804592
- X: @tatsu97910 (#ComplexMultilayered)

---

## License & Attribution

Cognitive CMA OS v2 © 2025 Tatsuki Nakamura

Built with vanilla HTML/CSS/JavaScript.
CMA framework: 中村達希 (Tatsuki Nakamura)

For questions or contributions, reach out on X or via academic contact.
