import React from "react";
import { WhiteBlock } from "../white-block";
import { FormInput, FormTextarea } from "../form-components";

interface Props {
  className?: string;
}

export const CheckoutContacts: React.FC<Props> = ({}) => {
  return (
    <>
      <WhiteBlock title="Контактна інформація">
        <div className="grid grid-cols-2 gap-5">
          <FormInput name="firstName" placeholder="Ім'я" className="text-lg" />
          <FormInput
            name="lastName"
            placeholder="Прізвище"
            className="text-lg"
          />
          <FormInput name="email" placeholder="E-mail" className="text-lg" />
          <FormInput name="phone" placeholder="Телефон" className="text-lg" />
        </div>
      </WhiteBlock>
      <WhiteBlock title="Адреса доставки">
        <div className="flex flex-col gap-5">
          <FormInput name="address" placeholder="Адреса" className="text-lg" />
          <FormTextarea
            name="comment"
            placeholder="Коментар до замовлення"
            className="text-lg"
            rows={5}
          />
        </div>
      </WhiteBlock>
    </>
  );
};
