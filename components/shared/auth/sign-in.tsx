"use client";
import { signIn } from "next-auth/react";

const clickSignIn = () => {
  signIn("google", {
    callbackUrl: "/",
  });
};

export const SignIn = () => {
  return <button onClick={clickSignIn}>Google</button>;
};
