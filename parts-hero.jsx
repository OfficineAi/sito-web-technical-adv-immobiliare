/* global React */
const { useState } = React;

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
          <a href="#checkup" onClick={() => setOpen(false)}>Check-up</a>
          <a href="#stress" onClick={() => setOpen(false)}>I 4 Pilastri</a>
          <a href="#confronto" onClick={() => setOpen(false)}>Confronto</a>
          <a href="#metodo" onClick={() => setOpen(false)}>Metodo</a>
          <a href="chi-sono.html" onClick={() => setOpen(false)}>Chi sono</a>
          <a href="#faq" onClick={() => setOpen(false)}>FAQ</a>
          <a href="#contatto" className="nav__contatto-mobile" onClick={() => setOpen(false)}>Contatto</a>
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

/* ============== Hero (variante dossier — unica in produzione) ============== */
function HeroDossier() {
  return (
    <section className="hero hero--dossier" id="top">
      <div className="hero__inner">
        <div className="hero__dossier-grid">
          <div className="hero__dossier-panel">
            <div className="hero__grid-bg" />
            <div className="hero__dossier-panel-content">
              <div className="hero__topbar">
                <div><span className="dot" /> TECHNICAL ADVISOR IMMOBILIARE · ROMA</div>
                <div>FILE NO. 001 / ODD</div>
              </div>
              <span className="eyebrow eyebrow--light">DUE DILIGENCE IMMOBILIARE</span>
              <h1 className="hero__h1" style={{ marginTop: '18px' }}>
                Vendi o compri da privato?<br />
                <em>Blinda il tuo affare.</em>
              </h1>
              <p className="hero__sub">
                Non sono un venditore né un intermediario, ma un Problem Solver
                strategico: un lavoro trasparente e imparziale per blindare la tua
                compravendita, prima che qualcun altro ne trovi le crepe.
              </p>
              <div className="hero__cta-row">
                <a href="#checkup" className="btn btn--primary">
                  Avvia il Check-up
                  <IconArrow />
                </a>
                <a href="#metodo" className="btn btn--outline">Il mio metodo</a>
              </div>
            </div>
          </div>

          <div className="hero__dossier-photo">
            <img src="assets/manuela-hero-new.png" alt="Manuela Balsamo, Technical Advisor Immobiliare" />
            <div className="hero__cutout-tag" style={{ top: '24px', left: '12px' }}>
              <span className="dot" /> <span style={{ fontSize: '10px' }}>MANUELA BALSAMO · ROMA</span>
            </div>
            <div className="hero__cutout-stamp" style={{ right: '20px', bottom: '36px' }}>
              <div className="stamp-line">FILE&nbsp;NO.</div>
              <div className="stamp-num">001/ODD</div>
              <div className="stamp-line">DUE DILIGENCE</div>
            </div>
          </div>
        </div>

        <div className="hero__dossier-meta">
          <div className="cell">
            <div className="num">70<span className="num__pct">%</span></div>
            <div className="label">delle transazioni non rispetta i tempi concordati</div>
          </div>
          <div className="cell">
            <div className="num">40<span className="num__pct">%</span></div>
            <div className="label">si blocca per incongruenze tecnico-documentali</div>
          </div>
          <div className="cell">
            <div className="num">15<span className="num__pct">%</span></div>
            <div className="label">dei preliminari non arriva a Rogito</div>
          </div>
          <div className="cell cell--accent">
            <div className="num num--accent">0<span className="num__pct">%</span></div>
            <div className="label">in quale statistica vuoi rientrare?</div>
          </div>
        </div>
      </div>
    </section>);

}

function Hero() {
  return <HeroDossier />;
}

window.Nav = Nav;
window.Hero = Hero;
window.IconArrow = IconArrow;
window.IconCheck = IconCheck;
window.IconX = IconX;
