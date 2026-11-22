
import json
from pathlib import Path


def save_test_plan(scenarios: list[dict]) -> None:
    """
    Save generated test scenarios into a JSON file.
    """

    output_dir = Path("output")
    output_dir.mkdir(exist_ok=True)

    output_file = output_dir / "test_plan.json"

    with output_file.open("w", encoding="utf-8") as file:
        json.dump(scenarios, file, indent=4)

    print(f"\nTest plan saved successfully: {output_file}")
