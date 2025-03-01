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
        imageUrl: "",
      },
      {
        id: nanoid(),
        name: "Donut in chocolate glaze",
        categoryId: "_HAN2_CAz62PyCqJkaL0-",
        price: 50,
        titleUa: "Пончик в шоколадній глазурі",
        description:
          "Пончик має м'яку та пухку текстуру, яка тане в роті. Щедра шоколадна глазур додає ще більше смаку та аромату.",
        imageUrl: "",
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
