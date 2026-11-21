
import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

const loginURL = "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";
const dashboardURL = "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index";

test.describe("OrangeHRM Login Functionality", () => {

    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await page.goto(loginURL);
    });

    // TC01: Valid username and password
    test("TC01 - Verify login with valid credentials", async ({ page }) => {

        await loginPage.login("Admin", "admin123");

        await expect(page).toHaveURL(dashboardURL);
        await expect(page.locator("h6")).toContainText("Dashboard");
    });

    // TC02: Invalid username
    test("TC02 - Verify login with invalid username", async () => {

        await loginPage.login("WrongUser", "admin123");

        await expect(loginPage.getInvalidCredentialsMessage())
            .toHaveText("Invalid credentials");
    });

    // TC03: Invalid password
    test("TC03 - Verify login with invalid password", async () => {

        await loginPage.login("Admin", "WrongPassword");

        await expect(loginPage.getInvalidCredentialsMessage())
            .toHaveText("Invalid credentials");
    });

    // TC04: Both username and password invalid
    test("TC04 - Verify login with both invalid credentials", async () => {

        await loginPage.login("WrongUser", "WrongPassword");

        await expect(loginPage.getInvalidCredentialsMessage())
            .toHaveText("Invalid credentials");
    });

    // TC05: Empty username
    test("TC05 - Verify login with empty username", async () => {

        await loginPage.login("", "admin123");

        await expect(loginPage.getRequiredError()).toHaveCount(1);
    });

    // TC06: Empty password
    test("TC06 - Verify login with empty password", async () => {

        await loginPage.login("Admin", "");

        await expect(loginPage.getRequiredError()).toHaveCount(1);
    });

    // TC07: Both fields empty
    test("TC07 - Verify login with both fields empty", async () => {

        await loginPage.clickLogin();

        await expect(loginPage.getRequiredError()).toHaveCount(2);
    });

    // TC08: Verify password masking
    test("TC08 - Verify password is masked", async () => {

        await loginPage.enterPassword("admin123");

        await expect(loginPage.getPasswordInput())
            .toHaveAttribute("type", "password");

        await expect(loginPage.getPasswordInput())
            .toHaveValue("admin123");
    });

    test("TC09 - Verify login button is enabled and clickable", async ({ page }) => {

        await expect(loginPage.getLoginButton()).toBeVisible();
        await expect(loginPage.getLoginButton()).toBeEnabled();

        await loginPage.login("Admin", "admin123");

        await expect(page).toHaveURL(dashboardURL);
    });

});
