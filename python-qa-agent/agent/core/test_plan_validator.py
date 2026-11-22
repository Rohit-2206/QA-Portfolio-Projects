
def validate_test_plan(scenarios: list[dict]) -> bool:
    """
    Validate generated test scenarios.
    """

    required_fields = [
        "test_id",
        "test_type",
        "description",
        "expected_result",
        "test_steps"
    ]

    for scenario in scenarios:

        for field in required_fields:
            if field not in scenario:
                raise ValueError(
                    f"{scenario.get('test_id', 'Unknown')} is missing {field}"
                )

        if not scenario["test_steps"]:
            raise ValueError(
                f"{scenario['test_id']} has no test steps"
            )

    print("\nTest plan validation successful!")
    return True
