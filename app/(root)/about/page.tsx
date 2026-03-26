import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/shared/container";
import { TitleComponent } from "@/components/shared/title";

export const metadata: Metadata = {
  title: "Про нас | Sweet Bakery",
  description:
    "Дізнайтесь більше про нашу кондитерську студію — хто ми, звідки беремо натхнення та чому наші десерти неповторні.",
};

const VALUES = [
  {
    emoji: "🧁",
    title: "Ручна робота",
    text: "Кожен десерт ліпиться, декорується та пакується вручну. Ніяких конвеєрів — тільки турбота.",
  },
  {
    emoji: "🌿",
    title: "Якісна сировина",
    text: "Бельгійський шоколад, французьке масло, сезонні ягоди та натуральні барвники.",
  },
  {
    emoji: "🎨",
    title: "Авторський дизайн",
    text: "Кожна колекція — це невелика виставка смаку. Ми поєднуємо естетику та гастрономію.",
  },
  {
    emoji: "📦",
    title: "Подарункове паковання",
    text: "Навіть коробка — це частина враження. Ваш подарунок виглядатиме бездоганно.",
  },
];

const TEAM = [
  {
    name: "Катерина",
    role: "Засновниця & головний кондитер",
    quote: "Я почала пекти в 14 і досі вважаю це найкращою грою.",
    
    img: "https://plus.unsplash.com/premium_photo-1661778091956-15dbe6e47442?q=80&w=687",
      
  },
  {
    name: "Дарина",
    role: "Декоратор тістечок",
    quote: "Деталь — це все. Одна пелюстка може змінити настрій десерту.",
    
    img: "https://images.unsplash.com/photo-1649773289148-0c546e53480c?w=500&q=80",
    
  },
  {
    name: "Олена",
    role: "Шеф з макаронів",
    quote: "Макарон — це наука. Але коли все виходить — це магія.",
   
    img: "https://images.unsplash.com/photo-1521566652839-697aa473761a?q=80",
    
  },
];

