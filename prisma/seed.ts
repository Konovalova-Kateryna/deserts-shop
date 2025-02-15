import { categories } from "./constants";
import { prisma } from "./prisma-client";
import { hashSync } from "bcrypt";

async function up() {
  await prisma.user.createMany({
    data: [
      {
        fullName: "User test",
        email: "user@test.ua",
        password: hashSync("test123", 10),
        role: "USER",
        verified: new Date(),
      },
      {
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
        name: "Cupcake with ice cream and chocolate sauce",
        categoryId: 3,
        price: 50,
        titleUa: "Капкейк з морозивом та шоколадним соусом",
        description: "Капкейк з морозивом та шоколадним соусом",
        imageUrl: "",
      },
      {
        name: "Raspberry cupcake with cream",
        categoryId: 3,
        price: 55,
        titleUa: "Малиновий капкейк з вершковим кремом",
        description: "Малиновий капкейк з вершковим кремом",
        imageUrl: "",
      },
      {
        name: "Lemon cupcake with almond shavings",
        categoryId: 3,
        price: 60,
        titleUa: "Лимонний капкейк з мигдалевими стружками",
        description: "Лимонний капкейк з мигдалевими стружками",
        imageUrl: "",
      },
      {
        name: "Cupcake with truffle and raspberry",
        categoryId: 3,
        price: 70,
        titleUa: "Капкейк з трюфелем та малиною",
        description:
          "Шоколадний бісквіт з начинкою з трюфеля, обгорнутий кремом з малини, що додає свіжості, створює дуже розкішний і смачний десерт.",
        imageUrl: "/cupcake_truf.png",
        trend: true,
      },
      {
        name: "Cupcake with ice cream and chocolate sauce",
        categoryId: 3,
        price: 50,
        titleUa: "Капкейк з морозивом та шоколадним соусом",
        description:
          "Має м'який бісквіт з додаванням морозива в середині, покритий смачним шоколадним соусом.",
        imageUrl: "",
      },
      {
        name: "Macaroon with lime filling",
        categoryId: 1,
        price: 70,
        titleUa: "Макарон з лаймовою начинкою",
        description:
          "Макарон має ніжну та хрустку скоринку з легким цитрусовим ароматом. Начинка з лайма має свіжий та насичений смак, який робить цей макарон освіжаючим та легким.",
        imageUrl: "",
      },
      {
        name: "Donut in chocolate glaze",
        categoryId: 2,
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
