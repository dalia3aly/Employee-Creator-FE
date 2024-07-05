import React, { useEffect, useState } from "react";
import {
  fetchEmployees,
  deleteEmployee,
  updateEmployee,
} from "../../api/employeeService";
import EmployeeList from "../../components/EmployeeList/EmployeeList";
import Modal from "../../components/Modal/Modal";
import EmployeeForm, {
  EmployeeFormData,
} from "../../components/EmployeeForm/EmployeeForm";
import { Employee } from "../../types";
import { useNavigate } from "react-router-dom";

const EmployeeListPage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] =
    useState<EmployeeFormData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getEmployees = async () => {
      const employees = await fetchEmployees();
      setEmployees(employees);
    };
    getEmployees();
  }, []);

  const handleEdit = (id: number) => {
    const employee = employees.find((emp) => emp.id === id);
    if (employee) {
      setSelectedEmployee({
        ...employee,
        address: employee.address || {
          unitNumber: "",
          streetAddress: "",
          suburb: "",
          state: "",
          postcode: "",
          country: "Australia",
        },
        hoursPerWeek: employee.hoursPerWeek || 0,
      });
      setIsModalOpen(true);
    }
    console.log("Edit employee:", id);
  };

  const handleRemove = async (id: number) => {
    await deleteEmployee(id);
    setEmployees(employees.filter((employee) => employee.id !== id));
  };

  const handleView = (id: number) => {
    navigate(`/employees/${id}`);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleUpdateEmployee = async (data: EmployeeFormData) => {
    if (selectedEmployee && selectedEmployee.id) {
      await updateEmployee(selectedEmployee.id, data);
      const updatedEmployees = employees.map((emp) =>
        emp.id === selectedEmployee.id ? { ...emp, ...data } : emp
      );
      setEmployees(updatedEmployees);
      setIsModalOpen(false);
      setSelectedEmployee(null);
    }
  };

  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(/pgbk.png)` }}>
      <EmployeeList
        employees={employees}
        onEdit={handleEdit}
        onRemove={handleRemove}
        onView={handleView}
      />
      {isModalOpen && selectedEmployee && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <EmployeeForm
            onSubmit={handleUpdateEmployee}
            defaultValues={selectedEmployee}
          />
        </Modal>
      )}
    </div>
  );
};

export default EmployeeListPage;
