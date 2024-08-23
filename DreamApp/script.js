document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('file');
    const tagsInput = document.getElementById('tags').value.split(',').map(tag => tag.trim());
    const option = document.querySelector('input[name="option"]:checked')?.value;
    const year = document.getElementById('yearInput').value;
    const startDate = document.getElementById('start_date').value;
    const endDate = document.getElementById('end_date').value;

    if (!fileInput.files.length) {
        alert('Please select a file.');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const data = JSON.parse(e.target.result);

        // Filter and process data
        const filteredDreams = filterDreams(data, option, year, startDate, endDate);
        const tagStats = calculateTagStats(filteredDreams, tagsInput);

        // Display results
        displayResults(tagStats);
    };

    reader.readAsText(file);
});

function filterDreams(dreams, option, year, startDate, endDate) {
    const now = new Date();
    return dreams.filter(dream => {
        const dreamDate = new Date(dream.date);

        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            return dreamDate >= start && dreamDate <= end;
        }

        if (option) {
            const daysMap = {
                'last 30 days': 30,
                'last 60 days': 60,
                'last 90 days': 90
            };
            const days = daysMap[option];
            if (days) {
                return (now - dreamDate) / (1000 * 60 * 60 * 24) <= days;
            } else if (option === 'year' && year) {
                return dreamDate.getFullYear() == year;
            }
        }

        return true;
    });
}

function calculateTagStats(dreams, selectedTags) {
    const tagCounts = {};
    const coOccurrence = {};

    dreams.forEach(dream => {
        dream.tags.forEach(tag => {
            const tagName = tag.name;
            const tagType = tag.type;

            if (!selectedTags.length || selectedTags.includes(tagName)) {
                if (!tagCounts[tagType]) {
                    tagCounts[tagType] = {};
                }
                if (!tagCounts[tagType][tagName]) {
                    tagCounts[tagType][tagName] = 0;
                }
                tagCounts[tagType][tagName]++;

                dream.tags.forEach(coTag => {
                    if (coTag.name !== tagName) {
                        const coTagName = coTag.name;
                        const coTagType = coTag.type;

                        if (!coOccurrence[tagType]) {
                            coOccurrence[tagType] = {};
                        }
                        if (!coOccurrence[tagType][tagName]) {
                            coOccurrence[tagType][tagName] = {};
                        }
                        if (!coOccurrence[tagType][tagName][coTagType]) {
                            coOccurrence[tagType][tagName][coTagType] = {};
                        }
                        if (!coOccurrence[tagType][tagName][coTagType][coTagName]) {
                            coOccurrence[tagType][tagName][coTagType][coTagName] = 0;
                        }
                        coOccurrence[tagType][tagName][coTagType][coTagName]++;
                    }
                });
            }
        });
    });

    return { tagCounts, coOccurrence };
}

function displayResults({ tagCounts, coOccurrence }) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '<h2>Statistics</h2>';

    // Display tag counts
    for (const [type, tags] of Object.entries(tagCounts)) {
        resultDiv.innerHTML += `<h3>${type}</h3><ul>`;
        for (const [name, count] of Object.entries(tags)) {
            resultDiv.innerHTML += `<li>${name}: ${count}</li>`;
        }
        resultDiv.innerHTML += '</ul>';
    }

    // Display co-occurrences
    for (const [type, tags] of Object.entries(coOccurrence)) {
        resultDiv.innerHTML += `<h3>Co-occurrences for ${type}</h3>`;
        for (const [tagName, coTags] of Object.entries(tags)) {
            resultDiv.innerHTML += `<h4>${tagName}</h4><ul>`;
            for (const [coTagType, coTagsMap] of Object.entries(coTags)) {
                resultDiv.innerHTML += `<li><strong>${coTagType}</strong><ul>`;
                for (const [coTagName, count] of Object.entries(coTagsMap)) {
                    resultDiv.innerHTML += `<li>${coTagName}: ${count}</li>`;
                }
                resultDiv.innerHTML += '</ul></li>';
            }
            resultDiv.innerHTML += '</ul>';
        }
    }

    resultDiv.classList.remove('hidden');
}
