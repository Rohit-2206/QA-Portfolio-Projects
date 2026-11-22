
import asyncio
from copilot import CopilotClient
from agent.core.ai_response_models import TestPlan


async def generate_ai_test_plan(requirement: str) -> TestPlan:
    client = CopilotClient(mode="coding-agent")

    try:
        await client.start()

        session = await client.create_session()

        prompt = f"""
        You are an experienced QA Engineer.

        Analyze the following software requirement and generate
        comprehensive test cases.

        For each test case include:
        - Test ID
        - Test type (Positive, Negative, Validation, Functional)
        - Description
        - Test steps
        - Expected result
        - Coverage type:
          * acceptance_criterion
          * ai_suggested

        Mark cases directly supported by the stated acceptance
        criteria as acceptance_criterion.

        Mark additional edge cases or inferred scenarios as
        ai_suggested.

        Requirement:
        {requirement}
        """

        response = await session.send_and_wait_typed(
            prompt,
            TestPlan,
            timeout=120
        )

        return response

    finally:
        await client.stop()
