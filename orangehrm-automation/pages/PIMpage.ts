
import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class PIMPage extends BasePage {

    private pimMenu = this.page.getByRole("link", { name: "PIM" });
    private pageHeading = this.page.locator("h6.oxd-topbar-header-breadcrumb-module");

    // Employee form fields
    private firstNameInput = this.page.getByPlaceholder("First Name");
    private middleNameInput = this.page.getByPlaceholder("Middle Name");
    private lastNameInput = this.page.getByPlaceholder("Last Name");
    private employeeIdInput = this.page.locator(".oxd-input").nth(1);

    // Buttons
    private saveButton = this.page.getByRole("button", { name: "Save" });
    private addEmployeeButton = this.page.getByRole("button", { name: "Add" });
    private searchButton = this.page.getByRole("button", { name: "Search" });
    private resetButton = this.page.getByRole("button", { name: "Reset" });

    // Search filters
    private searchEmployeeName = this.page.locator(
        ".oxd-form .oxd-autocomplete-text-input input"
    ).first();

    private searchEmployeeId = this.page.locator(
        ".oxd-form .oxd-input"
    ).nth(1);

    // Navigation
    async openPIMPage() {
        await this.pimMenu.click();
        await expect(this.pageHeading).toHaveText("PIM");
    }

    getPageHeading() {
        return this.pageHeading;
    }

    // Open Add Employee form
    async openAddEmployeeForm() {
        await this.addEmployeeButton.click();
        await expect(this.page.getByRole("heading", {
            name: "Add Employee"
        })).toBeVisible();
    }

    // Add employee
    async addEmployee(
        firstName: string,
        middleName: string,
        lastName: string
    ) {
        await this.firstNameInput.fill(firstName);
        await this.middleNameInput.fill(middleName);
        await this.lastNameInput.fill(lastName);

        await this.saveButton.click();

        await expect(
            this.page.getByText("Successfully Saved", { exact: false })
        ).toBeVisible();
    }

    // Verify mandatory field validation
    async submitEmptyEmployeeForm() {
        await this.saveButton.click();
    }

    getRequiredErrors() {
        return this.page.getByText("Required", { exact: true });
    }

    // Search employee by name
    async searchByName(employeeName: string) {
        await this.searchEmployeeName.fill(employeeName);

        await this.searchButton.click();
    }

    // Search employee by ID
    async searchByEmployeeId(employeeId: string) {
        await this.searchEmployeeId.fill(employeeId);

        await this.searchButton.click();
    }

    // Search results
    getEmployeeRow(employeeName: string) {
        return this.page.locator(".oxd-table-card").filter({
            hasText: employeeName
        });
    }

    // Open employee profile
    async openEmployeeProfile(employeeName: string) {
        await this.getEmployeeRow(employeeName).click();
    }

    // Edit employee details
    async editPersonalDetails(
        firstName: string,
        middleName: string,
        lastName: string
    ) {
        await this.firstNameInput.fill(firstName);
        await this.middleNameInput.fill(middleName);
        await this.lastNameInput.fill(lastName);

        await this.saveButton.click();

        await expect(
            this.page.getByText("Successfully Updated", { exact: false })
        ).toBeVisible();
    }

    getEmployeeIdInput() {
        return this.page.locator(".oxd-input-group").filter({
            has:this.page.getByText("Empoloyee ID", {exact: true})
        })
        .locator("input");
    }

    getSearchButton() {
        return this.searchButton;
    }
}
