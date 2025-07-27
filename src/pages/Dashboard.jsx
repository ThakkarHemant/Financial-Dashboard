
import React, { useState, useEffect, useMemo } from 'react';
import { Calendar, Filter, Download, TrendingUp, DollarSign, PieChart, BarChart3 } from '../components/icons';
import {Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,BarElement,ArcElement,  Title,Tooltip,Legend,} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);



const Dashboard = () => {
  const [dateRange, setDateRange] = useState('current-year');
  const [reportType, setReportType] = useState('all');
  const [financialData, setFinancialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const sheetId = '1cJzomUi6FliTbnQAYLRCAeH7d9lZcWdPFLJFMW4Q-cA';
        const gid = '2005760313';
        
        const url = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }
        
        const csvData = await response.text();
        
        // Parse CSV data with robust parser
        const rows = parseCSV(csvData);
        
        // Process data
        const processedData = processSheetData(rows);
        setFinancialData(processedData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Robust CSV parser
  const parseCSV = (text) => {
    const rows = [];
    const lines = text.split('\n');
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const row = [];
      let current = '';
      let inQuotes = false;
      
      for (let j = 0; j < line.length; j++) {
        const char = line[j];
        
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          row.push(current);
          current = '';
        } else {
          current += char;
        }
      }
      
      row.push(current);
      rows.push(row);
    }
    
    return rows;
  };

  const processSheetData = (sheetData) => {
  const monthsRowIndex = 1; 

  const months = sheetData[monthsRowIndex] ?
    sheetData[monthsRowIndex]
    .slice(4) 
    .filter((_, i) => i % 3 === 0)
    .map(m => m.replace(/"/g, '').trim().split(' ')[0])
    : [];
  console.log("Extracted months:", months);

   const result = {
    months,
    budgetSales: [],
    actualSales: [],
    grossProfit: [],
    netProfit: [],
    expenses: {
      production: [],
      freight: [],
      storesRepairs: [],
      salaries: [],
      admin: [],
      vehicle: [],
      interest: []
    }
  };

const parseNumericValue = (val) => {
  const cleaned = val ? val.replace(/"/g, '')
                             .replace('$', '')
                             .replace('₹', '') 
                             .replace(/,/g, '')
                             .trim() : '';
  const parsed = cleaned === '' ? 0 : parseFloat(cleaned);
  if (isNaN(parsed)) {
    console.warn(`Value "${val}" -> cleaned "${cleaned}" resulted in NaN. Setting to 0.`);
    return 0;
  }
  return parsed;
};
  const firstDataRowIndex = 3; 

  for (let rowIndex = firstDataRowIndex; rowIndex < sheetData.length; rowIndex++) {
    const row = sheetData[rowIndex];
    if (!row) continue; 

    const rowName = row[0] ? row[0].replace(/"/g, '').trim() : '';
    if (!rowName) {
        continue;
    }

    const values = row.slice(4).map(parseNumericValue); 

    if (rowName === 'BUDGET SALES') {
      result.budgetSales = values.filter((_, i) => i % 3 === 0);
      console.log("BUDGET SALES:", result.budgetSales);
    } else if (rowName === 'Revenue') {
      result.actualSales = values.filter((_, i) => i % 3 === 1);
      console.log("Revenue (Actual Sales):", result.actualSales);
    } else if (rowName === 'GP') {
      result.grossProfit = values.filter((_, i) => i % 3 === 1);
      console.log("GP:", result.grossProfit);
    } else if (rowName === 'NP') {
      result.netProfit = values.filter((_, i) => i % 3 === 1);
      console.log("NP:", result.netProfit);
    } else if (rowName === 'Total Production cost') {
      result.expenses.production = values.filter((_, i) => i % 3 === 1);
      console.log("Total Production cost:", result.expenses.production);
    } else if (rowName === 'Total Freight cost') {
      result.expenses.freight = values.filter((_, i) => i % 3 === 1);
      console.log("Total Freight cost:", result.expenses.freight);
    } else if (rowName === 'Total Stores and Repairs cost') {
      result.expenses.storesRepairs = values.filter((_, i) => i % 3 === 1);
      console.log("Total Stores and Repairs cost:", result.expenses.storesRepairs);
    } else if (rowName === 'Total Salaries') {
      result.expenses.salaries = values.filter((_, i) => i % 3 === 1);
      console.log("Total Salaries:", result.expenses.salaries);
    } else if (rowName === 'Total Admin cost') {
      result.expenses.admin = values.filter((_, i) => i % 3 === 1);
      console.log("Total Admin cost:", result.expenses.admin);
    } else if (rowName === 'Total Vehicle running cost') {
      result.expenses.vehicle = values.filter((_, i) => i % 3 === 1);
      console.log("Total Vehicle running cost:", result.expenses.vehicle);
    } else if (rowName === 'Total Interest cost') {
      result.expenses.interest = values.filter((_, i) => i % 3 === 1);
      console.log("Total Interest cost:", result.expenses.interest);
    }
  }

  console.log("Processed financialData result:", result);
  return result;
};


  const dashboardData = useMemo(() => {
    if (!financialData) return null;
    
    let startIdx, endIdx;
    switch (dateRange) {
      case 'current-year':
        startIdx = 0;
        endIdx = 11;
        break;
      case 'last-year':
        // Mock data for last year (would need actual data)
        startIdx = 0;
        endIdx = 11;
        break;
      case 'quarter':
        startIdx = 9; // Q4: Jan, Feb, Mar
        endIdx = 11;
        break;
      case 'month':
        startIdx = 11; // March
        endIdx = 11;
        break;
      default:
        startIdx = 0;
        endIdx = 11;
    }

    const selectedBudgetSales = financialData.budgetSales.slice(startIdx, endIdx + 1);
    const selectedActualSales = financialData.actualSales.slice(startIdx, endIdx + 1);
    const selectedGrossProfit = financialData.grossProfit.slice(startIdx, endIdx + 1);
    const selectedNetProfit = financialData.netProfit.slice(startIdx, endIdx + 1);

    const totalRevenue = selectedActualSales.reduce((sum, val) => sum + val, 0);
    const budgetRevenue = selectedBudgetSales.reduce((sum, val) => sum + val, 0);
    const grossProfit = selectedGrossProfit.reduce((sum, val) => sum + val, 0);
    const budgetGrossProfit = selectedGrossProfit.reduce((sum, val) => sum + val, 0);
    const netProfit = selectedNetProfit.reduce((sum, val) => sum + val, 0);
    const budgetNetProfit = selectedNetProfit.reduce((sum, val) => sum + val, 0);

    // Calculate total costs (Revenue - Gross Profit)
    const totalCosts = totalRevenue - grossProfit;
    const budgetCosts = budgetRevenue - budgetGrossProfit;

    // Calculate variances
    const revenueVariance = budgetRevenue ? ((totalRevenue - budgetRevenue) / budgetRevenue) * 100 : 0;
    const costsVariance = budgetCosts ? ((totalCosts - budgetCosts) / budgetCosts) * 100 : 0;
    const grossProfitVariance = budgetGrossProfit ? ((grossProfit - budgetGrossProfit) / budgetGrossProfit) * 100 : 0;
    const netProfitVariance = budgetNetProfit ? ((netProfit - budgetNetProfit) / budgetNetProfit) * 100 : 0;

    // Prepare chart data
    const monthlyRevenueData = {
      labels: financialData.months.slice(startIdx, endIdx + 1),
      datasets: [
        {
          label: 'Budget Sales',
          data: selectedBudgetSales,
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
        },
        {
          label: 'Actual Sales',
          data: selectedActualSales,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        }
      ]
    };

    const expenseBreakdownData = {
      labels: ['Production', 'Freight', 'Stores & Repairs', 'Salaries', 'Admin', 'Vehicle', 'Interest'],
      datasets: [
        {
          data: [
            financialData.expenses.production.slice(startIdx, endIdx + 1).reduce((sum, val) => sum + val, 0),
            financialData.expenses.freight.slice(startIdx, endIdx + 1).reduce((sum, val) => sum + val, 0),
            financialData.expenses.storesRepairs.slice(startIdx, endIdx + 1).reduce((sum, val) => sum + val, 0),
            financialData.expenses.salaries.slice(startIdx, endIdx + 1).reduce((sum, val) => sum + val, 0),
            financialData.expenses.admin.slice(startIdx, endIdx + 1).reduce((sum, val) => sum + val, 0),
            financialData.expenses.vehicle.slice(startIdx, endIdx + 1).reduce((sum, val) => sum + val, 0),
            financialData.expenses.interest.slice(startIdx, endIdx + 1).reduce((sum, val) => sum + val, 0)
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
            'rgba(255, 159, 64, 0.7)',
            'rgba(199, 199, 199, 0.7)'
          ]
        }
      ]
    };

    const monthlyProfitData = {
      labels: financialData.months.slice(startIdx, endIdx + 1),
      datasets: [
        {
          label: 'Net Profit',
          data: selectedNetProfit,
          borderColor: 'rgba(153, 102, 255, 1)',
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
        }
      ]
    };

    const quarterlyComparisonData = {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Budget Sales',
          data: [
            financialData.budgetSales.slice(0, 3).reduce((sum, val) => sum + val, 0),
            financialData.budgetSales.slice(3, 6).reduce((sum, val) => sum + val, 0),
            financialData.budgetSales.slice(6, 9).reduce((sum, val) => sum + val, 0),
            financialData.budgetSales.slice(9, 12).reduce((sum, val) => sum + val, 0)
          ],
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
        },
        {
          label: 'Actual Sales',
          data: [
            financialData.actualSales.slice(0, 3).reduce((sum, val) => sum + val, 0),
            financialData.actualSales.slice(3, 6).reduce((sum, val) => sum + val, 0),
            financialData.actualSales.slice(6, 9).reduce((sum, val) => sum + val, 0),
            financialData.actualSales.slice(9, 12).reduce((sum, val) => sum + val, 0)
          ],
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        }
      ]
    };

    return {
      totalRevenue,
      totalCosts,
      grossProfit,
      netProfit,
      budgetRevenue,
      budgetCosts,
      budgetGrossProfit,
      budgetNetProfit,
      monthlyRevenueData,
      expenseBreakdownData,
      monthlyProfitData,
      quarterlyComparisonData,
      revenueVariance,
      costsVariance,
      grossProfitVariance,
      netProfitVariance
    };
  }, [dateRange, financialData]);
const commonChartOptions = {
  responsive: true,
  maintainAspectRatio: false, 
  plugins: {
    legend: {
      position: 'top',
      labels: {
          font: {
              size: 14 
          }
      }
    },
    tooltip: { 
      callbacks: {
        label: function(context) {
          let label = context.dataset.label || '';
          if (label) {
            label += ': ';
          }
          if (context.parsed.y !== undefined) {
            label += formatCurrency(context.parsed.y);
          } else if (context.parsed !== undefined) { 
              label += formatCurrency(context.parsed);
          }
          return label;
        }
      }
    }
  },
  scales: { 
      x: {
          ticks: {
              font: {
                  size: 12 
              }
          },
          title: {
              display: true,
              text: 'Month' 
          }
      },
      y: {
          beginAtZero: true,
          ticks: {
              callback: function(value) {
                  return formatCurrency(value); 
              },
              font: {
                  size: 12
              }
          },
          title: {
              display: true,
              text: 'Amount (INR)' 
          }
      }
  }
};

const monthlyRevenueOptions = {
    ...commonChartOptions,
    plugins: {
        ...commonChartOptions.plugins,
        title: {
            display: true,
            text: `${dateRange === 'month' ? 'Weekly' : dateRange === 'quarter' ? 'Monthly' : 'Monthly'} Revenue: Budget vs Actual`,
            font: {
                size: 18 // Adjust title font size
            }
        }
    },
    scales: {
        x: {
            ...commonChartOptions.scales.x,
            title: {
                display: true,
                text: 'Month'
            }
        },
        y: {
            ...commonChartOptions.scales.y,
            title: {
                display: true,
                text: 'Sales (INR)'
            }
        }
    }
};

const expenseBreakdownOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'right', 
            labels: {
                font: {
                    size: 14
                }
            }
        },
        title: {
            display: true,
            text: 'Expense Breakdown by Category',
            font: {
                size: 18
            }
        },
        tooltip: { 
            callbacks: {
                label: function(context) {
                    let label = context.label || '';
                    if (label) {
                        label += ': ';
                    }
                    const total = context.dataset.data.reduce((sum, val) => sum + val, 0);
                    const value = context.parsed;
                    const percentage = (value / total * 100).toFixed(1) + '%';
                    return label + formatCurrency(value) + ' (' + percentage + ')';
                }
            }
        }
    }
};

