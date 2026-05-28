/* global React */
const { useState: useStateM, useEffect: useEffectM, useRef: useRefM } = React;

/* ============== Mobile swipe carousel — dots tracker ============== */
function useSwipeDotsM(trackRef, count) {
  const [active, setActive] = useStateM(0);
  useEffectM(() => {
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

function SwipeDotsM({ count, active, theme }) {
  return (
    <div className={`swipe__dots ${theme === 'dark' ? 'swipe__dots--dark' : ''}`} aria-hidden="true">
      {Array.from({ length: count }).map((_, i) =>
        <span key={i} className={`swipe__dot ${i === active ? 'is-active' : ''}`} />
      )}
    </div>);
}

/* ============== Tiny line icons for the T.A.I. cardinal points ============== */
const IconLedger = ({ size = 28 }) =>
<svg width={size} height={size} viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.4">
    <rect x="5.5" y="4.5" width="17" height="19" />
    <path d="M9 9h10M9 13h10M9 17h6" strokeLinecap="square" />
    <path d="M3 8h2.5M3 12h2.5M3 16h2.5M3 20h2.5" strokeLinecap="square" />
  </svg>;


const IconUnbind = ({ size = 28 }) =>
<svg width={size} height={size} viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.4">
    <circle cx="9" cy="14" r="4.2" />
    <circle cx="19" cy="14" r="4.2" />
    <path d="M2 14h2.5M23.5 14h2.5" strokeLinecap="square" />
    <path d="M11.5 11.5l5 5M16.5 11.5l-5 5" strokeLinecap="square" />
  </svg>;


const IconShield = ({ size = 28 }) =>
<svg width={size} height={size} viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.4">
    <path d="M14 3.5l8.5 3v7.7c0 5.6-3.7 8.5-8.5 10.3-4.8-1.8-8.5-4.7-8.5-10.3V6.5l8.5-3z" strokeLinejoin="miter" />
    <path d="M10 14l3 3 5-6" strokeLinecap="square" strokeLinejoin="miter" />
  </svg>;


const IconLens = ({ size = 28 }) =>
<svg width={size} height={size} viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.4">
    <circle cx="12" cy="12" r="6.5" />
    <path d="M16.8 16.8l6.2 6.2" strokeLinecap="square" />
    <path d="M9 12h6M12 9v6" strokeLinecap="square" />
  </svg>;


const IconArchive = ({ size = 28 }) =>
<svg width={size} height={size} viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.4">
    <path d="M4.5 7.5l4.5-3h10l4.5 3v16h-19z" strokeLinejoin="miter" />
    <path d="M4.5 11.5h19" strokeLinecap="square" />
    <path d="M11 15.5h6" strokeLinecap="square" />
    <path d="M11 18.5h6" strokeLinecap="square" />
  </svg>;


/* ============== T.A.I. — Cinque Punti Cardine ============== */
function Comparison() {
  const points = [
  {
    n: '01',
    label: 'COMPENSO',
    title: 'Parcella concordata in anticipo.',
    body: 'Compenso concordato in anticipo in base alle attività richieste e/o necessarie. Nessuna provvigione sul valore dell’immobile, nessuna sorpresa — sono un arbitro tecnico, non un mediatore.',
    icon: <IconLedger size={22} />
  },
  {
    n: '02',
    label: 'NESSUN VINCOLO',
    title: 'Solo la prestazione che serve.',
    body: 'Si riconosce solo il compenso della prestazione necessaria e quando serve. Nessun incarico vincolante o rinnovabile.',
    icon: <IconUnbind size={22} />
  },
  {
    n: '03',
    label: 'TUTELA',
    title: 'L’operazione è blindata.',
    body: 'Il lavoro viene svolto solo per una parte, anche se poi sarà fondamentale per tutti. Venditore e Acquirente potranno dedicarsi alla migliore trattativa senza dubbi o stress.',
    icon: <IconShield size={22} />
  },
  {
    n: '04',
    label: 'DUE DILIGENCE',
    title: 'Il cuore del servizio.',
    body: 'Analisi documentale, valutazione delle criticità e attività necessarie. Individuazione dei tecnici se necessari e predisposizione della due diligence per il notaio.',
    icon: <IconLens size={22} />
  },
  {
    n: '05',
    label: 'DOSSIER',
    title: 'Il lavoro è per sempre.',
    body: 'Dossier tecnico tracciato e documentato. Si sa cosa è stato fatto, cosa è stato verificato e risolto. Trasparenza totale per trattative attuali o future.',
    icon: <IconArchive size={22} />
  }];

  return (
    <section className="section" id="confronto" style={{ background: 'var(--ice-50)' }}>
      <div className="container">
        <div className="section-head">
          <div className="section-head__meta">
            <span className="eyebrow">03 · PUNTI CARDINE</span>
            <span className="label-mono">PUNTI CARDINE T.A.I. / 05</span>
          </div>
          <h2>Personal Advisor Immobiliare in cinque punti cardine.</h2>
          <p className="section-head__lede">Vendere o acquistare casa richiede un’analisi precisa: ogni immobile ha una storia urbanistica e legale a sé, e la vera criticità spesso si nasconde nei dettagli della singola pratica.</p>
        </div>

        <div className="pcards">
          {points.map((p) =>
            <article className="pcard" key={p.n}>
              <div className="pcard__watermark" aria-hidden="true">{p.n}</div>
              <div className="pcard__icon" aria-hidden="true">{p.icon}</div>
              <span className="pcard__tag label-mono">{p.label}</span>
              <h3 className="pcard__title">{p.title}</h3>
              <p className="pcard__body">{p.body}</p>
            </article>
          )}
        </div>
      </div>
    </section>);
}


/* ============== 4 Pillars of Stress ============== */
function Pillars() {
  const items = [
  {
    n: '01',
    tag: 'BUROCRAZIA',
    title: 'Rogito, Penale e Sicurezza.',
    body: 'La paura che l’affare salti, un impegno non rispettato per pratiche in disordine, le conseguenze materiali ed economiche. Basta una carta fuori posto per far saltare il tavolo. Trovarla prima del compromesso costa una frazione del danno che farà dopo.'
  },
  {
    n: '02',
    tag: 'COSTI FISSI',
    title: 'Svalutazione Immobiliare.',
    body: 'Intralci tecnici, tempi che si allungano, l’immobile che torna sul mercato per una trattativa saltata. Un aspetto spesso sottovalutato che incide direttamente sul valore del tuo immobile. Partire da subito col piede giusto significa vendere prima e al miglior prezzo.'
  },
  {
    n: '03',
    tag: 'SORPRESE',
    title: 'La Sorpresa che ribalta la trattativa.',
    body: 'Quando si accetta una proposta scritta, si firma un impegno contrattuale da non sottovalutare. La regolarità urbanistica e documentale è un obbligo di legge che non va mai sottovalutato. Spesso, non si tratta solo di restituire un acconto.'
  },
  {
    n: '04',
    tag: 'TRATTATIVA',
    title: 'La legge non ammette ignoranza.',
    body: 'Atti, planimetrie, sanatorie, APE, agibilità. Documenti scritti per addetti ai lavori che determinano se la tua casa può essere venduta oppure no. La regolarità urbanistica e documentale è indispensabile; il compenso dell’Advisor è una frazione che copre il lavoro tecnico.'
  }];

  const trackRef = useRefM(null);
  const active = useSwipeDotsM(trackRef, items.length);

  return (
    <section className="section section--navy" id="stress">
      <div className="container">
        <div className="section-head">
          <div className="section-head__meta">
            <span className="eyebrow eyebrow--light">02 · PAIN POINTS</span>
            <span className="label-mono" style={{ color: 'var(--blueprint)' }}>I 4 PILASTRI DELLO STRESS</span>
          </div>
          <h2>Quattro paure che bloccano una compravendita. Ognuna ha un antidoto tecnico.</h2>
        </div>

        <div className="pillars__grid swipe__track" ref={trackRef}>
          {items.map((p) =>
          <div className="pillar" key={p.n}>
              <span className="pillar__big-num" aria-hidden="true">{p.n}</span>
              <div className="pillar__num">
                <span>{p.tag}</span>
              </div>
              <h3 className="pillar__title">{p.title}</h3>
              <p className="pillar__body">{p.body}</p>
            </div>
          )}
        </div>
        <SwipeDotsM count={items.length} active={active} theme="dark" />
      </div>
    </section>);

}

/* ============== Check-up (Lead Magnet) ============== */
/* Diagramma "architect's plate": render 3D della casa su carta millimetrata
   con linee di connessione integrate; le 4 vignettature HTML sono
   posizionate sopra l'immagine per garantire accessibilità + animazione. */

const IconDoc = () =>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" strokeLinejoin="miter">
    <path d="M14 3 H6 V21 H18 V8 Z" />
    <path d="M14 3 V8 H18" />
    <path d="M9 13 H15 M9 17 H13" />
  </svg>;

const IconFlag = () =>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" strokeLinejoin="miter">
    <path d="M6 21 V4" />
    <path d="M6 4 H17 L14 8 L17 12 H6" />
  </svg>;

const IconMap = () =>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" strokeLinejoin="miter">
    <path d="M3 6 L9 4 L15 6 L21 4 V18 L15 20 L9 18 L3 20 Z" />
    <path d="M9 4 V18 M15 6 V20" />
  </svg>;

const IconCalc = () =>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" strokeLinejoin="miter">
    <rect x="5" y="3" width="14" height="18" />
    <rect x="8" y="6" width="8" height="3" />
    <path d="M8 13 h1 M11.5 13 h1 M15 13 h1 M8 16 h1 M11.5 16 h1 M15 16 h1 M8 19 h1 M11.5 19 h1 M15 19 h1" />
  </svg>;

function Checkup() {
  const steps = [
    { n: 'STEP / 01', pos: 'tl', Icon: IconDoc,
      title: 'Analisi Documentale Completa',
      body: 'Verifica incrociata di titoli di provenienza, planimetrie catastali, visure ipotecarie, certificazioni impianti.' },
    { n: 'STEP / 02', pos: 'tr', Icon: IconFlag,
      title: 'Rilevazione "Red Flags"',
      body: 'Individuazione immediata di tutte le criticità.' },
    { n: 'STEP / 03', pos: 'bl', Icon: IconMap,
      title: 'Roadmap di Risoluzione',
      body: 'Per ogni problema, una soluzione concreta.' },
    { n: 'STEP / 04', pos: 'br', Icon: IconCalc,
      title: 'Valutazione Costi di Regolarizzazione',
      body: 'Stima documentata di quanto servirà per mettere tutto a norma.' }
  ];

  const sectionRef = useRefM(null);
  const [visible, setVisible] = useStateM(false);

  useEffectM(() => {
    const node = sectionRef.current;
    if (!node) return;
    if (typeof IntersectionObserver === 'undefined') { setVisible(true); return; }
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`section checkup ${visible ? 'is-visible' : ''}`}
      id="checkup"
    >
      <div className="container">
        <div className="section-head">
          <div className="section-head__meta">
            <span className="eyebrow">01 · LEAD SERVICE</span>
            <span className="label-mono">CHECK-UP PREVENTIVO</span>
          </div>
          <h2>Il Check-up Immobiliare Preventivo.</h2>
          <p className="section-head__lede">È il punto di ingresso. Prima di mettere in vendita, prima di firmare un compromesso, prima di una caparra: una radiografia tecnica dell'immobile, in 4 step.</p>
        </div>

        <div
          className="checkup-diagram"
          role="img"
          aria-label="Diagramma del check-up immobiliare in 4 step"
        >
          <div className="checkup-diagram__paper">
            <img
              className="checkup-diagram__house"
              src="assets/checkup-house-only.png"
              alt=""
              aria-hidden="true"
            />

            <svg
              className="checkup-diagram__svg"
              viewBox="0 0 1000 600"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              {/* corner tick-marks (architect notation) */}
              <g className="sketch-ticks">
                <path d="M 30 30 L 60 30 M 30 30 L 30 60" />
                <path d="M 970 30 L 940 30 M 970 30 L 970 60" />
                <path d="M 30 570 L 60 570 M 30 570 L 30 540" />
                <path d="M 970 570 L 940 570 M 970 570 L 970 540" />
              </g>

              {/* Connector lines: from house edges out to vignettes */}
              <path className="sketch-connect c1" d="M 400 280 L 320 280 L 320 155 L 280 155" />
              <path className="sketch-connect c2" d="M 600 280 L 680 280 L 680 155 L 720 155" />
              <path className="sketch-connect c3" d="M 400 380 L 320 380 L 320 455 L 280 455" />
              <path className="sketch-connect c4" d="M 600 380 L 680 380 L 680 455 L 720 455" />

              {/* End pins where lines meet vignettes */}
              <circle className="sketch-pin p1" cx="280" cy="155" r="4" />
              <circle className="sketch-pin p2" cx="720" cy="155" r="4" />
              <circle className="sketch-pin p3" cx="280" cy="455" r="4" />
              <circle className="sketch-pin p4" cx="720" cy="455" r="4" />
            </svg>

            {steps.map((s) =>
              <article
                className={`checkup-vignette checkup-vignette--${s.pos}`}
                key={s.n}
              >
                <span className="checkup-vignette__step">{s.n}</span>
                <h4 className="checkup-vignette__title">{s.title}</h4>
                <p className="checkup-vignette__body">{s.body}</p>
                <div className="checkup-vignette__icon" aria-hidden="true">
                  <s.Icon />
                </div>
              </article>
            )}
          </div>
        </div>

        <div className="checkup__cta" style={{ marginTop: '48px', flexDirection: 'row', alignItems: 'center', gap: '20px' }}>
          <a href="#contatto" className="btn btn--primary">
            Richiedi il tuo Check-up
            <IconArrow />
          </a>
          <span className="label-mono" style={{ color: 'var(--ink-500)' }}>Risposta entro 48h · Preventivo scritto</span>
        </div>
      </div>
    </section>);
}

window.Comparison = Comparison;
window.Pillars = Pillars;
window.Checkup = Checkup;