export default function AboutPage() {
  return (
    <div className="block mx-auto mt-[80px] lg:mt-[200px]">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="w-full border-b-2 border-black pt-11 pb-16 lg:pt-[63px] lg:pb-[120px] overflow-hidden">
        <Container>
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-[80px]">

            {/* Text */}
            <div className="lg:w-[560px] text-center lg:text-start mb-10 lg:mb-0">
              <h1 className="font-Open_Sans font-extrabold text-[52px] sm:text-[72px] lg:text-[130px] uppercase leading-none mb-6 lg:mb-10 tracking-tight">
                Про<br />
                <span
                  style={{
                    WebkitTextStroke: "2px black",
                    color: "transparent",
                  }}
                >
                  нас
                </span>
              </h1>
              <p className="font-roboto font-normal text-base sm:text-lg lg:text-2xl lowercase mb-8 lg:mb-12 leading-relaxed max-w-[480px] mx-auto lg:mx-0">
                ми — невелика студія авторських десертів, де кожен капкейк, макарон
                і бокс створений із справжньою любов&apos;ю до солодкого.
              </p>
              <Link
                href="/assortment"
                className="inline-block py-4 px-10 border-2 border-black font-segoe uppercase font-normal text-sm tracking-widest transition-all duration-300 hover:bg-black hover:text-white"
              >
                Замовити
              </Link>
            </div>

            {/* Hero image collage */}
            <div className="relative flex-1 flex justify-center lg:justify-end">
              {/* Main large image */}
              <div className="relative w-[280px] h-[340px] sm:w-[340px] sm:h-[420px] lg:w-[440px] lg:h-[560px]">
                <Image
                  src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=900&q=85"
                  alt="Торт з квітами у нашій студії"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Accent yellow block */}
              <div className="absolute bottom-0 left-0 w-[140px] h-[140px] lg:w-[200px] lg:h-[200px] bg-[--yellow] -z-10 translate-x-[-20px] translate-y-[20px]" />
              {/* Small floating image */}
              <div className="absolute top-[-20px] right-[-10px] lg:right-[-40px] w-[110px] h-[110px] lg:w-[160px] lg:h-[160px] border-2 border-black overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1560180474-e8563fd75bab?w=400&q=80"
                  alt="Макарони крупним планом"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── STORY ────────────────────────────────────────── */}
      <section className="border-b-2 border-black py-16 lg:py-24">
        <Container>
          <TitleComponent className="mb-12 lg:mb-16">Наша історія</TitleComponent>
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-[100px] items-center">
            {/* Image */}
            <div className="relative w-full max-w-[480px] mx-auto lg:mx-0 lg:w-[500px] shrink-0">
              <div className="relative h-[320px] lg:h-[480px] w-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=900&q=85"
                  alt="Наша кухня — макарони та бісквіти"
                  fill
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              {/* Blue accent block */}
              <div className="absolute top-[20px] left-[-16px] w-full h-full bg-[--blue] -z-10" />
            </div>

            {/* Text */}
            <div className="lg:max-w-[560px]">
              <p className="font-roboto text-base lg:text-xl leading-relaxed mb-6">
                Все почалось 2019 року з маленької кухні та великої мрії — робити
                десерти, які приносять не просто смак, а справжній момент щастя.
                Перші замовлення розносили пішки, кожну коробку підписували від руки.
              </p>
              <p className="font-roboto text-base lg:text-xl leading-relaxed mb-6">
                Сьогодні ми виготовляємо сотні тістечок щотижня, але підхід не змінився:
                ніякого масового виробництва. Кожна партія — окрема робота, кожен десерт
                має бути ідеальним.
              </p>
              <p className="font-roboto text-base lg:text-xl leading-relaxed font-semibold">
                Ми не просто печемо — ми створюємо враження.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── VALUES ───────────────────────────────────────── */}
      <section className="border-b-2 border-black py-16 lg:py-24">
        <Container>
          <TitleComponent className="mb-12 lg:mb-16">Наші принципи</TitleComponent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
            {VALUES.map((v, i) => (
              <div
                key={i}
                className={`
                  p-8 lg:p-10 border-2 border-black
                  ${i % 2 === 0 ? "bg-background-yellow" : "bg-background-white"}
                  ${i > 0 ? "border-l-0" : ""}
                  sm:${i > 1 ? "border-t-0" : ""}
                  lg:${i > 0 ? "border-l-0 border-t-2" : ""}
                `}
              >
                <div className="text-4xl mb-5">{v.emoji}</div>
                <h3 className="font-segoe font-bold text-xl lg:text-2xl mb-3">{v.title}</h3>
                <p className="font-roboto text-base leading-relaxed text-black/70">{v.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── TEAM ─────────────────────────────────────────── */}
      <section className="border-b-2 border-black py-16 lg:py-24">
        <Container>
          <TitleComponent className="mb-12 lg:mb-16">Наша команда</TitleComponent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {TEAM.map((member, i) => (
              <div key={i} className="group">
                {/* Photo */}
                <div className="relative h-[320px] lg:h-[400px] overflow-hidden border-2 border-black mb-6">
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                </div>
                {/* Info */}
                <h3 className="font-segoe font-bold text-2xl mb-1">{member.name}</h3>
                <p className="font-roboto text-sm uppercase tracking-widest text-[--grey] mb-3">
                  {member.role}
                </p>
                <p className="font-roboto text-base italic leading-relaxed">
                  «{member.quote}»
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── PROCESS ──────────────────────────────────────── */}
      <section className="border-b-2 border-black py-16 lg:py-24">
        <Container>
          <TitleComponent className="mb-12 lg:mb-16">Як ми працюємо</TitleComponent>
          <div className="relative">
            {/* Connecting line on desktop */}
            <div className="hidden lg:block absolute top-[28px] left-[12.5%] right-[12.5%] h-[2px] bg-black" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
              {[
                { step: "01", title: "Замовлення", text: "Обираєте десерти в каталозі або пишете нам з особливим проханням" },
                { step: "02", title: "Підтвердження", text: "Ми зв'язуємось, уточнюємо деталі та узгоджуємо дату виготовлення" },
                { step: "03", title: "Виготовлення", text: "Свіжа випічка у день видачі або за добу — без заморозки та консервантів" },
                { step: "04", title: "Доставка", text: "Кур'єр або самовивіз. Все запаковано надійно, щоб довезти ідеально" },
              ].map((s, i) => (
                <div key={i} className="flex flex-col items-center lg:items-center text-center">
                  {/* Number circle */}
                  <div className="w-14 h-14 rounded-full border-2 border-black bg-background-white flex items-center justify-center font-segoe font-bold text-lg mb-5 relative z-10">
                    {s.step}
                  </div>
                  <h3 className="font-segoe font-bold text-xl mb-3">{s.title}</h3>
                  <p className="font-roboto text-base leading-relaxed text-black/70 max-w-[220px]">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=1920&q=80"
            alt=""
            aria-hidden="true"
            fill
            className="object-cover opacity-15"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 bg-background-yellow/60 z-0" />

        <Container>
          <div className="relative z-10 text-center">
            <h2 className="font-Open_Sans font-extrabold text-[40px] sm:text-[56px] lg:text-[90px] uppercase leading-none mb-6">
              Готові до насолоди?
            </h2>
            <p className="font-roboto text-base lg:text-2xl mb-10 max-w-[500px] mx-auto lowercase">
              переглядайте наш асортимент і оберіть своє ідеальне тістечко
            </p>
            <Link
              href="/assortment"
              className="inline-block py-5 px-14 border-2 border-black bg-black text-white font-segoe uppercase font-normal text-sm tracking-widest transition-all duration-300 hover:bg-transparent hover:text-black"
            >
              Перейти до каталогу
            </Link>
          </div>
        </Container>
      </section>

    </div>
  );
}
