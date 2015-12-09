from bs4 import BeautifulSoup
import urllib
import requests

def get_search_results_object(links, descriptions, source):
    return [
        {"href": link['href'],
         "source": source,
         "text": link.text,
         "description": description.text}
        for link, description in zip(links, descriptions)]


def google(search_query):
    params = {"q": search_query}
    headers = {"user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36"}
    r = requests.get("https://www.google.com/search", params=params, headers=headers)
    soup = BeautifulSoup(r.text, "lxml")
    links = soup.select("#rso .r a")
    descriptions = soup.select("#rso .g .s .st")
    return get_search_results_object(links, descriptions, "google")

def bing(search_query):
    params = {"q": search_query}
    headers = {"user-agent": "Mozilla/5.0"}
    r = requests.get("https://www.bing.com/search", params=params, headers=headers)
    soup = BeautifulSoup(r.text, "lxml")
    links = soup.select("#b_results h2 a")
    descriptions = soup.select(".b_caption p")
    return get_search_results_object(links, descriptions, "bing")

def yahoo(search_query):
    params = {"p": search_query}
    headers = {"user-agent": "Mozilla/5.0"}
    r = requests.get("https://search.yahoo.com/search", params=params, headers=headers)
    soup = BeautifulSoup(r.text, "lxml")
    links = soup.select(".searchCenterMiddle li a")
    descriptions = soup.select(".searchCenterMiddle li .compText p")
    return get_search_results_object(links, descriptions, "yahoo")
