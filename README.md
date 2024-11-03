# Deyvison Tax Calculator

Welcome to the **Deyvison Tax Calculator**! This project is a React-based application that allows users to calculate taxes efficiently. It follows a clean architecture and is structured for scalability and maintainability.

## Table of Contents

- [Deyvison Tax Calculator](#deyvison-tax-calculator)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
  - [Project Structure](#project-structure)
  - [Architecture](#architecture)
  - [Testing](#testing)
    - [Running Tests](#running-tests)
  - [Commands](#commands)
  - [Technologies Used](#technologies-used)
  - [Contact](#contact)

## Features

- **Real-Time Calculations**: Instant tax calculation based on user inputs.
- **Internationalization**: Supports multiple languages for broader accessibility.
- **Responsive Design**: Optimized for various screen sizes.
- **Test Coverage**: Thoroughly tested components and services for reliability.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/deyvison-tax-calculator.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd deyvison-tax-calculator
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

## Project Structure

```plaintext
DEYVISON-TAX-CALCULATOR
├── src
│   ├── components         # Reusable UI components
│   │   ├── LanguageSwitcher     # Component for changing language
│   │   ├── TaxForm              # Component for tax form inputs
│   │   └── TaxResults           # Component for displaying results
│   ├── locales            # Localization files (e.g., en, fr)
│   ├── models             # Data models (e.g., TaxBracket, TaxCalculationResult)
│   ├── pages              # Pages (e.g., TaxCalculatorPage, NotFoundPage)
│   ├── services           # API calls and other services (e.g., httpClient, taxCalculatorApi)
│   ├── styles             # SCSS styling files
│   └── utils              # Utility functions and helpers
│       └── taxCalculator.ts     # Main tax calculation logic
├── tests                  # Configuration for tests
├── public                 # Public assets (e.g., index.html, images)
├── README.md              # Project documentation
└── package.json           # Project metadata and dependencies
```

## Architecture

This project follows **Clean Architecture** principles and **SOLID** design patterns:

- **Components** are organized to promote reusability and separation of concerns.
- **Models** define the core data structures used across the application.
- **Services** encapsulate API calls and business logic.
- **Pages** represent distinct views or screens of the application.

This architecture ensures scalability and makes it easier to test, maintain, and extend functionality over time.

## Testing

The project includes tests for components, pages, and services. We use **Jest** and **React Testing Library** for unit testing, which provides robust and flexible testing capabilities.

### Running Tests

To execute tests, use:

```bash
npm test
```

This command will launch the test runner in interactive watch mode. The following files represent different test areas:

- **Component Tests**: `src/components/*.test.tsx`
- **Page Tests**: `src/pages/*.test.tsx`
- **Utility and API Tests**: `src/utils/*.test.ts`, `src/services/*.test.ts`

## Commands

In the project directory, you can run the following commands:

- **Start Development Server**: `npm start`
  - Runs the app in development mode at [http://localhost:3000](http://localhost:3000).

- **Run Tests**: `npm test`
  - Launches the test runner in interactive watch mode.

- **Build for Production**: `npm run build`
  - Builds the app for production, outputting files to the `build` directory.

- **Eject**: `npm run eject`
  - **Note**: This is a one-way operation. Once you eject, you cannot go back.

## Technologies Used

- **React**: Front-end library for building user interfaces.
- **TypeScript**: Static typing for improved code quality and readability.
- **SCSS**: Enhanced styling with variables and mixins.
- **Jest** & **React Testing Library**: Testing framework for reliable and maintainable tests.

## Contact

- **Deyvison** - *Project Creator*
- **Email**: [deyvisonsouto@gmail.com](mailto:deyvisonsouto@gmail.com)
- **GitHub**: [Deyvison](https://github.com/yourusername)

