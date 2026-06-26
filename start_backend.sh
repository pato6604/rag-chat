#!/usr/bin/bash
cd "/c/Users/Patricio Quintana/rag-project/backend"
source venv/Scripts/activate
python -m uvicorn app.main:app --reload --port ${PORT:-8000}
