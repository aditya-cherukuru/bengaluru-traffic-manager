import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { AlertCircle, CheckCircle, Home, Activity, Map, Settings, Cpu, HardDrive, BarChart2, Clock,} from 'lucide-react'; // Add this line to import TrafficMap component
import { Alert, AlertTitle, Button, Card, CardHeader, CardContent, Typography, Grid, Box, Switch, FormControlLabel } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';


// Function to generate OS metrics data
const generateOSMetrics = () => {
  return {
    cpuUsage: Math.floor(Math.random() * 100),
    memoryUsage: Math.floor(Math.random() * 100),
    diskUsage: Math.floor(Math.random() * 100),
    processCount: Math.floor(Math.random() * 100),
  };
};

// Function to generate intersection data
const generateIntersectionData = () => {
  return [
    { id: "BTM Layout", vehicleCount: Math.floor(Math.random() * 100), emergencyCount: Math.floor(Math.random() * 10), isOperational: true },
    { id: "Hebbal", vehicleCount: Math.floor(Math.random() * 100), emergencyCount: Math.floor(Math.random() * 10), isOperational: true },
    { id: "Richmond Circle", vehicleCount: Math.floor(Math.random() * 100), emergencyCount: Math.floor(Math.random() * 10), isOperational: true },
  ];
};

// ... (previous data generators remain the same)

// New data generator for traffic flow
const generateTrafficFlowData = () => {
  return [
    { name: 'North', value: Math.floor(Math.random() * 100) },
    { name: 'East', value: Math.floor(Math.random() * 100) },
    { name: 'West', value: Math.floor(Math.random() * 50) },
    { name: 'South', value: Math.floor(Math.random() * 50) },
  ];
};

