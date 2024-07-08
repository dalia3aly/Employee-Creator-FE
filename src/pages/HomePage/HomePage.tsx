import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login");
  }, [navigate]);

  return (
    <div>
      <h2>Redirecting to login...</h2>
    </div>
  );
};

export default HomePage;