
import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {

    private usernameInput: Locator = this.page.locator("input[name='username']");
    private passwordInput: Locator = this.page.locator("input[name='password']");
    private loginButton: Locator = this.page.getByRole("button", { name: "Login" });
    private invalidCredentialsMessage: Locator = this.page.locator(".oxd-alert-content-text");
    private requiredError: Locator = this.page.getByText("Required", { exact: true });

    async login(username: string, password: string) {
        await this.fill(this.usernameInput, username);
        await this.fill(this.passwordInput, password);
        await this.click(this.loginButton);
    }

    async enterUsername(username: string) {
        await this.fill(this.usernameInput, username);
    }

    async enterPassword(password: string) {
        await this.fill(this.passwordInput, password);
    }

    async clickLogin() {
        await this.click(this.loginButton);
    }

    getUsernameInput() {
        return this.usernameInput;
    }

    getPasswordInput() {
        return this.passwordInput;
    }

    getLoginButton() {
        return this.loginButton;
    }

    getInvalidCredentialsMessage() {
        return this.invalidCredentialsMessage;
    }

    getRequiredError() {
        return this.requiredError;
    }
}
