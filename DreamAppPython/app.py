from flask import Flask, request, render_template
import json
from datetime import datetime, timedelta
from collections import defaultdict

app = Flask(__name__)

# Function to parse dates
def parse_date(date_str):
    return datetime.strptime(date_str, '%Y-%m-%d')

# Function to filter dreams by date range
def filter_dreams_by_date(dreams, days=None, year=None):
    filtered_dreams = []
    current_date = datetime.now()
    for dream in dreams:
        dream_date = parse_date(dream['date'])
        if days:
            if current_date - timedelta(days=days) <= dream_date <= current_date:
                filtered_dreams.append(dream)
        elif year:
            if dream_date.year == year:
                filtered_dreams.append(dream)
    return filtered_dreams

# Function to calculate tag statistics
def calculate_tag_stats(dreams, selected_tags=None):
    tag_counts = defaultdict(int)
    co_occurrence = defaultdict(lambda: defaultdict(int))

    for dream in dreams:
        dream_tags = [tag['name'] for tag in dream['tags']]
        for tag in dream_tags:
            if not selected_tags or tag in selected_tags:
                tag_counts[tag] += 1
                for co_tag in dream_tags:
                    if co_tag != tag:
                        co_occurrence[tag][co_tag] += 1

    return tag_counts, co_occurrence

# Main route to handle form submission
@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        tags = request.form.get('tags').split(',')
        option = request.form.get('option')
        days, year = None, None
        if 'days' in option:
            days = int(option.split(' ')[1])
        else:
            year = int(option)

        with open('dreams.json', 'r') as file:
            dreams = json.load(file)

        filtered_dreams = filter_dreams_by_date(dreams, days=days, year=year)
        tag_stats, co_occurrence = calculate_tag_stats(filtered_dreams, tags)

        return render_template('result.html', tag_stats=tag_stats, co_occurrence=co_occurrence)

    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
