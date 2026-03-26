import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/shared/container";
import { TitleComponent } from "@/components/shared/title";

export const metadata: Metadata = {
  title: "Відгуки | Sweet Bakery",
  description:
    "Що кажуть наші клієнти про десерти Sweet Bakery — реальні відгуки та враження від замовлень.",
};

// ── Types ─────────────────────────────────────────────────────────────────
interface Review {
  id: number;
  name: string;
  date: string;
  rating: number;
  text: string;
  product: string;
  avatar: string;
  bg: "yellow" | "blue" | "pink";
}

// ── Data ──────────────────────────────────────────────────────────────────
const REVIEWS: Review[] = [
  {
    id: 1,
    name: "Оля Коваленко",
    date: "15 лютого 2025",
    rating: 5,
    text: "Замовляла макарони на день народження подруги — вона була у захваті! Коробка виглядала як з Pinterest, а смак ще кращий. Особливо сподобались фісташкові та малинові.",
    product: "Асорті макаронів",
    avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&q=80",
    bg: "yellow",
  },
  {
    id: 2,
    name: "Андрій Мельник",
    date: "3 березня 2025",
    rating: 5,
    text: "Брав подарунковий бокс на 8 березня. Дружина не могла повірити, що це не куплено в якомусь модному кондитерстві Парижа. Дякую за такий рівень якості!",
    product: "Подарунковий бокс",
    avatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=200&q=80",
    bg: "blue",
  },
  {
    id: 3,
    name: "Марина Савченко",
    date: "22 лютого 2025",
    rating: 5,
    text: "Капкейки з малиновим кремом — це щось неймовірне. Замовляла для корпоративного заходу — всі колеги питали, де такий смак. Однозначно буду ще.",
    product: "Малинові капкейки",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    bg: "pink",
  },
  {
    id: 4,
    name: "Тетяна Іваненко",
    date: "10 березня 2025",
    rating: 5,
    text: "Спочатку сумнівалась — ціна здалась висока. Але коли побачила і скуштувала — зрозуміла, що це ще й вигідно за такий рівень. Більше не шукаю інших кондитерів.",
    product: "Тістечко Опера",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80",
    bg: "yellow",
  },
  {
    id: 5,
    name: "Сергій Бондаренко",
    date: "28 лютого 2025",
    rating: 4,
    text: "Смачно, гарно, вчасно — все чудово. Єдине — хотілось би більше варіантів без горіхів для алергіків. Але загалом дуже задоволений!",
    product: "Капкейки асорті",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&q=80",
    bg: "blue",
  },
  {
    id: 6,
    name: "Катерина Шевченко",
    date: "5 березня 2025",
    rating: 5,
    text: "Беру тут вже третій рік поспіль. Якість стабільна, завжди свіже, завжди красиво. Особливо люблю сезонні колекції — кожна нова, кожна дивовижна.",
    product: "Сезонна колекція",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
    bg: "pink",
  },
];

const STATS = [
  { value: "2 000+", label: "задоволених клієнтів" },
  { value: "4.9", label: "середній рейтинг" },
  { value: "98%", label: "повторних замовлень" },
  { value: "6", label: "років на ринку" },
];

// ── Helpers ───────────────────────────────────────────────────────────────
const BG_MAP = {
  yellow: "bg-background-yellow",
  blue: "bg-background-blue",
  pink: "bg-background-pink",
};

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 mb-4" aria-label={`Оцінка ${rating} з 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill={i < rating ? "black" : "none"}
          stroke="black"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <polygon points="10,1 12.9,7 19.5,7.6 14.5,12 16.2,18.5 10,15 3.8,18.5 5.5,12 0.5,7.6 7.1,7" />
        </svg>
      ))}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────
