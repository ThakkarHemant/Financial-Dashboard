// Dashboard data that changes based on filters
export interface DashboardData {
  totalRevenue: number;
  totalCosts: number;
  grossProfit: number;
  netProfit: number;
  budgetRevenue: number;
  budgetCosts: number;
  budgetGrossProfit: number;
  budgetNetProfit: number;
  monthlyRevenueData: any;
  expenseBreakdownData: any;
  monthlyProfitData: any;
  quarterlyComparisonData: any;
}

// Current Year Data (2023-24)
export const currentYearData: DashboardData = {
  totalRevenue: 118500000,
  totalCosts: 92832500,
  grossProfit: 47400000,
  netProfit: 25667500,
  budgetRevenue: 120000000,
  budgetCosts: 95000000,
  budgetGrossProfit: 48000000,
  budgetNetProfit: 25000000,
  monthlyRevenueData: {
    labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
    datasets: [
      {
        label: 'Budget',
        data: [10000000, 10000000, 10000000, 10000000, 10000000, 10000000, 10000000, 10000000, 10000000, 10000000, 10000000, 10000000],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Actual',
        data: [9800000, 9900000, 9750000, 10200000, 9850000, 10100000, 9900000, 9800000, 10000000, 9950000, 9900000, 10350000],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
      }
    ]
  },
  expenseBreakdownData: {
    labels: ['Production Costs', 'Salaries & Benefits', 'Admin Expenses', 'Vehicle & Factory', 'Interest Costs', 'Other Costs'],
    datasets: [
      {
        data: [30624000, 25320000, 8940000, 4590000, 7540000, 15812500],
        backgroundColor: [
          '#3B82F6',
          '#10B981',
          '#F59E0B',
          '#EF4444',
          '#8B5CF6',
          '#06B6D4'
        ],
        borderWidth: 2,
        borderColor: '#ffffff',
      }
    ]
  },
  monthlyProfitData: {
    labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
    datasets: [
      {
        label: 'Net Profit',
        data: [2100000, 2200000, 2000000, 2350000, 2150000, 2300000, 2200000, 2100000, 2250000, 2200000, 2150000, 2417500],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
      }
    ]
  },
  quarterlyComparisonData: {
    labels: ['Q1 (Apr-Jun)', 'Q2 (Jul-Sep)', 'Q3 (Oct-Dec)', 'Q4 (Jan-Mar)'],
    datasets: [
      {
        label: 'Budget',
        data: [30000000, 30000000, 30000000, 30000000],
        backgroundColor: '#3B82F6',
      },
      {
        label: 'Actual',
        data: [29450000, 30150000, 29700000, 30200000],
        backgroundColor: '#10B981',
      }
    ]
  }
};

// Last Year Data (2022-23)
export const lastYearData: DashboardData = {
  totalRevenue: 115000000,
  totalCosts: 90000000,
  grossProfit: 46000000,
  netProfit: 25000000,
  budgetRevenue: 115000000,
  budgetCosts: 90000000,
  budgetGrossProfit: 46000000,
  budgetNetProfit: 25000000,
  monthlyRevenueData: {
    labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
    datasets: [
      {
        label: 'Budget',
        data: [9583333, 9583333, 9583333, 9583333, 9583333, 9583333, 9583333, 9583333, 9583333, 9583333, 9583333, 9583333],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Actual',
        data: [9500000, 9600000, 9400000, 9700000, 9500000, 9600000, 9500000, 9400000, 9600000, 9500000, 9400000, 9800000],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
      }
    ]
  },
  expenseBreakdownData: {
    labels: ['Production Costs', 'Salaries & Benefits', 'Admin Expenses', 'Vehicle & Factory', 'Interest Costs', 'Other Costs'],
    datasets: [
      {
        data: [28000000, 24000000, 8500000, 4200000, 8000000, 17300000],
        backgroundColor: [
          '#3B82F6',
          '#10B981',
          '#F59E0B',
          '#EF4444',
          '#8B5CF6',
          '#06B6D4'
        ],
        borderWidth: 2,
        borderColor: '#ffffff',
      }
    ]
  },
  monthlyProfitData: {
    labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
    datasets: [
      {
        label: 'Net Profit',
        data: [2000000, 2100000, 1950000, 2200000, 2050000, 2150000, 2100000, 2000000, 2150000, 2100000, 2050000, 2250000],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
      }
    ]
  },
  quarterlyComparisonData: {
    labels: ['Q1 (Apr-Jun)', 'Q2 (Jul-Sep)', 'Q3 (Oct-Dec)', 'Q4 (Jan-Mar)'],
    datasets: [
      {
        label: 'Budget',
        data: [28750000, 28750000, 28750000, 28750000],
        backgroundColor: '#3B82F6',
      },
      {
        label: 'Actual',
        data: [28500000, 29400000, 28600000, 28500000],
        backgroundColor: '#10B981',
      }
    ]
  }
};

