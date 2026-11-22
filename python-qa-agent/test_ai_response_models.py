
from agent.core.ai_response_models import TestCase, TestPlan

test_case = TestCase(
    test_id="TC-LGN-001",
    test_type="Positive",
    description="Successful login with valid credentials",
    test_steps=[
        "Open the login page",
        "Enter a valid username",
        "Enter a valid password",
        "Click Login"
    ],
    expected_result="User is redirected to the dashboard",
    coverage_type="acceptance_criterion"
)

test_plan = TestPlan(test_cases=[test_case])

print("\nPydantic model validation successful!")
print(test_plan.model_dump_json(indent=4))
