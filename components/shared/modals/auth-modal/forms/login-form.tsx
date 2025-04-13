import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { TFormLoginType } from "./schemas";

import { FormInput } from "@/components/shared/form-components";
import { Button } from "@/components/ui";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

import { Title } from "@radix-ui/react-dialog";

interface Props {
  className: string;
  onClose?: VoidFunction;
}

export const LoginForm: React.FC<Props> = ({ onClose }) => {
  const form = useForm<TFormLoginType>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: TFormLoginType) => {
    try {
      const resp = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (resp?.error) {
        throw Error();
      }

      onClose?.();
      toast.success("Успішно авторизовано!");
    } catch (error) {
      console.error("Error [LOGIN]", error);
      toast.error("Помилка авторизації. Перевірте дані.");
    }
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5 items-center w-[280px] lg:w-[450px]"
      >
        <div className=" flex flex-col justify-between items-center">
          <Title className="text-2xl">Вхід в особистий кабінет</Title>
          <p className="text-gray-400"> Увійти за допомогою email</p>
        </div>

        <FormInput
          className="w-full"
          name="email"
          type="email"
          placeholder="E-mail"
          required
        />
        <FormInput
          className="w-full"
          name="password"
          type="password"
          placeholder="Пароль"
          required
        />

        <Button
          variant="secondary"
          className="w-full h-12 bg-[--blue]"
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Вхід" : "Увійти"}
        </Button>
      </form>
    </FormProvider>
  );
};
