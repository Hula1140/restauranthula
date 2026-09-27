import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Flame, Leaf, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";

export const Route = createFileRoute("/speisekarte")({
  head: () => ({
    meta: [
      { title: "Speisekarte — Hula Wien" },
      { name: "description", content: "Die Speisekarte des Hula Restaurants in Wien: Vorspeisen, Hula-Suppe, Jiaozi, Baozi, Kombimenü, Desserts und Getränke. Hütteldorfer Str. 137, 1140 Wien." },
      { property: "og:title", content: "Speisekarte — Hula Wien" },
      { property: "og:description", content: "Vorspeisen, Hula-Suppe, Jiaozi, Baozi, Kombimenü, Desserts und Getränke im Hula Wien." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/speisekarte" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/speisekarte" }],
  }),
  component: SpeisekartePage,
});

function Badges({ hot, veg }: { hot?: boolean | undefined; veg?: boolean | undefined }) {
  if (!hot && !veg) return null;
  return (
    <span className="ml-3 inline-flex items-center gap-2 align-middle text-[10px] uppercase tracking-[0.14em] text-gold/80">
      {hot && <span className="inline-flex items-center gap-1"><Flame size={12} />Scharf</span>}
      {veg && <span className="inline-flex items-center gap-1"><Leaf size={12} />Vegetarisch</span>}
    </span>
  );
}

function MenuItem({ name, zh, price, priceLabel, allergens, hot, veg, children }: {
  name: string;
  zh?: string;
  price?: string;
  priceLabel?: string;
  allergens?: string;
  hot?: boolean;
  veg?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-paper/10 py-5">
      <div className="min-w-0">
        <h4 className="font-serif text-xl leading-snug text-paper">
          {name}
          {zh && <span className="ml-2 text-sm text-gold/70">{zh}</span>}
          <Badges hot={hot} veg={veg} />
        </h4>
        {children && <p className="mt-1.5 text-sm leading-6 text-paper/60">{children}</p>}
        {allergens && (
          <p className="mt-1.5 text-[10px] uppercase tracking-[0.16em] text-paper/35">Allergene: {allergens}</p>
        )}
      </div>
      {price && (
        <div className="whitespace-nowrap font-serif text-lg text-gold">
          {priceLabel && <span className="mr-2 text-xs uppercase tracking-[0.12em] text-paper/40">{priceLabel}</span>}
          {price}
        </div>
      )}
    </div>
  );
}

function SectionHeading({ zh, title, hint }: { zh: string; title: string; hint?: string }) {
  return (
    <div className="mb-4 mt-16 first:mt-0">
      <p className="text-xs tracking-[0.3em] text-gold/80">{zh}</p>
      <h2 className="mt-1 font-serif text-4xl text-paper">{title}</h2>
      {hint && <p className="mt-2 text-sm text-paper/50">{hint}</p>}
    </div>
  );
}

