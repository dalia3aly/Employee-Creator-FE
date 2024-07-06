import React from "react";
import { Employee } from "../../types";
import EmployeeListItem from "../EmployeeListItem/EmployeeListItem";

interface EmployeeListProps {
  employees: Employee[];
  onEdit: (id: number) => void;
  onRemove: (id: number) => void;
  onView: (id: number) => void;
}

const EmployeeList: React.FC<EmployeeListProps> = ({
  employees,
  onEdit,
  onRemove,
  onView,
}) => {
  const [sortedEmployees, setSortedEmployees] = React.useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sortOption, setSortOption] = React.useState<
    "none" | "name" | "startDate"
  >("none");

  React.useEffect(() => {
    let sortedList = [...employees];

    if (sortOption === "name") {
      sortedList.sort((a, b) => a.firstName.localeCompare(b.firstName));
    } else if (sortOption === "startDate") {
      sortedList.sort(
        (a, b) =>
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      );
    }

    if (searchTerm.length >= 2) {
      sortedList = sortedList.filter((employee) =>
        `${employee.firstName} ${employee.lastName}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    setSortedEmployees(sortedList);
  }, [employees, sortOption, searchTerm]);

  const handleSort = (option: "name" | "startDate") => {
    setSortOption((prevOption) => (prevOption === option ? "none" : option));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4 bg-gray-100 p-4 rounded shadow-md">
        <div>
          <input
            type="text"
            className="border p-2 rounded"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <button
            className={`p-2 rounded mr-2 ${
              sortOption === "name" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleSort("name")}>
            Sort by Name
          </button>
          <button
            className={`p-2 rounded ${
              sortOption === "startDate"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => handleSort("startDate")}>
            Sort by Start Date
          </button>
        </div>
      </div>
      <div className="bg-white border border-gray-200 rounded">
        {sortedEmployees.map((employee) => (
          <EmployeeListItem
            key={employee.id}
            employee={employee}
            onEdit={onEdit}
            onRemove={onRemove}
            onView={onView}
          />
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;
