SauceDemo UI Automation Framework
An end-to-end web UI automation framework built using Playwright, TypeScript, Playwright MCP, Playwright Test Agents, and GitHub Copilot. This project automates the core shopping workflows of the SauceDemo demo application, including login, product selection, cart management, and checkout.
The framework follows the Page Object Model (POM) design pattern to promote code reusability, maintainability, and scalability.

Overview
- Application SauceDemo(https://www.saucedemo.com/)
- Automation Tool: Playwright
- Programming Language: TypeScript
- Test Runner: Playwright Test
- Design Pattern: Page Object Model (POM)
- Browser: Chromium
- AI Test Agents: Playwright Test Agents, Playwright MCP, GitHub Copilot
- Version Control: Git and GitHub
- IDE: Visual Studio Code

Test Coverage

A total of 17 automated test cases cover four major application modules.

1. Login Module: Successful login, Login with invalid credentials, Login with locked-out user
2. Products Module: Verify inventory products, Sort products by price: low to high, Sort products by price: high to low, Add a product to cart, Verify product button changes after adding to cart |
3. Cart Module — Verify product in cart, Verify cart quantity and price, Remove product from cart, Continue shopping
4. Checkout Module — Checkout required-field validation, Submit checkout information, Verify order summary and price calculation, Cancel checkout, Complete order successfully |



Playwright Test Agents

Initialized using:
```bash
npx playwright init-agents --loop=vscode
```

The setup generated three agents:
- Planner: Helps create structured test plans.
- Generator: Helps generate Playwright test code.
- Healer: Helps investigate and repair failing tests.
The setup also generated the Playwright Test MCP server configuration.

GitHub Copilot: GitHub Copilot Agent mode was used as an AI coding assistant

Author
Rohit Chandrasekar

GitHub: [Rohit-2206](https://github.com/Rohit-2206)

LinkedIn: [Rohit Chandrasekar](https://www.linkedin.com/in/rohit-chandrasekar/)

*This project was developed as a hands-on exploration of modern UI automation, TypeScript, MCP-based browser interaction, and AI-assisted software testing.*
