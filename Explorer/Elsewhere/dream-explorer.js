// DreamJournalTagExplorer component
const DreamJournalTagExplorer = () => {
    // Destructure Recharts components
    const {
      BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
      ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, 
      RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
    } = Recharts;
  
    // State for storing data
    const [dreamData, setDreamData] = React.useState([]);
    const [fileUploaded, setFileUploaded] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [tagTypes, setTagTypes] = React.useState([]);
    const [selectedTagType, setSelectedTagType] = React.useState('');
    const [tagList, setTagList] = React.useState([]);
    const [selectedTag, setSelectedTag] = React.useState('');
    const [tagData, setTagData] = React.useState(null);
    const [processingStatus, setProcessingStatus] = React.useState('');
  
    // Colors for charts
    const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a4de6c', '#d0ed57'];
  
    // Handle file upload
    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      if (!file) return;
  
      setLoading(true);
      setProcessingStatus('Reading file...');
      setError(null);
      setFileUploaded(false);
      setDreamData([]);
      setTagTypes([]);
      setSelectedTagType('');
      setTagList([]);
      setSelectedTag('');
      setTagData(null);
  
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const csvText = e.target.result;
          setProcessingStatus('Parsing CSV data...');
          
          Papa.parse(csvText, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            complete: (results) => {
              if (results.data.length === 0 || !results.meta.fields.includes('tag_type')) {
                setError('The file does not appear to be in the correct format. Please ensure it contains dream data with tag_type field.');
                setLoading(false);
                return;
              }
              
              setProcessingStatus('Processing dream data...');
              processDreamData(results.data);
            },
            error: (error) => {
              setError(`Error parsing CSV: ${error.message}`);
              setLoading(false);
            }
          });
        } catch (error) {
          setError(`Error reading file: ${error.message}`);
          setLoading(false);
        }
      };
      
      reader.onerror = () => {
        setError('Error reading file');
        setLoading(false);
      };
      
      reader.readAsText(file);
    };
  
    // Process the dream data from CSV
    const processDreamData = (data) => {
      try {
        setProcessingStatus('Organizing dream tags...');
        
        // Group dreams by ID
        const dreamsById = _.groupBy(data, 'id');
        
        // Extract all tag types from the data
        const allTagTypes = [...new Set(data.filter(item => item.tag_type).map(item => item.tag_type))];
        
        setTagTypes(allTagTypes.map(type => ({ id: type, name: type })));
        setDreamData(data);
        setFileUploaded(true);
        setLoading(false);
        setProcessingStatus('Dream data loaded successfully!');
        
        // Set default tag type if available
        if (allTagTypes.length > 0) {
          setSelectedTagType(allTagTypes[0]);
        }
      } catch (error) {
        setError(`Error processing data: ${error.message}`);
        setLoading(false);
      }
    };
  
    // Effect to update tag list when tag type changes
    React.useEffect(() => {
      if (!selectedTagType || dreamData.length === 0) {
        setTagList([]);
        return;
      }
      
      // Filter tags by the selected tag type
      const filteredTags = dreamData.filter(item => item.tag_type === selectedTagType);
      
      // Count occurrences of each tag name
      const tagCounts = {};
      filteredTags.forEach(tag => {
        if (tag.tag_name) {
          tagCounts[tag.tag_name] = (tagCounts[tag.tag_name] || 0) + 1;
        }
      });
      
      // Create sorted list of tags with counts
      const sortedTags = Object.entries(tagCounts)
        .map(([name, count]) => ({ id: name, count }))
        .sort((a, b) => b.count - a.count);
      
      setTagList(sortedTags);
      setSelectedTag('');
      setTagData(null);
    }, [selectedTagType, dreamData]);
  
    // Effect to analyze tag data when a tag is selected
    React.useEffect(() => {
      if (!selectedTag || !selectedTagType || dreamData.length === 0) {
        setTagData(null);
        return;
      }
      
      setLoading(true);
      
      // Find all dream entries with the selected tag
      const tagEntries = dreamData.filter(
        item => item.tag_type === selectedTagType && item.tag_name === selectedTag
      );
      
      // Get all dream IDs that contain this tag
      const dreamIds = [...new Set(tagEntries.map(entry => entry.id))];
      
      // Find all entries for these dreams
      const relevantDreams = dreamData.filter(entry => dreamIds.includes(entry.id));
      
      // Group by dream ID
      const dreamsById = _.groupBy(relevantDreams, 'id');
      
      // Calculate statistics
      const stats = calculateTagStats(selectedTag, selectedTagType, dreamIds, dreamsById, dreamData);
      
      setTagData(stats);
      setLoading(false);
    }, [selectedTag, selectedTagType, dreamData]);
  
    // Calculate statistics for the selected tag
    const calculateTagStats = (tagName, tagType, dreamIds, dreamsById, allDreamData) => {
      // Get main entries for each dream (entries with descriptions)
      const mainEntries = [];
      Object.values(dreamsById).forEach(entries => {
        const mainEntry = entries.find(entry => entry.description);
        if (mainEntry) {
          mainEntries.push(mainEntry);
        }
      });
      
      // Sort by date if available
      mainEntries.sort((a, b) => {
        if (a.date && b.date) {
          return new Date(a.date) - new Date(b.date);
        }
        return 0;
      });
      
      // Calculate first and last appearance dates
      const firstAppearance = mainEntries.length > 0 && mainEntries[0].date 
        ? mainEntries[0].date 
        : "Unknown";
        
      const lastAppearance = mainEntries.length > 0 && mainEntries[mainEntries.length - 1].date 
        ? mainEntries[mainEntries.length - 1].date 
        : "Unknown";
      
      // Calculate occurrences by year
      const dreamsByYear = {};
      mainEntries.forEach(entry => {
        if (entry.date) {
          const year = entry.date.substring(0, 4);
          dreamsByYear[year] = (dreamsByYear[year] || 0) + 1;
        }
      });
      
      // Calculate total dreams per year in the entire dataset
      const allDreamsById = _.groupBy(allDreamData, 'id');
      const allMainEntries = [];
      Object.values(allDreamsById).forEach(entries => {
        const mainEntry = entries.find(entry => entry.description);
        if (mainEntry) {
          allMainEntries.push(mainEntry);
        }
      });
      
      const totalDreamsByYear = {};
      allMainEntries.forEach(entry => {
        if (entry.date) {
          const year = entry.date.substring(0, 4);
          totalDreamsByYear[year] = (totalDreamsByYear[year] || 0) + 1;
        }
      });
      
      // Format year data for charts
      const byYear = Object.keys(totalDreamsByYear).sort().map(year => {
        const count = dreamsByYear[year] || 0;
        const totalCount = totalDreamsByYear[year] || 0;
        const percentage = totalCount > 0 ? ((count / totalCount) * 100).toFixed(2) : 0;
        return {
          year,
          count,
          percentage: parseFloat(percentage)
        };
      });
      
      // Calculate occurrences by month
      const dreamsByMonth = {};
      mainEntries.forEach(entry => {
        if (entry.date) {
          const month = entry.date.substring(5, 7); // Extract MM from YYYY-MM-DD
          dreamsByMonth[month] = (dreamsByMonth[month] || 0) + 1;
        }
      });
      
      const totalDreamsByMonth = {};
      allMainEntries.forEach(entry => {
        if (entry.date) {
          const month = entry.date.substring(5, 7);
          totalDreamsByMonth[month] = (totalDreamsByMonth[month] || 0) + 1;
        }
      });
      
      // Month names for better display
      const monthNames = {
        '01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr', '05': 'May', '06': 'Jun',
        '07': 'Jul', '08': 'Aug', '09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dec'
      };
      
      // Format month data for charts
      const byMonth = Object.keys(monthNames).map(month => {
        const count = dreamsByMonth[month] || 0;
        const totalCount = totalDreamsByMonth[month] || 0;
        const percentage = totalCount > 0 ? ((count / totalCount) * 100).toFixed(2) : 0;
        return {
          month: monthNames[month],
          count,
          percentage: parseFloat(percentage)
        };
      });
      
      // Calculate occurrences by weekday
      const dreamsByWeekday = {};
      mainEntries.forEach(entry => {
        if (entry.date) {
          const date = new Date(entry.date);
          if (!isNaN(date.getTime())) {
            const weekday = date.getDay();  // 0-6, where 0 is Sunday
            dreamsByWeekday[weekday] = (dreamsByWeekday[weekday] || 0) + 1;
          }
        }
      });
      
      const totalDreamsByWeekday = {};
      allMainEntries.forEach(entry => {
        if (entry.date) {
          const date = new Date(entry.date);
          if (!isNaN(date.getTime())) {
            const weekday = date.getDay();
            totalDreamsByWeekday[weekday] = (totalDreamsByWeekday[weekday] || 0) + 1;
          }
        }
      });
      
      // Weekday names
      const weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      
      // Format weekday data for charts
      const byWeekday = weekdayNames.map((name, idx) => {
        const count = dreamsByWeekday[idx] || 0;
        const totalCount = totalDreamsByWeekday[idx] || 0;
        const percentage = totalCount > 0 ? ((count / totalCount) * 100).toFixed(2) : 0;
        return {
          day: name,
          count,
          percentage: parseFloat(percentage)
        };
      });
      
      // Find co-occurring tags
      const coOccurringTagsByType = {};
      
      // Get all unique tag types
      const availableTagTypes = [...new Set(allDreamData.map(item => item.tag_type))];
      
      // For each tag type, find co-occurring tags
      availableTagTypes.forEach(type => {
        if (type === tagType) return; // Skip the current tag type
        
        const tagCounts = {};
        
        // Count occurrences of each tag
        dreamIds.forEach(dreamId => {
          const dreamEntries = allDreamData.filter(
            entry => entry.id === dreamId && entry.tag_type === type
          );
          
          dreamEntries.forEach(entry => {
            if (entry.tag_name) {
              tagCounts[entry.tag_name] = (tagCounts[entry.tag_name] || 0) + 1;
            }
          });
        });
        
        // Sort tags by count
        const sortedTags = Object.entries(tagCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)  // Get top 5
          .map(([name, count]) => ({ name, count }));
        
        if (sortedTags.length > 0) {
          coOccurringTagsByType[type] = sortedTags;
        }
      });
      
      // Find all tags in the same tag group (same tag_type)
      let tagGroupData = [];
      if (tagType) {
        // Get all tags of the same type
        const sameTypeEntries = allDreamData.filter(entry => entry.tag_type === tagType);
        const tagCounts = {};
        
        // Count occurrences of each tag
        sameTypeEntries.forEach(entry => {
          if (entry.tag_name) {
            tagCounts[entry.tag_name] = (tagCounts[entry.tag_name] || 0) + 1;
          }
        });
        
        // Format for chart
        tagGroupData = Object.entries(tagCounts)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 10); // Get top 10
      }
      
      return {
        tag: tagName,
        tagType,
        totalOccurrences: dreamIds.length,
        firstAppearance,
        latestAppearance: lastAppearance,
        byYear,
        byMonth,
        byWeekday,
        coOccurringTagsByType,
        tagGroupData
      };
    };
  
    return (
      <div className="p-6 bg-gray-50 rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Dream Journal Tag Explorer</h1>
        
        {/* File Upload Section */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold mb-2">Upload Your Dream Journal</h2>
          <p className="mb-4 text-gray-700">Upload your dream journal CSV file to analyze tag patterns.</p>
          
          <div className="flex items-center space-x-4">
            <label className="block">
              <span className="sr-only">Choose file</span>
              <input 
                type="file" 
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-purple-50 file:text-purple-700
                  hover:file:bg-purple-100"
                accept=".csv"
                onChange={handleFileUpload}
                disabled={loading}
              />
            </label>
            {loading && (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 mr-2"></div>
                <span className="text-sm">{processingStatus}</span>
              </div>
            )}
          </div>
          
          {error && (
            <div className="mt-2 text-red-500 text-sm">
              {error}
            </div>
          )}
          
          {fileUploaded && !loading && (
            <div className="mt-2 text-green-500 text-sm">
              File uploaded successfully! {dreamData.length} entries loaded.
            </div>
          )}
        </div>
        
        {fileUploaded && (
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Tag Type</label>
                <select 
                  className="w-full p-2 border rounded"
                  value={selectedTagType}
                  onChange={(e) => setSelectedTagType(e.target.value)}
                >
                  <option value="">-- Select a tag type --</option>
                  {tagTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Tag</label>
                <select 
                  className="w-full p-2 border rounded"
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  disabled={tagList.length === 0 || !selectedTagType}
                >
                  <option value="">-- Select a tag --</option>
                  {tagList.map(tag => (
                    <option key={tag.id} value={tag.id}>{tag.id} ({tag.count})</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
        
        {loading && selectedTag && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <p className="mt-2">Analyzing data for {selectedTag}...</p>
          </div>
        )}
        
        {tagData && !loading && (
          <div>
            {/* Overview Stats */}
            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <h2 className="text-xl font-bold mb-4">{tagData.tag} ({tagData.tagType})</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="border rounded-lg p-3">
                  <p className="text-sm text-gray-500">Total Occurrences</p>
                  <p className="text-2xl font-bold">{tagData.totalOccurrences}</p>
                </div>
                <div className="border rounded-lg p-3">
                  <p className="text-sm text-gray-500">First Appearance</p>
                  <p className="text-lg font-medium">{tagData.firstAppearance}</p>
                </div>
                <div className="border rounded-lg p-3">
                  <p className="text-sm text-gray-500">Latest Appearance</p>
                  <p className="text-lg font-medium">{tagData.latestAppearance}</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Occurrences by Year */}
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Occurrences by Year</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={tagData.byYear}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis yAxisId="left" orientation="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="count" name="Count" stroke="#8884d8" strokeWidth={2} />
                      <Line yAxisId="right" type="monotone" dataKey="percentage" name="% of Dreams" stroke="#82ca9d" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Occurrences by Month */}
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Occurrences by Month</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={tagData.byMonth}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" orientation="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="count" name="Count" fill="#8884d8" />
                      <Bar yAxisId="right" dataKey="percentage" name="% of Dreams" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Occurrences by Weekday */}
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Occurrences by Weekday</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart outerRadius={90} data={tagData.byWeekday}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="day" />
                      <PolarRadiusAxis angle={30} domain={[0, 'auto']} />
                      <Radar name="Count" dataKey="count" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                      <Radar name="% of Dreams" dataKey="percentage" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                      <Legend />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Tag Group Distribution */}
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Top Tags in '{tagData.tagType}' Group</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={tagData.tagGroupData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={120} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" name="Occurrences" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            {/* Co-occurring Tags */}
            {Object.keys(tagData.coOccurringTagsByType).length > 0 && (
              <div className="bg-white p-4 rounded-lg shadow mb-6">
                <h3 className="text-lg font-semibold mb-2">Common Co-occurring Tags</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(tagData.coOccurringTagsByType).map(([type, tags], idx) => (
                    <div key={idx} className="border rounded p-3">
                      <h4 className="font-medium mb-1">{type}</h4>
                      <ul className="text-sm">
                        {tags.map((tag, tagIdx) => (
                          <li key={tagIdx} className="py-1 border-b last:border-0">
                            {tag.name} ({tag.count})
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        
        {fileUploaded && !selectedTag && !loading && (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <h2 className="text-xl font-medium mb-4">Select a tag to view detailed statistics</h2>
            <p className="text-gray-600">
              Choose a tag type and specific tag from the dropdown menus above to explore detailed patterns and statistics.
            </p>
          </div>
        )}
        
        {!fileUploaded && !loading && (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <h2 className="text-xl font-medium mb-4">Upload your dream journal to begin</h2>
            <p className="text-gray-600">
              Upload a CSV file containing your dream journal data to explore patterns and statistics.
            </p>
          </div>
        )}
      </div>
    );
  };