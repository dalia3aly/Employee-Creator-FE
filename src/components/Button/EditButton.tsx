import React from "react";
import Button from "./Button";

type EditButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
};

const EditButton: React.FC<EditButtonProps> = ({
  onClick,
  children,
  className,
}) => {
  return (
    <Button
      onClick={onClick}
      className={`bg-yellow-600 hover:bg-yellow-700 text-black ${className}`}>
      {children}
    </Button>
  );
};

export default EditButton;
