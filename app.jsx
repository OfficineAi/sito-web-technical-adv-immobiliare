/* global React, ReactDOM */
const { useEffect } = React;

const TWEAK_DEFAULTS = {
  heroVariant: "dossier",
  showGrid: true,
  theme: "shield",
  methodLayout: "grid",
};

function App() {
  const tweaks = TWEAK_DEFAULTS;

  useEffect(() => {
    document.documentElement.classList.toggle('hide-grid', !tweaks.showGrid);
  }, [tweaks.showGrid]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', tweaks.theme || 'shield');
  }, [tweaks.theme]);

  return (
    <>
      <Nav />
      <Hero variant={tweaks.heroVariant} />
      <Checkup />
      <Pillars />
      <Trust />
      <Bento />
      <Comparison layout={tweaks.methodLayout} />
      <FAQ />
      <Contact />
      <Footer />
      <CookieBanner />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
