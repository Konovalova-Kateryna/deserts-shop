import React from "react";

export const Avatar: React.FC<{ name: string | null | undefined }> = ({
  name,
}) => {
  const getInitials = (fullname: string) => {
    const names = fullname.split(" ");
    return names
      .map((name) => name[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  const initials = getInitials(name || "");

  return (
    <div className="flex items-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-[50%] text-2xl font-segoe font-bold border-2 border-black ">
        {initials}
      </div>
    </div>
  );
};
