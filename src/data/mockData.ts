export interface FinancialData {
  category: string;
  subcategory?: string;
  total: number;
  months: {
    april: number;
    may: number;
    june: number;
    july: number;
    august: number;
    september: number;
    october: number;
    november: number;
    december: number;
    january: number;
    february: number;
    march: number;
  };
}

export interface BudgetActualData {
  budget: FinancialData[];
  actual: FinancialData[];
}

export const budgetSalesData: BudgetActualData = {
  budget: [
    {
      category: "Budgeted Sales Revenue",
      total: 120000000,
      months: {
        april: 10000000, may: 10000000, june: 10000000, july: 10000000,
        august: 10000000, september: 10000000, october: 10000000, november: 10000000,
        december: 10000000, january: 10000000, february: 10000000, march: 10000000
      }
    },
    {
      category: "Budgeted Cost of Goods Sold (COGS)",
      total: 72000000,
      months: {
        april: 6000000, may: 6000000, june: 6000000, july: 6000000,
        august: 6000000, september: 6000000, october: 6000000, november: 6000000,
        december: 6000000, january: 6000000, february: 6000000, march: 6000000
      }
    },
    {
      category: "Budgeted Gross Profit (GP)",
      total: 48000000,
      months: {
        april: 4000000, may: 4000000, june: 4000000, july: 4000000,
        august: 4000000, september: 4000000, october: 4000000, november: 4000000,
        december: 4000000, january: 4000000, february: 4000000, march: 4000000
      }
    }
  ],
  actual: [
    {
      category: "Budgeted Sales Revenue",
      total: 118500000,
      months: {
        april: 9800000, may: 9900000, june: 9750000, july: 10200000,
        august: 9850000, september: 10100000, october: 9900000, november: 9800000,
        december: 10000000, january: 9950000, february: 9900000, march: 10350000
      }
    },
    {
      category: "Budgeted Cost of Goods Sold (COGS)",
      total: 71100000,
      months: {
        april: 5880000, may: 5940000, june: 5850000, july: 6120000,
        august: 5910000, september: 6060000, october: 5940000, november: 5880000,
        december: 6000000, january: 5970000, february: 5940000, march: 6210000
      }
    },
    {
      category: "Budgeted Gross Profit (GP)",
      total: 47400000,
      months: {
        april: 3920000, may: 3960000, june: 3900000, july: 4080000,
        august: 3940000, september: 4040000, october: 3960000, november: 3920000,
        december: 4000000, january: 3980000, february: 3960000, march: 4140000
      }
    }
  ]
};

export const productionCostsData: BudgetActualData = {
  budget: [
    {
      category: "Factory electricity",
      total: 2724000,
      months: {
        april: 227000, may: 227000, june: 227000, july: 227000,
        august: 227000, september: 227000, october: 227000, november: 227000,
        december: 227000, january: 227000, february: 227000, march: 227000
      }
    },
    {
      category: "Labour payment",
      total: 18000000,
      months: {
        april: 1500000, may: 1500000, june: 1500000, july: 1500000,
        august: 1500000, september: 1500000, october: 1500000, november: 1500000,
        december: 1500000, january: 1500000, february: 1500000, march: 1500000
      }
    },
    {
      category: "Loading & unloading",
      total: 3600000,
      months: {
        april: 300000, may: 300000, june: 300000, july: 300000,
        august: 300000, september: 300000, october: 300000, november: 300000,
        december: 300000, january: 300000, february: 300000, march: 300000
      }
    },
    {
      category: "Inward supply",
      total: 2400000,
      months: {
        april: 200000, may: 200000, june: 200000, july: 200000,
        august: 200000, september: 200000, october: 200000, november: 200000,
        december: 200000, january: 200000, february: 200000, march: 200000
      }
    },
    {
      category: "Outward freight",
      total: 1800000,
      months: {
        april: 150000, may: 150000, june: 150000, july: 150000,
        august: 150000, september: 150000, october: 150000, november: 150000,
        december: 150000, january: 150000, february: 150000, march: 150000
      }
    },
    {
      category: "Repairs",
      total: 1200000,
      months: {
        april: 100000, may: 100000, june: 100000, july: 100000,
        august: 100000, september: 100000, october: 100000, november: 100000,
        december: 100000, january: 100000, february: 100000, march: 100000
      }
    },
    {
      category: "Stores",
      total: 900000,
      months: {
        april: 75000, may: 75000, june: 75000, july: 75000,
        august: 75000, september: 75000, october: 75000, november: 75000,
        december: 75000, january: 75000, february: 75000, march: 75000
      }
    }
  ],
  actual: [
    {
      category: "Factory electricity",
      total: 2800000,
      months: {
        april: 235000, may: 230000, june: 240000, july: 245000,
        august: 250000, september: 235000, october: 225000, november: 220000,
        december: 240000, january: 235000, february: 230000, march: 255000
      }
    },
    {
      category: "Labour payment",
      total: 18500000,
      months: {
        april: 1520000, may: 1550000, june: 1530000, july: 1580000,
        august: 1540000, september: 1520000, october: 1510000, november: 1500000,
        december: 1560000, january: 1540000, february: 1530000, march: 1620000
      }
    },
    {
      category: "Loading & unloading",
      total: 3720000,
      months: {
        april: 310000, may: 315000, june: 305000, july: 320000,
        august: 310000, september: 305000, october: 300000, november: 295000,
        december: 315000, january: 310000, february: 305000, march: 330000
      }
    },
    {
      category: "Inward supply",
      total: 2450000,
      months: {
        april: 205000, may: 210000, june: 200000, july: 215000,
        august: 205000, september: 200000, october: 195000, november: 190000,
        december: 210000, january: 205000, february: 200000, march: 220000
      }
    },
    {
      category: "Outward freight",
      total: 1850000,
      months: {
        april: 155000, may: 160000, june: 150000, july: 165000,
        august: 155000, september: 150000, october: 145000, november: 140000,
        december: 160000, january: 155000, february: 150000, march: 170000
      }
    },
    {
      category: "Repairs",
      total: 1250000,
      months: {
        april: 105000, may: 110000, june: 100000, july: 115000,
        august: 105000, september: 100000, october: 95000, november: 90000,
        december: 110000, january: 105000, february: 100000, march: 120000
      }
    },
    {
      category: "Stores",
      total: 950000,
      months: {
        april: 80000, may: 85000, june: 75000, july: 90000,
        august: 80000, september: 75000, october: 70000, november: 65000,
        december: 85000, january: 80000, february: 75000, march: 95000
      }
    }
  ]
};

