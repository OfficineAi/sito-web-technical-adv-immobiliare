/* global React */
const { useState: useStateB, useEffect: useEffectB, useRef: useRefB } = React;

/* ============== Mobile swipe carousel — dots tracker ============== */
function useSwipeDotsB(trackRef, count) {
  const [active, setActive] = useStateB(0);
  useEffectB(() => {
    const el = trackRef.current;
    if (!el) return;
    const mq = window.matchMedia('(max-width: 720px)');
    if (!mq.matches) { setActive(0); return; }
    const update = () => {
      const cards = el.children;
      if (!cards.length) return;
      const center = el.scrollLeft + el.clientWidth / 2;
      let bestIdx = 0;
      let bestDist = Infinity;
      for (let i = 0; i < cards.length; i++) {
        const c = cards[i];
        const cardCenter = c.offsetLeft + c.offsetWidth / 2;
        const d = Math.abs(cardCenter - center);
        if (d < bestDist) { bestDist = d; bestIdx = i; }
      }
      setActive(bestIdx);
    };
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [count]);
  return active;
}

function SwipeDotsB({ count, active }) {
  return (
    <div className="swipe__dots" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) =>
        <span key={i} className={`swipe__dot ${i === active ? 'is-active' : ''}`} />
      )}
    </div>);
}

/* ============== Cookie consent helpers ============== */
const CONSENT_KEY = 'mb_privacy_consent';
function getConsent() {
  try { return localStorage.getItem(CONSENT_KEY) === '1'; } catch (_) { return false; }
}
function setConsent() {
  try { localStorage.setItem(CONSENT_KEY, '1'); } catch (_) {}
}

/* ============== Bento Grid (8 ganci) ============== */
function Bento() {
  const items = [
  { n: '01', tag: 'LATO VENDITORE', dark: false, accent: false, w2: true,
    title: 'La legge non ammette ignoranza .',
    body: 'Spesso ci si accorge che qualcosa non va solo davanti al Notaio, o quando il Perito della banca nega il mutuo.\nIl mercato immobiliare odierno è un reticolo di norme urbanistiche, civili e amministrative.\nNon hai l\'obbligo di affidarti ad una agenzia; lo hai della conformità a 360° ' },
  { n: '02', tag: 'CERTIFICAZIONI', dark: true, accent: false,
    title: 'APE, agibilità, conformità impianti .',
    body: 'Documenti scaduti o mancanti non sono solo burocrazia, ma il passepartout indispensabile per il Rogito notarile: Non far diventare il tuo sogno un incubo! Se vuoi vendere o comprare da privato evitando costose mediazioni immobiliari, fallo ma assicurati il buon esito dell\'affare.' },
  { n: '03', tag: 'LATO ACQUIRENTE', dark: false, accent: false,
    title: 'Comprare casa senza verificare .',
    body: `Trascrizioni e ipoteche invisibili, difformità urbanistiche, quella sanatoria non verificata. Un immobile può nascondere vincoli legali, successioni non chiuse, sanatorie non conformi. Vuoi fare una proposta d'acquisto per una casa che non potrà essere tua al 100% e senza stress?` },
  { n: '04', tag: 'COSTI · RISPARMIO', dark: false, accent: true, w2: true,
    title: 'Perché pagare il 3% per un "forse"?',
    body: 'Non sono un mediatore, non cerco acquirenti e non prendo provvigioni sul valore di vendita.  Sono un tecnico a parcella fissa. Il mio obiettivo è unico: proteggere la tua transazione e garantirti un contratto blindato.' },
  { n: '05', tag: 'CERTIFICAZIONI', dark: false, accent: false,
    title: 'Ho comprato dal costruttore .',
    body: 'Si pensa che una casa acquistata dal costruttore non possa avere problemi, ma non è così. Cubature abitative e non (valore immobiliare) - varianti al progetto non dichiarate (difformità) - Manca il progetto depositato in comune (Rogito a rischio). ' },
  { n: '06', tag: 'CAPARRA - RISCHIO', dark: true, accent: false,
    title: 'Il doppio di zero non è zero .',
    body: 'Se la vendita salta per colpa tua — documenti non conformi — devi restituire il doppio della caparra. Una Due Diligence preventiva costa una frazione di quel rischio.' },
  { n: '07', tag: 'AZIONE PREVENTIVA', dark: false, accent: false,
    title: 'La sanatoria senza istruttoria .',
    body: `Quella sanatoria fatta 30 anni fa. "Ho il titolo edilizio del comune e sono a posto!"\nNon è così — se manca la domanda completa, un tecnico non potrà dichiarare la conformità dell'immobile, e se non ti muovi prima l'atto salta.` },
  { n: '08', tag: 'UN BUON AFFARE PER TUTTI', dark: false, accent: false,
    title: 'Operazioni senza stress .',
    body: 'Il doppio binario dei documenti in regola fin da subito - Vendi senza stress e tratta il miglior prezzo - anche chi compra si sentirà tranquillo e procederà senza esitazioni.' }];


  const trackRef = useRefB(null);
  const active = useSwipeDotsB(trackRef, items.length);

  return (
    <section className="section" id="metodo" style={{ background: 'var(--ice-50)' }}>
      <div className="container">
        <div className="section-head">
          <div className="section-head__meta">
            <span className="eyebrow">04 · OTTO SITUAZIONI REALI</span>
            <span className="label-mono">8 PRINCIPI · 1 METODO</span>
          </div>
          <h2>Otto situazioni reali. Otto perché lavorare con un advisor cambia il risultato.</h2>
        </div>

        <div className="bento swipe__track" ref={trackRef}>
          {items.map((it) => {
            const cls = ['bento__cell'];
            if (it.dark) cls.push('bento__cell--dark');
            if (it.accent) cls.push('bento__cell--accent');
            if (it.w2) cls.push('bento__cell--w2');
            return (
              <div className={cls.join(' ')} key={it.n}>
                <div className="bento__num">
                  <span>{it.tag}</span>
                  <span>{it.n}</span>
                </div>
                <h3 className="bento__title">{it.title}</h3>
                <p className="bento__body">{it.body}</p>
              </div>);

          })}
        </div>
        <SwipeDotsB count={items.length} active={active} />
      </div>
    </section>);

}

