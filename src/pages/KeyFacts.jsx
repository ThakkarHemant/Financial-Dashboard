import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Target, AlertTriangle, CheckCircle, Info, Calendar, Filter } from 'lucide-react';
import LineChart from '../components/charts/LineChart';
import BarChart from '../components/charts/BarChart';

// Apps Script configuration
const APPS_SCRIPT_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbw1sqAnssupWr7lPYq4nQYO5-TsWFNuqxXwRBlp6KCz5j18Xkfh3Ix8ntO7pX_hHnJS/exec';
const SPREADSHEET_ID = '1ScT_8cwc9ji_unDZBpr2b8JlwTXs99xEo8cxEAm9Mvs';
const SHEET_NAME = 'key Fact ABC';

// Icon mapping for dynamic icons
const iconMap = {
  TrendingUp,
  TrendingDown,
  Target,
  AlertTriangle,
  CheckCircle,
  Info
};

// Utility to convert Google Sheets data to FinancialTable format
const convertSheetToTableData = (headers, rows) => {
  if (!headers || !rows || rows.length === 0) return [];

  // Find the index of the "DETAILS" column
  const detailsIndex = headers.findIndex(header => header.trim() === "DETAILS");
  
  // Get all month headers (April to March)
  const monthHeaders = headers.slice(3, 15);
  
  return rows.slice(1).map(row => {
    const category = row[detailsIndex] || '';
    const values = row.slice(3, 15).map(val => {
      // Handle numeric values with commas and currency symbols
      if (typeof val === 'string') {
        const cleanedVal = val.replace(/[^\d.-]/g, '');
        return parseFloat(cleanedVal) || 0;
      }
      return val || 0;
    });
    
    // Calculate total if available, otherwise sum the months
    const total = row[15] || values.reduce((sum, val) => sum + val, 0);
    
    return {
      category,
      total,
      months: monthHeaders.reduce((acc, month, index) => {
        acc[month] = values[index];
        return acc;
      }, {})
    };
  });
};