export const salariesBenefitsData: BudgetActualData = {
  budget: [
    {
      category: "Director Salary & Benefits",
      total: 12000000,
      months: {
        april: 1000000, may: 1000000, june: 1000000, july: 1000000,
        august: 1000000, september: 1000000, october: 1000000, november: 1000000,
        december: 1000000, january: 1000000, february: 1000000, march: 1000000
      }
    },
    {
      category: "Sales Salary",
      total: 3600000,
      months: {
        april: 300000, may: 300000, june: 300000, july: 300000,
        august: 300000, september: 300000, october: 300000, november: 300000,
        december: 300000, january: 300000, february: 300000, march: 300000
      }
    },
    {
      category: "Employee Salary",
      total: 6000000,
      months: {
        april: 500000, may: 500000, june: 500000, july: 500000,
        august: 500000, september: 500000, october: 500000, november: 500000,
        december: 500000, january: 500000, february: 500000, march: 500000
      }
    },
    {
      category: "Incentives",
      total: 1920000,
      months: {
        april: 160000, may: 160000, june: 160000, july: 160000,
        august: 160000, september: 160000, october: 160000, november: 160000,
        december: 160000, january: 160000, february: 160000, march: 160000
      }
    },
    {
      category: "EFO & ESIC",
      total: 1800000,
      months: {
        april: 150000, may: 150000, june: 150000, july: 150000,
        august: 150000, september: 150000, october: 150000, november: 150000,
        december: 150000, january: 150000, february: 150000, march: 150000
      }
    }
  ],
  actual: [
    {
      category: "Director Salary & Benefits",
      total: 12000000,
      months: {
        april: 1000000, may: 1000000, june: 1000000, july: 1000000,
        august: 1000000, september: 1000000, october: 1000000, november: 1000000,
        december: 1000000, january: 1000000, february: 1000000, march: 1000000
      }
    },
    {
      category: "Sales Salary",
      total: 3650000,
      months: {
        april: 305000, may: 310000, june: 300000, july: 315000,
        august: 305000, september: 300000, october: 295000, november: 290000,
        december: 310000, january: 305000, february: 300000, march: 320000
      }
    },
    {
      category: "Employee Salary",
      total: 6200000,
      months: {
        april: 520000, may: 530000, june: 510000, july: 540000,
        august: 520000, september: 510000, october: 500000, november: 495000,
        december: 530000, january: 520000, february: 510000, march: 555000
      }
    },
    {
      category: "Incentives",
      total: 1980000,
      months: {
        april: 165000, may: 170000, june: 160000, july: 175000,
        august: 165000, september: 160000, october: 155000, november: 150000,
        december: 170000, january: 165000, february: 160000, march: 185000
      }
    },
    {
      category: "EFO & ESIC",
      total: 1850000,
      months: {
        april: 155000, may: 160000, june: 150000, july: 165000,
        august: 155000, september: 150000, october: 145000, november: 140000,
        december: 160000, january: 155000, february: 150000, march: 170000
      }
    }
  ]
};