// New data generator for chart data
// Updated function to generate data for intersections
const generateChartData = () => {
  const intersections = [
    'MG Road', 'Brigade Road', 'Church Street', 'Bangalore Palace', 'Cubbon Park',
    'Jayanagar 4th Block', 'Indiranagar', 'Koramangala', 'Vidhana Soudha', 'Shivajinagar',
    'Malleswaram', 'Bangalore Airport', 'Sankey Tank', 'Richmond Circle', 'K R Puram',
    'Basavanagudi', 'Ashoka Nagar', 'BTM Layout', 'Ulsoor Lake', 'Nandi Hills',
    'Bannerghatta Road', 'Nagarbhavi', 'Kengeri', 'Rajajinagar', 'Wilson Garden',
    'Seshadripuram', 'Madiwala', 'Lalbagh', 'HSR Layout', 'Electronic City',
    'Yelahanka', 'Hebbal', 'Magadi Road', 'J P Nagar', 'Frazer Town',
    'Cunningham Road', 'Palace Road', 'Langford Town', 'Chandra Layout', 'Gandhinagar',
    'Malleshwaram 8th Cross', 'Jaya Nagar', 'Sankey Tank', 'Domlur', 'Bangalore West',
    'Raja Rajeshwari Nagar', 'Kamakshipalya', 'Anjanapura', 'Vijayanagar', 'Vaswani',
    'MG Road', 'Brigade Road', 'Church Street', 'Bangalore Palace', 'Cubbon Park',
    'Jayanagar 4th Block', 'Indiranagar', 'Koramangala', 'Vidhana Soudha', 'Shivajinagar',
    'Malleswaram', 'Bangalore Airport', 'Sankey Tank', 'Richmond Circle', 'K R Puram',
    'Basavanagudi', 'Ashoka Nagar', 'BTM Layout', 'Ulsoor Lake', 'Nandi Hills',
    'Bannerghatta Road', 'Nagarbhavi', 'Kengeri', 'Rajajinagar', 'Wilson Garden',
    'Seshadripuram', 'Madiwala', 'Lalbagh', 'HSR Layout', 'Electronic City',
    'Yelahanka', 'Hebbal', 'Magadi Road', 'J P Nagar', 'Frazer Town',
    'Cunningham Road', 'Palace Road', 'Langford Town', 'Chandra Layout', 'Gandhinagar',
    'Malleshwaram 8th Cross', 'Jaya Nagar', 'Sankey Tank', 'Domlur', 'Bangalore West',
    'Raja Rajeshwari Nagar', 'Kamakshipalya', 'Anjanapura', 'Vijayanagar', 'Vaswani',
    'MG Road', 'Brigade Road', 'Church Street', 'Bangalore Palace', 'Cubbon Park',
    'Jayanagar 4th Block', 'Indiranagar', 'Koramangala', 'Vidhana Soudha', 'Shivajinagar',
    'Malleswaram', 'Bangalore Airport', 'Sankey Tank', 'Richmond Circle', 'K R Puram',
    'Basavanagudi', 'Ashoka Nagar', 'BTM Layout', 'Ulsoor Lake', 'Nandi Hills',
    'Bannerghatta Road', 'Nagarbhavi', 'Kengeri', 'Rajajinagar', 'Wilson Garden',
    'Seshadripuram', 'Madiwala', 'Lalbagh', 'HSR Layout', 'Electronic City',
    'Yelahanka', 'Hebbal', 'Magadi Road', 'J P Nagar', 'Frazer Town',
    'Cunningham Road', 'Palace Road', 'Langford Town', 'Chandra Layout', 'Gandhinagar',
    'Malleshwaram 8th Cross', 'Jaya Nagar', 'Sankey Tank', 'Domlur', 'Bangalore West',
    'Raja Rajeshwari Nagar', 'Kamakshipalya', 'Anjanapura', 'Vijayanagar', 'Vaswani',
    'MG Road', 'Brigade Road', 'Church Street', 'Bangalore Palace', 'Cubbon Park',
    'Jayanagar 4th Block', 'Indiranagar', 'Koramangala', 'Vidhana Soudha', 'Shivajinagar',
    'Malleswaram', 'Bangalore Airport', 'Sankey Tank', 'Richmond Circle', 'K R Puram',
    'Basavanagudi', 'Ashoka Nagar', 'BTM Layout', 'Ulsoor Lake', 'Nandi Hills',
    'Bannerghatta Road', 'Nagarbhavi', 'Kengeri', 'Rajajinagar', 'Wilson Garden',
    'Seshadripuram', 'Madiwala', 'Lalbagh', 'HSR Layout', 'Electronic City',
    'Yelahanka', 'Hebbal', 'Magadi Road', 'J P Nagar', 'Frazer Town',
    'Cunningham Road', 'Palace Road', 'Langford Town', 'Chandra Layout', 'Gandhinagar',
    'Malleshwaram 8th Cross', 'Jaya Nagar', 'Sankey Tank', 'Domlur', 'Bangalore West',
    'Raja Rajeshwari Nagar', 'Kamakshipalya', 'Anjanapura', 'Vijayanagar', 'Vaswani',
  ];

  return intersections.map((intersection) => ({
    intersection,
    Vehicles: Math.floor(Math.random() * 50),
    EmergencyVehicles: Math.floor(Math.random() * 10),
  }));
};





// Removed unused VehicleProcessingChart component
// New data generator for signal timing
const generateSignalTimingData = () => {
  return [
    { phase: 'North', duration_Seconds: Math.floor(Math.random() * 60) + 30 },
    { phase: 'East', duration_Seconds: Math.floor(Math.random() * 60) + 30 },
    { phase: 'South', duration_Seconds: Math.floor(Math.random() * 30) + 15 },
    { phase: 'West', duration_Seconds: Math.floor(Math.random() * 10) + 5 },
  ];
};

// Theme configuration
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1E88E5' },
    secondary: { main: '#FF4081' },
    background: { default: '#F5F5F5', paper: '#FFFFFF' },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#90CAF9' },
    secondary: { main: '#F48FB1' },
    background: { default: '#303030', paper: '#424242' },
  },
});

// Navigation component (updated with theme-aware styling)
const Navigation = ({ darkMode }) => (
  <nav className={`p-4 ${darkMode ? 'bg-gray-800' : 'bg-blue-600'}`}>
    <ul className="flex justify-around">
      <li><Link to="/" className="text-white hover:text-blue-200"><Home className="inline mr-2" />Home</Link></li>
      <li><Link to="/analytics" className="text-white hover:text-blue-200"><Activity className="inline mr-2" />Analytics</Link></li>
      <li><Link to="/map" className="text-white hover:text-blue-200"><Map className="inline mr-2" />Map</Link></li>
      <li><Link to="/settings" className="text-white hover:text-blue-200"><Settings className="inline mr-2" />Settings</Link></li>
    </ul>
  </nav>
);

