
def generate_test_steps(scenario: dict) -> list[str]:
    """
    Generate basic test execution steps.
    """

    description = scenario["description"].lower()

    if "valid credentials" in description:
        return [
            "Navigate to the login page",
            "Enter a valid username",
            "Enter a valid password",
            "Click the Login button",
            "Verify that the dashboard is displayed"
        ]

    if "invalid username" in description:
        return [
            "Navigate to the login page",
            "Enter an invalid username",
            "Enter a valid password",
            "Click the Login button",
            "Verify that an error message is displayed"
        ]

    if "invalid password" in description:
        return [
            "Navigate to the login page",
            "Enter a valid username",
            "Enter an invalid password",
            "Click the Login button",
            "Verify that an error message is displayed"
        ]

    if "without entering" in description:
        return [
            "Navigate to the login page",
            "Leave the username field empty",
            "Leave the password field empty",
            "Click the Login button",
            "Verify that required field validation is displayed"
        ]

    if "locked-out" in description:
        return [
            "Navigate to the login page",
            "Enter locked-out user credentials",
            "Click the Login button",
            "Verify that access is denied"
        ]

    return ["Review the requirement and define test steps"]
