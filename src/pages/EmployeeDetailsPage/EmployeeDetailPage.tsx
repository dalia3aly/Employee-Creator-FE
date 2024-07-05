import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEmployeeById } from "../../api/employeeService";
import { Employee } from "../../types";

const EmployeeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [employee, setEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      if (id) {
        const employeeData = await getEmployeeById(Number(id));
        setEmployee(employeeData);
      }
    };

    fetchEmployee();
  }, [id]);

  if (!employee) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-gray-300 shadow-md rounded-lg p-8 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 text-center">
          {`${employee.firstName} ${employee.lastName}`}
        </h1>
        <div className="space-y-4">
          <p className="text-lg">
            <span className="font-semibold">Email:</span> {employee.email}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Phone:</span>{" "}
            {employee.mobileNumber}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Contract Type:</span>{" "}
            {employee.contractType}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Employment Type:</span>{" "}
            {employee.employmentType}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Start Date:</span>{" "}
            {employee.startDate}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Finish Date:</span>{" "}
            {employee.finishDate}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Ongoing:</span>{" "}
            {employee.onGoing ? "Yes" : "No"}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Hours per Week:</span>{" "}
            {employee.hoursPerWeek}
          </p>
          {employee.address && (
            <>
              <h2 className="text-xl font-bold text-gray-800">
                Permanent Address:
              </h2>
              <p className="text-lg">
                <span className="font-semibold">Country:</span>{" "}
                {employee.address.country}
              </p>
              <p className="text-lg">
                <span className="font-semibold">State:</span>{" "}
                {employee.address.state}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Unit Number:</span>{" "}
                {employee.address.unitNumber}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Street Address:</span>{" "}
                {employee.address.streetAddress}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Suburb:</span>{" "}
                {employee.address.suburb}
              </p>

              <p className="text-lg">
                <span className="font-semibold">Postcode:</span>{" "}
                {employee.address.postcode}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailPage;
