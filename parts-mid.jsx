/* global React */

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

        <div className="pillars__grid">
          {items.map((p) =>
          <div className="pillar" key={p.n}>
              <div className="pillar__num">
                <span>{p.tag}</span>
                <span className="pillar__num-mark">{p.n}</span>
              </div>
              <h3 className="pillar__title">{p.title}</h3>
              <p className="pillar__body">{p.body}</p>
            </div>
          )}
        </div>
      </div>
    </section>);

}

/* ============== Check-up (Lead Magnet) ============== */
function Checkup() {
  const steps = [
  {
    n: 'STEP / 01',
    title: 'Analisi Documentale Completa',
    body: 'Verifica incrociata di titoli di provenienza, planimetrie catastali, visure ipotecarie, certificazioni impianti. Niente è dato per buono finché non torna su tutti i piani.'
  },
  {
    n: 'STEP / 02',
    title: 'Rilevazione “Red Flags”',
    body: 'Individuazione immediata di criticità: successioni aperte, difformità urbanistiche, gravami, vincoli paesaggistici, abusi sanati o sanabili. Ogni anomalia viene tracciata e tipizzata.'
  },
  {
    n: 'STEP / 03',
    title: 'Roadmap di Risoluzione',
    body: 'Per ogni problema, una soluzione concreta. Non solo “non va bene”: ti spiego come si risolve, chi va interpellato, in che ordine, in quanto tempo.'
  },
  {
    n: 'STEP / 04',
    title: 'Valutazione Costi di Regolarizzazione',
    body: 'Stima documentata di quanto servirà per mettere tutto a norma. Entra direttamente nel tuo budget di vendita o trattativa, senza sorprese a metà operazione.'
  }];


  return (
    <section className="section checkup" id="checkup">
      <div className="container">
        <div className="section-head">
          <div className="section-head__meta">
            <span className="eyebrow">01 · LEAD SERVICE</span>
            <span className="label-mono">CHECK-UP PREVENTIVO</span>
          </div>
          <h2>Il Check-up Immobiliare Preventivo.</h2>
          <p className="section-head__lede">È il punto di ingresso. Prima di mettere in vendita, prima di firmare un compromesso, prima di una caparra: una radiografia tecnica dell’immobile, in 4 step.


          </p>
        </div>

        <div className="checkup__shell">
          <div className="checkup__intro">
            <div className="checkup__report-tag"><span className="dot" /> REPORT TECNICO · DOC.MB-CHK</div>
            <h3>Una diagnosi prima della terapia.</h3>
            <p>Che tu voglia vendere o comprare, otterrai un dossier completo che fotografa lo stato reale dell’immobile dal punto di vista documentale, urbanistico e catastale. Se ci sono questioni da risolvere, saprai dove, come e con chi.</p>
            <p>Un lavoro tracciato che vale per sempre, con documenti pronti da condividere con notaio, banca e perito.</p>
            <p><strong>Il risultato?</strong><br />Dedicati alla tua compravendita senza stress!</p>
            <div className="checkup__cta">
              <a href="#contatto" className="btn btn--primary">
                Richiedi il Check-up
                <IconArrow />
              </a>
              <span style={{
                fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.1em',
                color: 'var(--blueprint)', textTransform: 'uppercase'
              }}>
                Parcella fissa · concordata in anticipo
              </span>
            </div>
          </div>

          <div className="checkup__steps">
            {steps.map((s) =>
            <div className="checkup__step" key={s.n}>
                <div className="checkup__step-num">{s.n}</div>
                <div>
                  <h4 className="checkup__step-title">{s.title}</h4>
                  <p className="checkup__step-body">{s.body}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

}

window.Comparison = Comparison;
window.Pillars = Pillars;
window.Checkup = Checkup;
