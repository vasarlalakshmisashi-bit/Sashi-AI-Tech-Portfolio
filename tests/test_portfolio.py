
from playwright.sync_api import sync_playwright


def test_portfolio_title():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            page.goto("http://127.0.0.1:8000")
            assert "Portfolio" in page.title()
        finally:
            browser.close()


def test_chatbot_opens():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            page.goto("http://127.0.0.1:8000")
            page.locator("#chatToggle").click()
            assert page.locator("#chatBox").is_visible()
        finally:
            browser.close()