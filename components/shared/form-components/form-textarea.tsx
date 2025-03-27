"use client";

import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { ClearBtn } from "../clear-btn";
import { useFormContext } from "react-hook-form";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  name: string;
  label?: string;
  required?: boolean;
  errorText?: string;
}

export const FormTextarea: React.FC<Props> = ({
  className,
  name,
  label,
  required,
  ...props
}) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name);
  const errorText = errors?.[name]?.message as string;

  const onClickClear = () => {
    setValue(name, "");
  };
  return (
    <div className={className}>
      <p className="font-medium mb-2">
        {label}
        {required && <span className="text-red-500">*</span>}
      </p>
      <div className="relative">
        <Textarea
          className="text-lg lg:text-xl pr-9"
          {...register(name)}
          {...props}
        />
        {value && <ClearBtn className="top-6" onClick={onClickClear} />}
      </div>
      {errorText && <p className="text-red-500 text-sm">{errorText}</p>}
    </div>
  );
};
