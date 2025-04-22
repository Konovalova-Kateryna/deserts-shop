import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(6, { message: "Password must be at least 6 characters long" });

export const FormLoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: passwordSchema,
});

export const FormRegisterSchema = FormLoginSchema.merge(
  z.object({
    fullName: z.string().min(2, { message: "Введіть ім'я та прізвище" }),
    confirmPassword: passwordSchema,
  })
).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const FormUpdateUserSchema = z.object({
  fullName: z.string(),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string(),
});

export type TFormLoginType = z.infer<typeof FormLoginSchema>;
export type TFormRegisterType = z.infer<typeof FormRegisterSchema>;
export type TFormUpdateUserType = z.infer<typeof FormUpdateUserSchema>;
