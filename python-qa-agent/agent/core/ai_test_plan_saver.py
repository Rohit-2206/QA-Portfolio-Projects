from pathlib import Path
from agent.core.ai_response_models import TestPlan


def save_ai_test_plan(test_plan: TestPlan) -> None:
    output_dir = Path("output")
    output_dir.mkdir(exist_ok=True)

    output_file = output_dir / "ai_generated_test_plan.json"

    output_file.write_text(
        test_plan.model_dump_json(indent=4),
        encoding="utf-8"
    )

    print(f"\nAI test plan saved successfully: {output_file}")