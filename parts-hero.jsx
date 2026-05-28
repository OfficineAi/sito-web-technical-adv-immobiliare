/* global React */
const { useState, useEffect: useEffectH, useRef: useRefH } = React;

/* ============== Mobile swipe carousel — dots tracker (Hero) ============== */
function useSwipeDotsH(trackRef, count) {
  const [active, setActive] = useState(0);
  useEffectH(() => {
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

function SwipeDotsH({ count, active }) {
  return (
    <div className="swipe__dots swipe__dots--dark hero__metrics-dots" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) =>
        <span key={i} className={`swipe__dot ${i === active ? 'is-active' : ''}`} />
      )}
    </div>);
}

/* ============== Tiny SVG icons ============== */
const IconArrow = ({ size = 14 }) =>
<svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M2 7h10M8 3l4 4-4 4" strokeLinecap="square" />
  </svg>;


const IconCheck = ({ size = 18 }) =>
<svg width={size} height={size} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M3 9.5l4 4 8-8.5" strokeLinecap="square" strokeLinejoin="miter" />
  </svg>;


const IconX = ({ size = 18 }) =>
<svg width={size} height={size} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M4 4l10 10M14 4L4 14" strokeLinecap="square" />
  </svg>;


/* ============== Nav ============== */
function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className={`nav ${open ? 'nav--open' : ''}`}>
      <div className="nav__inner">
        <a href="#top" className="nav__brand">
          <span className="nav__brand-mark">MB</span>
          <span>Manuela&nbsp;Balsamo</span>
        </a>
        <div className="nav__links">
          <a href="#metodo" onClick={() => setOpen(false)}>Metodo</a>
          <a href="#confronto" onClick={() => setOpen(false)}>Confronto</a>
          <a href="#stress" onClick={() => setOpen(false)}>I 4 Pilastri</a>
          <a href="#checkup" onClick={() => setOpen(false)}>Check-up</a>
          <a href="chi-sono.html" onClick={() => setOpen(false)}>Chi sono</a>
          <a href="#faq" onClick={() => setOpen(false)}>FAQ</a>
        </div>
        <a href="#contatto" className="nav__cta">Richiedi un confronto</a>
        <button
          className="nav__burger"
          aria-label={open ? 'Chiudi menu' : 'Apri menu'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>);

}

/* ============== Hero (3 varianti) ============== */
function HeroDefault() {
  return (
    <section className="hero" id="top">
      <div className="hero__grid-bg" />
      <div className="hero__inner">
        <div className="hero__topbar">
          <div><span className="dot" /> TECHNICAL ADVISOR · ROMA</div>
          <div>EST. 2018 · ALBO N° 4421</div>
        </div>

        <h1 className="hero__h1">
          Vendere casa<br />
          senza lo scudo tecnico<br />
          è un <em>rischio</em><br />
          che non puoi permetterti.
        </h1>

        <p className="hero__sub">
          Sono Manuela Balsamo, Personal Advisor Immobiliare indipendente.
          Non lavoro a provvigione. Lavoro a parcella per blindare ogni operazione,
          prima che qualcun altro ne trovi le crepe.
        </p>

        <div className="hero__cta-row">
          <a href="#checkup" className="btn btn--primary">
            Scopri il tuo Check-up Immobiliare
            <IconArrow />
          </a>
          <a href="#confronto" className="btn btn--outline">
            Perché non un'agenzia?
          </a>
        </div>

        <div className="hero__metrics">
          <div className="hero__metric">
            <div className="hero__metric-num"><em>~&nbsp;€5k</em></div>
            <div className="hero__metric-label">Risparmio medio<br />rispetto alle agenzie</div>
          </div>
          <div className="hero__metric">
            <div className="hero__metric-num"><em>1 su 4</em></div>
            <div className="hero__metric-label">Compravendite con<br />difformità non dichiarate</div>
          </div>
          <div className="hero__metric">
            <div className="hero__metric-num"><em>2x</em></div>
            <div className="hero__metric-label">Caparra da restituire<br />se la vendita salta</div>
          </div>
          <div className="hero__metric">
            <div className="hero__metric-num"><em>0%</em></div>
            <div className="hero__metric-label">Provvigioni sul<br />valore dell'immobile</div>
          </div>
        </div>
      </div>
    </section>);

}

