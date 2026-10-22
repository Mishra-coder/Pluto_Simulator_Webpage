# PlutoSim website

Landing page for **PlutoSim**, Drona Aviation's drone flight simulator. React + Vite, served by a small Express server.

## Run

```bash
npm install
npm run dev      # Express + Vite with hot reload → http://localhost:3055
npm run build    # production build into dist/
npm start        # serve dist/ with Express (run the build first)
```

Set `PORT` to use another port.

## Structure

```
.
├── server.js                  # Express: Vite middleware in dev, dist/ in prod, installers from downloads/
├── index.html                 # Vite entry
├── src/
│   ├── main.jsx               # mounts <App/>, imports the stylesheets
│   ├── App.jsx                # sections in page order
│   ├── hooks.js               # usePlatform, useReveal, prefersReducedMotion
│   ├── data/site.js           # all page content: downloads, lessons, missions, drones, FAQ…
│   ├── components/            # one component per section (Nav, Hero, Why, Features, Controls,
│   │                          #   FlightSchool, Missions, Drones, Gallery, Checklist, Faq, Footer)
│   │                          #   plus Icon/Sprite and Scene (sunset city canvas)
│   ├── lib/
│   │   ├── skyline.js         # draws the sunset city scenes on canvas
│   │   └── droneViewer.js     # three.js hero: the real Pluto CAD model
│   ├── assets/sprite.svg      # icons, controller and top-view drone drawings
│   └── styles/                # tokens, base, components, sections/<name>.css
├── public/assets/             # brand, fonts, mission screenshots, models/pluto.glb
├── downloads/                 # installers (served by Express, not bundled)
└── PLUTOSIM_DESIGN_SYSTEM.md  # PlutoSim design system reference
```

## Conventions

- **Content** lives in `src/data/site.js`; components only lay it out.
- **Colours and fonts** come from the variables in `src/styles/tokens.css`. Orange `--signal` is the action colour; the logo stays blue.
- **Visuals are code**: the sunset skylines are drawn by `lib/skyline.js`, the controller and drones are SVG in `sprite.svg`, and the hero drone is the real 3D model. Mission images are real in-game screenshots.
- **Releasing a new version:** update `VERSION` and the sizes in `src/data/site.js`, and replace the files in `downloads/`.
