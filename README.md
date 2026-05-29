# Landing Page — Technical Advisor Immobiliare

Sito monopagina statico (React 18 + Babel in-browser, nessun bundler) con raccolta lead su **Supabase**, notifica via **EmailJS** e deploy automatico su **GitHub Pages**.

> Per dettagli tecnici sulla struttura interna del codice, vedi [CLAUDE.md](CLAUDE.md).

---

## Architettura in due righe

- **Frontend**: `index.html` carica `styles.css` + quattro file JSX trasformati da Babel a runtime.
- **Backend**: nessun server. Il form contatti inserisce direttamente in una tabella Supabase (anon key + RLS) e in parallelo invia un'email tramite EmailJS.
- **Deploy**: GitHub Actions costruisce `config.js` dai Secrets e pubblica su GitHub Pages.

---

## Prerequisiti

1. Account GitHub con il repository hostato.
2. Progetto Supabase (free tier sufficiente).
3. Account EmailJS (free tier sufficiente) — opzionale, ma raccomandato per la notifica.

---

## Setup

### 1. Database (Supabase)

Esegui lo script SQL [supabase/leads.sql](supabase/leads.sql) nel **SQL Editor** di Supabase.
Lo script crea:
- la tabella `public.leads` con validazioni
- l'indice `leads_created_at_idx`
- la policy RLS che consente `insert` al ruolo `anon` solo se `privacy_accepted = true`

### 2. Variabili runtime — GitHub Secrets

In `Settings → Secrets and variables → Actions` del repository GitHub, crea:

| Secret | Valore |
|---|---|
| `SUPABASE_URL` | URL del progetto Supabase (es. `https://xxxxx.supabase.co`) |
| `SUPABASE_PUBLISHABLE_KEY` | Anon / publishable key del progetto |
| `SUPABASE_LEADS_TABLE` | `leads` (o nome personalizzato) |
| `EMAILJS_PUBLIC_KEY` | Public Key EmailJS (`Account → General`) |
| `EMAILJS_SERVICE_ID` | Service ID EmailJS (`Email Services`) |
| `EMAILJS_TEMPLATE_ID` | Template ID EmailJS (`Email Templates`) |

> ⚠️ Usare **solo** chiavi publishable / anon / public. Mai la `service_role` key Supabase né credenziali SMTP — verrebbero esposte nel bundle client.

### 3. EmailJS (opzionale, per notifica email)

1. Crea account su <https://app.emailjs.com/sign-up>.
2. `Email Services` → `Add New Service` → collega un provider (Gmail / SMTP). Copia il **Service ID**.
3. `Email Templates` → `Create New Template` con i campi: `{{from_name}}`, `{{from_email}}`, `{{phone}}`, `{{property_type}}`, `{{property_address}}`, `{{intent}}`, `{{message}}`, `{{reply_to}}`. Copia il **Template ID**.
4. `Account → General` → copia la **Public Key**.
5. Inserisci i tre valori come GitHub Secrets (`EMAILJS_PUBLIC_KEY`, `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`): in produzione il workflow li inietta automaticamente in `config.js`. Per il solo test locale valorizzali temporaneamente in `config.js` — **senza committare**.

> La SDK EmailJS viene inizializzata in `index.html` con `emailjs.init({ publicKey })` subito dopo il caricamento di `config.js`. Se i tre Secrets non sono impostati, la notifica email viene saltata silenziosamente senza bloccare l'inserimento del lead su Supabase.

### 4. GitHub Pages

In `Settings → Pages` imposta **Source: GitHub Actions**.
Il workflow [.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml) è già pronto e si attiva al push su `main` o `master`.

### 5. Push

```bash
git push origin main
```

Il workflow:
1. Genera `config.js` dai Secrets
2. Carica l'intera cartella come artifact Pages
3. Pubblica il sito all'URL `https://<user>.github.io/<repo>/`

---

## Sviluppo locale

Non serve toolchain Node — il sito si apre direttamente.
Suggerito un server statico minimo (per evitare CORS su `file://`):

```bash
# Python 3
python -m http.server 8080
# oppure Node
npx serve .
```

Per testare in locale con Supabase / EmailJS attivi, valorizza temporaneamente `config.js` con le chiavi publishable.
**Non committare** queste modifiche: il file deve restare con stringhe vuote nel repo.

---

## File di riferimento

| File | Cosa fa |
|---|---|
| [index.html](index.html) | Entry point, monta `<div id="root">` e carica gli script |
| [app.jsx](app.jsx) | Componente root, applica i tweak visivi |
| [parts-hero.jsx](parts-hero.jsx) | Nav + Hero |
| [parts-mid.jsx](parts-mid.jsx) | Comparison + Pillars + Checkup |
| [parts-end.jsx](parts-end.jsx) | Bento + Trust + FAQ + Contact + Footer |
| [styles.css](styles.css) | Design system completo |
| [config.js](config.js) | Configurazione runtime (vuota nel repo) |
| [.env.example](.env.example) | Template variabili — solo riferimento, non usato a runtime |
| [supabase/leads.sql](supabase/leads.sql) | Schema DB + policy RLS |

---

## Sicurezza

- Tutte le chiavi nel client devono essere **publishable** (anon).
- La protezione contro insert abusivi sulla tabella `leads` è demandata a:
  - RLS Supabase (`privacy_accepted = true` obbligatorio).
  - Validazioni `check` SQL su lunghezza campi e dominio di `intent`.
- File mai versionati: `.env*`, `config.js` popolato, `supabase/.temp/`, `.claude/settings.local.json`.
- Vedi `.gitignore` per la lista completa.

---

## Licenza

Codice di proprietà del committente. Riuso non autorizzato senza permesso esplicito.
