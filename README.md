# Sashi AI Tech Portfolio — Robot Assistant

## Project Overview
This is my personal portfolio website designed to showcase my technical skills, projects, and learning journey. It includes a friendly robot chatbot that helps visitors explore my portfolio.

## Features
- Personal portfolio website
- Interactive robot chatbot
- Project information and details
- Voice assistance using browser speech synthesis
- Automated browser testing using Playwright
- HTML test report generation

## Technologies Used
- HTML
- CSS
- JavaScript
- Python
- Playwright
- Pytest
- pytest-html

## Project Structure
```text
Sashi_AI_Tech_Portfolio_Robot_Upgrade/
├── app/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── tests/
│   └── test_portfolio.py
└── report.html
```

## How to Run the Website
Run this command from the project root:

```powershell
python -m http.server 8000 --bind 127.0.0.1 --directory app
```

Open this URL in your browser:

`http://127.0.0.1:8000/`

## How to Run Tests
Keep the web server running. Open another terminal in the project root and run:

```powershell
python -m pytest tests/test_portfolio.py -v
```

## Generate an HTML Test Report
```powershell
python -m pytest tests/test_portfolio.py -v --html=report.html --self-contained-html
```

Open `report.html` in your browser to see the results.

## Test Results
- Portfolio title test: Passed
- Chatbot opens test: Passed
- Total tests: 2
- Failed tests: 0

## Learning Outcomes
I practised building a portfolio website, implementing JavaScript interactions, automating browser actions using Playwright, writing tests with Pytest, and generating HTML test reports.

## Author
Sashi — Aspiring Developer and QA Automation Tester
