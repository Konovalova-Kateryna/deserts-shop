"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export const ToastHandler = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    let toastMessage = "";

    if (searchParams.has("paid")) {
      toastMessage = "Замовлення оплачено!";
    }

    if (searchParams.has("verified")) {
      toastMessage = "Ваш email підтверджено!";
    }

    if (toastMessage) {
      setTimeout(() => {
        router.replace("/");
        toast.success(toastMessage, { duration: 3000 });
      }, 1000);
    }
  }, [searchParams, router]);

  return null;
};
