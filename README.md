# Bookstore API Automation Framework

A **production-grade API automation testing framework** built with **TypeScript + Playwright Test** to validate the Online Bookstore REST API provided by FakeRestAPI.

This project was designed as a **clean, scalable, and maintainable API test architecture**, covering:

- Full API coverage
- Edge case validation
- Strong code quality standards
- Reporting & observability
- Dockerized execution
- CI/CD integration

> This is not a simple test suite — it is a reusable API testing framework.

---

## Tech Stack

| Area              | Tooling                          |
|-------------------|----------------------------------|
| Language          | TypeScript                       |
| Test Framework    | Playwright Test (API mode)      |
| Reporting         | Playwright HTML + Allure        |
| Lint & Format     | ESLint, Prettier, Husky         |
| Containerization  | Docker                           |
| CI/CD             | GitHub Actions                   |

---

## What This Project Demonstrates

This framework was intentionally built to demonstrate:

- Proper API test architecture
- Separation of concerns (models / services / validators / tests)
- Reusability and readability
- Edge case & negative scenario thinking
- Enterprise-level reporting
- Containerized test execution
- Automated CI pipeline
- Code quality enforcement before commit/push

---

## Project Structure

```
bookstore-api-tests/
├── .github/workflows/        # CI pipeline
├── src/
│   ├── features/
│   │   ├── models/           # Request/response typings
│   │   ├── services/         # API client layer
│   │   └── validators/       # Response schema validators
│   └── tests/
│       ├── books/            # Books API tests
│       └── authors/          # Authors API tests (extension)
├── Dockerfile
├── playwright.config.ts
└── README.md
```

---

## Test Coverage

### Books API — Full Coverage

- Create Book
- Get Book(s)
- Update Book
- Delete Book
- Field validations
- Boundary values
- Missing fields
- Invalid types
- Negative numbers
- Null / empty payloads

> 36 test cases covering both happy paths and edge scenarios.

### Authors API — Optional Extension

Additional coverage to demonstrate framework scalability.

---

## ⚙️ Setup

### Prerequisites

- Node.js ≥ 18
- Docker
- Git

### Installation

```bash
git clone https://github.com/your-username/fakerestapi-playwright-typescript-test.git
cd bookstore-api-tests
npm install
npm run prepare
npx playwright install chromium
```

---

## Running Tests Locally

```bash
npm test
npm run test:books
npm run test:authors
npm run test:ci
```

---

## Reports

### Playwright HTML Report

```bash
npm run report:html
```

### Allure Report

```bash
npm run report:allure
```

---

## Running Tests in Docker (Recommended)

Build image:

```bash
docker build -t bookstore-api-tests:latest .
```

Run tests:

```bash
docker run --rm \
  -e BASE_URL=https://fakerestapi.azurewebsites.net \
  -v "$(pwd)/playwright-report:/app/playwright-report" \
  -v "$(pwd)/allure-results:/app/allure-results" \
  bookstore-api-tests:latest
```

View reports:

```bash
npx playwright show-report playwright-report/html
npm run report:allure
```

---

## Code Quality

| Tool      | Purpose                          |
|-----------|----------------------------------|
| ESLint    | TypeScript & Playwright rules   |
| Prettier  | Consistent formatting           |
| Husky     | Pre-commit format, pre-push lint|

```bash
npm run format
npm run lint
npm run lint:fix
```

---

## CI/CD Pipeline

GitHub Actions workflow:

- Triggers on push / pull request
- Builds Docker image
- Runs tests inside container
- Publishes Playwright & Allure reports as artifacts

Reports can be downloaded from the **Actions** tab.

---

## Environment Variables

| Variable | Default                                      |
|----------|-----------------------------------------------|
| BASE_URL | https://fakerestapi.azurewebsites.net        |

---

## Why This Project Stands Out

Unlike basic API test projects, this framework emphasizes:

- Maintainability
- Scalability
- Clean architecture
- Test reliability
- Professional reporting
- Real-world DevOps practices

---

## Happy Testing
