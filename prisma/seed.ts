import { categories } from "./constants";
import { prisma } from "./prisma-client";
import { hashSync } from "bcrypt";
import { nanoid } from "nanoid";

async function up() {
  await prisma.user.createMany({
    data: [
      {
        id: nanoid(),
        fullName: "User test",
        email: "user@test.ua",
        password: hashSync("test123", 10),
        role: "USER",
        verified: new Date(),
      },
      {
        id: nanoid(),
        fullName: "Admin test",
        email: "admin@test.ua",
        password: hashSync("test123", 10),
        role: "ADMIN",
        verified: new Date(),
      },
    ],
  });
  await prisma.category.createMany({
    data: categories,
  });

  await prisma.product.createMany({
    data: [
      {
        id: nanoid(),
        name: "Cupcake with ice cream and chocolate sauce",
        categoryId: "dcBiqrk0JcB4reNnF3NHa",
        price: 50,
        titleUa: "Капкейк з морозивом та шоколадним соусом",
        description: "Капкейк з морозивом та шоколадним соусом",
        imageUrl: "/ice_shoco.png",
      },
      {
        id: nanoid(),
        name: "Raspberry cupcake with cream",
        categoryId: "dcBiqrk0JcB4reNnF3NHa",
        price: 55,
        titleUa: "Малиновий капкейк з вершковим кремом",
        description: "Малиновий капкейк з вершковим кремом",
        imageUrl: "/strawberry_cream.png",
      },
      {
        id: nanoid(),
        name: "Lemon cupcake with almond shavings",
        categoryId: "dcBiqrk0JcB4reNnF3NHa",
        price: 60,
        titleUa: "Лимонний капкейк з мигдалевими стружками",
        description: "Лимонний капкейк з мигдалевими стружками",
        imageUrl: "/limon_almond.png",
      },
      {
        id: nanoid(),
        name: "Cupcake with truffle and raspberry",
        categoryId: "dcBiqrk0JcB4reNnF3NHa",
        price: 70,
        titleUa: "Капкейк з трюфелем та малиною",
        description:
          "Шоколадний бісквіт з начинкою з трюфеля, обгорнутий кремом з малини, що додає свіжості, створює дуже розкішний і смачний десерт.",
        imageUrl: "/cupcake_truf.png",
        trend: true,
      },
      {
        id: nanoid(),
        name: "Cupcake with ice cream and chocolate sauce",
        categoryId: "dcBiqrk0JcB4reNnF3NHa",
        price: 50,
        titleUa: "Капкейк з морозивом та шоколадним соусом",
        description:
          "Має м'який бісквіт з додаванням морозива в середині, покритий смачним шоколадним соусом.",
        imageUrl: "/ice_shoco.png",
      },
      {
        id: nanoid(),
        name: "Macaroon with lime filling",
        categoryId: "Qf7CuE8-oSw1RNx893CA4",
        price: 70,
        titleUa: "Макарон з лаймовою начинкою",
        description:
          "Макарон має ніжну та хрустку скоринку з легким цитрусовим ароматом. Начинка з лайма має свіжий та насичений смак, який робить цей макарон освіжаючим та легким.",
        imageUrl: "/lime-feeling-macaron.png",
      },

      {
        id: nanoid(),
        name: "Strawberry Milkshake Macaron",
        categoryId: "Qf7CuE8-oSw1RNx893CA4",
        price: 60,
        titleUa: "Макарун з полуничним мілкшейком",
        description:
          "Солодкий смак літа — крем із полуничного мілкшейку, що огортає м’якою ніжністю. Повертає у дитинство з кожним шматочком.",

        imageUrl: "/roze-macaron.png",
      },

      {
        id: nanoid(),
        name: "Coffee Cream Macaron",
        categoryId: "Qf7CuE8-oSw1RNx893CA4",
        price: 60,
        titleUa: "Макарун з кавовим кремом",
        description:
          "Інтенсивний аромат кави з вершковим кремом створює ідеальну пару для справжніх поціновувачів еспресо. Ідеально до ранку.",
        imageUrl: "/coffe-macaron.png",
      },

      {
        id: nanoid(),
        name: "Mango Passion Macaron",
        categoryId: "Qf7CuE8-oSw1RNx893CA4",
        price: 50,
        titleUa: "Макарун з манго та маракуєю",
        description:
          "Екзотичний дует стиглого манго і маракуї подарує тропічний настрій. Свіжий, фруктовий, незабутній.",
        imageUrl: "/mango_macaroon.png",
      },

      {
        id: nanoid(),
        name: "Blueberry Cheesecake Macaron",
        categoryId: "Qf7CuE8-oSw1RNx893CA4",
        price: 50,
        titleUa: "Макарун з чорничним чізкейком",
        description:
          "Чорниця у поєднанні з вершковим сиром створює ніжний смак знайомого десерту в новому, мініатюрному форматі.",
        imageUrl: "/macaroon_blackberry.png",
      },
      {
        id: nanoid(),
        name: "Salted Caramel Macaron",
        categoryId: "Qf7CuE8-oSw1RNx893CA4",
        price: 50,
        titleUa: "Макарун з солоною карамеллю",
        description:
          "Тандем солодкого та солоного: м'який крем із солоної карамелі дарує незабутній післясмак. Баланс, який захоплює.",
        imageUrl: "/lime_macaroon.png",
      },
      {
        id: nanoid(),
        name: "Vanilla Bean Macaron",
        categoryId: "Qf7CuE8-oSw1RNx893CA4",
        price: 50,
        titleUa: "Макарун з ваніллю",
        description:
          "Класика, яка не набридає. Ароматна мадагаскарська ваніль у кремі, захована в делікатній оболонці — витончено та смачно.",
        imageUrl: "/vanilla-macaron.png",
      },
      {
        id: nanoid(),
        name: "Lemon Curd Macaron",
        categoryId: "Qf7CuE8-oSw1RNx893CA4",
        price: 50,
        titleUa: "Макарун з лимонним курдом",
        description:
          "Свіжий, з легкою кислинкою — лимонний курд надає десерту витончену цитрусову нотку, що ідеально балансує солодкість.",
        imageUrl: "/macaroon_lemon.png",
      },

      {
        id: nanoid(),
        name: "Chocolate Hazelnut Macaron",
        categoryId: "Qf7CuE8-oSw1RNx893CA4",
        price: 50,
        titleUa: "Макарун з шоколадом та лісовим горіхом",
        description:
          "Свіжий, з легкою кислинкою — лимонний курд надає десерту витончену цитрусову нотку, що ідеально балансує солодкість.",
        imageUrl: "/hazelnut-macaron.png",
      },
      {
        id: nanoid(),
        name: "Raspberry & Rose Macaron",
        categoryId: "Qf7CuE8-oSw1RNx893CA4",
        price: 50,
        titleUa: "Макарун з малиною та трояндою",
        description:
          "Поєднання ніжної малини та квіткового аромату троянди створює вишуканий смак, що зачаровує з першого укусу. Гармонія солодкого і свіжого.",
        imageUrl: "/macaroon-roze.png",
      },
      {
        id: nanoid(),
        name: "Macaron with Pistachio Cream",
        categoryId: "Qf7CuE8-oSw1RNx893CA4",
        price: 50,
        titleUa: "Макарун з фісташковим кремом",
        description:
          "Ніжна хрустка оболонка приховує в собі оксамитовий фісташковий крем з легкою ноткою ванілі. Ідеальний вибір для справжніх гурманів.",
        imageUrl: "/pistachio-macaroon.png",
      },

      {
        id: nanoid(),
        name: "Donut in chocolate glaze",
        categoryId: "_HAN2_CAz62PyCqJkaL0-",
        price: 50,
        titleUa: "Пончик в шоколадній глазурі",
        description:
          "Пончик має м'яку та пухку текстуру, яка тане в роті. Щедра шоколадна глазур додає ще більше смаку та аромату.",
        imageUrl: "/donut_1.png",
      },
      {
        id: "1e73606f-7868-4192-965d-9ef4e67fb68e",
        name: "Macaroon dor-blue",
        categoryId: "Qf7CuE8-oSw1RNx893CA4",
        price: 47,
        titleUa: "Макарун з дор-блю та малиною",
        description:
          "Повітряна текстура з ніжним сирним мусом та малиною всередині — класика французької кондитерської традиції.",
        imageUrl: "/macaroon_dor-blue.png",
      },
      {
        id: "d1572c74-c98e-4ba0-8fcf-522e503606db",
        name: "Macaron mango and coconut",
        categoryId: "Qf7CuE8-oSw1RNx893CA4",
        price: 105,
        titleUa: "Макарун з манго та кокосом",
        description:
          "Солодкий акцент з тропічним ароматом манго та кокосу, для справжніх поціновувачів екзотики.",
        imageUrl: "/mango_macaroon.png",
      },
    ],
  });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (error) {
    console.error(error);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
