# Bookstore API Automation Tests

This project is an **API automation testing framework** for the **Online Bookstore** REST API provided by FakeRestAPI.  
It was built to meet the requirements of an API automation assessment, focusing on clean structure, reusability, edge case coverage, reporting, Dockerization, and CI/CD integration.

### Key Features
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
text## Prerequisites

- Node.js ≥ 18
- Docker (Docker Desktop recommended)
- Git

## Local Setup

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/bookstore-api-tests.git
   cd bookstore-api-tests

Install dependenciesBashnpm install
Activate Husky hooksBashnpm run prepare
Install Playwright browsersBashnpx playwright install --with-deps chromium

Running Tests
Local commands
Bashnpm test                    # all tests
npm run test:books          # only books tests
npm run test:authors        # only authors tests
npm run test:ci             # quiet + reports
View Reports
Bashnpm run report:html         # Playwright HTML report
npm run report:allure       # Allure report
Docker (recommended)
Bash# Build image
docker build -t bookstore-api-tests:latest .

# Run tests in container
docker run --rm \
  -e BASE_URL=https://fakerestapi.azurewebsites.net \
  -v "$(pwd)/playwright-report:/app/playwright-report" \
  -v "$(pwd)/allure-results:/app/allure-results" \
  bookstore-api-tests:latest
Code Quality
Bashnpm run format
npm run lint
npm run lint:fix
CI/CD (GitHub Actions)
Workflow triggers on push/PR to main and uploads reports as artifacts.
Test Coverage

36 tests for Books API
Happy paths + extensive edge cases
All tests pass in Docker

Environment Variables

BASE_URL (default: https://fakerestapi.azurewebsites.net)

Happy testing!