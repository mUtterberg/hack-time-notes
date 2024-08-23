import csv
import re
import time
from collections import deque
from datetime import date
from enum import Enum

import requests

SOURCE = "https://download.medicaid.gov/data/nadac-comparison-02-01-2023.csv"


class ExpectedKeys(Enum):
    """Expected header for schema regression check."""

    NDC_DESCRIPTION = "NDC Description"
    NDC = "NDC"
    OLD_NADAC_PER_UNIT = "Old NADAC Per Unit"
    NEW_NADAC_PER_UNIT = "New NADAC Per Unit"
    CLASSIFICATION_FOR_RATE_SETTING = "Classification for Rate Setting"
    PERCENT_CHANGE = "Percent Change"
    PRIMARY_REASON = "Primary Reason"
    START_DATE = "Start Date"
    END_DATE = "End Date"
    EFFECTIVE_DATE = "Effective Date"


RESULTS = {
    "highest": deque(maxlen=10),
    "lowest": deque(maxlen=10),
}

# {
#     "NDC Description": "SILDENAFIL 50 MG TABLET",
#     "NDC": 65862069030,
#     "Old NADAC Per Unit": 0.32867,
#     "New NADAC Per Unit": 0.29731,
#     "Classification for Rate Setting": "G",
#     "Percent Change": -9.54,
#     "Primary Reason": "Survey Rate",
#     "Start Date": "05/12/2021",
#     "End Date": "05/19/2021",
#     "Effective Date": "05/19/2021",
# }


def parse_date(date_str):
    """Parse a date string."""
    month, day, year = map(int, date_str.split("/"))
    return date(month=month, day=day, year=year)


def is_in_year(row, year=2023) -> bool:
    """Check if the start and end date are both in a particular year."""
    start_date = parse_date(row["Start Date"])
    if start_date.year != year:
        return False
    end_date = parse_date(row["End Date"])
    return end_date.year == year


def evaluate_row(row):
    """Investigate a row of data."""
    # description_regex = re.compile(
    #     r"(?P<name>\w+)(\s+)(?P<amount>^[0-9-]+)(\s+)(?P<unit_and_form>\w+)"
    # )
    # matches = description_regex.match(row["NDC Description"])
    # if not matches:
    #     print("NO MATCHES FOUND in row: ", row["NDC Description"])
    #     return
    name = row["NDC Description"].split(" ")[0]
    if re.search(r"\d", name):
        print("NAME CONTAINS DIGITS: ", row["NDC Description"])
    percent_change = float(row["Percent Change"])
    comparison_key = (
        # matches.group("name"),
        name,
        percent_change,
    )
    if comparison_key in RESULTS["highest"] or comparison_key in RESULTS["lowest"]:
        return
    if percent_change > 0:
        try:
            results = RESULTS["highest"]
            if percent_change >= results[-1][1]:
                RESULTS["highest"].append(comparison_key)
            elif len(results) < 10:
                RESULTS["highest"].appendleft(comparison_key)
        except IndexError:
            RESULTS["highest"].append(comparison_key)
            return
    else:
        try:
            results = RESULTS["lowest"]
            if percent_change <= results[-1][1]:
                RESULTS["lowest"].append(comparison_key)
            elif len(results) < 10:
                RESULTS["lowest"].appendleft(comparison_key)
        except IndexError:
            RESULTS["lowest"].append(comparison_key)
            return


def main():
    """Download and inspect csv data."""
    response = requests.get(SOURCE, stream=True, timeout=10)
    response.raise_for_status()

    if response.encoding is None:
        response.encoding = "utf-8"

    lines_skipped = 0
    start_time = time.perf_counter()
    break_iter = 0
    for line in csv.DictReader(response.iter_lines(decode_unicode=True)):
        if not is_in_year(line):
            lines_skipped += 1
            continue
        if break_iter == 0:
            print(
                f"SKIPPED {lines_skipped} lines in {time.perf_counter() - start_time:.2f}seconds."
            )
        # print(line)
        evaluate_row(line)
        break_iter += 1
        # if break_iter == 1000:
        #     break

    # Should skip 2,264,522 lines for first 2023 record
    # Should skip 1,999,871 lines for first 2022 record
    # Baseline: (29.31s) cast start & end dates to date objects
    # Faster filter: (16.58s) map(int, date_str.split("/")) month, day, year
    print(f"Full evaluation time: {time.perf_counter() - start_time:.2f}seconds.")
    for key, value in RESULTS.items():
        print(key.upper(), ":", list(value))


if __name__ == "__main__":
    main()
