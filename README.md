# Employee Creator Frontend

This is the frontend of the Employee Creator App built with **Vite, React, TypeScript, Tailwind CSS** and **Redux kit** for state management. The frontend allows users to interact with the Employee API to get, create, update, and delete employees.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Usage](#usage)
- [Testing](#testing)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)

## Features

- **Create Employees**: Add new employees with personal, contact, and employment details.
- **Update Employees**: Edit employee details.
- **Delete Employees**: Remove employees from the list.
- **Get Employee List**: Retrieve the list of all employees.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (v6 or higher)

## Installation

1. **Clone the Repository**:

```sh
git clone https://github.com/dalia3aly/Employee-Creator-FE.git
cd Employee-Creator-FE
```

2. **Install Dependencies**:

```sh
npm install
```

## Running the App

To run the Employee Creator App frontend, follow these steps:

1. Start the Development Server:

```sh
npm run dev
```

2. Open the App:
   Open your browser and navigate to http://localhost:5173. If Vite default port is busy, check the correct port in the console.

## Usage

Once the Employee Creator App is up and running, you can perform the following actions:

- Create a new employee by clicking on the "Add Employee" button and filling in the required details.
- Update an employee by clicking on the "Edit" button next to an - employee and modifying the details.
- Delete an employee by clicking on the "Remove" button next to an employee.
- View the list of all employees on the main page.

## Testing

The frontend of the Employee Creator App uses Jest and React Testing Library for unit testing. For more details on Jest configuration and setup for **Vite** applications, you can refer to this [dev.to article](https://dev.to/teyim/effortless-testing-setup-for-react-with-vite-typescript-jest-and-react-testing-library-1c48).

### Testing Tech Stack

- **Jest**: A delightful JavaScript Testing Framework with a focus on simplicity.
- **React Testing Library**: A very light-weight solution for testing React components.

### Running Unit Tests

To run the unit tests for the Employee Creator App frontend, follow these steps:

1. **Run Tests**:

```sh
npm test
```

OR for individual component testing

```sh
npm test <file-name>
```

2. **Watch Tests**
   To run tests in watch mode, use the following command:

```sh
npm run test:watch
```

This will execute the test suites and provide feedback on the tests' results.

## Folder Structure

The folder structure of the Employee Creator App frontend is as follows:

```
employee-creator-fe/
├── src/
│   ├── components/
│   │   ├── AddEmployee/
│   │   │   ├── AddEmployee.tsx
│   │   │   └── AddEmployee.test.tsx
│   │   ├── Button/
│   │   │   ├── AddButton.tsx
│   │   │   ├── AddButton.test.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Button.test.tsx
│   │   │   ├── EditButton.tsx
│   │   │   ├── EditButton.test.tsx
│   │   │   ├── OpenButton.tsx
│   │   │   ├── OpenButton.test.tsx
│   │   │   ├── RemoveButton.tsx
│   │   │   └── RemoveButton.test.tsx
│   │   ├── EmployeeForm/
│   │   │   ├── ContactDetails/
│   │   │   │   ├── ContactDetails.tsx
│   │   │   │   └── ContactDetails.test.tsx
│   │   │   ├── EmploymentStatus/
│   │   │   │   ├── EmploymentStatus.tsx
│   │   │   │   └── EmploymentStatus.test.tsx
│   │   │   ├── PersonalInformation/
│   │   │   │   ├── PersonalInformation.tsx
│   │   │   │   └── PersonalInformation.test.tsx
│   │   │   ├── EmployeeForm.tsx
│   │   │   └── EmployeeForm.test.tsx
│   │   ├── EmployeeList/
│   │   │   ├── EmployeeList.tsx
│   │   │   └── EmployeeList.test.tsx
│   │   ├── EmployeeListItem/
│   │   │   ├── EmployeeListItem.tsx
│   │   │   └── EmployeeListItem.test.tsx
│   │   ├── Header/
│   │   │   ├── Header.tsx
│   │   │   └── Header.test.tsx
│   │   ├── Modal/
│   │   │   ├── Modal.tsx
│   │   │   └── Modal.test.tsx
│   ├── pages/
│   │   ├── EmployeeDetailPage/
│   │   │   ├── EmployeeDetailPage.tsx
│   │   │   └── EmployeeDetailPage.test.tsx
│   │   ├── EmployeeListPage/
│   │   │   ├── EmployeeListPage.tsx
│   │   │   └── EmployeeListPage.test.tsx
│   │   └── NotFoundPage.tsx
│   ├── redux/
│   │   ├── slices/
│   │   │   └── employeeSlice.ts
│   │   └── store.ts
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── public/
│   ├── index.html
├── .eslintrc.cjs
├── .gitignore
├── jest.config.js
├── jest.setup.ts
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── setupTests.ts
└── ...
```

## Contributing

Contributions are welcome! If you would like to contribute to the Employee Creator App frontend, please follow these steps:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Commit your changes.
5. Push to the branch.
6. Open a pull request.

- Please ensure that your code follows the project's coding style and conventions.

**Thank you for your interest in contributing to the Employee Creator App!**
