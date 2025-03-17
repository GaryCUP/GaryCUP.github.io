// DaylioExplorer component
const DaylioExplorer = () => {
    // Destructure Recharts components
    const {
      BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
      ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, 
      RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
      ComposedChart, Area
    } = Recharts;
  
    // State for storing data
    const [daylioData, setDaylioData] = React.useState([]);
    const [fileUploaded, setFileUploaded] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [processingStatus, setProcessingStatus] = React.useState('');
  
    // Analysis state
    const [moods, setMoods] = React.useState([]);
    const [activities, setActivities] = React.useState([]);
    const [selectedMood, setSelectedMood] = React.useState('');
    const [selectedActivity, setSelectedActivity] = React.useState('');
    const [analysisMode, setAnalysisMode] = React.useState('mood'); // 'mood' or 'activity'
    const [moodData, setMoodData] = React.useState(null);
    const [activityData, setActivityData] = React.useState(null);
  
    // Colors for charts
    const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', 
                    '#00C49F', '#FFBB28', '#FF8042', '#a4de6c', '#d0ed57', 
                    '#f28cb1', '#AF19FF', '#00A9FF', '#FF5733', '#33FF57'];
  
    // Handle file upload
    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      if (!file) return;
  
      setLoading(true);
      setProcessingStatus('Reading file...');
      setError(null);
      setFileUploaded(false);
      setDaylioData([]);
      setMoods([]);
      setActivities([]);
      setSelectedMood('');
      setSelectedActivity('');
      setMoodData(null);
      setActivityData(null);
  
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
              if (results.data.length === 0 || !results.meta.fields.includes('mood') || !results.meta.fields.includes('activities')) {
                setError('The file does not appear to be a valid Daylio export. Please ensure it contains mood and activities data.');
                setLoading(false);
                return;
              }
              
              setProcessingStatus('Processing Daylio data...');
              processDaylioData(results.data);
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
  
    // Process the Daylio data from CSV
    const processDaylioData = (data) => {
      try {
        setProcessingStatus('Extracting moods and activities...');
        
        // Extract all unique moods
        const uniqueMoods = [...new Set(data.map(entry => entry.mood))];
        
        // Extract all activities
        const allActivities = [];
        data.forEach(entry => {
          if (entry.activities) {
            const activities = entry.activities.split('|').map(a => a.trim());
            activities.forEach(activity => {
              if (activity && !allActivities.includes(activity)) {
                allActivities.push(activity);
              }
            });
          }
        });
        
        // Count occurrences of each mood
        const moodCounts = {};
        data.forEach(entry => {
          if (entry.mood) {
            moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
          }
        });
        
        // Sort moods by count
        const sortedMoods = uniqueMoods
          .map(mood => ({ name: mood, count: moodCounts[mood] || 0 }))
          .sort((a, b) => b.count - a.count);
        
        // Count occurrences of each activity
        const activityCounts = {};
        data.forEach(entry => {
          if (entry.activities) {
            const activities = entry.activities.split('|').map(a => a.trim());
            activities.forEach(activity => {
              if (activity) {
                activityCounts[activity] = (activityCounts[activity] || 0) + 1;
              }
            });
          }
        });
        
        // Sort activities by count
        const sortedActivities = allActivities
          .map(activity => ({ name: activity, count: activityCounts[activity] || 0 }))
          .sort((a, b) => b.count - a.count);
        
        setMoods(sortedMoods);
        setActivities(sortedActivities);
        setDaylioData(data);
        setFileUploaded(true);
        setLoading(false);
        setProcessingStatus('Daylio data loaded successfully!');
        
        // Set default selections if available
        if (sortedMoods.length > 0) {
          setSelectedMood(sortedMoods[0].name);
        }
        
        if (sortedActivities.length > 0) {
          setSelectedActivity(sortedActivities[0].name);
        }
      } catch (error) {
        setError(`Error processing data: ${error.message}`);
        setLoading(false);
      }
    };
  
    // Effect to analyze mood data when a mood is selected
    React.useEffect(() => {
      if (!selectedMood || daylioData.length === 0) {
        setMoodData(null);
        return;
      }
      
      setLoading(true);
      
      // Find all entries with the selected mood
      const moodEntries = daylioData.filter(entry => entry.mood === selectedMood);
      
      // Calculate statistics
      const stats = calculateMoodStats(selectedMood, moodEntries, daylioData);
      
      setMoodData(stats);
      setLoading(false);
    }, [selectedMood, daylioData]);
  
    // Effect to analyze activity data when an activity is selected
    React.useEffect(() => {
      if (!selectedActivity || daylioData.length === 0) {
        setActivityData(null);
        return;
      }
      
      setLoading(true);
      
      // Find all entries with the selected activity
      const activityEntries = daylioData.filter(entry => 
        entry.activities && entry.activities.split('|').map(a => a.trim()).includes(selectedActivity)
      );
      
      // Calculate statistics
      const stats = calculateActivityStats(selectedActivity, activityEntries, daylioData);
      
      setActivityData(stats);
      setLoading(false);
    }, [selectedActivity, daylioData]);
  
    // Calculate statistics for a selected mood
    const calculateMoodStats = (mood, moodEntries, allData) => {
      // Calculate first and last occurrence dates
      const dates = moodEntries.map(entry => new Date(entry.full_date));
      const firstOccurrence = new Date(Math.min(...dates)).toISOString().split('T')[0];
      const lastOccurrence = new Date(Math.max(...dates)).toISOString().split('T')[0];
      
      // Calculate total occurrences and percentage
      const totalOccurrences = moodEntries.length;
      const totalEntries = allData.length;
      const percentage = ((totalOccurrences / totalEntries) * 100).toFixed(2);
      
      // Calculate occurrences by year
      const entriesByYear = {};
      const allEntriesByYear = {};
      
      moodEntries.forEach(entry => {
        if (entry.full_date) {
          const year = entry.full_date.substring(0, 4);
          entriesByYear[year] = (entriesByYear[year] || 0) + 1;
        }
      });
      
      allData.forEach(entry => {
        if (entry.full_date) {
          const year = entry.full_date.substring(0, 4);
          allEntriesByYear[year] = (allEntriesByYear[year] || 0) + 1;
        }
      });
      
      // Format year data for charts
      const byYear = Object.keys(allEntriesByYear).sort().map(year => {
        const count = entriesByYear[year] || 0;
        const totalCount = allEntriesByYear[year] || 0;
        const percentage = totalCount > 0 ? ((count / totalCount) * 100).toFixed(2) : 0;
        return {
          year,
          count,
          percentage: parseFloat(percentage)
        };
      });
      
      // Calculate occurrences by month
      const entriesByMonth = {};
      const allEntriesByMonth = {};
      
      moodEntries.forEach(entry => {
        if (entry.full_date) {
          const month = entry.full_date.substring(5, 7); // Extract MM from YYYY-MM-DD
          entriesByMonth[month] = (entriesByMonth[month] || 0) + 1;
        }
      });
      
      allData.forEach(entry => {
        if (entry.full_date) {
          const month = entry.full_date.substring(5, 7);
          allEntriesByMonth[month] = (allEntriesByMonth[month] || 0) + 1;
        }
      });
      
      // Month names for better display
      const monthNames = {
        '01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr', '05': 'May', '06': 'Jun',
        '07': 'Jul', '08': 'Aug', '09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dec'
      };
      
      // Format month data for charts
      const byMonth = Object.keys(monthNames).map(month => {
        const count = entriesByMonth[month] || 0;
        const totalCount = allEntriesByMonth[month] || 0;
        const percentage = totalCount > 0 ? ((count / totalCount) * 100).toFixed(2) : 0;
        return {
          month: monthNames[month],
          count,
          percentage: parseFloat(percentage)
        };
      });
      
      // Calculate occurrences by weekday
      const entriesByWeekday = {};
      const allEntriesByWeekday = {};
      
      moodEntries.forEach(entry => {
        if (entry.weekday) {
          entriesByWeekday[entry.weekday] = (entriesByWeekday[entry.weekday] || 0) + 1;
        }
      });
      
      allData.forEach(entry => {
        if (entry.weekday) {
          allEntriesByWeekday[entry.weekday] = (allEntriesByWeekday[entry.weekday] || 0) + 1;
        }
      });
      
      // Format weekday data for charts
      const weekdayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      const byWeekday = weekdayOrder.map(day => {
        const count = entriesByWeekday[day] || 0;
        const totalCount = allEntriesByWeekday[day] || 0;
        const percentage = totalCount > 0 ? ((count / totalCount) * 100).toFixed(2) : 0;
        return {
          day,
          count,
          percentage: parseFloat(percentage)
        };
      });
      
      // Find co-occurring activities
      const activitiesCounts = {};
      
      moodEntries.forEach(entry => {
        if (entry.activities) {
          const activities = entry.activities.split('|').map(a => a.trim());
          activities.forEach(activity => {
            if (activity) {
              activitiesCounts[activity] = (activitiesCounts[activity] || 0) + 1;
            }
          });
        }
      });
      
      // Sort activities by count
      const topActivities = Object.entries(activitiesCounts)
        .map(([name, count]) => ({ name, count, percentage: ((count / totalOccurrences) * 100).toFixed(2) }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 15); // Get top 15
      
      // Calculate time distribution (morning, afternoon, evening, night)
      const timeDistribution = {
        morning: 0,   // 5:00 - 11:59
        afternoon: 0, // 12:00 - 16:59
        evening: 0,   // 17:00 - 20:59
        night: 0      // 21:00 - 4:59
      };
      
      moodEntries.forEach(entry => {
        if (entry.time) {
          const hour = parseInt(entry.time.split(':')[0]);
          
          if (hour >= 5 && hour < 12) {
            timeDistribution.morning++;
          } else if (hour >= 12 && hour < 17) {
            timeDistribution.afternoon++;
          } else if (hour >= 17 && hour < 21) {
            timeDistribution.evening++;
          } else {
            timeDistribution.night++;
          }
        }
      });
      
      // Format time distribution for chart
      const byTimeOfDay = [
        { name: 'Morning (5-11)', count: timeDistribution.morning, percentage: ((timeDistribution.morning / totalOccurrences) * 100).toFixed(2) },
        { name: 'Afternoon (12-16)', count: timeDistribution.afternoon, percentage: ((timeDistribution.afternoon / totalOccurrences) * 100).toFixed(2) },
        { name: 'Evening (17-20)', count: timeDistribution.evening, percentage: ((timeDistribution.evening / totalOccurrences) * 100).toFixed(2) },
        { name: 'Night (21-4)', count: timeDistribution.night, percentage: ((timeDistribution.night / totalOccurrences) * 100).toFixed(2) }
      ];
      
      // Find the most common related moods (entries on the same day)
      const relatedMoods = {};
      const moodDates = new Set(moodEntries.map(entry => entry.full_date));
      
      allData.forEach(entry => {
        if (moodDates.has(entry.full_date) && entry.mood !== mood) {
          relatedMoods[entry.mood] = (relatedMoods[entry.mood] || 0) + 1;
        }
      });
      
      const topRelatedMoods = Object.entries(relatedMoods)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10); // Get top 10
      
      return {
        mood,
        totalOccurrences,
        percentage,
        firstOccurrence,
        lastOccurrence,
        byYear,
        byMonth,
        byWeekday,
        topActivities,
        byTimeOfDay,
        topRelatedMoods
      };
    };
  
    // Calculate statistics for a selected activity
    const calculateActivityStats = (activity, activityEntries, allData) => {
      // Calculate first and last occurrence dates
      const dates = activityEntries.map(entry => new Date(entry.full_date));
      const firstOccurrence = new Date(Math.min(...dates)).toISOString().split('T')[0];
      const lastOccurrence = new Date(Math.max(...dates)).toISOString().split('T')[0];
      
      // Calculate total occurrences and percentage
      const totalOccurrences = activityEntries.length;
      const totalEntries = allData.length;
      const percentage = ((totalOccurrences / totalEntries) * 100).toFixed(2);
      
      // Calculate occurrences by year
      const entriesByYear = {};
      const allEntriesByYear = {};
      
      activityEntries.forEach(entry => {
        if (entry.full_date) {
          const year = entry.full_date.substring(0, 4);
          entriesByYear[year] = (entriesByYear[year] || 0) + 1;
        }
      });
      
      allData.forEach(entry => {
        if (entry.full_date) {
          const year = entry.full_date.substring(0, 4);
          allEntriesByYear[year] = (allEntriesByYear[year] || 0) + 1;
        }
      });
      
      // Format year data for charts
      const byYear = Object.keys(allEntriesByYear).sort().map(year => {
        const count = entriesByYear[year] || 0;
        const totalCount = allEntriesByYear[year] || 0;
        const percentage = totalCount > 0 ? ((count / totalCount) * 100).toFixed(2) : 0;
        return {
          year,
          count,
          percentage: parseFloat(percentage)
        };
      });
      
      // Calculate occurrences by month
      const entriesByMonth = {};
      const allEntriesByMonth = {};
      
      activityEntries.forEach(entry => {
        if (entry.full_date) {
          const month = entry.full_date.substring(5, 7); // Extract MM from YYYY-MM-DD
          entriesByMonth[month] = (entriesByMonth[month] || 0) + 1;
        }
      });
      
      allData.forEach(entry => {
        if (entry.full_date) {
          const month = entry.full_date.substring(5, 7);
          allEntriesByMonth[month] = (allEntriesByMonth[month] || 0) + 1;
        }
      });
      
      // Month names for better display
      const monthNames = {
        '01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr', '05': 'May', '06': 'Jun',
        '07': 'Jul', '08': 'Aug', '09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dec'
      };
      
      // Format month data for charts
      const byMonth = Object.keys(monthNames).map(month => {
        const count = entriesByMonth[month] || 0;
        const totalCount = allEntriesByMonth[month] || 0;
        const percentage = totalCount > 0 ? ((count / totalCount) * 100).toFixed(2) : 0;
        return {
          month: monthNames[month],
          count,
          percentage: parseFloat(percentage)
        };
      });
      
      // Calculate occurrences by weekday
      const entriesByWeekday = {};
      const allEntriesByWeekday = {};
      
      activityEntries.forEach(entry => {
        if (entry.weekday) {
          entriesByWeekday[entry.weekday] = (entriesByWeekday[entry.weekday] || 0) + 1;
        }
      });
      
      allData.forEach(entry => {
        if (entry.weekday) {
          allEntriesByWeekday[entry.weekday] = (allEntriesByWeekday[entry.weekday] || 0) + 1;
        }
      });
      
      // Format weekday data for charts
      const weekdayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      const byWeekday = weekdayOrder.map(day => {
        const count = entriesByWeekday[day] || 0;
        const totalCount = allEntriesByWeekday[day] || 0;
        const percentage = totalCount > 0 ? ((count / totalCount) * 100).toFixed(2) : 0;
        return {
          day,
          count,
          percentage: parseFloat(percentage)
        };
      });
      
      // Find associated moods
      const moodCounts = {};
      
      activityEntries.forEach(entry => {
        if (entry.mood) {
          moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
        }
      });
      
      // Sort moods by count
      const topMoods = Object.entries(moodCounts)
        .map(([name, count]) => ({ name, count, percentage: ((count / totalOccurrences) * 100).toFixed(2) }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 15); // Get top 15
      
      // Calculate time distribution (morning, afternoon, evening, night)
      const timeDistribution = {
        morning: 0,   // 5:00 - 11:59
        afternoon: 0, // 12:00 - 16:59
        evening: 0,   // 17:00 - 20:59
        night: 0      // 21:00 - 4:59
      };
      
      activityEntries.forEach(entry => {
        if (entry.time) {
          const hour = parseInt(entry.time.split(':')[0]);
          
          if (hour >= 5 && hour < 12) {
            timeDistribution.morning++;
          } else if (hour >= 12 && hour < 17) {
            timeDistribution.afternoon++;
          } else if (hour >= 17 && hour < 21) {
            timeDistribution.evening++;
          } else {
            timeDistribution.night++;
          }
        }
      });
      
      // Format time distribution for chart
      const byTimeOfDay = [
        { name: 'Morning (5-11)', count: timeDistribution.morning, percentage: ((timeDistribution.morning / totalOccurrences) * 100).toFixed(2) },
        { name: 'Afternoon (12-16)', count: timeDistribution.afternoon, percentage: ((timeDistribution.afternoon / totalOccurrences) * 100).toFixed(2) },
        { name: 'Evening (17-20)', count: timeDistribution.evening, percentage: ((timeDistribution.evening / totalOccurrences) * 100).toFixed(2) },
        { name: 'Night (21-4)', count: timeDistribution.night, percentage: ((timeDistribution.night / totalOccurrences) * 100).toFixed(2) }
      ];
      
      // Find co-occurring activities
      const coOccurringActivities = {};
      
      activityEntries.forEach(entry => {
        if (entry.activities) {
          const activities = entry.activities.split('|').map(a => a.trim());
          activities.forEach(act => {
            if (act && act !== activity) {
              coOccurringActivities[act] = (coOccurringActivities[act] || 0) + 1;
            }
          });
        }
      });
      
      // Sort co-occurring activities by count
      const topCoActivities = Object.entries(coOccurringActivities)
        .map(([name, count]) => ({ name, count, percentage: ((count / totalOccurrences) * 100).toFixed(2) }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10); // Get top 10
      
      return {
        activity,
        totalOccurrences,
        percentage,
        firstOccurrence,
        lastOccurrence,
        byYear,
        byMonth,
        byWeekday,
        topMoods,
        byTimeOfDay,
        topCoActivities
      };
    };
  
    return (
      <div className="p-6 bg-gray-50 rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Daylio Mood & Activity Explorer</h1>
        
        {/* File Upload Section */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold mb-2">Upload Your Daylio Export</h2>
          <p className="mb-4 text-gray-700">Upload your Daylio CSV export file to analyze mood and activity patterns.</p>
          
          <div className="flex items-center space-x-4">
            <label className="block">
              <span className="sr-only">Choose file</span>
              <input 
                type="file" 
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-violet-50 file:text-violet-700
                  hover:file:bg-violet-100"
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
              File uploaded successfully! Found {moods.length} moods and {activities.length} activities.
            </div>
          )}
        </div>
        
        {fileUploaded && (
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <h2 className="text-lg font-semibold mb-4">Choose Analysis Mode</h2>
            
            <div className="flex flex-col space-y-4">
              <div className="flex space-x-2 mb-4">
                <button
                  className={`px-4 py-2 rounded-lg ${analysisMode === 'mood' ? 'bg-violet-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                  onClick={() => setAnalysisMode('mood')}
                >
                  Analyze by Mood
                </button>
                <button
                  className={`px-4 py-2 rounded-lg ${analysisMode === 'activity' ? 'bg-violet-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                  onClick={() => setAnalysisMode('activity')}
                >
                  Analyze by Activity
                </button>
              </div>
              
              {analysisMode === 'mood' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Mood</label>
                  <select 
                    className="w-full p-2 border rounded"
                    value={selectedMood}
                    onChange={(e) => setSelectedMood(e.target.value)}
                  >
                    <option value="">-- Select a mood --</option>
                    {moods.map(mood => (
                      <option key={mood.name} value={mood.name}>{mood.name} ({mood.count})</option>
                    ))}
                  </select>
                </div>
              )}
              
              {analysisMode === 'activity' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Activity</label>
                  <select 
                    className="w-full p-2 border rounded"
                    value={selectedActivity}
                    onChange={(e) => setSelectedActivity(e.target.value)}
                  >
                    <option value="">-- Select an activity --</option>
                    {activities.map(activity => (
                      <option key={activity.name} value={activity.name}>{activity.name} ({activity.count})</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
        )}
        
        {loading && (selectedMood || selectedActivity) && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <p className="mt-2">Analyzing data...</p>
          </div>
        )}
        
        {/* Mood Analysis Section */}
        {moodData && analysisMode === 'mood' && !loading && (
          <div>
            {/* Overview Stats */}
            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <h2 className="text-xl font-bold mb-4">Mood: {moodData.mood}</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                <div className="border rounded-lg p-3">
                  <p className="text-sm text-gray-500">Total Occurrences</p>
                  <p className="text-2xl font-bold">{moodData.totalOccurrences}</p>
                </div>
                <div className="border rounded-lg p-3">
                  <p className="text-sm text-gray-500">Percentage of Entries</p>
                  <p className="text-2xl font-bold">{moodData.percentage}%</p>
                </div>
                <div className="border rounded-lg p-3">
                  <p className="text-sm text-gray-500">First Occurrence</p>
                  <p className="text-lg font-medium">{moodData.firstOccurrence}</p>
                </div>
                <div className="border rounded-lg p-3">
                  <p className="text-sm text-gray-500">Latest Occurrence</p>
                  <p className="text-lg font-medium">{moodData.lastOccurrence}</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Occurrences by Month */}
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Monthly Distribution</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={moodData.byMonth}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" orientation="left" />
                      <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="count" name="Count" fill="#8884d8" />
                      <Line yAxisId="right" type="monotone" dataKey="percentage" name="% of Month" stroke="#ff7300" strokeWidth={2} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Occurrences by Weekday */}
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Weekday Distribution</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={moodData.byWeekday}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis yAxisId="left" orientation="left" />
                      <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="count" name="Count" fill="#8884d8" />
                      <Line yAxisId="right" type="monotone" dataKey="percentage" name="% of Day" stroke="#ff7300" strokeWidth={2} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Top Activities */}
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Top Associated Activities</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={moodData.topActivities} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={120} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" name="Count" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Time of Day Distribution */}
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Time of Day Distribution</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={moodData.byTimeOfDay}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="count"
                        nameKey="name"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {moodData.byTimeOfDay.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Occurrences by Year */}
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Yearly Trend</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={moodData.byYear}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis yAxisId="left" orientation="left" />
                      <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="count" name="Count" fill="#8884d8" />
                      <Line yAxisId="right" type="monotone" dataKey="percentage" name="% of Year" stroke="#ff7300" strokeWidth={2} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Related Moods */}
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Related Moods (Same Day)</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={moodData.topRelatedMoods}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" name="Count" fill="#ffc658" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Activity Analysis Section */}
        {activityData && analysisMode === 'activity' && !loading && (
          <div>
            {/* Overview Stats */}
            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <h2 className="text-xl font-bold mb-4">Activity: {activityData.activity}</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                <div className="border rounded-lg p-3">
                  <p className="text-sm text-gray-500">Total Occurrences</p>
                  <p className="text-2xl font-bold">{activityData.totalOccurrences}</p>
                </div>
                <div className="border rounded-lg p-3">
                  <p className="text-sm text-gray-500">Percentage of Entries</p>
                  <p className="text-2xl font-bold">{activityData.percentage}%</p>
                </div>
                <div className="border rounded-lg p-3">
                  <p className="text-sm text-gray-500">First Occurrence</p>
                  <p className="text-lg font-medium">{activityData.firstOccurrence}</p>
                </div>
                <div className="border rounded-lg p-3">
                  <p className="text-sm text-gray-500">Latest Occurrence</p>
                  <p className="text-lg font-medium">{activityData.lastOccurrence}</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Occurrences by Month */}
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Monthly Distribution</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={activityData.byMonth}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" orientation="left" />
                      <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="count" name="Count" fill="#8884d8" />
                      <Line yAxisId="right" type="monotone" dataKey="percentage" name="% of Month" stroke="#ff7300" strokeWidth={2} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Occurrences by Weekday */}
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Weekday Distribution</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={activityData.byWeekday}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis yAxisId="left" orientation="left" />
                      <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="count" name="Count" fill="#8884d8" />
                      <Line yAxisId="right" type="monotone" dataKey="percentage" name="% of Day" stroke="#ff7300" strokeWidth={2} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Associated Moods */}
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Associated Moods</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={activityData.topMoods} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={120} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" name="Count" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Time of Day Distribution */}
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Time of Day Distribution</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={activityData.byTimeOfDay}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="count"
                        nameKey="name"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {activityData.byTimeOfDay.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Occurrences by Year */}
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Yearly Trend</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={activityData.byYear}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis yAxisId="left" orientation="left" />
                      <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="count" name="Count" fill="#8884d8" />
                      <Line yAxisId="right" type="monotone" dataKey="percentage" name="% of Year" stroke="#ff7300" strokeWidth={2} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Co-occurring Activities */}
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Co-occurring Activities</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={activityData.topCoActivities} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={120} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" name="Count" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {fileUploaded && !selectedMood && !selectedActivity && analysisMode === 'mood' && !loading && (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <h2 className="text-xl font-medium mb-4">Select a mood to view detailed analysis</h2>
            <p className="text-gray-600">
              Choose a mood from the dropdown menu above to explore patterns and correlations.
            </p>
          </div>
        )}
        
        {fileUploaded && !selectedActivity && !selectedMood && analysisMode === 'activity' && !loading && (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <h2 className="text-xl font-medium mb-4">Select an activity to view detailed analysis</h2>
            <p className="text-gray-600">
              Choose an activity from the dropdown menu above to explore patterns and correlations.
            </p>
          </div>
        )}
        
        {!fileUploaded && !loading && (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <h2 className="text-xl font-medium mb-4">Upload your Daylio export to begin</h2>
            <p className="text-gray-600">
              Upload a CSV file exported from Daylio to explore patterns and correlations in your mood and activity data.
            </p>
          </div>
        )}
      </div>
    );
  };