function HeroSplit() {
  const metricsRef = useRefH(null);
  const activeMetric = useSwipeDotsH(metricsRef, 4);

  return (
    <section className="hero hero--split" id="top">
      <div className="hero__grid-bg" />
      <div className="hero__inner">
        <div className="hero__topbar" style={{ gridColumn: '1 / -1' }}>
          <div><span className="dot" /> PERSONAL ADVISOR IMMOBILIARE · ROMA</div>
          <div>METODO 04 · STEP DOCUMENTATI</div>
        </div>

        <div className="hero__text-top">
          <span className="eyebrow eyebrow--light">FILE NO. 001 / DUE DILIGENCE</span>
          <h1 className="hero__h1" style={{ marginTop: '24px', color: "rgb(244, 246, 248)", fontSize: "58px", width: "607.188px" }}>
            Vendi o<em style={{ color: "rgb(20, 184, 166)" }}><span style={{ color: "#f4f6f8" }}> Compri da privato?</span></em> <span style={{ color: "#14b8a6" }}>
Blinda il tuo affare</span><br />
            <span style={{ color: "#14b8a6" }}>con un piccolo investimento che vale<br />Oro</span><br />
            
          </h1>
          <p className="hero__sub" style={{ fontSize: "15px", color: "rgb(214, 219, 223)" }}><span style={{ color: "#f4f6f8" }}><span style={{ color: "rgb(20, 184, 166)" }}></span></span>Non sono un venditore né un intermediario ma un Problem Solver Strategico che svolge un lavoro trasparente ed imparziale per blindare la tua compravendita immobiliare.<br />Vendere e comprare tra privati conviene, ma solo se investi in sicurezza!
          </p>
        </div>

        <div className="hero__image-wrap hero__image-wrap--cutout">
          <img src="assets/manuela-cutout.png" alt="Manuela Balsamo, Personal Advisor Immobiliare" />
          <div className="hero__cutout-tag" style={{ textAlign: 'left', gap: '10px', flexDirection: 'row', alignItems: 'center', padding: '10px 14px', top: '-2%', left: '-8%' }}>
            <span className="dot" /> <span style={{ fontSize: '11px' }}>MANUELA BALSAMO · PERSONAL ADVISOR IMMOBILIARE</span>
          </div>
          <div className="hero__cutout-stamp">
            <div className="stamp-line">FILE&nbsp;NO.</div>
            <div className="stamp-num">001 / DD</div>
            <div className="stamp-line">DUE DILIGENCE</div>
          </div>
        </div>

        <div className="hero__text-bottom">
          <div className="hero__cta-row">
            <a href="#checkup" className="btn btn--primary">
              Avvia il Check-up
              <IconArrow />
            </a>
            <a href="#metodo" className="btn btn--outline">Il mio metodo</a>
          </div>
        </div>

        <div className="hero__metrics swipe__track" ref={metricsRef} style={{ gridColumn: '1 / -1' }}>
          <div className="hero__metric">
            <div className="hero__metric-num"><em>25 %</em></div>
            <div className="hero__metric-label" style={{ fontSize: "10.5px" }}><span style={{ color: 'rgb(244, 246, 248)' }}>trattative in Italia che saltano per mancanze documentali, abusi edilizi e difformità tecnico-catastali.</span></div>
          </div>
          <div className="hero__metric">
            <div className="hero__metric-num"><em> 1 su 4</em></div>
            <div className="hero__metric-label"><span style={{ color: 'rgb(206, 211, 217)' }}><span style={{ color: 'rgb(218, 221, 227)' }}><span style={{ color: 'rgb(240, 243, 245)' }}> COMPRAVENDITE CON VIZI OCCULTI</span></span></span></div>
          </div>
          <div className="hero__metric">
            <div className="hero__metric-num"><em> 2 x</em></div>
            <div className="hero__metric-label"><span style={{ color: 'rgb(228, 231, 235)' }}> CAPARRA DA RESTITUIRE SE LA   VENDITA SALTA</span></div>
          </div>
          <div className="hero__metric">
            <div className="hero__metric-num"><em> 0%</em></div>
            <div className="hero__metric-label"><span style={{ color: 'rgb(217, 221, 226)' }}> PROVVIGIONI SUL VALORE CASA</span></div>
          </div>
        </div>
        <SwipeDotsH count={4} active={activeMetric} />
      </div>
    </section>);}function HeroData() {
  return (
    <section className="hero hero--data" id="top">
      <div className="hero__grid-bg" />
      <div className="hero__inner">
        <div className="hero__topbar">
          <div><span className="dot" /> DATA · MERCATO ITALIA · 2024</div>
          <div>FONTI: NOTARIATO · ABI · ISTAT</div>
        </div>

        <span className="eyebrow eyebrow--light">REPORT 24/RE · ANOMALIE STRUTTURALI</span>
        <h1 className="hero__h1" style={{ marginTop: '20px' }}>
          La maggior parte delle compravendite<br />
          ha un <em>vizio nascosto</em>.<br />
          Solo che lo scopri al rogito.
        </h1>
        <p className="hero__sub">
          I numeri non mentono. Senza una due diligence preventiva,
          ogni vendita è un'operazione a fiducia. Io tolgo la fiducia
          dall'equazione e ci metto la verifica.
        </p>

        <div className="hero__data-grid">
          <div className="hero__data-cell">
            <span className="tag">VIZ.URB.</span>
            <div className="num"><em>78</em><span className="num-suffix">%</span></div>
            <div className="desc">degli immobili italiani presenta almeno una difformità urbanistica documentale.</div>
          </div>
          <div className="hero__data-cell">
            <span className="tag">CAP.CONF.</span>
            <div className="num"><em>2</em><span className="num-suffix">x</span></div>
            <div className="desc">la caparra che il venditore deve restituire se l'atto salta per documenti non conformi.</div>
          </div>
          <div className="hero__data-cell">
            <span className="tag">PROV.MED.</span>
            <div className="num"><em>3</em><span className="num-suffix">%</span></div>
            <div className="desc">il costo medio dell'agenzia. Su un immobile da €350k sono €10.500 — senza alcuna garanzia tecnica.</div>
          </div>
        </div>

        <div className="hero__cta-row">
          <a href="#checkup" className="btn btn--primary">Scopri il Check-up <IconArrow /></a>
          <a href="#confronto" className="btn btn--outline">Confronto agenzia vs advisor</a>
        </div>
      </div>
    </section>);

}

function Hero({ variant }) {
  if (variant === 'split') return <HeroSplit />;
  if (variant === 'data') return <HeroData />;
  return <HeroDefault />;
}

window.Nav = Nav;
window.Hero = Hero;
window.IconArrow = IconArrow;
window.IconCheck = IconCheck;
window.IconX = IconX;