export const adminExpensesData: BudgetActualData = {
  budget: [
    {
      category: "Telephones",
      total: 240000,
      months: {
        april: 20000, may: 20000, june: 20000, july: 20000,
        august: 20000, september: 20000, october: 20000, november: 20000,
        december: 20000, january: 20000, february: 20000, march: 20000
      }
    },
    {
      category: "Stationery",
      total: 180000,
      months: {
        april: 15000, may: 15000, june: 15000, july: 15000,
        august: 15000, september: 15000, october: 15000, november: 15000,
        december: 15000, january: 15000, february: 15000, march: 15000
      }
    },
    {
      category: "Renewals, Subscriptions & Tech services",
      total: 600000,
      months: {
        april: 50000, may: 50000, june: 50000, july: 50000,
        august: 50000, september: 50000, october: 50000, november: 50000,
        december: 50000, january: 50000, february: 50000, march: 50000
      }
    },
    {
      category: "Rental",
      total: 2400000,
      months: {
        april: 200000, may: 200000, june: 200000, july: 200000,
        august: 200000, september: 200000, october: 200000, november: 200000,
        december: 200000, january: 200000, february: 200000, march: 200000
      }
    },
    {
      category: "Branding & Promotion",
      total: 1200000,
      months: {
        april: 100000, may: 100000, june: 100000, july: 100000,
        august: 100000, september: 100000, october: 100000, november: 100000,
        december: 100000, january: 100000, february: 100000, march: 100000
      }
    },
    {
      category: "Office expenses",
      total: 600000,
      months: {
        april: 50000, may: 50000, june: 50000, july: 50000,
        august: 50000, september: 50000, october: 50000, november: 50000,
        december: 50000, january: 50000, february: 50000, march: 50000
      }
    },
    {
      category: "Marketing Expenses",
      total: 2400000,
      months: {
        april: 200000, may: 200000, june: 200000, july: 200000,
        august: 200000, september: 200000, october: 200000, november: 200000,
        december: 200000, january: 200000, february: 200000, march: 200000
      }
    },
    {
      category: "Electricity (office & guest house)",
      total: 360000,
      months: {
        april: 30000, may: 30000, june: 30000, july: 30000,
        august: 30000, september: 30000, october: 30000, november: 30000,
        december: 30000, january: 30000, february: 30000, march: 30000
      }
    },
    {
      category: "Professional fees & accounting charges",
      total: 720000,
      months: {
        april: 60000, may: 60000, june: 60000, july: 60000,
        august: 60000, september: 60000, october: 60000, november: 60000,
        december: 60000, january: 60000, february: 60000, march: 60000
      }
    },
    {
      category: "Donations",
      total: 240000,
      months: {
        april: 20000, may: 20000, june: 20000, july: 20000,
        august: 20000, september: 20000, october: 20000, november: 20000,
        december: 20000, january: 20000, february: 20000, march: 20000
      }
    }
  ],
  actual: [
    {
      category: "Telephones",
      total: 245000,
      months: {
        april: 21000, may: 20500, june: 19500, july: 21500,
        august: 20000, september: 20500, october: 19000, november: 20000,
        december: 21000, january: 20500, february: 20000, march: 21500
      }
    },
    {
      category: "Stationery",
      total: 185000,
      months: {
        april: 16000, may: 15500, june: 14500, july: 16500,
        august: 15000, september: 15500, october: 14000, november: 15000,
        december: 16000, january: 15500, february: 15000, march: 16500
      }
    },
    {
      category: "Renewals, Subscriptions & Tech services",
      total: 620000,
      months: {
        april: 52000, may: 51000, june: 49000, july: 53000,
        august: 50000, september: 51000, october: 48000, november: 50000,
        december: 52000, january: 51000, february: 50000, march: 53000
      }
    },
    {
      category: "Rental",
      total: 2400000,
      months: {
        april: 200000, may: 200000, june: 200000, july: 200000,
        august: 200000, september: 200000, october: 200000, november: 200000,
        december: 200000, january: 200000, february: 200000, march: 200000
      }
    },
    {
      category: "Branding & Promotion",
      total: 1250000,
      months: {
        april: 105000, may: 103000, june: 98000, july: 108000,
        august: 100000, september: 103000, october: 95000, november: 100000,
        december: 105000, january: 103000, february: 100000, march: 110000
      }
    },
    {
      category: "Office expenses",
      total: 620000,
      months: {
        april: 52000, may: 51000, june: 49000, july: 53000,
        august: 50000, september: 51000, october: 48000, november: 50000,
        december: 52000, january: 51000, february: 50000, march: 53000
      }
    },
    {
      category: "Marketing Expenses",
      total: 2450000,
      months: {
        april: 205000, may: 203000, june: 198000, july: 208000,
        august: 200000, september: 203000, october: 195000, november: 200000,
        december: 205000, january: 203000, february: 200000, march: 210000
      }
    },
    {
      category: "Electricity (office & guest house)",
      total: 375000,
      months: {
        april: 32000, may: 31000, june: 29000, july: 33000,
        august: 30000, september: 31000, october: 28000, november: 30000,
        december: 32000, january: 31000, february: 30000, march: 33000
      }
    },
    {
      category: "Professional fees & accounting charges",
      total: 740000,
      months: {
        april: 62000, may: 61000, june: 59000, july: 63000,
        august: 60000, september: 61000, october: 58000, november: 60000,
        december: 62000, january: 61000, february: 60000, march: 63000
      }
    },
    {
      category: "Donations",
      total: 245000,
      months: {
        april: 21000, may: 20500, june: 19500, july: 21500,
        august: 20000, september: 20500, october: 19000, november: 20000,
        december: 21000, january: 20500, february: 20000, march: 21500
      }
    }
  ]
};

