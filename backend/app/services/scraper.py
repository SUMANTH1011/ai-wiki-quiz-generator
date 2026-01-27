import requests
from bs4 import BeautifulSoup
from typing import Dict, List

def is_valid_wikipedia_url(url: str) -> bool:
    return url.startswith("https://en.wikipedia.org/wiki/")

def fetch_wikipedia_page(url: str) -> BeautifulSoup:
    if not is_valid_wikipedia_url(url):
        raise ValueError("Invalid Wikipedia URL")

    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) WikiQuizBot/1.0"
    }

    response = requests.get(url, headers=headers, timeout=10)

    if response.status_code != 200:
        raise ValueError(
            f"Failed to fetch Wikipedia page (status {response.status_code})"
        )

    soup = BeautifulSoup(response.text, "html.parser")
    return soup


def extract_title(soup: BeautifulSoup) -> str:
    title_tag = soup.find("h1", id="firstHeading")
    return title_tag.text.strip() if title_tag else ""

def extract_summary(soup: BeautifulSoup) -> str:
    content_div = soup.find("div", class_="mw-parser-output")

    for p in content_div.find_all("p"):
        text = p.get_text(strip=True)
        if text:
            return text
    return ""

def extract_sections(soup: BeautifulSoup) -> List[str]:
    ignore = {
        "References", "External links", "See also",
        "Notes", "Bibliography", "Further reading"
    }

    sections = []

    content = soup.select_one("div#mw-content-text")
    if not content:
        return sections

    for span in content.select("span.mw-headline"):
        title = span.get_text(strip=True)
        if title not in ignore:
            sections.append(title)

    return sections

def extract_clean_text(soup: BeautifulSoup) -> str:
    content = soup.select_one("div#mw-content-text")
    if not content:
        return ""

    text = []
    for p in content.find_all("p"):
        t = p.get_text(strip=True)
        if t:
            text.append(t)

    return "\n".join(text)
def scrape_wikipedia(url: str) -> Dict:
    soup = fetch_wikipedia_page(url)

    return {
        "url": url,
        "title": extract_title(soup),
        "summary": extract_summary(soup),
        "sections": extract_sections(soup),
        "clean_text": extract_clean_text(soup)
    }

if __name__ == "__main__":
    data = scrape_wikipedia("https://en.wikipedia.org/wiki/Alan_Turing")
    print(data["title"])
    print(data["summary"][:200])
    print(data["sections"][:5])
