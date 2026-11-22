
def classify_test_type(criterion: str) -> str:
    """
    Classify a test scenario based on its acceptance criterion.
    """

    text = criterion.lower()

    if "valid credentials" in text or "successfully" in text:
        return "Positive"

    if "without entering" in text or "required" in text:
        return "Validation"

    if any(word in text for word in ["invalid", "locked-out", "not be allowed"]):
        return "Negative"

    return "Functional"


def generate_test_scenarios(criteria: list[str]) -> list[dict]:
    """
    Convert acceptance criteria into structured test scenarios.
    """

    scenarios = []

    for index, criterion in enumerate(criteria, start=1):
        scenario = {
            "test_id": f"TC{index:02d}",
            "test_type": classify_test_type(criterion),
            "description": criterion,
            "expected_result": criterion
        }

        scenarios.append(scenario)

    return scenarios
