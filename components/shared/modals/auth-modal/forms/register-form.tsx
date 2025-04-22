import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormRegisterSchema, TFormRegisterType } from "./schemas";

import { FormInput } from "@/components/shared/form-components";
import { Button } from "@/components/ui";
import toast from "react-hot-toast";

import { Title } from "@radix-ui/react-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "@/app/actions";

interface Props {
  className?: string;
  onClose?: VoidFunction;
  onClickLogin?: VoidFunction;
}

export const RegisterForm: React.FC<Props> = ({ onClose }) => {
  const form = useForm<TFormRegisterType>({
    resolver: zodResolver(FormRegisterSchema),
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: TFormRegisterType) => {
    try {
      await registerUser({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      onClose?.();
      toast.success("Успішно зареєстровано!", { icon: "✅" });
    } catch (error) {
      console.error("Error [REGISTER]", error);
      toast.error("Помилка при реєстрації", { icon: "❌" });
    }
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5 items-center w-[280px] lg:w-[450px]"
      >
        <div className=" flex flex-col justify-between items-center">
          <Title className="text-2xl">Зареєструватися</Title>
          <p className="text-gray-400">за допомогою email</p>
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
          name="fullName"
          type="text"
          placeholder="Повне ім'я"
          required
        />
        <FormInput
          className="w-full"
          name="password"
          type="password"
          placeholder="Пароль"
          required
        />
        <FormInput
          className="w-full"
          name="confirmPassword"
          type="password"
          placeholder="Повторіть пароль"
          required
        />
        <Button
          variant="secondary"
          className="w-full h-12 bg-[--blue]"
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Реєстрація...." : "Зареєструватися"}
        </Button>
      </form>
    </FormProvider>
  );
};
