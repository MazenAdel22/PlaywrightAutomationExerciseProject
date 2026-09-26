# 🚀 Playwright Automation Framework - Automation Exercise Website

## 📖 Project Overview

Welcome to the Playwright Automation Framework repository! 🎯

This project demonstrates a modern, scalable, and maintainable UI test automation framework built using **Playwright with TypeScript** to validate the functionality of the **Automation Exercise** e-commerce web application.

The framework follows industry-standard automation practices and design patterns to provide:

* High readability and maintainability
* Reusable page objects and fixtures
* Centralized test data management
* Data-driven testing capabilities
* Cross-browser test execution
* Automated test reporting with Allure
* Continuous Integration using GitHub Actions

The framework is designed to support reliable end-to-end testing of critical e-commerce user journeys, from authentication and product discovery to cart management, checkout, payment, and order confirmation.

---

## 🛠 Tools & Technologies

* **Programming Language:** TypeScript ⚡
* **Automation Tool:** Playwright 🎭
* **Test Runner:** Playwright Test 🧪
* **Design Pattern:** Page Object Model (POM) 📑
* **Test Data:** Externalized TypeScript test data
* **Fixtures:** Custom Playwright Fixtures
* **Browsers:** Chromium & WebKit 🌐
* **Reporting:** Allure Playwright Report 📊
* **CI/CD:** GitHub Actions 🚀
* **Version Control:** Git & GitHub 🐙

---

## 🏗 Framework Architecture

The framework is structured to promote scalability, reusability, and maintainability.

```text
PlaywrightAutomationExerciseProject
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── tests/
│   └── AutomationExerciseWebsite/
│       │
│       ├── fixtures/
│       │   └── BaseFixture.ts
│       │
│       ├── pages/
│       │   ├── HomePage.ts
│       │   ├── LoginPage.ts
│       │   ├── RegistrationPage.ts
│       │   ├── ProductsPage.ts
│       │   ├── ProductDetailsPage.ts
│       │   ├── CategoryProductsPage.ts
│       │   ├── BrandProductsPage.ts
│       │   ├── ContactUsPage.ts
│       │   ├── CartPage.ts
│       │   ├── CheckoutPage.ts
│       │   ├── PaymentPage.ts
│       │   └── CompletedOrderPage.ts
│       │
│       ├── uiTests/
│       │   ├── authentication.spec.ts
│       │   ├── communications.spec.ts
│       │   ├── product-search.spec.ts
│       │   ├── product-catalog.spec.ts
│       │   └── Full-order-cycle.spec.ts
│       │
│       └── utils/
│           ├── Setup/
│           │   └── globalSetup.ts
│           │
│           └── TestData/
│               ├── users.ts
│               ├── products.ts
│               ├── messagesWithTitles.ts
│               └── paymentCard.ts
│
├── allure-report/
├── allure-results/
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.ts
└── README.md
```

### Key Components

#### Page Objects

Page Object classes encapsulate page locators and user interactions.

This approach helps to:

* Reduce code duplication
* Improve test readability
* Centralize locator maintenance
* Increase framework reusability

The framework currently provides page objects for authentication, products, product details, categories, brands, contact forms, cart, checkout, payment, and order confirmation.

#### Custom Fixtures

A custom Playwright fixture centralizes page-object initialization and makes the required page objects directly available to test cases.

This allows test files to focus on **business scenarios and validations** instead of repeatedly creating page-object instances.

#### Test Data Management

Test data is maintained separately from the test implementation.

The framework includes dedicated data modules for:

* User information
* Product information
* Expected application messages
* Payment data

This supports cleaner test cases and easier test-data maintenance.

#### Global Setup

The framework uses a global setup process to prepare the authenticated state required by the end-to-end order flow.

---

## 🏆 Key Features

✔️ Page Object Model (POM) Architecture

✔️ Reusable Custom Playwright Fixtures

✔️ Externalized Test Data

✔️ Data-Driven Testing

✔️ Cross-Browser Execution

✔️ Chromium & WebKit Support

✔️ Playwright Auto-Waiting

✔️ Authentication State Management

✔️ End-to-End E-commerce Testing

✔️ Allure Test Reporting

✔️ Screenshots, Videos & Traces for Debugging

✔️ GitHub Actions CI/CD Integration

✔️ Scalable and Maintainable Framework Structure

---

## 🧪 Automated Test Coverage

The framework currently covers the following major Automation Exercise user journeys.

### 🔐 Authentication & Account Management

* Valid User Registration
* Existing Email Registration Validation
* Valid Login
* Invalid Login
* Account Deletion
* Logged-in User Validation

