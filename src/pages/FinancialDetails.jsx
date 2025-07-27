import React, { useState, useEffect, useCallback } from 'react';
import { Filter, Calendar, Download } from 'lucide-react';
import axios from 'axios';

// Apps Script configuration
const APPS_SCRIPT_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbw1sqAnssupWr7lPYq4nQYO5-TsWFNuqxXwRBlp6KCz5j18Xkfh3Ix8ntO7pX_hHnJS/exec';
const SPREADSHEET_ID = '1ScT_8cwc9ji_unDZBpr2b8JlwTXs99xEo8cxEAm9Mvs';
const SHEET_NAME = 'key Fact ABC';

// Full list of months in fiscal year order
const ALL_MONTHS = [
  'April', 'May', 'June', 'July', 'August', 'September',
  'October', 'November', 'December', 'January', 'February', 'March'
];

// Helper function to parse currency values
const parseCurrency = (value) => {
  if (typeof value === 'number') return value;
  if (typeof value !== 'string') return 0;
  
  // Handle both ₹ and $ symbols
  const cleaned = value
    .replace(/[₹$,]/g, '')
    .replace(/\s+/g, '')
    .trim();
  
  return parseFloat(cleaned) || 0;
};

// Currency formatting function
const formatCurrency = (value) => {
  if (!value) return '₹0';
  
  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(1)}Cr`;
  }
  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(1)}L`;
  }
  return `₹${Math.round(value).toLocaleString()}`;
};

// Export helper functions
const formatDataForExport = (title, tableData) => {
  return {
    title,
    headers: tableData.headers,
    rows: tableData.rows
  };
};

const exportToExcel = (exportData, filename, sheetName) => {
  // Implementation would use ExcelJS or SheetJS in a real app
  console.log('Exporting:', { exportData, filename, sheetName });
  // In a real implementation, this would generate an Excel file
};

