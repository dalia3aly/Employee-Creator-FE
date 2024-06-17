import React from "react";
import Button from "./Button";

type RemoveButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
};

const RemoveButton: React.FC<RemoveButtonProps> = ({
  onClick,
  children,
  className,
}) => {
  return (
    <Button
      onClick={onClick}
      className={`bg-red-800 hover:bg-red-800 text-white ${className}`}>
      {children}
    </Button>
  );
};

export default RemoveButton;