/* ============== Trust ============== */
function Trust() {
  const principles = [
  { n: "01", t: "Il primo Check-up Immobiliare.", d: "Offre un'analisi tecnica e documentale integrata: urbanistica, catastale, legale e notarile." },
  { n: "02", t: "Per ogni criticità.", d: "Attivo e coordino il professionista più idoneo, ottimizzando tempi, costi e procedure." },
  { n: "03", t: "Regia Professionale.", d: "Sono un coordinatore Strategico nel settore più delicato. Il mio compenso è un piccolo investimento per un lavoro che vale oro e rimarrà tuo per sempre." },
  { n: "04", t: "L'Obiettivo.", d: "Garantire un percorso chiaro dal Preliminare al Rogito senza stress ed imprevisti." }];

  return (
    <section className="section trust" id="trust">
      <div className="container">
        <div className="section-head">
          <div className="section-head__meta">
            <span className="eyebrow">05 · I 4 PRINCIPI</span>
            <span className="label-mono">MANIFESTO · 04 PRINCIPI</span>
          </div>
          <h2>Personal Advisor Immobiliare: la sicurezza prima della firma.</h2>
          <p className="section-head__lede">Una posizione tecnica indipendente. Mi chiamo Manuela Balsamo e ho fondato la mia attività di Personal Advisor Immobiliare su un principio chiaro: una compravendita deve essere un'operazione blindata, non un atto di fede.</p>
        </div>

        <div className="trust__grid">
          <div className="trust__image-wrap">
            <img src="assets/manuela-tablet-blueprint.png" alt="Manuela Balsamo, Personal Advisor Immobiliare" />
            <div className="trust__image-tag">
              <span className="dot" /> MANUELA BALSAMO · 2026
            </div>
          </div>
          <div className="trust__content">
            <p>
              In un settore in cui le normative evolvono ogni giorno, regolarizzare un immobile è un obbligo che richiede tempi tecnici precisi: muoversi in anticipo è l'unico modo per blindare la vendita.
            </p>

            <div className="trust__principles">
              {principles.map((p) =>
              <div className="trust__principle" key={p.n}>
                  <div className="trust__principle-num">PRINC. {p.n}</div>
                  <div className="trust__principle-text">
                    <strong>{p.t}</strong>
                    <span>{p.d}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>);

}

/* ============== FAQ ============== */
function FAQ() {
  const items = [
  { q: 'Qual è la differenza tra Personal Advisor e agente immobiliare?',
    a: 'Il Personal Advisor Immobiliare è un consulente indipendente il cui compito è verificare la solidità documentale e urbanistica dell\'operazione, gestire in tempo le criticità, sapere come muoversi con i tecnici e la burocrazia. Non è un agente di mediazione e non si occupa della vendita della casa. L\'unico scopo è garantire una compravendita sicura e senza sorprese.' },
  { q: 'Perché iniziare subito prima di ricevere un\'offerta?',
    a: 'Scoprire una difformità all\'ultimo può significare 4 cose: trattative bloccate, svalutazione dell\'immobile, l\'affare salta, danni economici.' },
  { q: 'Quanto costa il Check-up Preventivo?',
    a: 'È un compenso fisso, calcolato sulla complessità operativa, che viene concordato prima di cominciare. Non c\'è alcuna percentuale sul valore di vendita dell\'immobile. Ricevi una relazione e un preventivo scritto entro 48h dalla prima revisione dei documenti e sopralluogo.' },
  { q: 'Potete lavorare insieme a un\'agenzia?',
    a: 'Sì. Molti clienti mi affiancano a un\'agenzia, esattamente come ci si fa affiancare da un commercialista o da un avvocato. Il mio ruolo è tecnico e indipendente: verifico, segnalo, propongo soluzioni — non sostituisco la promozione commerciale, spesso sistemo ciò che è rimasto in sospeso e blindo l\'operazione.' },
  { q: 'Lavorate solo a Roma?',
    a: 'Lavoriamo su Roma ed in tutto il Lazio. Per immobili in altre regioni del centro Italia, valutiamo caso per caso, anche tramite collaborazioni con tecnici locali fidati. La parte di analisi documentale ed il coordinamento è sempre svolto direttamente da me.' },
  { q: 'Se trovate problemi, mi seguite anche nella regolarizzazione?',
    a: 'Sì. Una volta identificate le criticità, si elabora una roadmap di risoluzione condivisa con i tecnici che servono — geometra, notaio, ingegnere, amministratore. Tu hai un interlocutore primario, che cura i tuoi interessi, anche per la congruità del lavoro e parcelle di terzi. ' },
  { q: 'Tempi medi di un Check-up?',
    a: 'Tra i 7 e i 14 giorni lavorativi dalla ricezione completa della documentazione e primo sopralluogo. Su immobili semplici e ben documentati anche meno; su pratiche con passaggi critici, qualche giorno in più.' }];


  const [open, setOpen] = useStateB(0);

  return (
    <section className="section faq" id="faq">
      <div className="container">
        <div className="section-head">
          <div className="section-head__meta">
            <span className="eyebrow">06 · DOMANDE</span>
            <span className="label-mono">FAQ · 06 VOCI</span>
          </div>
          <h2>Le domande che mi fanno tutti, prima di iniziare.</h2>
        </div>

        <div className="faq__list">
          {items.map((it, i) =>
          <div className="faq__item" key={i} data-open={open === i ? 'true' : 'false'}>
              <button className="faq__q" onClick={() => setOpen(open === i ? -1 : i)}>
                <span>{it.q}</span>
                <span className="faq__q-mark">+</span>
              </button>
              <div className="faq__a">{it.a}</div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

/* ============== Contact — helpers ============== */
function readRuntimeConfig() {
  const cfg = window.APP_CONFIG || {};
  return {
    supabaseUrl:        String(cfg.SUPABASE_URL             || '').trim(),
    publishableKey:     String(cfg.SUPABASE_PUBLISHABLE_KEY || '').trim(),
    leadsTable:         String(cfg.SUPABASE_LEADS_TABLE     || 'leads').trim() || 'leads',
    emailjsPublicKey:   String(cfg.EMAILJS_PUBLIC_KEY       || '').trim(),
    emailjsServiceId:   String(cfg.EMAILJS_SERVICE_ID       || '').trim(),
    emailjsTemplateId:  String(cfg.EMAILJS_TEMPLATE_ID      || '').trim(),
  };
}

function buildLeadPayload(formData) {
  const value = (name) => String(formData.get(name) || '').trim();
  const via       = value('property_via');
  const civico    = value('property_civico');
  const cap       = value('property_cap');
  const comune    = value('property_comune');
  const provincia = value('property_provincia');
  const parts = [];
  if (via)       parts.push(civico ? `${via} ${civico}` : via);
  if (cap)       parts.push(cap);
  if (comune)    parts.push(comune);
  if (provincia) parts.push(`(${provincia.toUpperCase()})`);
  const property_address = parts.join(' – ');
  const message = value('message');
  return {
    full_name:        value('full_name'),
    email:            value('email'),
    phone:            value('phone'),
    property_type:    value('property_type'),
    property_address,
    intent:           value('intent'),
    message:          message || null,
    privacy_accepted: formData.get('privacy_accepted') === 'on',
    source_page:      `${window.location.pathname}${window.location.search}`,
    user_agent:       navigator.userAgent ? navigator.userAgent.slice(0, 500) : null
  };
}

async function insertLead(payload, config) {
  const endpoint = `${config.supabaseUrl.replace(/\/+$/, '')}/rest/v1/${encodeURIComponent(config.leadsTable)}`;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey:         config.publishableKey,
      Authorization:  `Bearer ${config.publishableKey}`,
      Prefer:         'return=minimal'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    let reason = 'Errore durante l\'invio della richiesta.';
    try {
      const body = await response.json();
      reason = body.message || body.hint || body.error_description || body.error || reason;
    } catch (_err) { /* no-op */ }
    throw new Error(reason);
  }
}

async function sendEmailNotification(payload, config) {
  if (!window.emailjs) return;
  if (!config.emailjsPublicKey || !config.emailjsServiceId || !config.emailjsTemplateId) return;

  const templateParams = {
    from_name:        payload.full_name,
    from_email:       payload.email,
    reply_to:         payload.email,
    phone:            payload.phone,
    property_type:    payload.property_type,
    property_address: payload.property_address,
    intent:           payload.intent,
    message:          payload.message || '—',
  };

  return window.emailjs.send(
    config.emailjsServiceId,
    config.emailjsTemplateId,
    templateParams,
    { publicKey: config.emailjsPublicKey }
  );
}

/* ============== Contact ============== */
function Contact() {
  const [status,        setStatus]        = useStateB('idle');
  const [errorMessage,  setErrorMessage]  = useStateB('');
  const [showPopup,     setShowPopup]     = useStateB(false);
  const [privacyChecked, setPrivacyChecked] = useStateB(getConsent());

  const config = readRuntimeConfig();
  const isEmailReady   = Boolean(config.emailjsPublicKey && config.emailjsServiceId && config.emailjsTemplateId && window.emailjs);
  const isConfigReady  = Boolean(config.supabaseUrl && config.publishableKey) || isEmailReady;
  const isLoading      = status === 'loading';

  /* Aggiorna la checkbox se il cookie banner viene accettato */
  useEffectB(() => {
    const handler = () => setPrivacyChecked(true);
    window.addEventListener('mb_consent_updated', handler);
    return () => window.removeEventListener('mb_consent_updated', handler);
  }, []);

  const closePopup = () => {
    setShowPopup(false);
    setStatus('idle');
  };

  const handle = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    if (!isConfigReady) {
      setStatus('error');
      setErrorMessage('Configurazione mancante. Verifica SUPABASE_URL o EMAILJS_* in config.js.');
      return;
    }

    const form     = e.currentTarget;
    const formData = new FormData(form);

    /* honeypot */
    const honeypot = String(formData.get('company') || '').trim();
    if (honeypot) {
      setShowPopup(true);
      setErrorMessage('');
      form.reset();
      return;
    }

    const fd       = (name) => String(formData.get(name) || '').trim();
    const via      = fd('property_via');
    const civico   = fd('property_civico');
    const cap      = fd('property_cap');
    const comune   = fd('property_comune');
    const provincia = fd('property_provincia');

    const payload = buildLeadPayload(formData);

    if (!payload.full_name || !payload.email || !payload.phone || !payload.property_type ||
        !via || !civico || !cap || !comune || !provincia ||
        !payload.intent || !payload.privacy_accepted) {
      setStatus('error');
      setErrorMessage('Compila tutti i campi obbligatori prima di inviare.');
      return;
    }

    if (payload.message && payload.message.length > 2500) {
      setStatus('error');
      setErrorMessage('Il messaggio supera la lunghezza massima consentita.');
      return;
    }

    try {
      setStatus('loading');
      setErrorMessage('');

      const hasSupabase = Boolean(config.supabaseUrl && config.publishableKey);

      if (hasSupabase) {
        await insertLead(payload, config);
        /* notifica email non bloccante — se fallisce non interrompe il flusso */
        sendEmailNotification(payload, config).catch(console.warn);
      } else {
        /* solo email — canale primario */
        await sendEmailNotification(payload, config);
      }

      /* registra il consenso privacy nel localStorage */
      setConsent();

      setStatus('success');
      form.reset();
      setShowPopup(true);
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.message || 'Invio non riuscito. Riprova tra poco.');
    }
  };

  return (
    <section className="section contact" id="contatto">
      {showPopup &&
        <div className="success-modal-overlay" role="dialog" aria-modal="true" aria-label="Richiesta inviata">
          <div className="success-modal">
            <div className="success-modal__icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="success-modal__title">Richiesta inviata con successo!</h3>
            <p className="success-modal__body">
              Ho ricevuto la tua richiesta. Ti contatto personalmente entro <strong>24 ore lavorative</strong> per concordare un primo confronto.
            </p>
            <button className="btn btn--primary success-modal__close" onClick={closePopup}>
              Torna al sito
            </button>
          </div>
        </div>
      }

      <div className="container">
        <div className="contact__grid">
          <div className="contact__intro">
            <span className="eyebrow eyebrow--light">07 · CONTATTO</span>
            <h2 style={{ marginTop: '12px' }}>Richiedi un primo confronto. <em>Senza impegno</em>.</h2>
            <p>Compila il form: ti rispondo personalmente entro 24 ore lavorative per concordare una prima chiamata di conoscenza e approfondimento.</p>

            <div className="contact__details">
              <div className="contact__detail">
                <span className="label-mono">TERRITORIO</span>
                <span>Roma e provincia / Lazio</span>
              </div>
              <div className="contact__detail">
                <span className="label-mono">Email diretta</span>
                <span>manuela@balsamo-advisor.it</span>
              </div>
              <div className="contact__detail">
                <span className="label-mono">Telefono</span>
                <span>+39 347 322 6424</span>
              </div>
              <div className="contact__detail">
                <span className="label-mono">Orari</span>
                <span>Lun–Ven · 09:30–19:00</span>
              </div>
            </div>
          </div>

          <form className="form" onSubmit={handle}>
            {status === 'error' &&
            <div className="form__error" data-shown="true">
                {errorMessage}
              </div>
            }
            {!isConfigReady &&
            <div className="form__error" data-shown="true">
                Configurazione non trovata. Inserisci i dati Supabase o EmailJS in <code>config.js</code> per abilitare il modulo.
              </div>
            }

            <div className="form__row">
              <div className="form__field">
                <label>Nome e Cognome <span className="req">*</span></label>
                <input type="text" name="full_name" required placeholder="Mario Rossi" />
              </div>
              <div className="form__field">
                <label>Email <span className="req">*</span></label>
                <input type="email" name="email" required placeholder="mario.rossi@email.it" />
              </div>
            </div>

            <div className="form__row">
              <div className="form__field">
                <label>Telefono <span className="req">*</span></label>
                <input type="tel" name="phone" required placeholder="+39 ..." />
              </div>
              <div className="form__field">
                <label>Tipologia immobile <span className="req">*</span></label>
                <select name="property_type" required defaultValue="">
                  <option value="" disabled>Seleziona…</option>
                  <option>Residenziale</option>
                  <option>Commerciale</option>
                  <option>Industriale</option>
                  <option>Agricolo</option>
                </select>
              </div>
            </div>

            <fieldset className="form__address-group">
              <legend className="form__address-legend">Indirizzo immobile <span className="req">*</span></legend>
              <div className="form__row form__row--via">
                <div className="form__field">
                  <label>Via / Piazza <span className="req">*</span></label>
                  <input type="text" name="property_via" required placeholder="es. Via Roma, Corso Italia…" />
                </div>
                <div className="form__field">
                  <label>N° Civico <span className="req">*</span></label>
                  <input type="text" name="property_civico" required placeholder="es. 12/A" />
                </div>
              </div>
              <div className="form__row form__row--loc">
                <div className="form__field">
                  <label>CAP <span className="req">*</span></label>
                  <input type="text" name="property_cap" required placeholder="00100" maxLength="5" pattern="[0-9]{5}" title="5 cifre" />
                </div>
                <div className="form__field">
                  <label>Comune <span className="req">*</span></label>
                  <input type="text" name="property_comune" required placeholder="es. Roma" />
                </div>
                <div className="form__field">
                  <label>Prov. <span className="req">*</span></label>
                  <input type="text" name="property_provincia" required placeholder="RM" maxLength="2" style={{ textTransform: 'uppercase' }} />
                </div>
              </div>
            </fieldset>

            <div className="form__field">
              <label>Comprare / Vendere <span className="req">*</span></label>
              <select name="intent" required defaultValue="">
                <option value="" disabled>Seleziona…</option>
                <option>Comprare</option>
                <option>Vendere</option>
              </select>
            </div>

            <div className="form__field">
              <label>Messaggio</label>
              <textarea name="message" rows="4" maxLength="2500" placeholder="Raccontami brevemente la tua situazione (facoltativo)"></textarea>
            </div>

            <div className="form__field form__honeypot" aria-hidden="true">
              <label htmlFor="company">Company</label>
              <input id="company" type="text" name="company" autoComplete="off" tabIndex="-1" />
            </div>

            <div className="form__field form__checkbox">
              <label className="form__checkbox-label">
                <input
                  type="checkbox"
                  name="privacy_accepted"
                  required
                  checked={privacyChecked}
                  onChange={(e) => {
                    setPrivacyChecked(e.target.checked);
                    if (e.target.checked) setConsent();
                  }}
                />
                <span>
                  Confermo di aver letto l'
                  <a href="privacy.html" target="_blank" rel="noopener" className="form__privacy-link">
                    informativa sulla privacy
                  </a>
                  {' '}e autorizzo il trattamento dei dati per essere ricontattato.
                </span>
              </label>
            </div>

            <div className="form__submit-row">
              <p className="form__legal">
                Inviando il modulo accetti l'
                <a href="privacy.html" target="_blank" rel="noopener">informativa privacy</a>.
                Nessuno spam, nessuna newsletter automatica.
              </p>
              <button type="submit" className="btn btn--primary" disabled={isLoading}>
                {isLoading ? 'Invio in corso...' : <React.Fragment>Invia richiesta <IconArrow /></React.Fragment>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>);

}

/* ============== Footer ============== */
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div>
            <div className="footer__brand">Manuela Balsamo</div>
            <div className="footer__tag">PERSONAL ADVISOR IMMOBILIARE · ROMA</div>
            <p style={{ marginTop: '16px', maxWidth: '42ch', fontSize: '13px', lineHeight: 1.6, color: 'var(--blueprint)' }}>
              "Meglio un'attenta analisi ora che un'operazione d'urgenza dopo." Due Diligence as a Service, a parcella fissa, indipendente.
            </p>
          </div>
          <div className="footer__col">
            <h4>Naviga</h4>
            <a href="#metodo">Metodo</a>
            <a href="#confronto">Confronto</a>
            <a href="#stress">I 4 Pilastri</a>
            <a href="#checkup">Check-up</a>
            <a href="#faq">FAQ</a>
            <a href="#contatto">Contatto</a>
          </div>
          <div className="footer__col">
            <h4>ZONA</h4>
            <p>Roma · Centro</p>
            <p>manuela@balsamo-advisor.it</p>
            <p>+39 347 322 6424</p>
            <p> </p>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© 2026 · MANUELA BALSAMO · ALL RIGHTS RESERVED</span>
          <span>
            <a href="privacy.html" style={{ color: 'inherit', textDecoration: 'none' }}>PRIVACY &amp; COOKIE</a>
          </span>
        </div>
      </div>
    </footer>);

}

/* ============== Cookie Banner ============== */
function CookieBanner() {
  const [visible, setVisible] = useStateB(!getConsent());

  const accept = () => {
    setConsent();
    setVisible(false);
    /* notifica il form contatti così pre-spunta la checkbox privacy */
    window.dispatchEvent(new Event('mb_consent_updated'));
  };

  if (!visible) return null;

  return (
    <div className="cookie-bar" role="region" aria-label="Informativa cookie">
      <p className="cookie-bar__text">
        Questo sito usa cookie tecnici necessari al funzionamento e Google Fonts (terze parti).
        Continuando la navigazione o compilando il modulo accetti l'
        <a href="privacy.html" target="_blank" rel="noopener">informativa sulla privacy</a>.
      </p>
      <div className="cookie-bar__actions">
        <a href="privacy.html" target="_blank" rel="noopener" className="cookie-bar__link">
          Maggiori info
        </a>
        <button className="btn btn--primary cookie-bar__btn" onClick={accept}>
          Accetta e chiudi
        </button>
      </div>
    </div>);

}

window.Bento      = Bento;
window.Trust      = Trust;
window.FAQ        = FAQ;
window.Contact    = Contact;
window.Footer     = Footer;
window.CookieBanner = CookieBanner;