// FinancialTable component (included directly in the file)
const FinancialTable = ({ title, data, showMonths = true, onExport }) => {
  const [expandedRows, setExpandedRows] = useState(new Set());

  if (!data || !data.headers || !data.rows) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <div className="p-4 text-red-500">
          Error: Invalid table data structure
        </div>
      </div>
    );
  }

  const metricIndex = data.headers.findIndex(header => 
    header.toLowerCase().includes('metric') || 
    header.toLowerCase().includes('category')
  );
  
  const monthColumns = data.headers.filter(header => {
    const lowerHeader = header.toLowerCase();
    return !['metric', 'category', 'total'].includes(lowerHeader);
  });

  const calculateRowTotal = (row) => {
    return monthColumns.reduce((sum, month) => {
      const value = parseFloat(row[month]) || 0;
      return sum + value;
    }, 0);
  };

  const toggleRowExpansion = (category) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedRows(newExpanded);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className="flex items-center space-x-3">
          {showMonths && monthColumns.length > 0 && (
            <button
              onClick={() => monthColumns.forEach(col => toggleRowExpansion(col))}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              {expandedRows.size === monthColumns.length ? 'Collapse All' : 'Expand All'}
            </button>
          )}
          <button
            onClick={onExport}
            className="flex items-center space-x-2 bg-green-600 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
          >
            <Download className="h-3 w-3" />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 z-10 min-w-[250px]">
                {data.headers[metricIndex] || 'Category'}
              </th>
              {showMonths ? (
                monthColumns.map((month) => (
                  <th 
                    key={month} 
                    className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {month}
                  </th>
                ))
              ) : (
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.rows.map((row, rowIndex) => {
              const category = row[data.headers[metricIndex]] || `Row ${rowIndex + 1}`;
              const isExpanded = expandedRows.has(category);
              const rowTotal = calculateRowTotal(row);
              
              return (
                <React.Fragment key={rowIndex}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 sticky left-0 bg-white z-10 border-r border-gray-200">
                      {category}
                    </td>
                    {showMonths ? (
                      monthColumns.map((month) => (
                        <td 
                          key={month} 
                          className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-center"
                        >
                          {formatCurrency(row[month])}
                        </td>
                      ))
                    ) : (
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                        {formatCurrency(rowTotal)}
                      </td>
                    )}
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Main FinancialDetails component
const FinancialDetails = () => {
  const [selectedYear, setSelectedYear] = useState('2023-24');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMonthView, setSelectedMonthView] = useState('total');
  const [financialData, setFinancialData] = useState({});
  const [summaryData, setSummaryData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const extractFinancialData = useCallback((sheetData) => {
    const result = {};
    
    const forecastingIndex = sheetData.findIndex(row => 
      row[0] && String(row[0]).toLowerCase().includes('forecasting')
    );
    
    if (forecastingIndex === -1) return result;
    
    const dataStartRow = forecastingIndex + 2;
    const headers = sheetData[dataStartRow] || [];
    
    for (let i = dataStartRow + 1; i < sheetData.length; i++) {
      const row = sheetData[i];
      if (!row || !row[0]) continue;
      
      const category = String(row[0]).trim();
      const values = {};
      
      ALL_MONTHS.forEach((month, idx) => {
        const colIndex = 3 + idx;
        if (headers[colIndex]) {
          values[month.toLowerCase()] = parseCurrency(row[colIndex] || 0);
        }
      });
      
      result[category] = values;
    }
    
    return result;
  }, []);

  const transformToTableData = useCallback((rawData, category) => {
    const headers = ['Category', ...ALL_MONTHS];
    const rows = [];
    
    const budgetRow = { Category: `Expected ${category}` };
    const actualRow = { Category: category };
    
    ALL_MONTHS.forEach(month => {
      budgetRow[month] = rawData[category]?.[month.toLowerCase()] || 0;
      actualRow[month] = rawData[category]?.[month.toLowerCase()] || 0;
    });
    
    rows.push(budgetRow, actualRow);
    
    return { headers, rows };
  }, []);

  const calculateSummaryValues = useCallback((rawData) => {
    let revenueTotal = 0;
    let cogsTotal = 0;
    
    ALL_MONTHS.forEach(month => {
      const monthKey = month.toLowerCase();
      revenueTotal += rawData['Revenue']?.[monthKey] || 0;
      cogsTotal += rawData['COGS ( cons)']?.[monthKey] || 0;
    });
    
    const gpTotal = revenueTotal - cogsTotal;
    const gpPercentage = revenueTotal ? (gpTotal / revenueTotal) * 100 : 0;
    
    return {
      revenue: revenueTotal,
      cogs: cogsTotal,
      gp: gpTotal,
      gpPercentage: gpPercentage.toFixed(1)
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const url = `${APPS_SCRIPT_WEB_APP_URL}?action=getData&spreadsheetId=${encodeURIComponent(SPREADSHEET_ID)}&sheetName=${encodeURIComponent(SHEET_NAME)}`;
        
        const response = await axios.get(url);
        if (response.status !== 200 || response.data.error) {
          throw new Error(response.data.error || 'Failed to fetch data');
        }

        const sheetData = response.data.data || [];
        const extractedData = extractFinancialData(sheetData);
        const summaryValues = calculateSummaryValues(extractedData);
        
        const transformed = {
          budgetSalesData: transformToTableData(extractedData, 'Revenue'),
          productionCostsData: transformToTableData(extractedData, 'Factory electricity'),
          salariesBenefitsData: transformToTableData(extractedData, 'SALARY & BENEFITS'),
          adminExpensesData: transformToTableData(extractedData, 'Total Administration Charges'),
          vehicleFactoryCostsData: transformToTableData(extractedData, 'Total factory Cost'),
          interestCostsData: transformToTableData(extractedData, 'Total Interest charges'),
          otherCostsData: transformToTableData(extractedData, 'Total Packeging cost Cost')
        };

        setFinancialData(transformed);
        setSummaryData(summaryValues);
      } catch (err) {
        console.error('Data fetch error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [extractFinancialData, transformToTableData, calculateSummaryValues]);

 const handleExport = () => {
    const exportData = formatDataForExport(title, {
      headers: tableData.headers,
      rows: tableData.rows.map(row => {
        const formattedRow = {};
        tableData.headers.forEach(header => {
          formattedRow[header] = row[header];
        });
        return formattedRow;
      })
    });
    exportToExcel(exportData, title.replace(/[^a-zA-Z0-9]/g, '_'), title.substring(0, 31));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-700">
        Loading financial data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600 text-lg">
        Error: {error}
        <p className="text-sm text-gray-500 mt-2">
          Verify Apps Script URL and spreadsheet permissions
        </p>
      </div>
    );
  }

  const {
    budgetSalesData,
    productionCostsData,
    salariesBenefitsData,
    adminExpensesData,
    vehicleFactoryCostsData,
    interestCostsData,
    otherCostsData
  } = financialData;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Financial Details</h1>
            <p className="mt-2 text-sm text-gray-600">
              Expected vs Actual financial performance with detailed projections
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex flex-wrap gap-3">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="2023-24">2023-24</option>
                <option value="2022-23">2022-23</option>
                <option value="2024-25">2024-25 (Projected)</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                value={selectedMonthView}
                onChange={(e) => setSelectedMonthView(e.target.value)}
                className="text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="total">Total View</option>
                <option value="months">Monthly View</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                <option value="sales">Sales & Revenue</option>
                <option value="production">Production Costs</option>
                <option value="salaries">Salaries & Benefits</option>
                <option value="admin">Admin Expenses</option>
                <option value="vehicle">Vehicle & Factory</option>
                <option value="interest">Interest Costs</option>
                <option value="other">Other Costs</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-8 border border-blue-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">A) Key Details Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="text-sm font-medium text-gray-600 mb-2">2022–23 Performance</h3>
            <p className="text-2xl font-bold text-gray-900">₹115Cr</p>
            <p className="text-xs text-gray-500">Revenue</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="text-sm font-medium text-gray-600 mb-2">2023–24 Target</h3>
            <p className="text-2xl font-bold text-gray-900">₹120Cr</p>
            <p className="text-xs text-gray-500">+4.3% Growth</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Projecting @ 90%</h3>
            <p className="text-2xl font-bold text-gray-900">₹108Cr</p>
            <p className="text-xs text-gray-500">Conservative Estimate</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Actual Performance</h3>
            <p className="text-2xl font-bold text-green-600">
              {formatCurrency(summaryData.revenue)}
            </p>
            <p className="text-xs text-green-600">
              {summaryData.revenue ? ((summaryData.revenue / 1200000000) * 100).toFixed(1) : 0}% of Target
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">B) Manufacturing Cost Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-600">Revenue</p>
            <p className="text-xl font-bold text-blue-600">
              {formatCurrency(summaryData.revenue)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">COGS</p>
            <p className="text-xl font-bold text-red-600">
              {formatCurrency(summaryData.cogs)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Gross Profit</p>
            <p className="text-xl font-bold text-green-600">
              {formatCurrency(summaryData.gp)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">GP %</p>
            <p className="text-xl font-bold text-green-600">
              {summaryData.gpPercentage || 0}%
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {(selectedCategory === 'all' || selectedCategory === 'sales') && budgetSalesData && (
          <FinancialTable
            title="1. Expected Budget Sales"
            data={budgetSalesData}
            showMonths={selectedMonthView === 'months'}
            onExport={() => handleExport(budgetSalesData, "Budget Sales")}
          />
        )}

        {(selectedCategory === 'all' || selectedCategory === 'production') && productionCostsData && (
          <FinancialTable
            title="2A. Expected Production Costs"
            data={productionCostsData}
            showMonths={selectedMonthView === 'months'}
            onExport={() => handleExport(productionCostsData, "Production Costs")}
          />
        )}

        {(selectedCategory === 'all' || selectedCategory === 'salaries') && salariesBenefitsData && (
          <FinancialTable
            title="2B. Expected Salaries & Benefits"
            data={salariesBenefitsData}
            showMonths={selectedMonthView === 'months'}
            onExport={() => handleExport(salariesBenefitsData, "Salaries Benefits")}
          />
        )}

        {(selectedCategory === 'all' || selectedCategory === 'admin') && adminExpensesData && (
          <FinancialTable
            title="2C. Expected Admin & Office Expenses"
            data={adminExpensesData}
            showMonths={selectedMonthView === 'months'}
            onExport={() => handleExport(adminExpensesData, "Admin Expenses")}
          />
        )}

        {(selectedCategory === 'all' || selectedCategory === 'vehicle') && vehicleFactoryCostsData && (
          <FinancialTable
            title="2D. Expected Vehicle & Factory Costs"
            data={vehicleFactoryCostsData}
            showMonths={selectedMonthView === 'months'}
            onExport={() => handleExport(vehicleFactoryCostsData, "Vehicle Factory Costs")}
          />
        )}

        {(selectedCategory === 'all' || selectedCategory === 'interest') && interestCostsData && (
          <FinancialTable
            title="2E. Expected Interest Costs"
            data={interestCostsData}
            showMonths={selectedMonthView === 'months'}
            onExport={() => handleExport(interestCostsData, "Interest Costs")}
          />
        )}

        {(selectedCategory === 'all' || selectedCategory === 'other') && otherCostsData && (
          <FinancialTable
            title="2F. Expected Other Costs"
            data={otherCostsData}
            showMonths={selectedMonthView === 'months'}
            onExport={() => handleExport(otherCostsData, "Other Costs")}
          />
        )}

        {selectedCategory === 'all' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">3. Expected Profit Summary</h3>
              <button
                onClick={() => handleExport({
                  headers: ['Metric', 'Expected Total', 'Actual Total', 'Variance'],
                  rows: [
                    {
                      'Metric': 'Total Cost (All costs A–F)',
                      'Expected Total': '₹9,50,00,000',
                      'Actual Total': '₹9,28,32,500',
                      'Variance': '-₹21,67,500 (-2.3%)'
                    },
                    {
                      'Metric': 'Total NP1 (Net Profit) – as per ratio',
                      'Expected Total': '₹2,50,00,000',
                      'Actual Total': '₹2,56,67,500',
                      'Variance': '+₹6,67,500 (+2.7%)'
                    },
                    {
                      'Metric': 'Total NP % – as per ratio',
                      'Expected Total': '20.8%',
                      'Actual Total': '21.7%',
                      'Variance': '+0.9%'
                    }
                  ]
                }, "Profit Summary")}
                className="flex items-center space-x-2 bg-green-600 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
              >
                <Download className="h-3 w-3" />
                <span>Export</span>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Metric
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Expected Total
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actual Total
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Variance
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Total Cost (All costs A–F)
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                      ₹9,50,00,000
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                      ₹9,28,32,500
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-green-600 text-center font-medium">
                      -₹21,67,500 (-2.3%)
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Total NP1 (Net Profit) – as per ratio
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                      ₹2,50,00,000
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                      ₹2,56,67,500
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-green-600 text-center font-medium">
                      +₹6,67,500 (+2.7%)
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Total NP % – as per ratio
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                      20.8%
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                      21.7%
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-green-600 text-center font-medium">
                      +0.9%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 bg-yellow-50 rounded-lg p-6 border border-yellow-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Projection Notes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <h4 className="font-medium mb-2">Key Assumptions:</h4>
            <ul className="space-y-1 list-disc list-inside">
              <li>Factory electricity: ₹227k per month (as per last year)</li>
              <li>Sales salary: ₹300k monthly</li>
              <li>Employee salary: ₹500k monthly</li>
              <li>Depreciation: ₹6M per annum</li>
              <li>FOC & Debit Notes: 0.5% consideration</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Cost Categories:</h4>
            <ul className="space-y-1 list-disc list-inside">
              <li>Most costs tracked "as per last year"</li>
              <li>Interest costs: reducing trend</li>
              <li>Fixed costs: telephones, stationery, rental</li>
              <li>Incentives: 16% PL @1%</li>
              <li>Working capital changes monitored</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialDetails;