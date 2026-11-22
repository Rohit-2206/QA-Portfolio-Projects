from pathlib import Path


def read_requirement(file_path: str) -> str:
    """
    Read a QA requirement from a text file.
    """

    requirement_file = Path(file_path)

    if not requirement_file.exists():
        raise FileNotFoundError(
            f"Requirement file not found: {file_path}"
        )

    requirement = requirement_file.read_text(encoding="utf-8")

    return requirement