import subprocess
import json
import tempfile
import os

def run_slither(contract_code: str) -> dict:
    """
    Saves contract code to a temporary file, runs Slither, and returns the JSON output.
    """
    # Create a temporary directory that auto-cleans up
    with tempfile.TemporaryDirectory() as temp_dir:
        contract_path = os.path.join(temp_dir, "contract.sol")
        json_output_path = os.path.join(temp_dir, "output.json")
        
        # Write the user's code to the temp file
        with open(contract_path, "w", encoding="utf-8") as f:
            f.write(contract_code)
        
        try:
            # Execute slither command
            # check=False because Slither returns a non-zero exit code if it finds vulnerabilities
            result = subprocess.run(
                ["slither", contract_path, "--json", json_output_path],
                capture_output=True,
                text=True,
                check=False 
            )
            
            # Check if the JSON file was created successfully
            if os.path.exists(json_output_path):
                with open(json_output_path, "r", encoding="utf-8") as f:
                    return {"success": True, "data": json.load(f)}
            else:
                return {
                    "success": False, 
                    "error": "Slither failed to generate JSON.", 
                    "details": result.stderr
                }

        except Exception as e:
            return {"success": False, "error": str(e)}