// Utility to find row by partial category match
const findRowByCategory = (tableData, searchTerm) => {
  return tableData.find(row => 
    row.category && row.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

const KeyFacts = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('current-year');
  const [selectedSection, setSelectedSection] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for all data
  const [keyMetrics, setKeyMetrics] = useState([]);
  const [performanceIndicators, setPerformanceIndicators] = useState([]);
  const [yearlyComparisonData, setYearlyComparisonData] = useState({ labels: [], datasets: [] });
  const [efficiencyTrendData, setEfficiencyTrendData] = useState({ labels: [], datasets: [] });
  const [tableData, setTableData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [monthHeaders, setMonthHeaders] = useState([]);

  // Fetch data from Google Sheets
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Construct the request URL
        const url = new URL(APPS_SCRIPT_WEB_APP_URL);
        url.searchParams.append('spreadsheetId', SPREADSHEET_ID);
        url.searchParams.append('sheetName', SHEET_NAME);
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Fetched raw data:', data);
        
        // Process the sheet data
        const sheetHeaders = data.headers || [];
        const sheetRows = data.data || [];
        
        // Extract month headers (April to March)
        const months = sheetHeaders.slice(3, 15);
        
        // Convert to table format
        const processedTableData = convertSheetToTableData(sheetHeaders, sheetRows);
        
        // Set states
        setHeaders(sheetHeaders);
        setMonthHeaders(months);
        setTableData(processedTableData);
        
        // Generate metrics from the data
        const metrics = [];
        const indicators = [];
        
        // Find key rows
        const revenueRow = findRowByCategory(processedTableData, 'revenue');
        const cogsRow = findRowByCategory(processedTableData, 'cogs');
        const profitRow = findRowByCategory(processedTableData, 'total np1');
        
        // Calculate key metrics
        if (revenueRow && cogsRow && profitRow) {
          const grossProfit = revenueRow.total - cogsRow.total;
          const revenueGrowth = revenueRow.total > 0 ? 
            ((revenueRow.total - cogsRow.total) / revenueRow.total * 100).toFixed(1) : 0;
          
          metrics.push({
            title: "Revenue Growth Rate",
            value: revenueGrowth,
            unit: "%",
            icon: "TrendingUp",
            color: "green"
          });
          
          metrics.push({
            title: "Gross Profit Margin",
            value: (grossProfit / revenueRow.total * 100).toFixed(1),
            unit: "%",
            icon: "Target",
            color: "purple"
          });
          
          metrics.push({
            title: "Net Profit Margin",
            value: (profitRow.total / revenueRow.total * 100).toFixed(1),
            unit: "%",
            icon: "CheckCircle",
            color: "green"
          });
        }
        
        // Set performance indicators based on data
        if (revenueRow) {
          indicators.push({
            category: "Revenue Performance",
            status: "good",
            value: `₹${(revenueRow.total / 10000000).toFixed(1)} Cr`,
            details: `Actual: ₹${(revenueRow.total / 10000000).toFixed(1)}Cr`,
            icon: CheckCircle
          });
        }
        
        if (cogsRow) {
          indicators.push({
            category: "Cost Management",
            status: "excellent",
            value: `${((cogsRow.total / revenueRow.total) * 100).toFixed(1)}% of revenue`,
            details: `COGS: ₹${(cogsRow.total / 10000000).toFixed(1)}Cr`,
            icon: CheckCircle
          });
        }
        
        if (profitRow) {
          indicators.push({
            category: "Profit Margins",
            status: "good",
            value: `${(profitRow.total / revenueRow.total * 100).toFixed(1)}% margin`,
            details: `Net profit: ₹${(profitRow.total / 10000000).toFixed(1)}Cr`,
            icon: CheckCircle
          });
        }
        
        const workingCapitalRow = findRowByCategory(processedTableData, 'working capital');
        if (workingCapitalRow) {
          indicators.push({
            category: "Working Capital",
            status: "warning",
            value: "Monitor cash flow trends",
            details: `Working capital: ₹${(workingCapitalRow.total / 1000000).toFixed(1)}Cr`,
            icon: AlertTriangle
          });
        }
        
        setKeyMetrics(metrics.map(item => ({
          ...item,
          icon: iconMap[item.icon] || Info
        })));
        
        setPerformanceIndicators(indicators);
        
        // Prepare chart data
        const chartLabels = [];
        const revenueData = [];
        const profitData = [];
        
        // Extract yearly data from sheet if available
        const yearHeaders = sheetHeaders.filter(h => h.match(/\d{4}[- ]\d{2,4}/));
        if (yearHeaders.length > 0) {
          yearHeaders.forEach(yearHeader => {
            const yearIndex = sheetHeaders.indexOf(yearHeader);
            if (revenueRow) {
              revenueData.push(revenueRow.months[yearHeader] || 0);
            }
            if (profitRow) {
              profitData.push(profitRow.months[yearHeader] || 0);
            }
            chartLabels.push(yearHeader.replace(/\s+/g, ''));
          });
        }
        
        // Fallback to current year if no year data
        if (chartLabels.length === 0 && months.length > 0) {
          chartLabels.push(...months);
          if (revenueRow) {
            revenueData.push(...Object.values(revenueRow.months));
          }
          if (profitRow) {
            profitData.push(...Object.values(profitRow.months));
          }
        }
        
        // Set chart data
        setYearlyComparisonData({
          labels: chartLabels,
          datasets: [
            {
              label: 'Revenue (₹)',
              data: revenueData,
              backgroundColor: '#3B82F6',
            },
            {
              label: 'Net Profit (₹)',
              data: profitData,
              backgroundColor: '#10B981',
            }
          ]
        });
        
        setEfficiencyTrendData({
          labels: months,
          datasets: [
            {
              label: 'Monthly Revenue (₹)',
              data: revenueRow ? Object.values(revenueRow.months) : [],
              borderColor: '#3B82F6',
              fill: false
            },
            {
              label: 'Monthly Net Profit (₹)',
              data: profitRow ? Object.values(profitRow.months) : [],
              borderColor: '#10B981',
              fill: false
            }
          ]
        });
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'good':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'danger':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading financial data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <AlertTriangle className="h-12 w-12 text-red-500 mx-auto" />
        <p className="mt-4 text-red-500">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Reload Data
        </button>
      </div>
    );
  }

  // Filter table data based on selected section
  const filteredTableData = () => {
    if (selectedSection === 'all') return tableData;
    
    const sectionMap = {
      'details': ['DETAILS', '2 0 2 2 -2 3', '2 0 2 3-2 4'],
      'manufacturing': ['Manufacturing cost', 'Revenue', 'COGS'],
      'production': ['Factory electricity', 'labour payment', 'Loading & unloading'],
      'salaries': ['Director SALARY & BENEFITS', 'sales salary', 'employee salary'],
      'admin': ['telephones', 'Stationery', 'Renewal'],
      'vehicle': ['fuel', 'vehicle', 'vehicle Running cost'],
      'interest': ['interst from cc & Other charges', 'int from unc loan'],
      'other': ['Total Packeging cost Cost', 'Total sales Expenses'],
      'profit': ['Total Cost', 'Total Np1', 'Total Np %']
    };
    
    const sectionKeywords = sectionMap[selectedSection] || [];
    return tableData.filter(item => 
      sectionKeywords.some(keyword => 
        item.category && item.category.toLowerCase().includes(keyword.toLowerCase()))
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Key Facts</h1>
            <p className="mt-1 sm:mt-2 text-sm text-gray-600">
              Comprehensive financial analysis with detailed monthly breakdowns
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <Calendar className="h-4 w-4 text-gray-500 flex-shrink-0" />
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              >
                <option value="current-year">Current Year</option>
                <option value="last-year">Last Year</option>
                <option value="quarterly">Quarterly</option>
              </select>
            </div>
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <Filter className="h-4 w-4 text-gray-500 flex-shrink-0" />
              <select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              >
                <option value="all">All Sections</option>
                <option value="details">Details</option>
                <option value="manufacturing">Manufacturing Cost</option>
                <option value="production">Production Costs</option>
                <option value="salaries">Salaries & Benefits</option>
                <option value="admin">Admin Expenses</option>
                <option value="vehicle">Vehicle & Factory</option>
                <option value="interest">Interest Costs</option>
                <option value="other">Other Costs</option>
                <option value="profit">Profit Summary</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {keyMetrics.map((metric, index) => {
          const IconComponent = metric.icon || Info;
          return (
            <div key={index} className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-600 mb-1 truncate">{metric.title || 'N/A'}</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                    {metric.value}{metric.unit}
                  </p>
                </div>
                <div className={`p-2 sm:p-3 rounded-lg flex-shrink-0 ${
                  metric.color === 'green' ? 'bg-green-100 text-green-600' :
                  metric.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                  metric.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  <IconComponent className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Performance Indicators */}
      {performanceIndicators.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Performance Indicators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {performanceIndicators.map((indicator, index) => {
              const StatusIcon = indicator.icon || Info;
              return (
                <div
                  key={index}
                  className={`p-3 sm:p-4 rounded-lg border-2 ${getStatusColor(indicator.status)}`}
                >
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <StatusIcon className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm sm:text-base truncate">{indicator.category}</h3>
                      <p className="text-xs sm:text-sm font-semibold mt-1 truncate">{indicator.value}</p>
                      <p className="text-xs mt-1 opacity-80 truncate">{indicator.details}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8">
        {/* Year-over-Year Comparison */}
        {yearlyComparisonData.labels.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="h-[300px] sm:h-[350px]">
              <BarChart
                data={yearlyComparisonData}
                title="Financial Performance Trend"
              />
            </div>
          </div>
        )}

        {/* Monthly Efficiency Trends */}
        {efficiencyTrendData.labels.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="h-[300px] sm:h-[350px]">
              <LineChart
                data={efficiencyTrendData}
                title="Monthly Efficiency Trends"
              />
            </div>
          </div>
        )}
      </div>

      {/* Financial Table */}
      {tableData.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Financial Details</h2>
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden shadow-sm border-b border-gray-200 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Category
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Total
                      </th>
                      {monthHeaders.map((month, index) => (
                        <th key={index} scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                          {month}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredTableData().map((row, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 max-w-[200px] truncate">
                          {row.category}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                          {row.total.toLocaleString('en-IN', {
                            maximumFractionDigits: 2,
                            style: 'currency',
                            currency: 'INR'
                          })}
                        </td>
                        {monthHeaders.map((month, idx) => (
                          <td key={idx} className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            {row.months[month]?.toLocaleString('en-IN', {
                              maximumFractionDigits: 2,
                              style: 'currency',
                              currency: 'INR'
                            }) || '-'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KeyFacts;