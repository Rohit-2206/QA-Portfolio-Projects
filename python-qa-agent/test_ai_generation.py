
import asyncio
from copilot import CopilotClient
from agent.core.ai_response_models import TestPlan
from pathlib import Path

async def main():
    client = CopilotClient(mode="coding-agent")

    try:
        await client.start()

        session = await client.create_session()

        requirement = """
        Feature: Login

        Acceptance Criteria:
        1. User should be able to log in with valid credentials.
        2. User should see an error message when entering an invalid username.
        3. User should see an error message when entering an invalid password.
        4. User should not be able to log in without entering credentials.
        5. Locked-out users should not be allowed to log in.
        """

        prompt = f"""
        You are an experienced QA Engineer.

        Analyze the following login requirement and generate
        detailed test scenarios.

        For each scenario include:
        - Test ID
        - Test type (Positive, Negative, or Validation)
        - Test scenario
        - Test steps
        - Expected result

        Return the result in a clear, structured format.

        Requirement:
        {requirement}
        """

        response = await session.send_and_wait_typed(
            prompt,
            TestPlan,
            timeout=120
        )

        print("\n========== AI GENERATED TEST SCENARIOS ==========\n")
        output_dir = Path("output")
        output_dir.mkdir(exist_ok=True)

        output_file = output_dir / "ai_generated_test_plan.json"

        output_file.write_text(
        response.model_dump_json(indent=4),
        encoding="utf-8"
        )
        print(f"\nAI test plan saved successfully: {output_file}")

    finally:
        await client.stop()


asyncio.run(main())
