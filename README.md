# Playwright Enterprise Automation Framework

A scalable, reusable end-to-end test automation framework built with Playwright and TypeScript.
Designed to support multiple web applications with a single shared core infrastructure.

---

## 🌐 Applications Under Test

| Application | URL | Domain |
|---|---|---|
| OrangeHRM | https://opensource-demo.orangehrmlive.com | HR Management |
| OpenCart | https://demo.opencart.com | E-Commerce |

---

## 🏗️ Framework Architecture
playwright-enterprise-framework/
│
├── tests/                  # Test specs
│   ├── orangeHrm/          # OrangeHRM test cases
│   └── openCart/           # OpenCart test cases
│
├── pages/                  # Page Object Models
│   ├── orangeHrm/          # OrangeHRM page objects
│   └── openCart/           # OpenCart page objects
│
├── fixtures/               # Base classes and custom fixtures
│   └── BasePage.ts         # Reusable base page methods
│
├── data/                   # Test data
│   ├── orangeHrm/          # OrangeHRM test data (JSON)
│   └── openCart/           # OpenCart test data (JSON)
│
├── constants/              # Static reusable values
│   ├── urls.ts             # Application URLs
│   ├── messages.ts         # Expected UI messages
│   └── timeouts.ts         # Timeout constants
│
├── utils/                  # Reusable utility functions
├── api/                    # API request helpers
├── .github/workflows/      # GitHub Actions CI/CD
├── playwright.config.ts    # Playwright configuration
├── tsconfig.json           # TypeScript configuration
└── package.json

---

## 🛠️ Tech Stack

| Tool | Purpose |
|---|---|
| [Playwright](https://playwright.dev/) | Browser automation |
| TypeScript | Strongly typed test code |
| Node.js | Runtime environment |
| GitHub Actions | CI/CD pipeline |

---

## ⚙️ Prerequisites

- Node.js v18 or above
- npm v9 or above
- Git

---

## 🚀 Getting Started

**1. Clone the repository**
```bash
git clone https://github.com/abchahal/playwright_ecommerce_automation.git
cd playwright_ecommerce_automation
```

**2. Install dependencies**
```bash
npm install
```

**3. Install Playwright browsers**
```bash
npx playwright install
```

**4. Run all tests**
```bash
npx playwright test
```

---

## ▶️ Running Tests

| Command | Description |
|---|---|
| `npx playwright test` | Run all tests |
| `npx playwright test --headed` | Run in headed mode |
| `npx playwright test tests/orangeHrm/` | Run OrangeHRM tests only |
| `npx playwright test tests/openCart/` | Run OpenCart tests only |
| `npx playwright test -g "Login"` | Run tests matching name |
| `npx playwright show-report` | Open HTML test report |

---

## 📊 Reporting

Playwright HTML report is generated automatically after each run.

```bash
npx playwright show-report
```

Reports are saved in the `playwright-report/` folder.

---

## 🧱 Framework Design Principles

- **Page Object Model (POM)** — UI interactions abstracted into page classes
- **Reusable BasePage** — Common methods (click, fill, navigate) shared across all pages
- **Data-Driven Testing** — Test data stored in JSON files, decoupled from test logic
- **Constants Layer** — URLs, messages, and timeouts centralized for easy maintenance
- **TypeScript** — Strong typing for early error detection and better IDE support

---

## ✅ Test Coverage

| Module | UI Tests | API Tests |
|---|---|---|
| OrangeHRM Login | ✅ | ✅ |
| OrangeHRM Employee Management | ✅ | ✅ |
| OrangeHRM Leave Management | ✅ | - |
| OpenCart Search | ✅ | ✅ |
| OpenCart Cart | ✅ | ✅ |
| OpenCart Checkout | ✅ | - |
| OpenCart Registration | ✅ | - |

---

## 👤 Author

**Abhishek Chahal**  
Senior Software Testing Engineer  
[GitHub](https://github.com/abchahal) | [LinkedIn](https://www.linkedin.com/in/your-profile)

---

## 📄 License

This project is for learning and portfolio demonstration purposes.