### 📩 Communication

* Contact Us Form Submission
* Newsletter Subscription
* Form Validation and Success Messages

### 🔎 Product Search

* Search Products with Matching Results
* Search Products with No Results
* Search Result Validation
* Product Name Verification

### 🛍️ Product Catalog

* Featured Products Validation
* Recommended Products Validation
* Category Products Validation
* Brand Products Validation
* Product Details Verification
* Product Availability Verification
* Product Price Verification
* Product Condition Verification
* Product Brand Verification
* Product Review Submission

### 🛒 Shopping Cart

* Add Products to Cart
* Add Multiple Quantities
* Validate Product Names
* Validate Unit Prices
* Validate Quantities
* Validate Line Totals
* Remove Products from Cart
* Cart Content Validation

### 💳 Checkout & Order Management

* Checkout Navigation
* Delivery Address Validation
* Billing Address Validation
* Order Summary Validation
* Payment Form Submission
* Order Placement
* Order Confirmation Validation

---

## 🚀 Running Tests

### 1. Install Dependencies

Clone the repository and install the required dependencies:

```bash
npm install
```

### 2. Install Playwright Browsers

```bash
npx playwright install
```

### 3. Execute All Tests

```bash
npx playwright test
```

### 4. Run Tests in Chromium

```bash
npx playwright test --project=chromium
```

### 5. Run Tests in WebKit

```bash
npx playwright test --project=webkit
```

### 6. Run a Specific Test File

```bash
npx playwright test tests/AutomationExerciseWebsite/uiTests/authentication.spec.ts
```

### 7. Run Tests in Headed Mode

```bash
npx playwright test --headed
```

### 8. Run the Configured Test Script

```bash
npm test
```

The project's configured npm test script executes Playwright in headed mode with a single worker and handles the configured reporting workflow.

---

## 📊 Reporting

The framework uses **Allure Playwright Reporter** for test execution reporting.

Allure reports can provide:

✔️ Test execution summary

✔️ Passed and failed test details

✔️ Error information and stack traces

✔️ Screenshots

✔️ Videos

✔️ Playwright traces

### Generate Allure Report

```bash
npm run generate:reports
```

### Open Allure Report

```bash
npm run open:reports
```

The framework also includes commands for cleaning previous report artifacts before execution.

---

## 🔄 Continuous Integration

The project is designed to support automated execution through **GitHub Actions**.

The CI workflow can be used to:

✔️ Install project dependencies

✔️ Install Playwright browsers

✔️ Execute automated tests

✔️ Validate changes on push and pull requests

✔️ Preserve test execution artifacts

This enables the automation suite to become part of a continuous testing and CI/CD workflow.

---

## ⚙️ Test Configuration

The Playwright configuration includes:

* **Base URL:** `https://automationexercise.com/`
* **Test Timeout:** 90 seconds
* **Browsers:** Chromium and WebKit
* **Retries:** Enabled on CI
* **CI Workers:** Single worker
* **Parallel Execution:** Enabled
* **Reporter:** Allure Playwright
* **Trace:** Captured on first retry
* **Screenshots:** Enabled
* **Video:** Enabled
* **Global Setup:** Configured for authenticated test preparation

The framework configuration is maintained in:

```text
playwright.config.ts
```

---

## 🎯 End-to-End Order Flow

One of the main scenarios implemented in this framework validates a complete customer order journey.

The automated flow includes:

```text
Login
  ↓
Browse Products
  ↓
Add Products to Cart
  ↓
Validate Cart
  ↓
Remove Product
  ↓
Proceed to Checkout
  ↓
Validate Delivery & Billing Information
  ↓
Enter Payment Details
  ↓
Place Order
  ↓
Validate Order Confirmation
```

This scenario validates the interaction between multiple application components and demonstrates end-to-end automation of a complete e-commerce workflow.

---

## 📌 Application Under Test

**Automation Exercise**

The test automation framework targets the Automation Exercise e-commerce practice website.

Application URL:

https://automationexercise.com/

---

## 🎯 Why This Framework?

This project demonstrates practical experience in:

🔹 Building UI automation frameworks from scratch using Playwright and TypeScript

🔹 Applying the Page Object Model design pattern

🔹 Developing reusable custom Playwright fixtures

🔹 Managing test data separately from test implementation

🔹 Creating maintainable and scalable automated test suites

🔹 Implementing cross-browser test execution

🔹 Automating complete end-to-end e-commerce scenarios

🔹 Generating detailed Allure test reports

🔹 Integrating automated testing with CI/CD pipelines

🔹 Applying automation best practices to real-world web application workflows

