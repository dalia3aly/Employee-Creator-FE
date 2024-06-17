import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="p-4 bg-gray-800 text-white">
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link to="/employees">Employees' List</Link>
          </li>
          <li>
            <Link to="/employees/new">Add Employee</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
