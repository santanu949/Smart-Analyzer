# 🔐 Smart Analyzer AI-Powered Smart Contract Security Auditor

<div align="center">

![Smart Analyzer Banner](https://img.shields.io/badge/Smart%20Analyzer-AI%20Security%20Auditor-blue?style=for-the-badge&logo=shield&logoColor=white)

[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Groq](https://img.shields.io/badge/Groq-Cloud%20LLM-orange?style=flat-square)](https://groq.com/)
[![Ollama](https://img.shields.io/badge/Ollama-Local%20LLM-purple?style=flat-square)](https://ollama.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

**Detect smart contract vulnerabilities in seconds using the power of Large Language Models.**

[Demo](#) · [Report Bug](https://github.com/SOULBEA/Smart-Analyzer/issues) · [Request Feature](https://github.com/SOULBEA/Smart-Analyzer/issues)

</div>

---

## ✨ Overview

**Smart Analyzer** is a full-stack AI security tool that audits Solidity smart contracts for critical vulnerabilities. Paste your contract code, select an AI engine (Groq cloud or local Ollama), and receive a detailed security report in seconds — complete with severity ratings, attack flow analysis, exploit simulations, and code fix suggestions.

> 💡 Built for Web3 developers, auditors, and security researchers who need fast, reliable, LLM-powered analysis without waiting weeks for a manual audit.

---

## 🎯 Key Features

| Feature | Description |
|---|---|
| 🧠 **Neural Pattern Discovery** | LLM-powered engine detects reentrancy, overflow, access control flaws, and logic bugs that static scanners miss |
| ⚡ **Multi-Provider AI** | Switch between **Groq** (cloud, blazing fast), **Ollama** (local, private), or **RAG** mode |
| 📊 **Dynamic Security Scores** | Real-time vulnerability-weighted security scores (CRITICAL = -25, HIGH = -15, etc.) |
| 🔴 **Attack Flow Visualization** | Step-by-step attack vector diagrams for each detected vulnerability |
| 🟢 **Code Fix Suggestions** | Inline Solidity patches for every vulnerability found |
| 🖥️ **Terminal-Style UI** | Premium dark-mode interface with real-time runtime metrics |
| 🔒 **Zero Data Retention** | Contracts are analyzed and never stored |

---

## 🏗️ Project Architecture

```
Smart-Analyzer/
├── backend/                    # FastAPI Python backend
│   ├── app/
│   │   ├── main.py             # FastAPI app + CORS setup
│   │   ├── routes/
│   │   │   └── analyze.py      # POST /api/analyze endpoint
│   │   ├── services/
│   │   │   └── llm_service.py  # Groq / Ollama / RAG logic
│   │   ├── models/
│   │   │   └── response_model.py  # Pydantic response schemas
│   │   └── utils/              # Helper utilities
│   ├── requirements.txt
│   └── .env.example            # ← Copy to .env and fill secrets
│
├── frontend/                   # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── AnalysisSection.jsx   # Main analyzer UI
│   │   │   ├── CodeInput.jsx         # Code editor panel
│   │   │   ├── OutputPanel.jsx       # Results terminal panel
│   │   │   ├── FeaturesSection.jsx   # Landing features grid
│   │   │   ├── Hero.jsx              # Hero section
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── CTASection.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   └── Modals.jsx
│   │   ├── pages/
│   │   │   └── Home.jsx
│   │   ├── index.css           # Global styles + custom scrollbar
│   │   └── main.jsx
│   ├── .env.example            # ← Copy to .env and fill values
│   └── vite.config.js
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **Python** ≥ 3.10
- A **Groq API key** (free at [console.groq.com](https://console.groq.com)) — *only needed for Groq mode*
- **Ollama** installed locally — *only needed for Ollama mode*

---

### 1. Clone the Repository

```bash
git clone https://github.com/SOULBEA/Smart-Analyzer.git
cd Smart-Analyzer
```

---

### 2. Backend Setup

```bash
cd backend

# Create and activate virtual environment
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Open .env and fill in your GROQ_API_KEY
```

**Start the backend server:**

```bash
uvicorn app.main:app --reload --port 8000
```

The API will be live at: `http://localhost:8000`
> Health check: `GET http://localhost:8000/` → `{"status": "Backend is running, NexusScan API is live."}`

---

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env as needed (defaults work for local dev)
```

**Start the dev server:**

```bash
npm run dev
```

The app will be live at: `http://localhost:5173`

---

### 4. (Optional) Ollama Local LLM Setup

If you want to use **Ollama** (fully private, runs on your machine):

```bash
# Install Ollama from https://ollama.com
# Then pull the model:
ollama pull gemma4:e4b

# Ollama runs by default on http://localhost:11434
# No additional config needed — the backend auto-connects
```

---

## 🔑 Environment Variables

### Backend — `backend/.env`

```env
# Groq (Cloud LLM) — required for Groq mode
GROQ_API_KEY=your_groq_api_key_here

# Ollama (Local LLM) — optional, defaults shown
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=gemma4:e4b
```

> ⚠️ **Never commit your `.env` file.** It is already listed in `.gitignore`.

### Frontend — `frontend/.env`

```env
VITE_BACKEND_URL=http://localhost:8000/api
VITE_GAS_URL=https://script.google.com/macros/s/YOUR_APPS_SCRIPT_ID/exec
```

---

## 🧪 Usage

1. **Open the app** at `http://localhost:5173`
2. **Paste your Solidity smart contract** into the code editor
3. **Select your AI engine:**
   - `GROQ` — Fast cloud inference (requires API key)
   - `OLLAMA` — Private local inference (requires Ollama running)
   - `RAG` — Retrieval-Augmented Generation mode
4. **Click Analyze** and watch the security report appear in real-time
5. **Review results:** severity scores, attack flows, exploit simulations, and code patches

### Example Vulnerable Contract (for testing)

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VulnerableBank {
    mapping(address => uint256) public balances;

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    // ⚠️ VULNERABLE: Re-entrancy attack possible
    function withdraw(uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient funds");
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
        balances[msg.sender] -= amount; // State updated AFTER external call
    }
}
```

---

## 🛠️ Tech Stack

### Backend
| Technology | Role |
|---|---|
| **FastAPI** | REST API framework |
| **Groq SDK** | Cloud LLM inference (Llama, Mixtral) |
| **httpx** | Async HTTP client for Ollama |
| **Pydantic** | Request/response validation |
| **python-dotenv** | Environment variable management |
| **Uvicorn** | ASGI server |

### Frontend
| Technology | Role |
|---|---|
| **React 18** | UI framework |
| **Vite** | Build tool & dev server |
| **TailwindCSS** | Utility-first styling |
| **Framer Motion** | Animations & transitions |
| **Axios** | HTTP client |
| **Lucide React** | Icon library |

---

## 📡 API Reference

### `POST /api/analyze`

Analyzes a smart contract for security vulnerabilities.

**Request Body:**
```json
{
  "code": "pragma solidity ^0.8.0; contract MyContract { ... }",
  "mode": "groq"
}
```

| Field | Type | Values | Description |
|---|---|---|---|
| `code` | `string` | — | Solidity source code |
| `mode` | `string` | `groq`, `ollama`, `rag` | AI analysis engine |

**Response:**
```json
{
  "mode_used": "groq",
  "summary": "Contract contains 2 critical vulnerabilities...",
  "vulnerabilities": [
    {
      "severity": "CRITICAL",
      "type": "Reentrancy",
      "explanation": "External call before state update allows drain.",
      "impact": "Complete fund drainage",
      "attack_flow": ["Attacker calls withdraw()", "Receives ETH", "Calls withdraw() again before balance update"],
      "simulation": ["Step 1: Deploy attacker contract", "Step 2: Deposit 1 ETH", "Step 3: Trigger reentrancy loop"],
      "fix": "Update state before external calls (Checks-Effects-Interactions pattern)",
      "code_fix": "balances[msg.sender] -= amount;\n(bool success, ) = msg.sender.call{value: amount}(\"\");",
      "location": "withdraw() — Line 12"
    }
  ]
}
```

---

## 🔐 Security Notes

- **API keys** are stored in `.env` files which are excluded from version control via `.gitignore`
- Backend `.env` is **never committed**
- For production deployments, always restrict `allow_origins` in CORS settings to your actual frontend domain
- Ollama mode processes contracts **entirely locally** — no data leaves your machine

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.

---

Team 

Santanu Samanta
GitHub: @santanu949


Arpit Singh (SOULBEA)
GitHub: @SOULBEA

Project: Smart-Analyzer
---

<div align="center">

**⭐ Star this repo if you found it useful!**

</div>