// Quarter Data (Current Quarter)
export const quarterData: DashboardData = {
  totalRevenue: 30200000, // Q4 data
  totalCosts: 23500000,
  grossProfit: 12100000,
  netProfit: 6700000,
  budgetRevenue: 30000000,
  budgetCosts: 23750000,
  budgetGrossProfit: 12000000,
  budgetNetProfit: 6250000,
  monthlyRevenueData: {
    labels: ['Jan', 'Feb', 'Mar'],
    datasets: [
      {
        label: 'Budget',
        data: [10000000, 10000000, 10000000],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Actual',
        data: [9950000, 9900000, 10350000],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
      }
    ]
  },
  expenseBreakdownData: {
    labels: ['Production Costs', 'Salaries & Benefits', 'Admin Expenses', 'Vehicle & Factory', 'Interest Costs', 'Other Costs'],
    datasets: [
      {
        data: [7656000, 6330000, 2235000, 1147500, 1885000, 3946500],
        backgroundColor: [
          '#3B82F6',
          '#10B981',
          '#F59E0B',
          '#EF4444',
          '#8B5CF6',
          '#06B6D4'
        ],
        borderWidth: 2,
        borderColor: '#ffffff',
      }
    ]
  },
  monthlyProfitData: {
    labels: ['Jan', 'Feb', 'Mar'],
    datasets: [
      {
        label: 'Net Profit',
        data: [2200000, 2150000, 2417500],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
      }
    ]
  },
  quarterlyComparisonData: {
    labels: ['Jan', 'Feb', 'Mar'],
    datasets: [
      {
        label: 'Budget',
        data: [10000000, 10000000, 10000000],
        backgroundColor: '#3B82F6',
      },
      {
        label: 'Actual',
        data: [9950000, 9900000, 10350000],
        backgroundColor: '#10B981',
      }
    ]
  }
};

// Month Data (Current Month - March)
export const monthData: DashboardData = {
  totalRevenue: 10350000, // March data
  totalCosts: 7932500,
  grossProfit: 4140000,
  netProfit: 2417500,
  budgetRevenue: 10000000,
  budgetCosts: 7916667,
  budgetGrossProfit: 4000000,
  budgetNetProfit: 2083333,
  monthlyRevenueData: {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Budget',
        data: [2500000, 2500000, 2500000, 2500000],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Actual',
        data: [2600000, 2550000, 2650000, 2550000],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
      }
    ]
  },
  expenseBreakdownData: {
    labels: ['Production Costs', 'Salaries & Benefits', 'Admin Expenses', 'Vehicle & Factory', 'Interest Costs', 'Other Costs'],
    datasets: [
      {
        data: [2552000, 2110000, 745000, 382500, 628333, 1315167],
        backgroundColor: [
          '#3B82F6',
          '#10B981',
          '#F59E0B',
          '#EF4444',
          '#8B5CF6',
          '#06B6D4'
        ],
        borderWidth: 2,
        borderColor: '#ffffff',
      }
    ]
  },
  monthlyProfitData: {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Net Profit',
        data: [600000, 580000, 620000, 617500],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
      }
    ]
  },
  quarterlyComparisonData: {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Budget',
        data: [2500000, 2500000, 2500000, 2500000],
        backgroundColor: '#3B82F6',
      },
      {
        label: 'Actual',
        data: [2600000, 2550000, 2650000, 2550000],
        backgroundColor: '#10B981',
      }
    ]
  }
};

export const getDashboardData = (dateRange: string): DashboardData => {
  switch (dateRange) {
    case 'last-year':
      return lastYearData;
    case 'quarter':
      return quarterData;
    case 'month':
      return monthData;
    case 'current-year':
    default:
      return currentYearData;
  }
};

export const getFilteredData = (data: DashboardData, reportType: string): DashboardData => {
  // For now, return the same data regardless of report type
  // In a real application, you would filter the data based on the report type
  return data;
};