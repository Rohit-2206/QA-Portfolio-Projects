
import asyncio

from agent.core.requirement_reader import read_requirement
from agent.core.ai_test_plan_generator import generate_ai_test_plan


async def main():
    requirement = read_requirement(
        "requirements/login_requirement.txt"
    )

    test_plan = await generate_ai_test_plan(requirement)

    print("\n========== AI GENERATED TEST PLAN ==========\n")
    print(test_plan.model_dump_json(indent=4))


if __name__ == "__main__":
    asyncio.run(main())
