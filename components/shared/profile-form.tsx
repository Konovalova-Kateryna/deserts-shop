"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import React from "react";
import {
  FormUpdateUserSchema,
  TFormUpdateUserType,
} from "./modals/auth-modal/forms/schemas";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";
import { Container, FormInput } from "@/components/shared";
import { Button } from "../ui";
import { updateUserInfo } from "@/app/actions";
import { FavoriteProducts } from "./favorite-products";

interface Props {
  className?: string;
  data: User;
}

export const ProfileForm: React.FC<Props> = ({ data }) => {
  const form = useForm({
    resolver: zodResolver(FormUpdateUserSchema),
    defaultValues: {
      fullName: data.fullName,
      email: data.email,
      password: "",
    },
  });

  const onClickSignOut = () => {
    signOut({
      callbackUrl: "/",
    });
  };

  const onSubmit = async (data: TFormUpdateUserType) => {
    try {
      await updateUserInfo({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      toast.error("Особисті дані оновлено", { icon: "✅" });
    } catch (error) {
      console.error("Error [PROFILE]", error);
      toast.error("Помилка при оновленні особистих даних", { icon: "❌" });
    }
  };

  return (
    <Container className="my-10">
      <h1 className="font-bold text-2xl">Особисті дані:</h1>

      <FormProvider {...form}>
        <form
          className="flex flex-col gap-5 w-96 mt-10"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormInput name="email" label="E-mail" required />
          <FormInput name="fullName" label="Ім'я" required />
          <h3>Змінити пароль</h3>
          <FormInput
            type="password"
            name="password"
            label="Новий Пароль"
            required
          />
          <FormInput
            type="password"
            name="confirmPassword"
            label="Повторіть Пароль"
            required
          />
          <Button
            disabled={form.formState.isSubmitting}
            type="submit"
            variant="secondary"
            className="mt-10"
          >
            Зберегти
          </Button>
          <Button
            onClick={onClickSignOut}
            variant="secondary"
            disabled={form.formState.isSubmitting}
            className="mt-5"
            type="button"
          >
            Вийти
          </Button>
        </form>
      </FormProvider>

      {/* Favorites section */}
      <FavoriteProducts />
    </Container>
  );
};
