import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchEmployeesThunk,
  deleteEmployeeThunk,
} from "../../redux/slices/employeeSlice";
import { RootState, AppDispatch } from "../../redux/store";
import EmployeeListItem from "../EmployeeListItem/EmployeeListItem";
import Modal from "../Modal/Modal";
import EmployeeForm, { EmployeeFormData } from "../EmployeeForm/EmployeeForm";
import { updateEmployee } from "../../api/employeeService";

const EmployeeList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const employees = useSelector((state: RootState) => state.employees);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] =
    useState<EmployeeFormData | null>(null);

  useEffect(() => {
    dispatch(fetchEmployeesThunk());
  }, [dispatch]);

  const handleEdit = (id: number) => {
    const employee = employees.find((emp) => emp.id === id);
    if (employee) {
      setSelectedEmployee(employee);
      setIsModalOpen(true);
    }
    console.log(`Edit employee with id ${id}`);
  };

  const handleRemove = async (id: number) => {
    dispatch(deleteEmployeeThunk(id));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleUpdateEmployee = async (data: EmployeeFormData) => {
    if (selectedEmployee && selectedEmployee.id) {
      await updateEmployee(selectedEmployee.id, data);
      dispatch(fetchEmployeesThunk());
      setIsModalOpen(false);
      setSelectedEmployee(null);
    }
  };

  return (
    <div>
      {employees.map((employee) => (
        <EmployeeListItem
          key={employee.id}
          employee={employee}
          onEdit={handleEdit}
          onRemove={handleRemove}
        />
      ))}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {selectedEmployee && (
          <EmployeeForm
            onSubmit={handleUpdateEmployee}
            defaultValues={selectedEmployee}
          />
        )}
      </Modal>
    </div>
  );
};

export default EmployeeList;
