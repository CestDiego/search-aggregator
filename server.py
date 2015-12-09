#!/usr/bin/env python
from flask import Flask, request, jsonify

from search_functions import google, bing, yahoo

# runs on localhost:5000
app = Flask(__name__)

@app.route('/')
def index():
    return "Please refer to /search"

@app.route('/search', methods=['GET'])
def search():
    search_query = request.args.get('q')

    try:
        google_results = google(search_query)
    except:
        google_results = ["No Results Found"]

    try:
        yahoo_results = yahoo(search_query)
    except:
        yahoo_results = ["No Results Found"]

    try:
        bing_results = bing(search_query)
    except:
        bing_results = ["No Results Found"]
    return jsonify({"results": google_results + yahoo_results + bing_results})


@app.route('/bing/search', methods=['GET'])
def bing_search():
    search_query = request.args.get('q')
    try:
        bing_results = bing(search_query)
    except:
        bing_results = ["No Results Found"]
    return jsonify({"results": bing_results})

@app.route('/google/search', methods=['GET'])
def google_search():
    search_query = request.args.get('q')
    try:
        google_results = google(search_query)
    except:
        google_results = ["No Results Found"]
    return jsonify({"results": google_results})

@app.route('/yahoo/search', methods=['GET'])
def yahoo_search():
    search_query = request.args.get('q')
    try:
        yahoo_results = yahoo(search_query)
    except:
        yahoo_results = ["No Results Found"]
    return jsonify({"results": yahoo_results})

if __name__ == '__main__':
    app.run(debug=True)
