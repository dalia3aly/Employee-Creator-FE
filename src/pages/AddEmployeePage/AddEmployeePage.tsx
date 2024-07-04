import React from "react";
import { useNavigate } from "react-router-dom";
import EmployeeForm from "../../components/EmployeeForm/EmployeeForm";
import { createEmployee } from "../../api/employeeService";
import { EmployeeFormData } from "../../components/EmployeeForm/EmployeeForm";

const AddEmployeePage: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateEmployee = async (data: EmployeeFormData) => {
    try {
      await createEmployee(data);
      navigate("/employees");
    } catch (error) {
      console.error("Failed to create employee", error);
    }
  };

  return (
    <div className="employee-detail-page">
      <EmployeeForm onSubmit={handleCreateEmployee} />
    </div>
  );
};

export default AddEmployeePage;
