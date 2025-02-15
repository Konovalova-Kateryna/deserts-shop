import React from "react";

interface IconProps {
  name: string;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ name, className = "" }) => {
  return (
    <svg className={`${className}`} aria-hidden="true">
      <use href={`/sprite.svg#${name}`} />
    </svg>
  );
};

export default Icon;