const monthlyProfitOptions = {
    ...commonChartOptions,
    plugins: {
        ...commonChartOptions.plugins,
        title: {
            display: true,
            text: `${dateRange === 'month' ? 'Weekly' : dateRange === 'quarter' ? 'Monthly' : 'Monthly'} Net Profit Trend`,
            font: {
                size: 18
            }
        }
    },
    scales: {
        x: {
            ...commonChartOptions.scales.x,
            title: {
                display: true,
                text: 'Month'
            }
        },
        y: {
            ...commonChartOptions.scales.y,
            title: {
                display: true,
                text: 'Profit (INR)'
            }
        }
    }
};

const quarterlyComparisonOptions = {
    ...commonChartOptions,
    plugins: {
        ...commonChartOptions.plugins,
        title: {
            display: true,
            text: `${dateRange === 'month' ? 'Weekly' : dateRange === 'quarter' ? 'Monthly' : 'Quarterly'} Performance Comparison`,
            font: {
                size: 18
            }
        }
    },
    scales: {
        x: {
            ...commonChartOptions.scales.x,
            title: {
                display: true,
                text: 'Quarter'
            }
        },
        y: {
            ...commonChartOptions.scales.y,
            title: {
                display: true,
                text: 'Sales (INR)'
            }
        }
    }
};



  // Loading and error states
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-lg text-gray-700">Loading financial data...</p>
        <p className="text-sm text-gray-500">Fetching from Google Sheets</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center text-red-500 max-w-md">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="text-2xl font-bold mb-2">Error Loading Data</h2>
        <p className="mb-4">{error.message || 'Unable to fetch data'}</p>
        <p className="text-sm text-gray-600">
          Please check your internet connection and try refreshing the page.
          If the problem persists, make sure your Google Sheet is published to the web.
        </p>
      </div>
    </div>
  );
  
  if (!dashboardData) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-pulse bg-blue-200 rounded-full h-16 w-16 mx-auto"></div>
        <p className="mt-4 text-lg text-gray-700">Processing financial data...</p>
        <p className="text-sm text-gray-500">This may take a moment</p>
      </div>
    </div>
  );

  const {
    totalRevenue,
    totalCosts,
    grossProfit,
    netProfit,
    budgetRevenue,
    budgetCosts,
    budgetGrossProfit,
    budgetNetProfit,
    monthlyRevenueData,
    expenseBreakdownData,
    monthlyProfitData,
    quarterlyComparisonData,
    revenueVariance,
    costsVariance,
    grossProfitVariance,
    netProfitVariance
  } = dashboardData;

  // Export functions (placeholder implementations)
  const handleExportSummary = () => console.log('Exporting summary...');
  const handleExportRevenue = () => console.log('Exporting revenue data...');
  const handleExportExpenses = () => console.log('Exporting expense data...');
  const handleExportProfit = () => console.log('Exporting profit data...');

  const getDateRangeLabel = () => {
    switch (dateRange) {
      case 'current-year': return 'Current Financial Year (2023-24)';
      case 'last-year': return 'Last Financial Year (2022-23)';
      case 'quarter': return 'Current Quarter (Q4 2023-24)';
      case 'month': return 'Current Month (March 2024)';
      default: return 'Current Financial Year';
    }
  };

  const getReportTypeLabel = () => {
    switch (reportType) {
      case 'all': return 'All Reports';
      case 'revenue': return 'Revenue Only';
      case 'expenses': return 'Expenses Only';
      case 'profit': return 'Profit Analysis';
      default: return 'All Reports';
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatPercentage = (value) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
  };



  const StatCard = ({ title, value, icon: Icon, trend, color }) => {
    const colorClasses = {
      blue: 'bg-blue-50 text-blue-700',
      red: 'bg-red-50 text-red-700',
      green: 'bg-green-50 text-green-700',
      purple: 'bg-purple-50 text-purple-700'
    };
    
    const iconClasses = {
      blue: 'bg-blue-100 text-blue-600',
      red: 'bg-red-100 text-red-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600'
    };
    
    return (
      <div className={`rounded-xl p-5 shadow-sm ${colorClasses[color]}`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium">{title}</h3>
            <p className="text-2xl font-bold mt-1">{value}</p>
          </div>
          <div className={`p-3 rounded-lg ${iconClasses[color]}`}>
            <Icon />
          </div>
        </div>
        {trend && (
          <div className={`mt-3 flex items-center text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            <span className="font-medium">{formatPercentage(trend.value)}</span>
            <span className="ml-1">{trend.isPositive ? 'above budget' : 'below budget'}</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">ABC LTD - Financial Dashboard</h1>
              <p className="mt-2 text-sm text-gray-600">
                Budget forecasting and financial performance - {getDateRangeLabel()}
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Showing: {getReportTypeLabel()}
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex flex-wrap items-center gap-3">
              <div className="flex items-center space-x-2">
                <Calendar />
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="current-year">Current Financial Year</option>
                  <option value="last-year">Last Financial Year</option>
                  <option value="quarter">Current Quarter</option>
                  <option value="month">Current Month</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <Filter />
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="all">All Reports</option>
                  <option value="revenue">Revenue Only</option>
                  <option value="expenses">Expenses Only</option>
                  <option value="profit">Profit Analysis</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={handleExportSummary}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  <Download />
                  <span>Export Summary</span>
                </button>
                <div className="relative group">
                  <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors">
                    <Download />
                    <span>Export Data</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                    <div className="py-1">
                      <button
                        onClick={handleExportRevenue}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Export Revenue Data
                      </button>
                      <button
                        onClick={handleExportExpenses}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Export Expense Data
                      </button>
                      <button
                        onClick={handleExportProfit}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Export Profit Data
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Revenue"
            value={formatCurrency(totalRevenue)}
            icon={DollarSign}
            trend={{
              value: revenueVariance,
              isPositive: revenueVariance >= 0
            }}
            color="blue"
          />
          <StatCard
            title="Total Costs"
            value={formatCurrency(totalCosts)}
            icon={TrendingUp}
            trend={{
              value: costsVariance,
              isPositive: costsVariance <= 0
            }}
            color="red"
          />
          <StatCard
            title="Gross Profit"
            value={formatCurrency(grossProfit)}
            icon={BarChart3}
            trend={{
              value: grossProfitVariance,
              isPositive: grossProfitVariance >= 0
            }}
            color="green"
          />
          <StatCard
            title="Net Profit"
            value={formatCurrency(netProfit)}
            icon={PieChart}
            trend={{
              value: netProfitVariance,
              isPositive: netProfitVariance >= 0
            }}
            color="purple"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Trend */}
          {(reportType === 'all' || reportType === 'revenue') && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                {/* Replaced LineChart with Line component */}
                <h3 className="text-lg font-semibold text-gray-800 mb-4">{monthlyRevenueOptions.plugins.title.text}</h3>
                <div className="relative" style={{ height: '350px' }}> {/* Set a fixed height for the chart container */}
                    <Line data={monthlyRevenueData} options={monthlyRevenueOptions} />
                </div>
            </div>
          )}

          {/* Expense Breakdown */}
          {(reportType === 'all' || reportType === 'expenses') && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                {/* Replaced DoughnutChart with Doughnut component */}
                <h3 className="text-lg font-semibold text-gray-800 mb-4">{expenseBreakdownOptions.plugins.title.text}</h3>
                <div className="relative" style={{ height: '350px' }}> {/* Set a fixed height for the chart container */}
                    <Doughnut data={expenseBreakdownData} options={expenseBreakdownOptions} />
                </div>
            </div>
          )}

          {/* Profit Trend */}
          {(reportType === 'all' || reportType === 'profit') && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                {/* Replaced LineChart with Line component */}
                <h3 className="text-lg font-semibold text-gray-800 mb-4">{monthlyProfitOptions.plugins.title.text}</h3>
                <div className="relative" style={{ height: '350px' }}> {/* Set a fixed height for the chart container */}
                    <Line data={monthlyProfitData} options={monthlyProfitOptions} />
                </div>
            </div>
          )}

          {/* Performance Comparison */}
          {reportType === 'all' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                {/* Replaced BarChart with Bar component */}
                <h3 className="text-lg font-semibold text-gray-800 mb-4">{quarterlyComparisonOptions.plugins.title.text}</h3>
                <div className="relative" style={{ height: '350px' }}> {/* Set a fixed height for the chart container */}
                    <Bar data={quarterlyComparisonData} options={quarterlyComparisonOptions} />
                </div>
            </div>
          )}
        </div>

        {/* Quick Summary Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Financial Performance Summary</h3>
            <button
              onClick={handleExportSummary}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Export Table
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Metric
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Budget
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actual
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Variance
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Variance %
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Total Revenue
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                    {formatCurrency(budgetRevenue)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                    {formatCurrency(totalRevenue)}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm text-right font-medium ${
                    revenueVariance >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {formatCurrency(totalRevenue - budgetRevenue)}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm text-right font-medium ${
                    revenueVariance >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {formatPercentage(revenueVariance)}
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Total Costs
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                    {formatCurrency(budgetCosts)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                    {formatCurrency(totalCosts)}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm text-right font-medium ${
                    costsVariance <= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {formatCurrency(totalCosts - budgetCosts)}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm text-right font-medium ${
                    costsVariance <= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {formatPercentage(costsVariance)}
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Gross Profit
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                    {formatCurrency(budgetGrossProfit)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                    {formatCurrency(grossProfit)}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm text-right font-medium ${
                    grossProfitVariance >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {formatCurrency(grossProfit - budgetGrossProfit)}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm text-right font-medium ${
                    grossProfitVariance >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {formatPercentage(grossProfitVariance)}
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Net Profit
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                    {formatCurrency(budgetNetProfit)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                    {formatCurrency(netProfit)}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm text-right font-medium ${
                    netProfitVariance >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {formatCurrency(netProfit - budgetNetProfit)}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm text-right font-medium ${
                    netProfitVariance >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {formatPercentage(netProfitVariance)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;