function DrinksTable({ rows }: { rows: { name: string; volume: string; price: string }[] }) {
  return (
    <div className="border-t border-paper/10">
      {rows.map((row) => (
        <div key={row.name + row.volume} className="flex items-baseline justify-between gap-6 border-b border-paper/10 py-4 text-sm">
          <span className="text-paper/85">{row.name}</span>
          <span className="flex items-baseline gap-6">
            <span className="text-paper/45">{row.volume}</span>
            <span className="font-serif text-base text-gold">{row.price}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

function SpeisekartePage() {
  return (
    <div className="min-h-screen bg-night text-paper font-sans">
      <header className="mx-auto max-w-4xl px-6 pb-4 pt-28 md:pt-32">
        <Link to="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-gold transition-colors hover:text-paper">
          <ArrowLeft size={14} /> Zur Startseite
        </Link>
        <p className="mt-10 text-[11px] font-medium uppercase tracking-[0.32em] text-gold">Chinesisches Restaurant · Wien</p>
        <h1 className="mt-3 font-serif text-5xl italic leading-tight sm:text-6xl">Speisekarte</h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-paper/70">
          Hausgemachte Spezialitäten aus der Küche des Hula — von Vorspeisen und unserer Hula-Suppe bis zu Teigtaschen, Kombimenü und Desserts.
        </p>
      </header>

      <main className="mx-auto max-w-4xl px-6 pb-10">
        <section>
          <SectionHeading zh="前菜" title="Vorspeisen" />
          <MenuItem name="Marinierter Rindfleisch" zh="红油牛肉" price="6,9" hot allergens="A, F, N">Chili-Öl / Rinderwade / Paprika / Gurken</MenuItem>
          <MenuItem name="Koriander Rindfleisch" zh="香菜牛肉" price="6,9" hot allergens="A, F, N">Koriander / Chili / Rindfleisch / Karotten</MenuItem>
          <MenuItem name="Edamame" zh="毛豆" price="5,9" veg allergens="F">Edamame</MenuItem>
          <MenuItem name="Tofuhäutchen Salat" zh="凉拌豆皮" price="5,9" hot veg allergens="A, F, N">Tofuhäutchen / Paprika / Karotten</MenuItem>
          <MenuItem name="Morcheln Salat" zh="拌木耳" price="5,9" veg allergens="F, N">Morcheln / Paprika / Knoblauch</MenuItem>
          <MenuItem name="Gurkensalat" zh="拍黄瓜" price="5,9" veg allergens="F, N">Gurken / Knoblauch</MenuItem>
        </section>

        <section>
          <SectionHeading zh="小吃" title="Kleine Gerichte" />
          <MenuItem name="Roujiamo" zh="里脊肉夹馍" price="6,5" allergens="A, F, M, N">Hausgemachtes Fladenbrot mit Hühnerfleisch</MenuItem>
          <MenuItem name="Rindfleisch Pfannkuchen" zh="牛肉饼" price="8,0" allergens="A, F, N">Hausgemachter Pfannkuchen mit Rindfleisch</MenuItem>
          <MenuItem name="Fenchel Youtiao" zh="茴香小油条" price="5,9" allergens="A">Hausgemachte Fenchel-Teigstangen</MenuItem>
        </section>

        <section>
          <SectionHeading zh="胡辣汤" title="Hula-Suppe" hint="Scharfe Pfeffersuppe nach Henan Art" />
          <MenuItem name="Jin Hula Tang" zh="金汤牛肉胡辣汤" price="10,9" allergens="A">Goldene Hula-Suppe mit Rindfleisch / Rindfleisch / Morcheln / Seitan</MenuItem>
          <MenuItem name="Su Hula Tang" zh="传统素胡辣汤" price="10,9" veg allergens="A">Traditionelle vegetarische scharfe Suppe / Morcheln / Seitan / Cordyceps-Blüten</MenuItem>
          <MenuItem name="Doufu Nao" zh="豆腐脑 (两掺)" price="12,9" allergens="A, F">Eine Kombination aus Tofu-Pudding und Hula-Suppe</MenuItem>
        </section>

        <section>
          <SectionHeading zh="Jin's 饺子" title="Jiaozi — Teigtaschen" />
          <MenuItem name="Hühnerfleisch Jiaozi" zh="鸡肉饺子" price="6,8 / 14,9" priceLabel="4 / 10 Stk." allergens="A, F, L, N">Hühnerfleisch / Karotten / Sellerie / Frühlingszwiebel / Ingwer</MenuItem>
          <MenuItem name="Gemüse Jiaozi" zh="蔬菜饺子" price="6,8 / 14,9" priceLabel="4 / 10 Stk." veg allergens="A, F, L, N">Saisonales Gemüse / Shitake-Pilze / Frühlingszwiebel / Ingwer</MenuItem>
        </section>

        <section>
          <SectionHeading zh="Jin's 包子" title="Baozi — Germteigtaschen" />
          <MenuItem name="Hühnerfleisch Baozi" zh="鸡肉包子" price="7,2 / 15,9" priceLabel="3 / 8 Stk." allergens="A, F, L, N">Hühnerfleisch / Gemüse / Frühlingszwiebel / Ingwer</MenuItem>
          <MenuItem name="Gemüse Baozi" zh="蔬菜包子" price="7,2 / 15,9" priceLabel="3 / 8 Stk." veg allergens="A, F, L, N">Saisonales Gemüse / Glasnudeln / Shitake-Pilze / Frühlingszwiebel / Ingwer</MenuItem>
        </section>

        <section>
          <SectionHeading zh="套餐" title="Kombimenü" hint="Alle Gänge in einer Kombination" />
          <div className="border border-gold/25 bg-gold/5 p-8">
            <div className="flex items-baseline justify-between gap-6">
              <h3 className="font-serif text-3xl">Kombimenü</h3>
              <div className="font-serif text-2xl text-gold">14,9</div>
            </div>
            <ol className="mt-6 space-y-5 text-sm leading-6 text-paper/75">
              <li>
                <span className="text-gold">1. Vorspeisen</span> — a. Frühlingsrollen · b. Salat <span className="text-paper/45">(vegetarisch)</span>
              </li>
              <li>
                <span className="text-gold">2. Suppe</span> — a. Jin Hulatang: Rindfleisch / Morcheln / Seitan (Allergene: A) · b. Su Hulatang: Morcheln / Seitan / Cordyceps-Blüten (Allergene: A, vegetarisch)
              </li>
              <li>
                <span className="text-gold">3. Beilage</span> — a. Rindfleisch-Pfannkuchen (A, F) · b. Fenchel-Youtiao (A) · c. 4 Stk. Jiaozi: Hühnerfleisch oder Gemüse (A, F, L, N) · d. 3 Stk. Baozi: Hühnerfleisch oder Gemüse (A, F, L, N)
              </li>
            </ol>
          </div>
        </section>

        <section>
          <SectionHeading zh="甜品" title="Desserts" />
          <MenuItem name="Klebereisbällchen mit Kokosmilch" zh="椰奶汤圆" price="6,5" allergens="E, G, N">Sesam / Erdnuss / Rote Bohnen</MenuItem>
          <MenuItem name="Matcha Pudding" zh="抹茶豆腐脑" price="6,5" allergens="F, G">Matcha-Milchsauce / Tofu-Pudding</MenuItem>
        </section>

        <section>
          <SectionHeading zh="饮品" title="Alkoholfreie Getränke" />
          <DrinksTable rows={[
            { name: "Soda — Himbeere / Holunder", volume: "0,25 l", price: "3,5" },
            { name: "Soda — Himbeere / Holunder", volume: "0,5 l", price: "4,5" },
            { name: "Mineralwasser — prickelnd / still", volume: "0,33 l", price: "3,9" },
            { name: "Coca-Cola / Zero", volume: "0,33 l", price: "4,2" },
            { name: "Fanta", volume: "0,33 l", price: "4,2" },
            { name: "Almdudler", volume: "0,33 l", price: "4,2" },
            { name: "Sprite", volume: "0,33 l", price: "4,2" },
            { name: "Wang Lao Ji (Kräutergetränk)", volume: "0,33 l", price: "3,9" },
            { name: "Kokosmilch", volume: "0,33 l", price: "3,9" },
          ]} />
        </section>

        <section>
          <SectionHeading zh="啤酒" title="Bier — Gösser" />
          <DrinksTable rows={[
            { name: "Gösser Helles", volume: "0,5 l", price: "5,5" },
            { name: "Gösser Alkoholfrei", volume: "0,5 l", price: "5,5" },
          ]} />
        </section>

        <p className="mt-10 text-xs leading-6 text-paper/40">
          Allergene sind mit Buchstabencodes gekennzeichnet. Bei Fragen zu Zutaten und Allergenen sprechen Sie uns gerne an — wir beraten Sie persönlich.
        </p>
      </main>

      <footer className="border-t border-gold/15 bg-night-soft px-6 py-10">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 text-center">
          <div className="font-serif text-2xl uppercase tracking-[0.16em] text-gold">Hula</div>
          <div className="flex flex-col items-center gap-2 text-sm text-paper/60 sm:flex-row sm:gap-8">
            <a href="https://www.google.com/maps/dir/?api=1&destination=H%C3%BCtteldorfer%20Str.%20137%2C%201140%20Wien" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-gold"><MapPin size={15} /> Hütteldorfer Str. 137, 1140 Wien</a>
            <a href="tel:+4312399914" className="inline-flex items-center gap-2 transition-colors hover:text-gold"><Phone size={15} /> 01 2399914</a>
          </div>
          <p className="text-[10px] uppercase tracking-[0.14em] text-paper/30">© 2026 Hula Restaurant Wien</p>
        </div>
      </footer>
    </div>
  );
}
