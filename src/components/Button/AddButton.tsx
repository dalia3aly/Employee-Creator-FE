import React from "react";
import Button from "./Button";

type AddButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
};

const AddButton: React.FC<AddButtonProps> = ({
  onClick,
  children,
  className,
}) => {
  return (
    <Button
      onClick={onClick}
      className={`bg-green-500 hover:bg-green-700 text-white ${className}`}>
      {children}
    </Button>
  );
};

export default AddButton;