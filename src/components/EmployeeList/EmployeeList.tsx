import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchEmployeesThunk,
  deleteEmployeeThunk,
} from "../../redux/slices/employeeSlice";
import { RootState, AppDispatch } from "../../redux/store";
import EmployeeListItem from "../EmployeeListItem/EmployeeListItem";

const EmployeeList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const employees = useSelector((state: RootState) => state.employees);

  useEffect(() => {
    dispatch(fetchEmployeesThunk());
  }, [dispatch]);

  const handleEdit = (id: number) => {
    console.log(`Edit employee with id ${id}`);
  };

  const handleRemove = async (id: number) => {
    dispatch(deleteEmployeeThunk(id));
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
    </div>
  );
};

export default EmployeeList;