export default function ReviewsPage() {
  return (
    <div className="block mx-auto mt-[80px] lg:mt-[200px]">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="w-full border-b-2 border-black pt-11 pb-16 lg:pt-[63px] lg:pb-[100px]">
        <Container>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <h1 className="font-Open_Sans font-extrabold text-[52px] sm:text-[80px] lg:text-[160px] uppercase leading-none mb-4 tracking-tight">
                Від<br />
                <span
                  style={{
                    WebkitTextStroke: "2px black",
                    color: "transparent",
                  }}
                >
                  гуки
                </span>
              </h1>
              <p className="font-roboto font-normal text-base sm:text-lg lg:text-2xl lowercase max-w-[520px] leading-relaxed">
                найкраща нагорода — коли клієнт повертається знову.
                ось що кажуть про наші десерти.
              </p>
            </div>

            {/* Hero photo */}
            <div className="relative w-full max-w-[320px] shrink-0">
              <div className="relative h-[240px] sm:h-[300px] lg:h-[340px] overflow-hidden border-2 border-black">
                <Image
                  src="https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&q=85"
                  alt="Задоволений клієнт з коробкою десертів"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Accent */}
              <div className="absolute bottom-[-12px] right-[-12px] w-full h-full bg-[--blue] -z-10" />
            </div>
          </div>
        </Container>
      </section>

      {/* ── STATS ────────────────────────────────────────── */}
      <section className="border-b-2 border-black">
        <Container className="!px-0">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <div
                key={i}
                className={`
                  px-6 py-10 text-center border-black
                  ${i % 2 !== 0 ? "border-l-2" : ""}
                  ${i >= 2 ? "border-t-2" : ""}
                  lg:border-l-2 lg:border-t-0 first:lg:border-l-0
                `}
              >
                <p className="font-Open_Sans font-extrabold text-[40px] lg:text-[72px] leading-none mb-2">
                  {s.value}
                </p>
                <p className="font-roboto text-sm lg:text-base uppercase tracking-widest text-[--grey]">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── FEATURED QUOTE ───────────────────────────────── */}
      <section className="border-b-2 border-black py-16 lg:py-24 bg-black text-white">
        <Container>
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            {/* Large photo */}
            <div className="relative w-[200px] h-[200px] lg:w-[320px] lg:h-[320px] shrink-0">
              <Image
                src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&q=80"
                alt="Оля Коваленко"
                fill
                className="object-cover rounded-full border-4 border-white"
                loading="lazy"
              />
            </div>
            <div>
              {/* Quotation mark */}
              <div className="font-Open_Sans text-[120px] lg:text-[180px] leading-none text-background-yellow -mb-8 lg:-mb-12 select-none">
                &quot;
              </div>
              <p className="font-segoe text-xl sm:text-2xl lg:text-3xl leading-relaxed mb-6 max-w-[640px]">
                Макарони виглядали як з Pinterest, а смак ще кращий. Більше не шукаю
                інших кондитерів — тут є все, чого душа бажає.
              </p>
              <p className="font-roboto text-sm uppercase tracking-widest text-white/60">
                — Оля Коваленко, постійний клієнт
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── REVIEWS GRID ─────────────────────────────────── */}
      <section className="border-b-2 border-black py-16 lg:py-24">
        <Container>
          <TitleComponent className="mb-12 lg:mb-16">Всі відгуки</TitleComponent>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
            {REVIEWS.map((r, i) => (
              <article
                key={r.id}
                className={`
                  ${BG_MAP[r.bg]}
                  p-8 lg:p-10 border-2 border-black
                  ${i % 3 !== 0 ? "border-l-0" : ""}
                  ${i >= 3 ? "border-t-0" : ""}
                  sm:${i % 2 !== 0 ? "sm:border-l-0" : ""}
                  sm:${i >= 2 ? "sm:border-t-0" : ""}
                `}
              >
                {/* Header */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="relative w-12 h-12 shrink-0 overflow-hidden rounded-full border-2 border-black">
                    <Image
                      src={r.avatar}
                      alt={r.name}
                      fill
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <p className="font-segoe font-bold text-base">{r.name}</p>
                    <p className="font-roboto text-xs text-[--grey] uppercase tracking-wider">
                      {r.date}
                    </p>
                  </div>
                </div>

                <Stars rating={r.rating} />

                {/* Review text */}
                <p className="font-roboto text-base leading-relaxed mb-5 text-black/80">
                  {r.text}
                </p>

                {/* Product tag */}
                <div className="inline-block border border-black px-3 py-1 font-segoe text-xs uppercase tracking-wider">
                  {r.product}
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ── INSTAGRAM WALL ───────────────────────────────── */}
      <section className="border-b-2 border-black py-16 lg:py-24">
        <Container>
          <TitleComponent className="mb-12 lg:mb-16">Фото від клієнтів</TitleComponent>
          <p className="text-center font-roboto text-base lg:text-xl text-[--grey] lowercase mb-10 -mt-8 lg:-mt-12">
            діліться враженнями в instagram з тегом{" "}
            <span className="text-black font-semibold">#sweetbakery_ua</span>
          </p>

          {/* Mosaic grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-3">
            {[
              { src: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&q=80", alt: "Макарони в коробці", tall: true },
              { src: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80", alt: "Торт з ягодами" },
              { src: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&q=80", alt: "Капкейки" },
              { src: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=600&q=80", alt: "Шоколадний мус", tall: true },
              { src: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80", alt: "Пастельні макарони" },
              { src: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=80", alt: "Крем десерт" },
              { src: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80", alt: "Квіти та торт" },
              { src: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=600&q=80", alt: "Подарункова коробка" },
            ].map((photo, i) => (
              <div
                key={i}
                className={`relative overflow-hidden border-2 border-black group ${photo.tall ? "row-span-2" : ""}`}
                style={{ aspectRatio: photo.tall ? undefined : "1/1", height: photo.tall ? "100%": undefined }}
              >
                <div className="relative w-full" style={{ paddingBottom: photo.tall ? "200%" : "100%" }}>
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    <span className="text-white font-segoe text-base uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Instagram
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── LEAVE REVIEW CTA ─────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-background-yellow border-b-2 border-black">
        <Container>
          <div className="text-center">
            <h2 className="font-Open_Sans font-extrabold text-[36px] sm:text-[56px] lg:text-[80px] uppercase leading-none mb-6">
              Вже куштували?
            </h2>
            <p className="font-roboto text-base lg:text-xl lowercase mb-10 max-w-[480px] mx-auto leading-relaxed">
              поділіться враженнями — ваш відгук надихає нас робити кожен десерт ще кращим
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block py-4 px-10 border-2 border-black bg-black text-white font-segoe uppercase font-normal text-sm tracking-widest transition-all duration-300 hover:bg-transparent hover:text-black w-full sm:w-auto text-center"
              >
                Написати в Instagram
              </a>
              <Link
                href="/assortment"
                className="inline-block py-4 px-10 border-2 border-black font-segoe uppercase font-normal text-sm tracking-widest transition-all duration-300 hover:bg-black hover:text-white w-full sm:w-auto text-center"
              >
                Зробити замовлення
              </Link>
            </div>
          </div>
        </Container>
      </section>

    </div>
  );
}
