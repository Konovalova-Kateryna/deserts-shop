interface sendEmailProps {
  sender: string;
  email: string;
  firstName: string;
  orderId: string;
  orderAddress: string;
  totalAmount: number;
  items: any[];
}

interface mailOptionsForVerificationCodeProps {
  sender: string;
  email: string;
  code: string;
}

export const mailOptionsForOrder = ({
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
    subject: `CAKE-STUDIO! Нове замовлення № ${orderId}`,
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

export const mailOptionsForVerificationCode = ({
  sender,
  email,
  code,
}: mailOptionsForVerificationCodeProps) => {
  return {
    from: sender,
    to: email,
    subject: `CAKE-STUDIO! Підтвердження email`,
    html: `<h1>Вітаємо!</h1>
                  <p>Ваш код підтвердження: ${code}</p>
                  
                  <a href="http://localhost:3000/api/auth/verify?code=${code}">Підтвердити реєстрацію</a>
                 
                  `,
  };
};
