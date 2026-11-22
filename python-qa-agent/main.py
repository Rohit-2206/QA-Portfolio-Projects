
import asyncio

from agent.core.requirement_reader import read_requirement
from agent.core.criteria_extractor import extract_acceptance_criteria
from agent.core.test_scenario_generator import generate_test_scenarios
from agent.core.test_step_generator import generate_test_steps
from agent.core.test_plan_validator import validate_test_plan
from agent.core.test_plan_generator import save_test_plan

from agent.core.ai_test_plan_generator import generate_ai_test_plan
from agent.core.ai_test_plan_saver import save_ai_test_plan


def generate_rule_based_plan(requirement):
    criteria = extract_acceptance_criteria(requirement)
    scenarios = generate_test_scenarios(criteria)

    for scenario in scenarios:
        scenario["test_steps"] = generate_test_steps(scenario)

    validate_test_plan(scenarios)
    save_test_plan(scenarios)


async def generate_ai_plan(requirement):
    test_plan = await generate_ai_test_plan(requirement)

    print("\n========== AI GENERATED TEST PLAN ==========\n")

    for test_case in test_plan.test_cases:
        print(f"\nTest ID: {test_case.test_id}")
        print(f"Test Type: {test_case.test_type}")
        print(f"Description: {test_case.description}")

        print("\nTest Steps:")
        for number, step in enumerate(test_case.test_steps, start=1):
            print(f"  {number}. {step}")

        print(f"Expected Result: {test_case.expected_result}")
        print(f"Coverage: {test_case.coverage_type}")

    save_ai_test_plan(test_plan)


async def main():
    print("\n========== PYTHON AI QA AGENT ==========")
    print("1. Rule-based test generation")
    print("2. AI-powered test generation")

    choice = input("\nSelect generation mode (1 or 2): ").strip()

    requirement = read_requirement(
        "requirements/login_requirement.txt"
    )

    if choice == "1":
        generate_rule_based_plan(requirement)

    elif choice == "2":
        await generate_ai_plan(requirement)

    else:
        print("\nInvalid selection. Please choose 1 or 2.")


if __name__ == "__main__":
    asyncio.run(main())
