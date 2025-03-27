"use client";

import React from "react";
import { WhiteBlock } from "../white-block";
import { FormInput, FormTextarea } from "../form-components";
import { AddressAutocompleteComponent, ErrorText } from "@/components/shared";
import { Controller, useFormContext } from "react-hook-form";

interface Props {
  className?: string;
  loading?: boolean;
}

export const CheckoutContacts: React.FC<Props> = ({ className, loading }) => {
  const { control } = useFormContext();

  // const inputRef = useMask({
  //   mask: "+38(0__)___-__-__",
  //   replacement: { _: /\d/ },
  //   separate: true,
  // });

  return (
    <>
      <WhiteBlock title="Контактна інформація" className={className}>
        <div className="flex flex-col lg:grid grid-cols-2 gap-5">
          <FormInput name="firstName" placeholder="Ім'я" />
          <FormInput name="lastName" placeholder="Прізвище" />
          <FormInput name="email" placeholder="E-mail" />
          <FormInput name="phone" placeholder="+38(0__)___-__-__" />
        </div>
      </WhiteBlock>
      <WhiteBlock
        title="Адреса доставки"
        className={
          loading
            ? "opacity-40 pointer-events-none"
            : `text-center lg:text-left`
        }
      >
        <div className="flex flex-col gap-5">
          <Controller
            control={control}
            name="address"
            render={({ field, fieldState }) => (
              <>
                <AddressAutocompleteComponent
                  value={field.value}
                  onSelect={(address) => field.onChange(address)}
                />
                {fieldState.error?.message && (
                  <ErrorText text={fieldState.error.message} />
                )}
              </>
            )}
          />

          <FormTextarea
            name="comment"
            placeholder="Коментар до замовлення"
            rows={5}
          />
        </div>
      </WhiteBlock>
    </>
  );
};
