import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "../Modal/Modal";
import EmployeeForm, { EmployeeFormData } from "../EmployeeForm/EmployeeForm";
import { createEmployeeThunk } from "../../redux/slices/employeeSlice";
import { AppDispatch } from "../../redux/store";

const AddEmployee: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddEmployee = async (data: EmployeeFormData) => {
    const employeeData = {
      ...data,
      id: 0,
      finishDate: data.finishDate || undefined,
    };
    try {
      await dispatch(createEmployeeThunk(employeeData));
      console.log("Employee added:", data);
      handleCloseModal();
    } catch (error) {
      console.error("Failed to add employee:", error);
    }
  };

  return (
    <div>
      <button
        onClick={handleOpenModal}
        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
        Add Employee
      </button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <EmployeeForm onSubmit={handleAddEmployee} />
      </Modal>
    </div>
  );
};

export default AddEmployee;
