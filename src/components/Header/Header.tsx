import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signout } from "../../api/authService";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSignout = () => {
    signout();
    navigate("/login");
  };

  return (
    <header className="p-4 bg-gray-600 text-white">
      <nav>
        <ul className="flex flex-row  justify-center space-x-8">
          <li>
            <Link to="/">Home</Link>
          </li>
          {token ? (
            <>
              <li>
                <Link to="/employees">Employees' List</Link>
              </li>
              <li>
                <Link to="/employees/new">Add Employee</Link>
              </li>
              <li>
                <button onClick={handleSignout} className="text-white">
                  Sign Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
