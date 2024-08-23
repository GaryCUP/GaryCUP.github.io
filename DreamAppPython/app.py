from flask import Flask, request, render_template
import json
from datetime import datetime, timedelta
from collections import defaultdict, OrderedDict
import os

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'  # Directory to store uploaded files
app.config['ALLOWED_EXTENSIONS'] = {'json'}

# Function to check allowed file extensions
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

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
    co_occurrence = defaultdict(lambda: defaultdict(lambda: defaultdict(lambda: defaultdict(int))))

    for dream in dreams:
        tags = dream['tags']
        for tag in tags:
            tag_name = tag['name']
            tag_type = tag['type']
            if not selected_tags or tag_name in selected_tags:
                tag_counts[tag_type][tag_name] += 1
                for co_tag in tags:
                    co_tag_name = co_tag['name']
                    co_tag_type = co_tag['type']
                    if co_tag_name != tag_name:
                        co_occurrence[tag_type][tag_name][co_tag_type][co_tag_name] += 1

    # Sort tag counts and co-occurrences by type and tag name
    sorted_tag_counts = OrderedDict(
        (tag_type, OrderedDict(sorted(tags.items())))
        for tag_type, tags in sorted(tag_counts.items())
    )
    sorted_co_occurrence = OrderedDict(
        (tag_type, OrderedDict(
            (tag_name, OrderedDict(
                (co_tag_type, dict(sorted(co_tags.items(), key=lambda item: item[1], reverse=True)))
                for co_tag_type, co_tags in sorted(co_types.items())
            ))
            for tag_name, co_types in sorted(co_tags.items())
        ))
        for tag_type, co_tags in sorted(co_occurrence.items())
    )

    return sorted_tag_counts, sorted_co_occurrence

# Route to handle file upload
@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        if 'file' not in request.files:
            return render_template('index.html', message="No file part")
        
        file = request.files['file']
        if file.filename == '':
            return render_template('index.html', message="No selected file")
        
        if file and allowed_file(file.filename):
            filename = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
            file.save(filename)

            # Load the uploaded file
            with open(filename, 'r') as f:
                dreams = json.load(f)
            
            tags = request.form.get('tags', '').split(',')
            option = request.form.get('option')
            year = request.form.get('year')
            start_date = request.form.get('start_date')
            end_date = request.form.get('end_date')
            days = None

            if option:
                if 'days' in option:
                    days = int(option.split(' ')[1])
                elif option.isdigit():
                    year = int(option)

            filtered_dreams = filter_dreams_by_date(dreams, days=days, year=int(year) if year else None, start_date=start_date, end_date=end_date)
            tag_stats, co_occurrence = calculate_tag_stats(filtered_dreams, tags)

            return render_template('result.html', tag_stats=tag_stats, co_occurrence=co_occurrence)

    return render_template('index.html')

if __name__ == '__main__':
    # Create the upload folder if it does not exist
    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'])
    app.run(debug=True)
