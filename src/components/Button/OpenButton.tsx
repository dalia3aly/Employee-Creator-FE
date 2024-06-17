import React from "react";
import Button from "./Button";

type OpenButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
};

const OpenButton: React.FC<OpenButtonProps> = ({
  onClick,
  children,
  className,
}) => {
  return (
    <Button
      onClick={onClick}
      className={`bg-blue-500 hover:bg-blue-700 text-white ${className}`}>
      {children}
    </Button>
  );
};

export default OpenButton;