// Updated Home component
const HomeComponent = ({ intersections, selectedIntersection, handleIntersectionClick, simulateFault, repairIntersection, alert, osMetrics, trafficFlowData }) => (
  <Box className="p-4">
    <Typography variant="h4" className="mb-4">Bengaluru Traffic Management Dashboard</Typography>
    {alert && (
      <Alert severity={alert.type === 'error' ? 'error' : 'success'} className="mb-4">
        <AlertTitle>{alert.type === 'error' ? 'Error' : 'Success'}</AlertTitle>
        {alert.message}
      </Alert>
    )}
    <Grid container spacing={4}>
      <Grid item xs={12} md={8}>
      <Card className="mb-4" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', borderRadius: '12px' }}>
          <CardHeader title="Intersection Status" />
          <CardContent>
            <Grid container spacing={2}>
              {intersections.map(intersection => (
                <Grid item xs={12} sm={6} md={4} key={intersection.id}>
                  <Card
                    className={`cursor-pointer ${selectedIntersection?.id === intersection.id ? 'border-blue-500' : ''} ${intersection.isOperational ? 'bg-green-100' : 'bg-red-100'}`}
                    onClick={() => handleIntersectionClick(intersection)}
                  >
                    <CardContent>
                      <Typography variant="h6">Intersection - {intersection.id}</Typography>
                      <Typography>Vehicles: {intersection.vehicleCount}</Typography>
                      <Typography>Emergency: {intersection.emergencyCount}</Typography>
                      {intersection.isOperational ? (
                        <CheckCircle className="text-green-500" />
                      ) : (
                        <AlertCircle className="text-red-500" />
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
        <Box className="mb-4">
          <Button variant="contained" color="primary" onClick={simulateFault} disabled={!selectedIntersection || !selectedIntersection.isOperational} className="mr-2">
            Simulate Fault
          </Button>
          <Button variant="contained" color="secondary" onClick={repairIntersection} disabled={!selectedIntersection || selectedIntersection.isOperational}>
            Repair Intersection
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
      <Card className="mb-4" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', borderRadius: '12px' }}>
          <CardHeader title="System Resources" />
          <CardContent>
            <Typography variant="subtitle1" className="flex items-center mb-2">
              <Cpu className="mr-2" /> CPU Usage: {osMetrics.cpuUsage}%
            </Typography>
            <Typography variant="subtitle1" className="flex items-center mb-2">
              <BarChart2 className="mr-2" /> Memory Usage: {osMetrics.memoryUsage}%
            </Typography>
            <Typography variant="subtitle1" className="flex items-center mb-2">
              <HardDrive className="mr-2" /> Disk Usage: {osMetrics.diskUsage}%
            </Typography>
            <Typography variant="subtitle1" className="flex items-center">
              <Clock className="mr-2" /> Active Processes: {osMetrics.processCount}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
      <Card className="mb-4" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', borderRadius: '12px' }}>
          <CardHeader title="Real-time Traffic Flow based on Parts (in %)" />
          <CardContent className="mb-4" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', borderRadius: '12px' }}>
            <Box className="h-64 w-full">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={trafficFlowData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {trafficFlowData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A'][index % 4]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Box>
);

// Updated Analytics component
// Analytics component with both LineChart and BarChart
const Analytics = ({ chartData, signalTimingData }) => {
  const [visibleData, setVisibleData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4; // Show 4 items at a time

  useEffect(() => {
    // Initialize visible data
    setVisibleData(chartData.slice(currentIndex, currentIndex + itemsPerPage));

    // Update visible data every 2 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const newIndex = prevIndex + 1;
        // Reset index if it exceeds the length of the chart data
        return newIndex >= chartData.length ? 0 : newIndex;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [currentIndex, chartData]);

  useEffect(() => {
    // Update visible data based on the current index
    setVisibleData(chartData.slice(currentIndex, currentIndex + itemsPerPage));
  }, [currentIndex, chartData]);

  return (
    <Box className="p-4">
      <Typography variant="h4" className="mb-4">Trafiic-Flow</Typography>
      <Grid container spacing={4}>
        {/* LineChart for Vehicle Processing by Intersection */}
        <Grid item xs={12}>
          <Card className="mb-4">
            <CardHeader title="Track of Vehicles for Every 2-Seconds at Main Busy Intersections" />
            
            <CardContent>
              <Box className="h-64 w-full">
                <ResponsiveContainer>
                  <LineChart data={visibleData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="intersection" interval={0} angle={0} textAnchor="end" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Vehicles" stroke="#8884d8" />
                    <Line type="monotone" dataKey="EmergencyVehicles" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* BarChart for Signal Timing Distribution */}
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Signal Timing Distribution at Intersecions (Based on High-Vehicle Traffic)" />
            <CardContent>
              <Box className="h-64 w-full">
                <ResponsiveContainer>
                  <BarChart data={signalTimingData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="phase" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="duration_Seconds" fill="#FF6B6B" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
// Updated SettingsComponent
const SettingsComponent = ({ darkMode, toggleDarkMode }) => (
  <Box className="p-4">
    <Typography variant="h4" className="mb-4">System Settings</Typography>
    <Card className="mb-4" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', borderRadius: '12px' }}>
      <CardContent>
        <FormControlLabel
          control={<Switch checked={darkMode} onChange={toggleDarkMode} />}
          label={darkMode ? "Dark Mode" : "Light Mode"}
        />
      </CardContent>
    </Card>
    
  </Box>
);

// Main App component
const TrafficManagementDashboard = () => {
  const [intersections, setIntersections] = useState(generateIntersectionData());
  const [chartData, setChartData] = useState(generateChartData());
  const [selectedIntersection, setSelectedIntersection] = useState(null);
  const [alert, setAlert] = useState(null);
  const [osMetrics, setOSMetrics] = useState(generateOSMetrics());
  const [trafficFlowData, setTrafficFlowData] = useState(generateTrafficFlowData());
  const [signalTimingData, setSignalTimingData] = useState(generateSignalTimingData());
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setChartData(prevData => [
        ...prevData.slice(1),
        {
          time: prevData[prevData.length - 1].time + 1,
          vehiclesProcessed: Math.floor(Math.random() * 50),
          emergencyVehicles: Math.floor(Math.random() * 10),
        },
      ]);
      setOSMetrics(generateOSMetrics());
      setTrafficFlowData(generateTrafficFlowData());
      setSignalTimingData(generateSignalTimingData());
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const handleIntersectionClick = (intersection) => {
    setSelectedIntersection(intersection);
  };

  const simulateFault = () => {
    if (selectedIntersection) {
      setIntersections(prevIntersections =>
        prevIntersections.map(i =>
          i.id === selectedIntersection.id ? { ...i, isOperational: false } : i
        )
      );
      setAlert({ type: 'error', message: `Fault simulated at Intersection ${selectedIntersection.id}` });
    }
  };

  const repairIntersection = () => {
    if (selectedIntersection) {
      setIntersections(prevIntersections =>
        prevIntersections.map(i =>
          i.id === selectedIntersection.id ? { ...i, isOperational: true } : i
        )
      );
      setAlert({ type: 'success', message: `Intersection ${selectedIntersection.id} repaired` });
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
          <Navigation darkMode={darkMode} />
          <Box className="container mx-auto">
            <Routes>
              <Route path="/" element={
                <HomeComponent
                
                  intersections={intersections}
                  selectedIntersection={selectedIntersection}
                  handleIntersectionClick={handleIntersectionClick}
                  simulateFault={simulateFault}
                  repairIntersection={repairIntersection}
                  alert={alert}
                  osMetrics={osMetrics}
                  trafficFlowData={trafficFlowData}
                />
              } />
              <Route path="/analytics" element={<Analytics chartData={chartData} signalTimingData={signalTimingData} />} />
              
              <Route path="/settings" element={<SettingsComponent darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default TrafficManagementDashboard;