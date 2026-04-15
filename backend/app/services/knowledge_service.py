import json

# Simple Knowledge Base for RAG
KNOWLEDGE_BASE = {
    "reentrancy": {
        "description": "Reentrancy occurs when a contract makes an external call to an untrusted contract. The untrusted contract can then make a recursive call back to the original contract to drain funds before the first call is finished.",
        "fix_pattern": "Use the Checks-Effects-Interactions pattern: Always update the state (balances, etc.) before making an external call. Alternatively, use a ReentrancyGuard (nonReentrant modifier).",
        "example": "Always set user balance to zero BEFORE calling msg.sender.call{value: ...}."
    },
    "access-control": {
        "description": "Access control vulnerabilities occur when sensitive functions are not properly restricted to authorized users (like an owner or administrator).",
        "fix_pattern": "Use modifiers like 'onlyOwner' from OpenZeppelin's Ownable contract to restrict access to sensitive state-changing functions.",
        "example": "function sensitiveAction() public onlyOwner { ... }"
    },
    "integer-overflow": {
        "description": "Integer overflow/underflow occurs when an arithmetic operation exceeds the maximum or minimum size of the variable type.",
        "fix_pattern": "Use Solidity 0.8.0 or higher, which has built-in overflow/underflow checks. For older versions, use the SafeMath library.",
        "example": "Upgrade pragma to ^0.8.0; or use userBalance = userBalance.add(amount);"
    },
    "unchecked-transfer": {
        "description": "Unchecked transfer happens when the return value of a low-level call or ERC20 transfer is ignored, potentially leading to silent failures.",
        "fix_pattern": "Always check the return value of low-level calls like .call(), .send(), or use SafeERC20's safeTransfer.",
        "example": "(bool success, ) = msg.sender.call{value: amount}(''); require(success, 'Transfer failed');"
    },
    "selfdestruct": {
        "description": "Unprotected use of selfdestruct allows an attacker to destroy the contract and claim all its ether, or brick functionality.",
        "fix_pattern": "Ensure selfdestruct is only callable by authorized accounts and used sparingly as it is deprecated in many cases.",
        "example": "function kill() public onlyOwner { selfdestruct(payable(owner())); }"
    }
}

def retrieve_knowledge(slither_findings_raw: str) -> str:
    """
    Simple keyword-based retrieval logic.
    Searches for Slither detector names or common vulnerability terms.
    """
    retrieved_context = []
    
    # Simple direct mapping (no vector DB as requested)
    lowered_findings = slither_findings_raw.lower()
    
    for key, info in KNOWLEDGE_BASE.items():
        # Check if the vulnerability key exists in the Slither findings
        if key in lowered_findings:
            context_entry = f"### Knowledge for {key.capitalize()}:\n"
            context_entry += f"- Description: {info['description']}\n"
            context_entry += f"- Fix Pattern: {info['fix_pattern']}\n"
            context_entry += f"- Example: {info['example']}\n"
            retrieved_context.append(context_entry)
            
    if not retrieved_context:
        return ""
        
    return "\n".join(retrieved_context)
