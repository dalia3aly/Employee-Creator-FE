import React from "react";
import { RevolvingDot } from "react-loader-spinner";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <RevolvingDot color="#5f5574" height={200} width={200} />
    </div>
  );
};

export default LoadingSpinner;
