import { Prisma } from "@prisma/client";

interface sendEmailProps {
  sender: string;
  email: string;
  firstName: string;
  orderId: string;
  orderAddress: string;
  totalAmount: number;
  items: any[];
}

export const mailOptions = ({
  sender,
  email,
  firstName,
  orderId,
  orderAddress,
  totalAmount,
  items,
}: //   items,
sendEmailProps) => {
  return {
    from: sender,
    to: email,
    subject: `DESERT-SHOP! Нове замовлення № ${orderId}`,
    html: `<h1>Вітаємо, ${firstName}</h1>
                  <p>Дякуємо за Ваше замовлення. Ми зателефонуємо Вам найближчим часом для підтвердження.</p>
                  <p>Загальна вартість замовлення - ${totalAmount} грн.</p>
                  <p>Його буде доставлено за адресою ${orderAddress}</p>
                ${items.map((item) => {
                  return `<p>${item.product.titleUa} - ${item.quantity} шт</p>`;
                })}
                  `,
  };
};
