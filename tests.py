import requests

def test_server_search():
    params = {"q": "Albert Einstein"}
    r = requests.get("http://localhost:5000/search", params=params)
    data = r.json()

    assert len(data['results']) > 0

def test_bing_search():
    params = {"q": "Albert Einstein"}
    r = requests.get("http://localhost:5000/bing/search", params=params)
    data = r.json()
    assert len(data['results']) > 0

def test_google_search():
    params = {"q": "Albert Einstein"}
    r = requests.get("http://localhost:5000/google/search", params=params)
    data = r.json()
    assert len(data['results']) > 0

def test_yahoo_search():
    params = {"q": "Albert Einstein"}
    r = requests.get("http://localhost:5000/yahoo/search", params=params)
    data = r.json()
    assert len(data['results']) > 0
