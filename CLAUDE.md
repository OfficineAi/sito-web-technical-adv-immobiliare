# Landing Page Technical Advisor Immobiliare — Manuale di implementazione

## Panoramica
Sito monopagina statico per un professionista "Technical Advisor Immobiliare".
Stack: **React 18 + Babel in-browser** (JSX inline, nessun bundler), CSS custom properties, nessun framework CSS esterno.
Entry point: `index.html` (carica i file JSX in ordine tramite `<script type="text/babel" src="...">`).
Deploy target: **GitHub Pages** via workflow Actions.
Lead capture: **Supabase** (insert via anon key) + **EmailJS** (notifica email opzionale).

## Struttura file

| File | Ruolo |
|---|---|
| `index.html` | Entry principale per GitHub Pages, `<div id="root">`, import script nell'ordine corretto |
| `styles.css` | Tutto il CSS: variabili tema, componenti, media query |
| `parts-hero.jsx` | Nav, Hero (3 varianti: default / split / data), `IconArrow`, `IconCheck`, `IconX` — export su `window` |
| `parts-mid.jsx` | Comparison (5 punti cardine T.A.I.), Pillars (4 pilastri stress), Checkup — export su `window` |
| `parts-end.jsx` | Bento, Trust, FAQ, Contact, Footer — export su `window` |
| `app.jsx` | `<App>` root: assembla i componenti, applica `TWEAK_DEFAULTS` |
| `chi-sono.html` | Pagina secondaria "Chi sono" (statica) |
| `privacy.html` | Informativa privacy (statica) |
| `config.js` | Configurazione runtime (Supabase / EmailJS) — **vuota nel repo**, popolata in CI |
| `supabase/leads.sql` | Schema tabella `leads` + policy RLS per insert anon |
| `.github/workflows/deploy-pages.yml` | Pipeline GitHub Actions → GitHub Pages |
| `assets/` | Immagini referenziate dal sito |

**Ordine import script in `index.html` (critico, non riordinare):**
`parts-hero` → `parts-mid` → `parts-end` → `app`

## Design system (CSS variables)

```css
/* Tema default "shield" */
--navy-900: #0B1F3A;   /* sfondo scuro / sezioni navy */
--navy-800: #0F2547;
--navy-700: #1A3358;
--ice-50:   #F4F6F8;   /* sfondo chiaro */
--ice-100:  #EAEEF2;
--ice-200:  #DCE3EB;
--ice-300:  #C5CFDA;   /* bordi */
--blueprint:#8A99AD;   /* testo secondario mono */
--teal-500: #14B8A6;   /* accento principale / CTA */
--teal-600: #0E9488;
--ink-900:  #0A1628;
--ink-700:  #2C3E5C;
--ink-500:  #5A6B82;

/* Tema "cream" — stesse variabili, palette beige/bronzo */

/* Tipografia */
--serif: 'Fraunces', Georgia, serif;
--sans:  'Inter', system-ui, sans-serif;
--mono:  'JetBrains Mono', Menlo, monospace;
```

## Sezioni della pagina

| # | ID ancora | Componente | Note |
|---|---|---|---|
| 01 | `#top` | Hero | 3 varianti via tweak `heroVariant` |
| 02 | `#confronto` | Comparison | 5 punti cardine T.A.I.; layout via tweak `methodLayout` (`grid` / `rows`) |
| 03 | `#stress` | Pillars | 4 pilastri dello stress; sfondo navy |
| 04 | `#checkup` | Checkup | Check-up preventivo; lead magnet |
| 05 | `#metodo` | Bento | 8 situazioni reali; griglia bento |
| 06 | `#trust` | Trust | Manifesto 4 principi |
| 07 | `#faq` | FAQ | 6 domande, accordion |
| 08 | `#contatto` | Contact | Form contatti (invio a Supabase + EmailJS) |
| — | — | Footer | Link nav + dettagli contatto |

## Configurazione varianti (`app.jsx`)

