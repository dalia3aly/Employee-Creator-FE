import React from "react";
import { useParams } from "react-router-dom";

const EmployeeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>{id ? `Edit Employee ${id}` : "Add Employee"}</h1>
      {/* EmployeeForm component will go here */}
    </div>
  );
};

export default EmployeeDetailPage;
