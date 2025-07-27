export interface KeyFactsData {
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

export interface KeyFactsSection {
  budget: KeyFactsData[];
  actual: KeyFactsData[];
}

// A) DETAILS Section
export const detailsData: KeyFactsSection = {
  budget: [
    {
      category: "2022–23",
      total: 115000000,
      months: {
        april: 9500000, may: 9600000, june: 9400000, july: 9700000,
        august: 9500000, september: 9600000, october: 9500000, november: 9400000,
        december: 9600000, january: 9500000, february: 9400000, march: 9800000
      }
    },
    {
      category: "2023–24",
      total: 120000000,
      months: {
        april: 10000000, may: 10000000, june: 10000000, july: 10000000,
        august: 10000000, september: 10000000, october: 10000000, november: 10000000,
        december: 10000000, january: 10000000, february: 10000000, march: 10000000
      }
    },
    {
      category: "Changes %",
      total: 4.35,
      months: {
        april: 5.26, may: 4.17, june: 6.38, july: 3.09,
        august: 5.26, september: 4.17, october: 5.26, november: 6.38,
        december: 4.17, january: 5.26, february: 6.38, march: 2.04
      }
    },
    {
      category: "Projecting @ 90%",
      total: 108000000,
      months: {
        april: 9000000, may: 9000000, june: 9000000, july: 9000000,
        august: 9000000, september: 9000000, october: 9000000, november: 9000000,
        december: 9000000, january: 9000000, february: 9000000, march: 9000000
      }
    },
    {
      category: "Actual",
      total: 118500000,
      months: {
        april: 9800000, may: 9900000, june: 9750000, july: 10200000,
        august: 9850000, september: 10100000, october: 9900000, november: 9800000,
        december: 10000000, january: 9950000, february: 9900000, march: 10350000
      }
    },
    {
      category: "Quantity (Units)",
      total: 2400000,
      months: {
        april: 200000, may: 200000, june: 195000, july: 204000,
        august: 197000, september: 202000, october: 198000, november: 196000,
        december: 200000, january: 199000, february: 198000, march: 207000
      }
    },
    {
      category: "Purchase 2023–24",
      total: 72000000,
      months: {
        april: 6000000, may: 6000000, june: 5850000, july: 6120000,
        august: 5910000, september: 6060000, october: 5940000, november: 5880000,
        december: 6000000, january: 5970000, february: 5940000, march: 6210000
      }
    },
    {
      category: "Purchase to Sales Ratio (%)",
      total: 60.76,
      months: {
        april: 61.22, may: 60.61, june: 60.00, july: 60.00,
        august: 60.00, september: 60.00, october: 60.00, november: 60.00,
        december: 60.00, january: 60.00, february: 60.00, march: 60.00
      }
    },
    {
      category: "Projecting of Purchase",
      total: 71100000,
      months: {
        april: 5880000, may: 5940000, june: 5850000, july: 6120000,
        august: 5910000, september: 6060000, october: 5940000, november: 5880000,
        december: 6000000, january: 5970000, february: 5940000, march: 6210000
      }
    },
    {
      category: "Inc/dec of Working Capital",
      total: 2500000,
      months: {
        april: 200000, may: 210000, june: 205000, july: 215000,
        august: 208000, september: 212000, october: 206000, november: 202000,
        december: 210000, january: 208000, february: 204000, march: 220000
      }
    }
  ],
  actual: [
    {
      category: "2022–23",
      total: 115000000,
      months: {
        april: 9500000, may: 9600000, june: 9400000, july: 9700000,
        august: 9500000, september: 9600000, october: 9500000, november: 9400000,
        december: 9600000, january: 9500000, february: 9400000, march: 9800000
      }
    },
    {
      category: "2023–24",
      total: 118500000,
      months: {
        april: 9800000, may: 9900000, june: 9750000, july: 10200000,
        august: 9850000, september: 10100000, october: 9900000, november: 9800000,
        december: 10000000, january: 9950000, february: 9900000, march: 10350000
      }
    },
    {
      category: "Changes %",
      total: 3.04,
      months: {
        april: 3.16, may: 3.13, june: 3.72, july: 5.15,
        august: 3.68, september: 5.21, october: 4.21, november: 4.26,
        december: 4.17, january: 4.74, february: 5.32, march: 5.61
      }
    },
    {
      category: "Projecting @ 90%",
      total: 106650000,
      months: {
        april: 8820000, may: 8910000, june: 8775000, july: 9180000,
        august: 8865000, september: 9090000, october: 8910000, november: 8820000,
        december: 9000000, january: 8955000, february: 8910000, march: 9315000
      }
    },
    {
      category: "Actual",
      total: 118500000,
      months: {
        april: 9800000, may: 9900000, june: 9750000, july: 10200000,
        august: 9850000, september: 10100000, october: 9900000, november: 9800000,
        december: 10000000, january: 9950000, february: 9900000, march: 10350000
      }
    },
    {
      category: "Quantity (Units)",
      total: 2370000,
      months: {
        april: 196000, may: 198000, june: 195000, july: 204000,
        august: 197000, september: 202000, october: 198000, november: 196000,
        december: 200000, january: 199000, february: 198000, march: 207000
      }
    },
    {
      category: "Purchase 2023–24",
      total: 71100000,
      months: {
        april: 5880000, may: 5940000, june: 5850000, july: 6120000,
        august: 5910000, september: 6060000, october: 5940000, november: 5880000,
        december: 6000000, january: 5970000, february: 5940000, march: 6210000
      }
    },
    {
      category: "Purchase to Sales Ratio (%)",
      total: 60.00,
      months: {
        april: 60.00, may: 60.00, june: 60.00, july: 60.00,
        august: 60.00, september: 60.00, october: 60.00, november: 60.00,
        december: 60.00, january: 60.00, february: 60.00, march: 60.00
      }
    },
    {
      category: "Projecting of Purchase",
      total: 71100000,
      months: {
        april: 5880000, may: 5940000, june: 5850000, july: 6120000,
        august: 5910000, september: 6060000, october: 5940000, november: 5880000,
        december: 6000000, january: 5970000, february: 5940000, march: 6210000
      }
    },
    {
      category: "Inc/dec of Working Capital",
      total: 2650000,
      months: {
        april: 220000, may: 225000, june: 218000, july: 228000,
        august: 222000, september: 226000, october: 220000, november: 216000,
        december: 224000, january: 222000, february: 218000, march: 235000
      }
    }
  ]
};

// B) Manufacturing Cost Section
export const manufacturingCostData: KeyFactsSection = {
  budget: [
    {
      category: "Revenue",
      total: 120000000,
      months: {
        april: 10000000, may: 10000000, june: 10000000, july: 10000000,
        august: 10000000, september: 10000000, october: 10000000, november: 10000000,
        december: 10000000, january: 10000000, february: 10000000, march: 10000000
      }
    },
    {
      category: "COGS (60% approx)",
      total: 72000000,
      months: {
        april: 6000000, may: 6000000, june: 6000000, july: 6000000,
        august: 6000000, september: 6000000, october: 6000000, november: 6000000,
        december: 6000000, january: 6000000, february: 6000000, march: 6000000
      }
    },
    {
      category: "GP (40% approx)",
      total: 48000000,
      months: {
        april: 4000000, may: 4000000, june: 4000000, july: 4000000,
        august: 4000000, september: 4000000, october: 4000000, november: 4000000,
        december: 4000000, january: 4000000, february: 4000000, march: 4000000
      }
    },
    {
      category: "GP % (40% approx)",
      total: 40.0,
      months: {
        april: 40.0, may: 40.0, june: 40.0, july: 40.0,
        august: 40.0, september: 40.0, october: 40.0, november: 40.0,
        december: 40.0, january: 40.0, february: 40.0, march: 40.0
      }
    }
  ],
  actual: [
    {
      category: "Revenue",
      total: 118500000,
      months: {
        april: 9800000, may: 9900000, june: 9750000, july: 10200000,
        august: 9850000, september: 10100000, october: 9900000, november: 9800000,
        december: 10000000, january: 9950000, february: 9900000, march: 10350000
      }
    },
    {
      category: "COGS (60% approx)",
      total: 71100000,
      months: {
        april: 5880000, may: 5940000, june: 5850000, july: 6120000,
        august: 5910000, september: 6060000, october: 5940000, november: 5880000,
        december: 6000000, january: 5970000, february: 5940000, march: 6210000
      }
    },
    {
      category: "GP (40% approx)",
      total: 47400000,
      months: {
        april: 3920000, may: 3960000, june: 3900000, july: 4080000,
        august: 3940000, september: 4040000, october: 3960000, november: 3920000,
        december: 4000000, january: 3980000, february: 3960000, march: 4140000
      }
    },
    {
      category: "GP % (40% approx)",
      total: 40.0,
      months: {
        april: 40.0, may: 40.0, june: 40.0, july: 40.0,
        august: 40.0, september: 40.0, october: 40.0, november: 40.0,
        december: 40.0, january: 40.0, february: 40.0, march: 40.0
      }
    }
  ]
};

// Production Costs Section
export const productionCostsKeyFactsData: KeyFactsSection = {
  budget: [
    {
      category: "Factory electricity (per last year)",
      total: 2724000,
      months: {
        april: 227000, may: 227000, june: 227000, july: 227000,
        august: 227000, september: 227000, october: 227000, november: 227000,
        december: 227000, january: 227000, february: 227000, march: 227000
      }
    },
    {
      category: "Labour payment (as per last year)",
      total: 18000000,
      months: {
        april: 1500000, may: 1500000, june: 1500000, july: 1500000,
        august: 1500000, september: 1500000, october: 1500000, november: 1500000,
        december: 1500000, january: 1500000, february: 1500000, march: 1500000
      }
    },
    {
      category: "Loading & unloading (as per last year)",
      total: 3600000,
      months: {
        april: 300000, may: 300000, june: 300000, july: 300000,
        august: 300000, september: 300000, october: 300000, november: 300000,
        december: 300000, january: 300000, february: 300000, march: 300000
      }
    },
    {
      category: "Total Production cost (as per last year)",
      total: 24324000,
      months: {
        april: 2027000, may: 2027000, june: 2027000, july: 2027000,
        august: 2027000, september: 2027000, october: 2027000, november: 2027000,
        december: 2027000, january: 2027000, february: 2027000, march: 2027000
      }
    },
    {
      category: "Inward supply (as per last year)",
      total: 2400000,
      months: {
        april: 200000, may: 200000, june: 200000, july: 200000,
        august: 200000, september: 200000, october: 200000, november: 200000,
        december: 200000, january: 200000, february: 200000, march: 200000
      }
    },
    {
      category: "Outward (as per last year)",
      total: 1800000,
      months: {
        april: 150000, may: 150000, june: 150000, july: 150000,
        august: 150000, september: 150000, october: 150000, november: 150000,
        december: 150000, january: 150000, february: 150000, march: 150000
      }
    },
    {
      category: "Total Freight Charges (as per last year)",
      total: 4200000,
      months: {
        april: 350000, may: 350000, june: 350000, july: 350000,
        august: 350000, september: 350000, october: 350000, november: 350000,
        december: 350000, january: 350000, february: 350000, march: 350000
      }
    },
    {
      category: "Repairs (as per last year)",
      total: 1200000,
      months: {
        april: 100000, may: 100000, june: 100000, july: 100000,
        august: 100000, september: 100000, october: 100000, november: 100000,
        december: 100000, january: 100000, february: 100000, march: 100000
      }
    },
    {
      category: "Stores (as per last year)",
      total: 900000,
      months: {
        april: 75000, may: 75000, june: 75000, july: 75000,
        august: 75000, september: 75000, october: 75000, november: 75000,
        december: 75000, january: 75000, february: 75000, march: 75000
      }
    },
    {
      category: "Total Stores & Repairs (as per last year)",
      total: 2100000,
      months: {
        april: 175000, may: 175000, june: 175000, july: 175000,
        august: 175000, september: 175000, october: 175000, november: 175000,
        december: 175000, january: 175000, february: 175000, march: 175000
      }
    }
  ],
  actual: [
    {
      category: "Factory electricity (per last year)",
      total: 2800000,
      months: {
        april: 235000, may: 230000, june: 240000, july: 245000,
        august: 250000, september: 235000, october: 225000, november: 220000,
        december: 240000, january: 235000, february: 230000, march: 255000
      }
    },
    {
      category: "Labour payment (as per last year)",
      total: 18500000,
      months: {
        april: 1520000, may: 1550000, june: 1530000, july: 1580000,
        august: 1540000, september: 1520000, october: 1510000, november: 1500000,
        december: 1560000, january: 1540000, february: 1530000, march: 1620000
      }
    },
    {
      category: "Loading & unloading (as per last year)",
      total: 3720000,
      months: {
        april: 310000, may: 315000, june: 305000, july: 320000,
        august: 310000, september: 305000, october: 300000, november: 295000,
        december: 315000, january: 310000, february: 305000, march: 330000
      }
    },
    {
      category: "Total Production cost (as per last year)",
      total: 25020000,
      months: {
        april: 2065000, may: 2095000, june: 2075000, july: 2145000,
        august: 2100000, september: 2060000, october: 2035000, november: 2015000,
        december: 2115000, january: 2085000, february: 2065000, march: 2205000
      }
    },
    {
      category: "Inward supply (as per last year)",
      total: 2450000,
      months: {
        april: 205000, may: 210000, june: 200000, july: 215000,
        august: 205000, september: 200000, october: 195000, november: 190000,
        december: 210000, january: 205000, february: 200000, march: 220000
      }
    },
    {
      category: "Outward (as per last year)",
      total: 1850000,
      months: {
        april: 155000, may: 160000, june: 150000, july: 165000,
        august: 155000, september: 150000, october: 145000, november: 140000,
        december: 160000, january: 155000, february: 150000, march: 170000
      }
    },
    {
      category: "Total Freight Charges (as per last year)",
      total: 4300000,
      months: {
        april: 360000, may: 370000, june: 350000, july: 380000,
        august: 360000, september: 350000, october: 340000, november: 330000,
        december: 370000, january: 360000, february: 350000, march: 390000
      }
    },
    {
      category: "Repairs (as per last year)",
      total: 1250000,
      months: {
        april: 105000, may: 110000, june: 100000, july: 115000,
        august: 105000, september: 100000, october: 95000, november: 90000,
        december: 110000, january: 105000, february: 100000, march: 120000
      }
    },
    {
      category: "Stores (as per last year)",
      total: 950000,
      months: {
        april: 80000, may: 85000, june: 75000, july: 90000,
        august: 80000, september: 75000, october: 70000, november: 65000,
        december: 85000, january: 80000, february: 75000, march: 95000
      }
    },
    {
      category: "Total Stores & Repairs (as per last year)",
      total: 2200000,
      months: {
        april: 185000, may: 195000, june: 175000, july: 205000,
        august: 185000, september: 175000, october: 165000, november: 155000,
        december: 195000, january: 185000, february: 175000, march: 215000
      }
    }
  ]
};

// Salaries & Benefits Section
export const salariesBenefitsKeyFactsData: KeyFactsSection = {
  budget: [
    {
      category: "Director Salary & Benefits (same as last year)",
      total: 12000000,
      months: {
        april: 1000000, may: 1000000, june: 1000000, july: 1000000,
        august: 1000000, september: 1000000, october: 1000000, november: 1000000,
        december: 1000000, january: 1000000, february: 1000000, march: 1000000
      }
    },
    {
      category: "Sales salary (₹300,000)",
      total: 3600000,
      months: {
        april: 300000, may: 300000, june: 300000, july: 300000,
        august: 300000, september: 300000, october: 300000, november: 300000,
        december: 300000, january: 300000, february: 300000, march: 300000
      }
    },
    {
      category: "Employee salary (₹500,000)",
      total: 6000000,
      months: {
        april: 500000, may: 500000, june: 500000, july: 500000,
        august: 500000, september: 500000, october: 500000, november: 500000,
        december: 500000, january: 500000, february: 500000, march: 500000
      }
    },
    {
      category: "Incentive (as per last year 16% PL @1%)",
      total: 1920000,
      months: {
        april: 160000, may: 160000, june: 160000, july: 160000,
        august: 160000, september: 160000, october: 160000, november: 160000,
        december: 160000, january: 160000, february: 160000, march: 160000
      }
    },
    {
      category: "EFO & ESIC (as per last year)",
      total: 1800000,
      months: {
        april: 150000, may: 150000, june: 150000, july: 150000,
        august: 150000, september: 150000, october: 150000, november: 150000,
        december: 150000, january: 150000, february: 150000, march: 150000
      }
    },
    {
      category: "Total Salary & Benefits (as per last year)",
      total: 25320000,
      months: {
        april: 2110000, may: 2110000, june: 2110000, july: 2110000,
        august: 2110000, september: 2110000, october: 2110000, november: 2110000,
        december: 2110000, january: 2110000, february: 2110000, march: 2110000
      }
    }
  ],
  actual: [
    {
      category: "Director Salary & Benefits (same as last year)",
      total: 12000000,
      months: {
        april: 1000000, may: 1000000, june: 1000000, july: 1000000,
        august: 1000000, september: 1000000, october: 1000000, november: 1000000,
        december: 1000000, january: 1000000, february: 1000000, march: 1000000
      }
    },
    {
      category: "Sales salary (₹300,000)",
      total: 3650000,
      months: {
        april: 305000, may: 310000, june: 300000, july: 315000,
        august: 305000, september: 300000, october: 295000, november: 290000,
        december: 310000, january: 305000, february: 300000, march: 320000
      }
    },
    {
      category: "Employee salary (₹500,000)",
      total: 6200000,
      months: {
        april: 520000, may: 530000, june: 510000, july: 540000,
        august: 520000, september: 510000, october: 500000, november: 495000,
        december: 530000, january: 520000, february: 510000, march: 555000
      }
    },
    {
      category: "Incentive (as per last year 16% PL @1%)",
      total: 1980000,
      months: {
        april: 165000, may: 170000, june: 160000, july: 175000,
        august: 165000, september: 160000, october: 155000, november: 150000,
        december: 170000, january: 165000, february: 160000, march: 185000
      }
    },
    {
      category: "EFO & ESIC (as per last year)",
      total: 1850000,
      months: {
        april: 155000, may: 160000, june: 150000, july: 165000,
        august: 155000, september: 150000, october: 145000, november: 140000,
        december: 160000, january: 155000, february: 150000, march: 170000
      }
    },
    {
      category: "Total Salary & Benefits (as per last year)",
      total: 25680000,
      months: {
        april: 2145000, may: 2170000, june: 2120000, july: 2195000,
        august: 2145000, september: 2120000, october: 2095000, november: 2075000,
        december: 2170000, january: 2145000, february: 2120000, march: 2230000
      }
    }
  ]
};

// Admin & Office Expenses Section
export const adminExpensesKeyFactsData: KeyFactsSection = {
  budget: [
    {
      category: "Telephones (fixed)",
      total: 240000,
      months: {
        april: 20000, may: 20000, june: 20000, july: 20000,
        august: 20000, september: 20000, october: 20000, november: 20000,
        december: 20000, january: 20000, february: 20000, march: 20000
      }
    },
    {
      category: "Stationery (fixed)",
      total: 180000,
      months: {
        april: 15000, may: 15000, june: 15000, july: 15000,
        august: 15000, september: 15000, october: 15000, november: 15000,
        december: 15000, january: 15000, february: 15000, march: 15000
      }
    },
    {
      category: "Renewals, Subscribe. & Tech services (fixed)",
      total: 600000,
      months: {
        april: 50000, may: 50000, june: 50000, july: 50000,
        august: 50000, september: 50000, october: 50000, november: 50000,
        december: 50000, january: 50000, february: 50000, march: 50000
      }
    },
    {
      category: "Rental (fixed)",
      total: 2400000,
      months: {
        april: 200000, may: 200000, june: 200000, july: 200000,
        august: 200000, september: 200000, october: 200000, november: 200000,
        december: 200000, january: 200000, february: 200000, march: 200000
      }
    },
    {
      category: "Branding & promo (fixed)",
      total: 1200000,
      months: {
        april: 100000, may: 100000, june: 100000, july: 100000,
        august: 100000, september: 100000, october: 100000, november: 100000,
        december: 100000, january: 100000, february: 100000, march: 100000
      }
    },
    {
      category: "Office expenses (fixed)",
      total: 600000,
      months: {
        april: 50000, may: 50000, june: 50000, july: 50000,
        august: 50000, september: 50000, october: 50000, november: 50000,
        december: 50000, january: 50000, february: 50000, march: 50000
      }
    },
    {
      category: "Marketing Exp (as per last year)",
      total: 2400000,
      months: {
        april: 200000, may: 200000, june: 200000, july: 200000,
        august: 200000, september: 200000, october: 200000, november: 200000,
        december: 200000, january: 200000, february: 200000, march: 200000
      }
    },
    {
      category: "Electricity (office & guest house) (fixed)",
      total: 360000,
      months: {
        april: 30000, may: 30000, june: 30000, july: 30000,
        august: 30000, september: 30000, october: 30000, november: 30000,
        december: 30000, january: 30000, february: 30000, march: 30000
      }
    },
    {
      category: "Professional fee & accounting charges (fixed)",
      total: 720000,
      months: {
        april: 60000, may: 60000, june: 60000, july: 60000,
        august: 60000, september: 60000, october: 60000, november: 60000,
        december: 60000, january: 60000, february: 60000, march: 60000
      }
    },
    {
      category: "Donations (fixed)",
      total: 240000,
      months: {
        april: 20000, may: 20000, june: 20000, july: 20000,
        august: 20000, september: 20000, october: 20000, november: 20000,
        december: 20000, january: 20000, february: 20000, march: 20000
      }
    },
    {
      category: "Total Administration Charges (as per last year)",
      total: 8940000,
      months: {
        april: 745000, may: 745000, june: 745000, july: 745000,
        august: 745000, september: 745000, october: 745000, november: 745000,
        december: 745000, january: 745000, february: 745000, march: 745000
      }
    }
  ],
  actual: [
    {
      category: "Telephones (fixed)",
      total: 245000,
      months: {
        april: 21000, may: 20500, june: 19500, july: 21500,
        august: 20000, september: 20500, october: 19000, november: 20000,
        december: 21000, january: 20500, february: 20000, march: 21500
      }
    },
    {
      category: "Stationery (fixed)",
      total: 185000,
      months: {
        april: 16000, may: 15500, june: 14500, july: 16500,
        august: 15000, september: 15500, october: 14000, november: 15000,
        december: 16000, january: 15500, february: 15000, march: 16500
      }
    },
    {
      category: "Renewals, Subscribe. & Tech services (fixed)",
      total: 620000,
      months: {
        april: 52000, may: 51000, june: 49000, july: 53000,
        august: 50000, september: 51000, october: 48000, november: 50000,
        december: 52000, january: 51000, february: 50000, march: 53000
      }
    },
    {
      category: "Rental (fixed)",
      total: 2400000,
      months: {
        april: 200000, may: 200000, june: 200000, july: 200000,
        august: 200000, september: 200000, october: 200000, november: 200000,
        december: 200000, january: 200000, february: 200000, march: 200000
      }
    },
    {
      category: "Branding & promo (fixed)",
      total: 1250000,
      months: {
        april: 105000, may: 103000, june: 98000, july: 108000,
        august: 100000, september: 103000, october: 95000, november: 100000,
        december: 105000, january: 103000, february: 100000, march: 110000
      }
    },
    {
      category: "Office expenses (fixed)",
      total: 620000,
      months: {
        april: 52000, may: 51000, june: 49000, july: 53000,
        august: 50000, september: 51000, october: 48000, november: 50000,
        december: 52000, january: 51000, february: 50000, march: 53000
      }
    },
    {
      category: "Marketing Exp (as per last year)",
      total: 2450000,
      months: {
        april: 205000, may: 203000, june: 198000, july: 208000,
        august: 200000, september: 203000, october: 195000, november: 200000,
        december: 205000, january: 203000, february: 200000, march: 210000
      }
    },
    {
      category: "Electricity (office & guest house) (fixed)",
      total: 375000,
      months: {
        april: 32000, may: 31000, june: 29000, july: 33000,
        august: 30000, september: 31000, october: 28000, november: 30000,
        december: 32000, january: 31000, february: 30000, march: 33000
      }
    },
    {
      category: "Professional fee & accounting charges (fixed)",
      total: 740000,
      months: {
        april: 62000, may: 61000, june: 59000, july: 63000,
        august: 60000, september: 61000, october: 58000, november: 60000,
        december: 62000, january: 61000, february: 60000, march: 63000
      }
    },
    {
      category: "Donations (fixed)",
      total: 245000,
      months: {
        april: 21000, may: 20500, june: 19500, july: 21500,
        august: 20000, september: 20500, october: 19000, november: 20000,
        december: 21000, january: 20500, february: 20000, march: 21500
      }
    },
    {
      category: "Total Administration Charges (as per last year)",
      total: 9130000,
      months: {
        april: 766000, may: 756500, june: 736000, july: 777000,
        august: 745000, september: 756000, october: 725000, november: 745000,
        december: 766000, january: 756500, february: 745000, march: 780500
      }
    }
  ]
};

// Vehicle & Factory Costs Section
export const vehicleFactoryCostsKeyFactsData: KeyFactsSection = {
  budget: [
    {
      category: "Fuel (as per last year)",
      total: 1800000,
      months: {
        april: 150000, may: 150000, june: 150000, july: 150000,
        august: 150000, september: 150000, october: 150000, november: 150000,
        december: 150000, january: 150000, february: 150000, march: 150000
      }
    },
    {
      category: "Vehicle (fixed)",
      total: 600000,
      months: {
        april: 50000, may: 50000, june: 50000, july: 50000,
        august: 50000, september: 50000, october: 50000, november: 50000,
        december: 50000, january: 50000, february: 50000, march: 50000
      }
    },
    {
      category: "Vehicle running cost (as per last year)",
      total: 2400000,
      months: {
        april: 200000, may: 200000, june: 200000, july: 200000,
        august: 200000, september: 200000, october: 200000, november: 200000,
        december: 200000, january: 200000, february: 200000, march: 200000
      }
    },
    {
      category: "Factory office (fixed)",
      total: 1200000,
      months: {
        april: 100000, may: 100000, june: 100000, july: 100000,
        august: 100000, september: 100000, october: 100000, november: 100000,
        december: 100000, january: 100000, february: 100000, march: 100000
      }
    },
    {
      category: "Other cost (fixed)",
      total: 900000,
      months: {
        april: 75000, may: 75000, june: 75000, july: 75000,
        august: 75000, september: 75000, october: 75000, november: 75000,
        december: 75000, january: 75000, february: 75000, march: 75000
      }
    },
    {
      category: "Total Factory Cost (as per last year)",
      total: 6900000,
      months: {
        april: 575000, may: 575000, june: 575000, july: 575000,
        august: 575000, september: 575000, october: 575000, november: 575000,
        december: 575000, january: 575000, february: 575000, march: 575000
      }
    }
  ],
  actual: [
    {
      category: "Fuel (as per last year)",
      total: 1850000,
      months: {
        april: 155000, may: 152000, june: 148000, july: 158000,
        august: 150000, september: 152000, october: 145000, november: 150000,
        december: 155000, january: 152000, february: 150000, march: 163000
      }
    },
    {
      category: "Vehicle (fixed)",
      total: 620000,
      months: {
        april: 52000, may: 51000, june: 49000, july: 53000,
        august: 50000, september: 51000, october: 48000, november: 50000,
        december: 52000, january: 51000, february: 50000, march: 53000
      }
    },
    {
      category: "Vehicle running cost (as per last year)",
      total: 2470000,
      months: {
        april: 207000, may: 203000, june: 197000, july: 211000,
        august: 200000, september: 203000, october: 193000, november: 200000,
        december: 207000, january: 203000, february: 200000, march: 216000
      }
    },
    {
      category: "Factory office (fixed)",
      total: 1200000,
      months: {
        april: 100000, may: 100000, june: 100000, july: 100000,
        august: 100000, september: 100000, october: 100000, november: 100000,
        december: 100000, january: 100000, february: 100000, march: 100000
      }
    },
    {
      category: "Other cost (fixed)",
      total: 920000,
      months: {
        april: 77000, may: 76000, june: 74000, july: 78000,
        august: 75000, september: 76000, october: 73000, november: 75000,
        december: 77000, january: 76000, february: 75000, march: 82000
      }
    },
    {
      category: "Total Factory Cost (as per last year)",
      total: 7060000,
      months: {
        april: 591000, may: 582000, june: 568000, july: 600000,
        august: 575000, september: 582000, october: 559000, november: 575000,
        december: 591000, january: 582000, february: 575000, march: 614000
      }
    }
  ]
};

// Interest Costs Section
export const interestCostsKeyFactsData: KeyFactsSection = {
  budget: [
    {
      category: "Interest from CC & Other charges (reducing)",
      total: 3600000,
      months: {
        april: 300000, may: 300000, june: 300000, july: 300000,
        august: 300000, september: 300000, october: 300000, november: 300000,
        december: 300000, january: 300000, february: 300000, march: 300000
      }
    },
    {
      category: "Interest from unsecured loan (reducing)",
      total: 2400000,
      months: {
        april: 200000, may: 200000, june: 200000, july: 200000,
        august: 200000, september: 200000, october: 200000, november: 200000,
        december: 200000, january: 200000, february: 200000, march: 200000
      }
    },
    {
      category: "Interest from secured loan (reducing)",
      total: 1800000,
      months: {
        april: 150000, may: 150000, june: 150000, july: 150000,
        august: 150000, september: 150000, october: 150000, november: 150000,
        december: 150000, january: 150000, february: 150000, march: 150000
      }
    },
    {
      category: "Total Interest charges (as per last year)",
      total: 7800000,
      months: {
        april: 650000, may: 650000, june: 650000, july: 650000,
        august: 650000, september: 650000, october: 650000, november: 650000,
        december: 650000, january: 650000, february: 650000, march: 650000
      }
    }
  ],
  actual: [
    {
      category: "Interest from CC & Other charges (reducing)",
      total: 3480000,
      months: {
        april: 295000, may: 290000, june: 285000, july: 300000,
        august: 290000, september: 285000, october: 280000, november: 285000,
        december: 295000, january: 290000, february: 285000, march: 300000
      }
    },
    {
      category: "Interest from unsecured loan (reducing)",
      total: 2320000,
      months: {
        april: 195000, may: 190000, june: 185000, july: 200000,
        august: 190000, september: 195000, october: 190000, november: 195000,
        december: 195000, january: 195000, february: 190000, march: 200000
      }
    },
    {
      category: "Interest from secured loan (reducing)",
      total: 1740000,
      months: {
        april: 145000, may: 145000, june: 140000, july: 150000,
        august: 145000, september: 145000, october: 140000, november: 145000,
        december: 145000, january: 145000, february: 145000, march: 150000
      }
    },
    {
      category: "Total Interest charges (as per last year)",
      total: 7540000,
      months: {
        april: 635000, may: 625000, june: 610000, july: 650000,
        august: 625000, september: 625000, october: 610000, november: 625000,
        december: 635000, january: 630000, february: 620000, march: 650000
      }
    }
  ]
};

// Other Costs Section
export const otherCostsKeyFactsData: KeyFactsSection = {
  budget: [
    {
      category: "Total Packaging cost (as per last year)",
      total: 2400000,
      months: {
        april: 200000, may: 200000, june: 200000, july: 200000,
        august: 200000, september: 200000, october: 200000, november: 200000,
        december: 200000, january: 200000, february: 200000, march: 200000
      }
    },
    {
      category: "Total Sales expenses (as per last year)",
      total: 1800000,
      months: {
        april: 150000, may: 150000, june: 150000, july: 150000,
        august: 150000, september: 150000, october: 150000, november: 150000,
        december: 150000, january: 150000, february: 150000, march: 150000
      }
    },
    {
      category: "Depreciation Charges (₹6,000,000 p.a.)",
      total: 6000000,
      months: {
        april: 500000, may: 500000, june: 500000, july: 500000,
        august: 500000, september: 500000, october: 500000, november: 500000,
        december: 500000, january: 500000, february: 500000, march: 500000
      }
    },
    {
      category: "Power cost (fuel, coal) (as per last year)",
      total: 4800000,
      months: {
        april: 400000, may: 400000, june: 400000, july: 400000,
        august: 400000, september: 400000, october: 400000, november: 400000,
        december: 400000, january: 400000, february: 400000, march: 400000
      }
    },
    {
      category: "FOC & Debit Notes (0.5% consider)",
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
      category: "Total Packaging cost (as per last year)",
      total: 2450000,
      months: {
        april: 205000, may: 203000, june: 198000, july: 208000,
        august: 200000, september: 203000, october: 195000, november: 200000,
        december: 205000, january: 203000, february: 200000, march: 210000
      }
    },
    {
      category: "Total Sales expenses (as per last year)",
      total: 1850000,
      months: {
        april: 155000, may: 152000, june: 148000, july: 158000,
        august: 150000, september: 152000, october: 145000, november: 150000,
        december: 155000, january: 152000, february: 150000, march: 163000
      }
    },
    {
      category: "Depreciation Charges (₹6,000,000 p.a.)",
      total: 6000000,
      months: {
        april: 500000, may: 500000, june: 500000, july: 500000,
        august: 500000, september: 500000, october: 500000, november: 500000,
        december: 500000, january: 500000, february: 500000, march: 500000
      }
    },
    {
      category: "Power cost (fuel, coal) (as per last year)",
      total: 4920000,
      months: {
        april: 410000, may: 408000, june: 395000, july: 415000,
        august: 400000, september: 408000, october: 390000, november: 400000,
        december: 410000, january: 408000, february: 400000, march: 425000
      }
    },
    {
      category: "FOC & Debit Notes (0.5% consider)",
      total: 592500,
      months: {
        april: 49000, may: 49500, june: 48750, july: 51000,
        august: 49250, september: 50500, october: 49500, november: 49000,
        december: 50000, january: 49750, february: 49500, march: 51750
      }
    }
  ]
};

// Profit Summary Section
export const profitSummaryKeyFactsData: KeyFactsSection = {
  budget: [
    {
      category: "Total Cost",
      total: 95000000,
      months: {
        april: 7916667, may: 7916667, june: 7916667, july: 7916667,
        august: 7916667, september: 7916667, october: 7916667, november: 7916667,
        december: 7916667, january: 7916667, february: 7916667, march: 7916667
      }
    },
    {
      category: "Total NP1 (Net Profit) – as per ratio",
      total: 25000000,
      months: {
        april: 2083333, may: 2083333, june: 2083333, july: 2083333,
        august: 2083333, september: 2083333, october: 2083333, november: 2083333,
        december: 2083333, january: 2083333, february: 2083333, march: 2083333
      }
    },
    {
      category: "Total NP % – as per ratio",
      total: 20.8,
      months: {
        april: 20.8, may: 20.8, june: 20.8, july: 20.8,
        august: 20.8, september: 20.8, october: 20.8, november: 20.8,
        december: 20.8, january: 20.8, february: 20.8, march: 20.8
      }
    }
  ],
  actual: [
    {
      category: "Total Cost",
      total: 92832500,
      months: {
        april: 7736042, may: 7736042, june: 7736042, july: 7736042,
        august: 7736042, september: 7736042, october: 7736042, november: 7736042,
        december: 7736042, january: 7736042, february: 7736042, march: 7736042
      }
    },
    {
      category: "Total NP1 (Net Profit) – as per ratio",
      total: 25667500,
      months: {
        april: 2138958, may: 2163958, june: 2013958, july: 2463958,
        august: 2113958, september: 2363958, october: 2163958, november: 2063958,
        december: 2263958, january: 2213958, february: 2163958, march: 2613958
      }
    },
    {
      category: "Total NP % – as per ratio",
      total: 21.7,
      months: {
        april: 21.8, may: 21.9, june: 20.7, july: 24.2,
        august: 21.5, september: 23.4, october: 21.9, november: 21.1,
        december: 22.6, january: 22.2, february: 21.9, march: 25.3
      }
    }
  ]
};