Costanti statiche applicate al render (nessun pannello dev in produzione):

```js
const TWEAK_DEFAULTS = {
  heroVariant:  "split",   // "default" | "split" | "data"
  showGrid:     true,       // griglia blueprint nell'hero
  theme:        "shield",  // "shield" | "cream"
  methodLayout: "grid",    // "grid" | "rows" (sezione #confronto)
};
```

Per cambiare aspetto si editano questi valori direttamente in `app.jsx`.

## Configurazione runtime (`config.js`)

Il file `config.js` definisce `window.APP_CONFIG` con le chiavi pubbliche client-side:

```js
window.APP_CONFIG = {
  SUPABASE_URL:             '',
  SUPABASE_PUBLISHABLE_KEY: '',   // anon key (publishable)
  SUPABASE_LEADS_TABLE:     'leads',
  EMAILJS_PUBLIC_KEY:       '',
  EMAILJS_SERVICE_ID:       '',
  EMAILJS_TEMPLATE_ID:      '',
};
```

**Regole importanti:**
- Nel repository il file resta con valori vuoti — niente segreti committati.
- In produzione il workflow GitHub Actions sovrascrive `config.js` con i valori presi da `Secrets`.
- Solo chiavi *publishable* lato client (anon key Supabase, public key EmailJS). Mai service-role key, mai SMTP.
- Per test locale: valorizzare temporaneamente `config.js` ma **non committare** le modifiche.

## Classi CSS chiave

- `.section` — padding verticale standard (120px top/bottom)
- `.section--navy` — sfondo navy-900, testo ice-50
- `.container` — max-width 1280px, padding orizzontale via `--gutter`
- `.section-head` — header sezione con eyebrow + titolo + lede
- `.eyebrow` — label mono uppercase teal-600
- `.label-mono` — mono uppercase blueprint
- `.btn--primary` — CTA teal-500
- `.btn--outline` — bordo bianco, sfondo trasparente (su navy)
- `.cardinal__grid` — griglia 5 colonne (sezione 02)
- `.cardinal__rows` — layout orizzontale alternativo (sezione 02)
- `.pillars__grid` — griglia 4 colonne su navy
- `.bento` — griglia bento 2-col con celle `--w2` per doppia larghezza
- `.compare__table` — tabella comparativa legacy (CSS mantenuto, non più referenziato dal JSX)

## Regole di sviluppo

- Ogni file JSX deve esportare i propri componenti su `window` alla fine (`window.Xyz = Xyz;`).
- Le icone globali (`IconArrow`, `IconCheck`, `IconX`) sono definite in `parts-hero.jsx`.
- Le icone T.A.I. (`IconLedger`, `IconUnbind`, `IconShield`, `IconLens`, `IconArchive`) sono in `parts-mid.jsx`.
- **Non** usare `type="module"` sugli script — rompe il transform Babel in-browser.
- **Non** rinominare `const styles = {}` come oggetto globale: usare nomi specifici per evitare collisioni di scope tra i diversi file Babel.
- Babel in-browser è solo per development/produzione semplificata: in caso di traffico elevato valutare una build step (esbuild / Vite).

## Contenuto e tono
- Lingua: **italiano** — tono professionale, diretto, tecnico ma accessibile.
- Modello commerciale: parcella fissa concordata in anticipo, nessuna provvigione percentuale.
- Zona operativa: configurabile nei contenuti delle sezioni Hero / Contact / Footer.

## Sicurezza — checklist pre-commit
- [ ] `config.js` ha valori vuoti (nessuna chiave reale).
- [ ] `supabase/.temp/` non presente nello staging (gitignored).
- [ ] `.claude/settings.local.json` non presente nello staging (gitignored).
- [ ] `.env` / `.env.*` non presenti (solo `.env.example` ammesso).
- [ ] Nessuna service-role key Supabase nel codice client.
- [ ] Nessuna password / SMTP credentials nel repository.