export const vehicleFactoryCostsData: BudgetActualData = {
  budget: [
    {
      category: "Fuel",
      total: 1800000,
      months: {
        april: 150000, may: 150000, june: 150000, july: 150000,
        august: 150000, september: 150000, october: 150000, november: 150000,
        december: 150000, january: 150000, february: 150000, march: 150000
      }
    },
    {
      category: "Vehicle running",
      total: 600000,
      months: {
        april: 50000, may: 50000, june: 50000, july: 50000,
        august: 50000, september: 50000, october: 50000, november: 50000,
        december: 50000, january: 50000, february: 50000, march: 50000
      }
    },
    {
      category: "Factory office",
      total: 1200000,
      months: {
        april: 100000, may: 100000, june: 100000, july: 100000,
        august: 100000, september: 100000, october: 100000, november: 100000,
        december: 100000, january: 100000, february: 100000, march: 100000
      }
    },
    {
      category: "Other factory costs",
      total: 900000,
      months: {
        april: 75000, may: 75000, june: 75000, july: 75000,
        august: 75000, september: 75000, october: 75000, november: 75000,
        december: 75000, january: 75000, february: 75000, march: 75000
      }
    }
  ],
  actual: [
    {
      category: "Fuel",
      total: 1850000,
      months: {
        april: 155000, may: 152000, june: 148000, july: 158000,
        august: 150000, september: 152000, october: 145000, november: 150000,
        december: 155000, january: 152000, february: 150000, march: 163000
      }
    },
    {
      category: "Vehicle running",
      total: 620000,
      months: {
        april: 52000, may: 51000, june: 49000, july: 53000,
        august: 50000, september: 51000, october: 48000, november: 50000,
        december: 52000, january: 51000, february: 50000, march: 53000
      }
    },
    {
      category: "Factory office",
      total: 1200000,
      months: {
        april: 100000, may: 100000, june: 100000, july: 100000,
        august: 100000, september: 100000, october: 100000, november: 100000,
        december: 100000, january: 100000, february: 100000, march: 100000
      }
    },
    {
      category: "Other factory costs",
      total: 920000,
      months: {
        april: 77000, may: 76000, june: 74000, july: 78000,
        august: 75000, september: 76000, october: 73000, november: 75000,
        december: 77000, january: 76000, february: 75000, march: 82000
      }
    }
  ]
};

