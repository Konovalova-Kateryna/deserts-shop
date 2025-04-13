import { Button, Dialog, DialogContent } from "@/components/ui";

import React from "react";
import { SignIn } from "../../auth";
import { redirect } from "next/dist/server/api-utils";
import { signIn } from "next-auth/react";
import { LoginForm } from "./forms/login-form";
import { RegisterForm } from "./forms/register-form";

interface Props {
  className?: string;
  open: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<Props> = ({ open, onClose }) => {
  const [type, setType] = React.useState<"login" | "register">("login");

  const onSwitchType = () => {
    setType(type === "login" ? "register" : "login");
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-white py-8 px-4 overflow-hidden w-[320px] lg:w-[500px] ">
        {type === "login" ? (
          <LoginForm onClose={handleClose} className={""} />
        ) : (
          <RegisterForm onClose={handleClose} className={""} />
        )}
        <div className="flex gap-2 flex-col lg:flex-row">
          <Button
            className="w-[280px] lg:w-full"
            variant="outline"
            onClick={() =>
              signIn("google", { callbackUrl: "/", redirect: true })
            }
          >
            Google
          </Button>
        </div>

        <Button
          onClick={onSwitchType}
          type="button"
          className="h-12 w-[280px] lg:w-full bg-[--yellow]"
          variant="outline"
        >
          {type !== "login" ? "Увійти" : "Реєстрація"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
