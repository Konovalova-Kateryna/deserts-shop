import { z } from "zod";

export const checkoutFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "Не менше 2 символів" })
    .max(50, { message: "Не більше 50 символів" }),
  lastName: z
    .string()
    .min(2, { message: "Не менше 2 символів" })
    .max(50, { message: "Не більше 50 символів" }),
  email: z.string().email({ message: "Некоректний email" }),
  phone: z.string().min(10, { message: "Некоректний номер" }),
  address: z.string().min(5, { message: "Некоректна адреса" }),
  comment: z.string().optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
