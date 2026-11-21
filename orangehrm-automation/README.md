OrangeHRM UI Web Automation - Test Automation Framework

Project Overview

- This project is a UI test automation framework developed using Playwright with TypeScript to validate key functionalities of the OrangeHRM web application.
- The framework follows the Page Object Model (POM) design pattern to improve code reusability, maintainability, and scalability.
- The project focuses on automating functional test scenarios for the Login, Admin, and PIM modules.

Tech Stack
- Programming Language: TypeScript
- Automation Framework: Playwright
- Test Runner: Playwright Test
- Design Pattern: Page Object Model (POM)
- Browser: Chromium
- Assertions: Playwright Expect
- Version Control: Git and GitHub
- IDE: Visual Studio Code

Project Modules and Test Coverage
1. Login Module: Login with valid credentials, Login with invalid username, Login with invalid password, Login with invalid username and password, Login with empty username, Login with empty password, Login with both fields empty, Password field masking, Login button state and interaction

2. Admin Module: Admin Page Accessible, Assert Header for Admin Page

3. PIM Module: Automated scenarios covering: Verify PIM page navigation, Add a new employee using dynamic test data, Validate mandatory employee fields, Search employees by name, Search employees by Employee ID, Search for a non-existing employee, Update employee personal details

4. Dashboard Module: Assert Heading for Dashboard page, Assert if logo is displayed correctly in dashboard page, Redirection after logout from dashboard page


Secure Credential Management
Sensitive login credentials are not hardcoded in the test scripts. The framework uses environment variables to retrieve valid login credentials:

- const validUsername = process.env.ORANGEHRM_USERNAME;
- const validPassword = process.env.ORANGEHRM_PASSWORD;

For GitHub Actions execution, credentials are securely configured using GitHub Repository Secrets: ORANGEHRM_USERNAME, ORANGEHRM_PASSWORD
The workflow injects these secrets into the test execution environment. This approach keeps sensitive credentials out of the source code and version control


Learning Outcomes
Through this project, I have gained practical experience in:
- Building UI automation frameworks using Playwright and TypeScript.
- Implementing the Page Object Model design pattern.
- Designing and executing functional test scenarios.
- Working with dynamic test data.
- Automating end-to-end user workflows.
- Managing credentials through environment variables and GitHub Secrets.
- Integrating automated tests into a GitHub Actions CI/CD pipeline.
- Analyzing test execution results and HTML reports.

Author
Rohit Chandrasekar
