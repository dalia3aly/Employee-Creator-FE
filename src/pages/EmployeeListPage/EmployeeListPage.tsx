import React, { useEffect, useState } from "react";
import { fetchEmployees, deleteEmployee } from "../../api/employeeService";
import EmployeeListItem from "../../components/EmployeeListItem/EmployeeListItem";
import AddEmployee from "../../components/AddEmployee/AddEmployee";
import { Employee } from "../../types";

const EmployeeListPage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const getEmployees = async () => {
      const employees = await fetchEmployees();
      setEmployees(employees);
    };
    getEmployees();
  }, []);

  const handleEdit = (id: number) => {
    console.log("Edit employee:", id);
    // Navigate to edit page
  };

  const handleRemove = async (id: number) => {
    await deleteEmployee(id);
    setEmployees(employees.filter((employee) => employee.id !== id));
  };

  return (
    <div className="flex flex-col  min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(/pgbk.png)` }}>
      {/* <AddEmployee /> */}
      {employees.map((employee) => (
        <EmployeeListItem
          key={employee.id}
          employee={employee}
          onEdit={handleEdit}
          onRemove={handleRemove}
        />
      ))}
    </div>
  );
};

export default EmployeeListPage;
