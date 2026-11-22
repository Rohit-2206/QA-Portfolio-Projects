
from pydantic import BaseModel, ConfigDict
from typing import Literal


class TestCase(BaseModel):
    model_config = ConfigDict(extra="forbid")

    test_id: str
    test_type: Literal["Positive", "Negative", "Validation", "Functional"]
    description: str
    test_steps: list[str]
    expected_result: str
    coverage_type: Literal["acceptance_criterion", "ai_suggested"]


class TestPlan(BaseModel):
    model_config = ConfigDict(extra="forbid")

    test_cases: list[TestCase]