export const interestCostsData: BudgetActualData = {
  budget: [
    {
      category: "Interest on cash credit & other charges",
      total: 3600000,
      months: {
        april: 300000, may: 300000, june: 300000, july: 300000,
        august: 300000, september: 300000, october: 300000, november: 300000,
        december: 300000, january: 300000, february: 300000, march: 300000
      }
    },
    {
      category: "Interest on unsecured loans",
      total: 2400000,
      months: {
        april: 200000, may: 200000, june: 200000, july: 200000,
        august: 200000, september: 200000, october: 200000, november: 200000,
        december: 200000, january: 200000, february: 200000, march: 200000
      }
    },
    {
      category: "Interest on secured loans",
      total: 1800000,
      months: {
        april: 150000, may: 150000, june: 150000, july: 150000,
        august: 150000, september: 150000, october: 150000, november: 150000,
        december: 150000, january: 150000, february: 150000, march: 150000
      }
    }
  ],
  actual: [
    {
      category: "Interest on cash credit & other charges",
      total: 3480000,
      months: {
        april: 295000, may: 290000, june: 285000, july: 300000,
        august: 290000, september: 285000, october: 280000, november: 285000,
        december: 295000, january: 290000, february: 285000, march: 300000
      }
    },
    {
      category: "Interest on unsecured loans",
      total: 2320000,
      months: {
        april: 195000, may: 190000, june: 185000, july: 200000,
        august: 190000, september: 195000, october: 190000, november: 195000,
        december: 195000, january: 195000, february: 190000, march: 200000
      }
    },
    {
      category: "Interest on secured loans",
      total: 1740000,
      months: {
        april: 145000, may: 145000, june: 140000, july: 150000,
        august: 145000, september: 145000, october: 140000, november: 145000,
        december: 145000, january: 145000, february: 145000, march: 150000
      }
    }
  ]
};

export const otherCostsData: BudgetActualData = {
  budget: [
    {
      category: "Packaging costs",
      total: 2400000,
      months: {
        april: 200000, may: 200000, june: 200000, july: 200000,
        august: 200000, september: 200000, october: 200000, november: 200000,
        december: 200000, january: 200000, february: 200000, march: 200000
      }
    },
    {
      category: "Sales expenses",
      total: 1800000,
      months: {
        april: 150000, may: 150000, june: 150000, july: 150000,
        august: 150000, september: 150000, october: 150000, november: 150000,
        december: 150000, january: 150000, february: 150000, march: 150000
      }
    },
    {
      category: "Depreciation charges",
      total: 6000000,
      months: {
        april: 500000, may: 500000, june: 500000, july: 500000,
        august: 500000, september: 500000, october: 500000, november: 500000,
        december: 500000, january: 500000, february: 500000, march: 500000
      }
    },
    {
      category: "Power cost (fuel, coal)",
      total: 4800000,
      months: {
        april: 400000, may: 400000, june: 400000, july: 400000,
        august: 400000, september: 400000, october: 400000, november: 400000,
        december: 400000, january: 400000, february: 400000, march: 400000
      }
    },
    {
      category: "FOC & Debit Notes",
      total: 600000,
      months: {
        april: 50000, may: 50000, june: 50000, july: 50000,
        august: 50000, september: 50000, october: 50000, november: 50000,
        december: 50000, january: 50000, february: 50000, march: 50000
      }
    }
  ],
  actual: [
    {
      category: "Packaging costs",
      total: 2450000,
      months: {
        april: 205000, may: 203000, june: 198000, july: 208000,
        august: 200000, september: 203000, october: 195000, november: 200000,
        december: 205000, january: 203000, february: 200000, march: 210000
      }
    },
    {
      category: "Sales expenses",
      total: 1850000,
      months: {
        april: 155000, may: 152000, june: 148000, july: 158000,
        august: 150000, september: 152000, october: 145000, november: 150000,
        december: 155000, january: 152000, february: 150000, march: 163000
      }
    },
    {
      category: "Depreciation charges",
      total: 6000000,
      months: {
        april: 500000, may: 500000, june: 500000, july: 500000,
        august: 500000, september: 500000, october: 500000, november: 500000,
        december: 500000, january: 500000, february: 500000, march: 500000
      }
    },
    {
      category: "Power cost (fuel, coal)",
      total: 4920000,
      months: {
        april: 410000, may: 408000, june: 395000, july: 415000,
        august: 400000, september: 408000, october: 390000, november: 400000,
        december: 410000, january: 408000, february: 400000, march: 425000
      }
    },
    {
      category: "FOC & Debit Notes",
      total: 592500,
      months: {
        april: 49000, may: 49500, june: 48750, july: 51000,
        august: 49250, september: 50500, october: 49500, november: 49000,
        december: 50000, january: 49750, february: 49500, march: 51750
      }
    }
  ]
};

// Dashboard chart data
export const monthlyRevenueData = {
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
};

export const expenseBreakdownData = {
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
};

export const profitTrendData = {
  labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
  datasets: [
    {
      label: 'Gross Profit %',
      data: [40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40],
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      yAxisID: 'y',
    },
    {
      label: 'Net Profit %',
      data: [8.5, 8.8, 8.2, 9.1, 8.6, 8.9, 8.7, 8.3, 8.9, 8.8, 8.6, 9.2],
      borderColor: '#10B981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      yAxisID: 'y1',
    }
  ]
};