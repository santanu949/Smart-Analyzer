def parse_slither_output(slither_response: dict) -> str:
    """
    Parses the raw Slither JSON into a concise string of findings for the LLM.
    """
    if not slither_response.get("success", False):
        return f"Slither execution failed: {slither_response.get('error')}\nDetails: {slither_response.get('details')}"
    
    slither_data = slither_response.get("data", {})
    results = slither_data.get("results", {}).get("detectors", [])
    
    if not results:
        return "No vulnerabilities detected by static analysis."
    
    parsed_findings = []
    
    for item in results:
        check = item.get("check", "Unknown Vulnerability")
        impact = item.get("impact", "Unknown Impact")
        description = item.get("description", "No description provided.")
        
        # Format a clean, human-readable string for the LLM prompt
        parsed_findings.append(
            f"- Vulnerability: {check}\n"
            f"  Impact: {impact}\n"
            f"  Description: {description}"
        )
    
    return "\n\n".join(parsed_findings)