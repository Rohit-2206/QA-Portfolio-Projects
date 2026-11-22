def extract_acceptance_criteria(requirement: str) -> list[str]:
    """
    Extract acceptance criteria from a QA requirement.
    """

    criteria = []

    for line in requirement.splitlines():
        line = line.strip()

        if line and line[0].isdigit() and ". " in line:
            criterion = line.split(". ", 1)[1]
            criteria.append(criterion)

    return criteria