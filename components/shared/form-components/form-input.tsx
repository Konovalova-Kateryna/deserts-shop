"use client";

import { cn } from "@/lib/utils";
import { RequiredSymbol } from "../required-symbol";
import { Input } from "@/components/ui";
import { ErrorText } from "../error-text";
import { ClearBtn } from "../clear-btn";
import { useFormContext } from "react-hook-form";
import { RefObject, useState } from "react";
import { PasswordToggleBtn } from "../password-toggle-btn";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
  ref?: RefObject<HTMLInputElement | null>;
}

export const FormInput: React.FC<Props> = ({
  name,
  label,
  required,
  className,
  type = "text",
  ...props
}) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message as string;
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === "password" && showPassword ? "text" : type;

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onClearClick = () => {
    setValue(name, "", { shouldValidate: true });
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && (
        <p className="font-medium mb-2">
          {label}
          {required && <RequiredSymbol />}
        </p>
      )}
      <div className="relative">
        <Input
          type={inputType}
          className="h-12 text-lg lg:text-xl"
          {...register(name)}
          {...props}
        />
        {type === "password" && (
          <PasswordToggleBtn
            onToggleClick={togglePasswordVisibility}
            isVisible={showPassword}
            className="mr-2"
          />
        )}
        {value && <ClearBtn onClick={onClearClick} />}
      </div>
      {errorText && <ErrorText text={errorText} className="mt-2" />}
    </div>
  );
};
