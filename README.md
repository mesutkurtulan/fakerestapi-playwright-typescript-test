# Bookstore API Automation Tests

This project is an **API automation testing framework** for the **Online Bookstore** REST API provided by FakeRestAPI.  
It was built to meet the requirements of an API automation assessment, focusing on clean structure, reusability, edge case coverage, reporting, Dockerization, and CI/CD integration.

## Key Features
- **Language & Framework**: TypeScript + Playwright Test
- **API Endpoints Tested**: Books API (full coverage) + Authors API (optional extension)
- **Test Types**: Happy paths + various edge cases (missing fields, invalid values, negative numbers, empty/null bodies, etc.)
- **Reporting**: Playwright HTML report + Allure report
- **Code Quality**: ESLint (TypeScript + Playwright rules), Prettier, Husky (pre-commit: format, pre-push: lint)
- **Containerization**: Docker (tests run automatically in container)
- **CI/CD**: GitHub Actions (Docker-based pipeline with report artifacts)

## Project Structure
bookstore-api-tests/
├── .github/
│   └── workflows/
│       └── api-tests.yml
├── src/
│   ├── features/
│   │   ├── models/
│   │   └── services/
│   │   └── validators/
│   └── tests/
│       ├── books/
│       └── authors/
├── .dockerignore
├── .gitignore
├── .husky/
├── .prettierrc
├── Dockerfile
├── eslint.config.mjs
├── package.json
├── package-lock.json
├── playwright.config.ts
├── tsconfig.json
└── README.md

## Prerequisites

- Node.js ≥ 18
- Docker (Docker Desktop recommended)
- Git

## Local Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/fakerestapi-playwright-typescript-test.git
   cd fakerestapi-playwright-typescript-test
   cd bookstore-api-tests

2. **Install dependencies**

   ```bash
  npm install

3. **Activate Husky hooks (automatic formatting & linting)**

   ```bash
  npm run prepare

4. **Install Playwright browsers (needed for local runs)**

   ```bash
  npx playwright install --with-deps chromium

## Running Tests
**Local commands**

  npm test                    # Run all tests
  npm run test:books          # Only Books tests
  npm run test:authors        # Only Authors tests
  npm run test:ci             # Quiet mode + report generation

**View Reports**

  npm run report:html         # Open Playwright HTML report
  npm run report:allure       # Generate & open Allure report

**Docker (recommended)**

  # Build the image (first time takes longer)
    docker build -t bookstore-api-tests:latest .

  # Run tests in container + export reports
    docker run --rm \
      -e BASE_URL=https://fakerestapi.azurewebsites.net \
      -v "$(pwd)/playwright-report:/app/playwright-report" \
      -v "$(pwd)/allure-results:/app/allure-results" \
      bookstore-api-tests:latest

  # Run tests in container + export reports
    npx playwright show-report playwright-report/html
    npm run report:allure

**Code Quality & Formatting**

  npm run format              # Format code with Prettier
  npm run lint                # Check linting issues
  npm run lint:fix            # Auto-fix linting issues

**View Reports**

## CI/CD Pipeline (GitHub Actions)

  - The workflow in .github/workflows/api-tests.yml:

  - Triggers on push / pull request to master or manual dispatch
  - Builds the Docker image
  - Runs all tests inside Docker
  - Uploads Playwright HTML and Allure results as artifacts

  - View pipeline runs and download reports from the Actions tab in the repository.

## Test Coverage

  - 36 tests written for the Books API
  - Covers happy paths + extensive edge cases
  - All tests pass in both local and Docker environments

## Environment Variables

  - BASE_URL (default: https://fakerestapi.azurewebsites.net)

Happy testing!