import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowDown, ArrowUpRight, MapPin, Menu, Phone, Star, X } from "lucide-react";
import { useState } from "react";

import { getGoogleRating } from "../lib/rating.functions";
import facade from "../assets/hula-fassade.jpeg.asset.json";
import foodOne from "../assets/hula-speise-1.jpeg.asset.json";
import foodTwo from "../assets/hula-speise-2.jpeg.asset.json";
import foodThree from "../assets/hula-speise-3.jpeg.asset.json";
import foodFour from "../assets/hula-speise-4.jpeg.asset.json";
import comboPlate from "../assets/hula-kombiteller.jpeg.asset.json";
import doughSticks from "../assets/hula-teigstangen.jpeg.asset.json";
import beefSalad from "../assets/hula-rindfleischsalat.jpeg.asset.json";
import roujiamo from "../assets/hula-roujiamo.jpeg.asset.json";


// No head() here: the home route inherits title/description/og/twitter from
// __root.tsx, and ships no og:image so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Hula Wien — Authentisch chinesisch" },
      { name: "description", content: "Hula ist ein chinesisches Restaurant in der Hütteldorfer Straße 137 in 1140 Wien. Dienstag bis Sonntag von 12:00 bis 21:00 Uhr geöffnet." },
      { property: "og:title", content: "Hula Wien — Authentisch chinesisch" },
      { property: "og:description", content: "Chinesische Küche in 1140 Wien. Öffnungszeiten, Kontakt, Speisen-Impressionen und Anfahrt." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const fetchRating = useServerFn(getGoogleRating);
  const { data: google } = useQuery({
    queryKey: ["google-rating"],
    queryFn: () => fetchRating(),
    staleTime: 1000 * 60 * 30,
  });
  const ratingText = typeof google?.rating === "number" ? google.rating.toFixed(1).replace(".", ",") : null;
  const countText = typeof google?.count === "number" ? `${google.count} ${google.count === 1 ? "Bewertung" : "Bewertungen"}` : null;


  return (
    <div className="min-h-screen overflow-hidden bg-night text-paper font-sans">
      <nav className="fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-night/95 to-night/20 px-5 py-5 backdrop-blur-sm md:px-10 md:py-7" aria-label="Hauptnavigation">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <a href="#start" className="font-serif text-2xl uppercase tracking-[0.18em] text-gold" aria-label="Hula Startseite">Hula</a>
          <div className="hidden items-center gap-12 text-[11px] font-medium uppercase tracking-[0.2em] md:flex">
            <a href="#restaurant" className="transition-colors hover:text-gold">Restaurant</a>
            <a href="#speisen" className="transition-colors hover:text-gold">Speisen</a>
            <Link to="/speisekarte" className="transition-colors hover:text-gold">Speisekarte</Link>
            <a href="#besuch" className="transition-colors hover:text-gold">Besuch</a>
          </div>
          <button type="button" onClick={() => setMenuOpen((open) => !open)} className="grid size-10 place-items-center text-paper md:hidden" aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"} aria-expanded={menuOpen}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {menuOpen && (
          <div className="mx-auto mt-5 grid max-w-7xl gap-4 border-t border-gold/20 py-5 text-sm uppercase tracking-[0.16em] md:hidden">
            <a href="#restaurant" onClick={closeMenu}>Restaurant</a>
            <a href="#speisen" onClick={closeMenu}>Speisen</a>
            <Link to="/speisekarte" onClick={closeMenu}>Speisekarte</Link>
            <a href="#besuch" onClick={closeMenu}>Besuch</a>
            <a href="tel:+4312399914" className="text-gold">Tisch reservieren</a>
          </div>
        )}
      </nav>

      <main>
        <header id="start" className="relative flex min-h-[92svh] items-center justify-center overflow-hidden">
          <img src={facade.url} alt="Die beleuchtete Fassade des Hula Restaurants in Wien bei Nacht" className="absolute inset-0 size-full object-cover object-center opacity-65" />
          <div className="absolute inset-0 bg-gradient-to-t from-night via-night/25 to-night/55" />
          <div className="hula-rise relative z-10 mx-auto max-w-5xl px-5 pt-20 text-center">
            <a href="https://maps.app.goo.gl/QNYJBAJWaCjMXiPZ9?g_st=iw" target="_blank" rel="noreferrer" className="mb-6 flex items-center justify-center gap-3 text-gold transition-colors hover:text-paper" aria-label={ratingText ? `${ratingText} von 5 Sternen bei ${countText} auf Google – Bewertungen auf Google ansehen` : "Bewertungen auf Google ansehen"}>
              <div className="flex gap-1">{Array.from({ length: 5 }).map((_, index) => <Star key={index} size={16} fill={!ratingText || index < Math.round(google?.rating ?? 0) ? "currentColor" : "none"} />)}</div>
              <span className="text-xs tracking-[0.14em]">{ratingText && countText ? `${ratingText} · ${countText}` : "Bewertungen auf Google"}</span>
            </a>

            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.32em] text-gold">Chinesisches Restaurant · Wien</p>
            <h1 className="font-serif text-6xl italic leading-[0.95] sm:text-7xl md:text-8xl lg:text-9xl">Hula</h1>
            <p className="mt-6 font-serif text-2xl italic text-paper/90 sm:text-3xl">Authentisch chinesisch</p>
            <a href="#restaurant" aria-label="Mehr über Hula erfahren" className="mx-auto mt-12 grid size-12 place-items-center rounded-full border border-gold/40 text-gold transition-colors hover:bg-gold hover:text-night"><ArrowDown size={18} /></a>
          </div>
        </header>

        <section id="restaurant" className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 md:grid-cols-2 md:gap-24 md:py-32">
          <div>
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.24em] text-gold">Willkommen im Hula</p>
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">Chinesische Küche trifft auf <span className="italic text-gold">Wiener Gastlichkeit</span></h2>
            <p className="mt-8 max-w-xl text-base leading-8 text-paper/70">In der Hütteldorfer Straße erwartet Sie chinesische Küche in warmer, persönlicher Atmosphäre. Entdecken Sie unsere frisch angerichteten Speisen und genießen Sie eine entspannte Auszeit im 14. Bezirk.</p>
            <div className="mt-10 grid grid-cols-2 gap-8 border-t border-gold/20 pt-8">
              <a href="https://maps.app.goo.gl/QNYJBAJWaCjMXiPZ9?g_st=iw" target="_blank" rel="noreferrer" className="block transition-colors hover:text-gold"><div className="font-serif text-4xl text-gold">{ratingText ?? "★"}</div><div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-paper/50">{countText ? `Google · ${countText}` : "Google-Bewertung"}</div></a>
              <div><div className="font-serif text-4xl text-gold">14.</div><div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-paper/50">Bezirk Wien</div></div>
            </div>
          </div>
          <figure className="relative mx-auto w-full max-w-lg overflow-hidden">
            <img src={foodThree.url} alt="Wärmende chinesische Suppe mit Rindfleisch und Tofu" className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-[1.02]" />
            <figcaption className="absolute bottom-0 left-0 bg-night/90 px-5 py-3 text-[10px] uppercase tracking-[0.18em] text-gold backdrop-blur">Frisch serviert</figcaption>
          </figure>
        </section>

        <section id="speisen" className="bg-night-soft py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div><p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-gold">Aus unserer Küche</p><h2 className="font-serif text-4xl sm:text-5xl">Speisen-Impressionen</h2></div>
              <p className="max-w-sm text-sm leading-6 text-paper/60">Ein Blick auf die Vielfalt, Farben und Aromen, die im Hula auf den Tisch kommen.</p>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              <img src={foodTwo.url} alt="Knusprige chinesische Teigtaschen mit Sauce" className="aspect-square size-full object-cover" />
              <div className="flex min-h-64 flex-col items-center justify-center border border-gold/15 bg-gold/5 p-10 text-center"><Star size={20} className="mb-6 text-gold" /><h3 className="font-serif text-3xl italic">Die Kunst des Geschmacks</h3><p className="mt-4 text-[10px] uppercase tracking-[0.18em] text-paper/50">Mit Sorgfalt angerichtet</p></div>
              <img src={foodOne.url} alt="Chinesisches Rindfleisch mit Paprika und frischen Kräutern" className="aspect-square size-full object-cover" />
              <img src={foodFour.url} alt="Chinesische Morcheln mit Sesam und Gemüse" className="aspect-square size-full object-cover md:col-span-1" />
              <div className="relative min-h-72 overflow-hidden md:col-span-2">
                <img src={beefSalad.url} alt="Mariniertes Rindfleisch mit frischem Gemüse und Kräutern" className="absolute inset-0 size-full object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-r from-night/60 to-transparent" />
                <p className="absolute bottom-7 left-7 font-serif text-3xl italic">Wärmend. Aromatisch. Hula.</p>
              </div>
              <img src={comboPlate.url} alt="Hula-Kombination mit Suppe, Teigtaschen und Frühlingsrollen" className="aspect-square size-full object-cover" />
              <img src={doughSticks.url} alt="Goldbraun gebackene Teigstangen mit Chili-Gewürz" className="aspect-square size-full object-cover" />
              <img src={roujiamo.url} alt="Gefüllte chinesische Fladenbrote mit knusprigem Hühnerfleisch" className="aspect-square size-full object-cover" />
            </div>
            <p className="mt-8 text-center text-xs leading-6 text-paper/50">Unsere komplette Speisekarte finden Sie <Link to="/speisekarte" className="text-gold underline underline-offset-4 transition-colors hover:text-paper">hier</Link>. Für Fragen zu Speisen und Allergenen rufen Sie uns gerne an.</p>
          </div>
        </section>

        <section id="besuch" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <div className="mb-14"><p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-gold">Ihr Besuch</p><h2 className="font-serif text-4xl sm:text-5xl">Wir freuen uns auf Sie.</h2></div>
          <div className="grid gap-14 md:grid-cols-3 md:gap-16">
            <div>
              <div className="mb-7 flex items-center gap-3 text-gold"><MapPin size={17} /><h3 className="text-xs font-semibold uppercase tracking-[0.18em]">Standort</h3></div>
              <address className="font-serif text-2xl not-italic">Hütteldorfer Str. 137<br /><span className="text-paper/60">1140 Wien, Österreich</span></address>
              <a href="https://www.google.com/maps/dir/?api=1&destination=H%C3%BCtteldorfer%20Str.%20137%2C%201140%20Wien" target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 border-b border-gold/40 pb-1 text-xs uppercase tracking-[0.14em] text-gold">Route planen <ArrowUpRight size={14} /></a>
            </div>
            <div>
              <div className="mb-7 flex items-center gap-3 text-gold"><Phone size={17} /><h3 className="text-xs font-semibold uppercase tracking-[0.18em]">Reservierung</h3></div>
              <a href="tel:+4312399914" className="font-serif text-3xl transition-colors hover:text-gold">01 2399914</a>
              <p className="mt-4 text-sm leading-6 text-paper/55">Reservieren Sie Ihren Tisch bequem telefonisch während unserer Öffnungszeiten.</p>
            </div>
            <div>
              <h3 className="mb-7 text-xs font-semibold uppercase tracking-[0.18em] text-gold">Öffnungszeiten</h3>
              <dl className="space-y-4 text-sm">
                <div className="flex justify-between border-b border-paper/10 pb-3"><dt>Dienstag – Sonntag</dt><dd>12:00 – 21:00</dd></div>
                <div className="flex justify-between text-paper/45"><dt>Montag</dt><dd className="italic">Geschlossen</dd></div>
              </dl>
              <p className="mt-6 text-xs text-paper/40">An Feiertagen können die Öffnungszeiten abweichen.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gold/15 bg-night-soft px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <div><div className="font-serif text-2xl uppercase tracking-[0.16em] text-gold">Hula</div><p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-paper/40">Chinesisches Restaurant · Wien</p></div>
          <div className="text-xs leading-6 text-paper/50"><p>Hütteldorfer Str. 137 · 1140 Wien</p><a href="tel:+4312399914" className="hover:text-gold">01 2399914</a></div>
          <p className="text-[10px] uppercase tracking-[0.14em] text-paper/30">© 2026 Hula Restaurant Wien</p>
        </div>
      </footer>
    </div>
  );
}
