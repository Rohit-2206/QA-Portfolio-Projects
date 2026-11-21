
import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { PIMPage } from "../pages/PIMpage";

const loginURL =
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";

function generateEmployeeData() {
    const id = Date.now();

    return {
        firstName: `QA${id}`,
        middleName: "Automation",
        lastName: "Tester",
        updatedFirstName: `UpdatedQA${id}`,
        employeeId: `EMP${id}`
    };
}

test.describe("OrangeHRM PIM Module", () => {

    let pimPage: PIMPage;

    test.beforeEach(async ({ page }) => {

        const loginPage = new LoginPage(page);
        pimPage = new PIMPage(page);

        await page.goto(loginURL);

        await loginPage.login("Admin", "admin123");

        await pimPage.openPIMPage();
    });

    // TC18: Verify PIM navigation
    test("TC18 - Verify PIM page navigation", async ({ page }) => {

        await expect(page).toHaveURL(/pim\/viewEmployeeList/);

        await expect(pimPage.getPageHeading())
            .toHaveText("PIM");
    });

    // TC19: Add a new employee
    test("TC19 - Add a new employee with dynamic data", async ({ page }) => {

        const employee = generateEmployeeData();

        await pimPage.openAddEmployeeForm();

        await pimPage.addEmployee(
            employee.firstName,
            employee.middleName,
            employee.lastName
        );

        await expect(page.locator("h6"))
            .toContainText("Personal Details");
    });

    // TC20: Validate mandatory employee fields
    test("TC20 - Verify mandatory fields on Add Employee form", async () => {

        await pimPage.openAddEmployeeForm();

        await pimPage.submitEmptyEmployeeForm();

        await expect(pimPage.getRequiredErrors())
            .toHaveCount(2);
    });

    // TC21: Search employee by name
    test("TC21 - Search employee by name", async ({ page }) => {

        const employee = generateEmployeeData();

        await pimPage.openAddEmployeeForm();

        await pimPage.addEmployee(
            employee.firstName,
            employee.middleName,
            employee.lastName
        );

        await pimPage.openPIMPage();

        await pimPage.searchByName(
            `${employee.firstName} ${employee.middleName} ${employee.lastName}`
        );

        await expect(
            pimPage.getEmployeeRow(employee.firstName)
        ).toBeVisible();
    });

    // TC22: Search employee by Employee ID
    test("TC22 - Search employee by employee ID", async ({ page }) => {

    const loginPage = new LoginPage(page);
    const pimPage = new PIMPage(page);

    await loginPage.login("Admin", "admin123");

    await pimPage.openPIMPage();

    await pimPage.searchByEmployeeId("001");

    await expect(page.locator(".oxd-table-card").first()).toBeVisible();

    });

    // TC23: Search non-existing employee
    test("TC23 - Search employee with non-existing name", async ({ page }) => {

        await pimPage.searchByName("NonExistingEmployee999999");

        await expect(page.getByText("No Records Found"))
            .toBeVisible();
    });

    // TC24: Edit employee personal details
    test("TC24 - Update employee personal details", async ({ page }) => {

        const employee = generateEmployeeData();

        await pimPage.openAddEmployeeForm();

        await pimPage.addEmployee(
            employee.firstName,
            employee.middleName,
            employee.lastName
        );

        // Update employee details
        await pimPage.editPersonalDetails(
            employee.updatedFirstName,
            employee.middleName,
            employee.lastName
        );

        await expect(
            page.getByPlaceholder("First Name")
        ).toHaveValue(employee.updatedFirstName);
    });

});
