#!/usr/bin/env python3
"""
Server runner for backend CV service
"""
import sys
from pathlib import Path

# Add src to sys.path
sys.path.insert(0, str(Path(__file__).resolve().parent / "src"))

import uvicorn
from cv_api import app

if __name__ == "__main__":
    print("=" * 70)
    print(" Starting AI Crop Health - CV Service API Gateway")
    print(" Endpoints: http://localhost:8000")
    print(" Swagger Docs: http://localhost:8000/docs")
    print("=" * 70)
    uvicorn.run(app, host="127.0.0.1", port=8000, log_level="info")
