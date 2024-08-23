from flask import Flask, request, render_template
import json
from datetime import datetime, timedelta
from collections import defaultdict, OrderedDict

app = Flask(__name__)

# Function to parse dates
def parse_date(date_str):
    return datetime.strptime(date_str, '%Y-%m-%d')

# Function to filter dreams by date range
def filter_dreams_by_date(dreams, days=None, year=None, start_date=None, end_date=None):
    filtered_dreams = []
    current_date = datetime.now()
    for dream in dreams:
        dream_date = parse_date(dream['date'])
        if start_date and end_date:
            start = parse_date(start_date)
            end = parse_date(end_date)
            if start <= dream_date <= end:
                filtered_dreams.append(dream)
        elif days:
            if current_date - timedelta(days=days) <= dream_date <= current_date:
                filtered_dreams.append(dream)
        elif year:
            if dream_date.year == year:
                filtered_dreams.append(dream)
    return filtered_dreams

# Function to calculate tag statistics by type
def calculate_tag_stats(dreams, selected_tags=None):
    tag_counts = defaultdict(lambda: defaultdict(int))
    co_occurrence = defaultdict(lambda: defaultdict(lambda: defaultdict(int)))

    for dream in dreams:
        for tag in dream['tags']:
            tag_name = tag['name']
            tag_type = tag['type']
            if not selected_tags or tag_name in selected_tags:
                tag_counts[tag_type][tag_name] += 1
                for co_tag in dream['tags']:
                    co_tag_name = co_tag['name']
                    if co_tag_name != tag_name:
                        co_occurrence[tag_type][tag_name][co_tag_name] += 1

    # Sort tag counts and co-occurrences by type and tag name
    sorted_tag_counts = OrderedDict(
        (tag_type, OrderedDict(sorted(tags.items())))
        for tag_type, tags in sorted(tag_counts.items())
    )
    sorted_co_occurrence = OrderedDict(
        (tag_type, OrderedDict(sorted(co_tags.items())))
        for tag_type, co_tags in sorted(co_occurrence.items())
    )

    # Sort co-occurrence by descending order within each type
    for tag_type in sorted_co_occurrence:
        for tag_name in sorted_co_occurrence[tag_type]:
            sorted_co_occurrence[tag_type][tag_name] = dict(
                sorted(sorted_co_occurrence[tag_type][tag_name].items(), key=lambda item: item[1], reverse=True)
            )

    return sorted_tag_counts, sorted_co_occurrence

# Main route to handle form submission
@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        tags = request.form.get('tags').split(',')
        option = request.form.get('option')
        year = request.form.get('year')
        start_date = request.form.get('start_date')
        end_date = request.form.get('end_date')
        days = None

        # Only check for 'days' if option is not None
        if option:
            if 'days' in option:
                days = int(option.split(' ')[1])
            elif option.isdigit():  # Check if option is a year
                year = int(option)

        with open('dreams.json', 'r') as file:
            dreams = json.load(file)

        filtered_dreams = filter_dreams_by_date(dreams, days=days, year=int(year) if year else None, start_date=start_date, end_date=end_date)
        tag_stats, co_occurrence = calculate_tag_stats(filtered_dreams, tags)

        return render_template('result.html', tag_stats=tag_stats, co_occurrence=co_occurrence)

    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
