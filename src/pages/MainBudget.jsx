/*
import React from 'react';
import FinancialTable from '../components/FinancialTable';
import {
  budgetSalesData,
  productionCostsData,
  salariesBenefitsData,
  adminExpensesData,
  vehicleFactoryCostsData,
  interestCostsData,
  otherCostsData
} from '../data/mockData';

const MainBudget: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header }
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Main Budget</h1>
        <p className="mt-2 text-sm text-gray-600">
          Detailed financial breakdown with budget vs actual comparison across all months
        </p>
      </div>

      {/* Financial Tables }
      <div className="space-y-8">
        {/* Budget Sales }
        <FinancialTable
          title="1. Budget Sales"
          data={budgetSalesData}
        />

        {/* Production Costs }
        <FinancialTable
          title="2A. Production Costs"
          data={productionCostsData}
        />

        {/* Salaries & Benefits }
        <FinancialTable
          title="2B. Salaries & Benefits"
          data={salariesBenefitsData}
        />

        {/* Admin & Office Expenses }
        <FinancialTable
          title="2C. Admin & Office Expenses"
          data={adminExpensesData}
        />

        {/* Vehicle & Factory Costs }
        <FinancialTable
          title="2D. Vehicle & Factory Costs"
          data={vehicleFactoryCostsData}
        />

        {/* Interest Costs }
        <FinancialTable
          title="2E. Interest Costs"
          data={interestCostsData}
        />

        {/* Other Costs }
        <FinancialTable
          title="2F. Other Costs"
          data={otherCostsData}
        />

        {/* Profit Summary }
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">3. Profit Summary</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Metric
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Budget Total
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
                    Net Profit (NP) = Revenue – Total Cost
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
                    Net Profit % = (NP ÷ Revenue) × 100%
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
      </div>
    </div>
  );
};

export default MainBudget;
*/

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import FinancialTable from '../components/FinancialTable'; 

const MainBudget = () => {
  const [budgetData, setBudgetData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Apps Script configuration
  const APPS_SCRIPT_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbw1sqAnssupWr7lPYq4nQYO5-TsWFNuqxXwRBlp6KCz5j18Xkfh3Ix8ntO7pX_hHnJS/exec';
  const SPREADSHEET_ID = '1ScT_8cwc9ji_unDZBpr2b8JlwTXs99xEo8cxEAm9Mvs';
  const MAIN_SHEET_NAME = 'financial details actual';

  // Helper to extract headers
  const getHeaders = useCallback((fullSheetData) => {
    if (fullSheetData && fullSheetData.length > 3) {
      return fullSheetData[3].map(header => String(header).trim()).filter(Boolean);
    }
    return [];
  }, []);

  // Table extraction helper
  const extractTableSection = useCallback((fullSheetData, startMetric, endMetric = null) => {
    if (!fullSheetData || fullSheetData.length === 0) return null;

    const headers = getHeaders(fullSheetData);
    if (headers.length === 0) return null;

    const normalizedStartMetric = startMetric.trim().toLowerCase();
    const startIndex = fullSheetData.findIndex(row =>
      Array.isArray(row) && row.length > 0 && String(row[0]).trim().toLowerCase() === normalizedStartMetric
    );

    if (startIndex === -1) return null;

    let extractedRows = [];
    let actualEndIndex = fullSheetData.length;

    if (endMetric) {
      const normalizedEndMetric = endMetric.trim().toLowerCase();
      const tempEndIndex = fullSheetData.findIndex(row =>
        Array.isArray(row) && row.length > 0 && String(row[0]).trim().toLowerCase() === normalizedEndMetric
      );
      if (tempEndIndex !== -1 && tempEndIndex > startIndex) {
        actualEndIndex = tempEndIndex;
      }
    }

    for (let i = startIndex; i < actualEndIndex; i++) {
      const currentRow = fullSheetData[i];
      if (!currentRow || !Array.isArray(currentRow) || currentRow.length === 0) break;

      const rowObject = {};
      headers.forEach((header, index) => {
        rowObject[header] = currentRow[index] !== undefined ? currentRow[index] : '';
      });
      extractedRows.push(rowObject);
    }

    if (extractedRows.length === 0) return null;

    return { headers, rows: extractedRows };
  }, [getHeaders]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const url = `${APPS_SCRIPT_WEB_APP_URL}?action=getData&spreadsheetId=${encodeURIComponent(SPREADSHEET_ID)}&sheetName=${encodeURIComponent(MAIN_SHEET_NAME)}`;
        
        const response = await axios.get(url);
        
        if (response.status !== 200 || response.data.error) {
          throw new Error(response.data.error || 'Failed to fetch data');
        }

        const fullSheetData = response.data.data;
        
        // Extract all tables
        const extractedTables = {
          revenueData: extractTableSection(fullSheetData, "Revenue", "COGS ( cons)"),
          cogsData: extractTableSection(fullSheetData, "COGS ( cons)", "GP"),
          gpData: extractTableSection(fullSheetData, "GP", "GP %"),
          gpPercentData: extractTableSection(fullSheetData, "GP %", "Factory electricity"),
          productionCosts: extractTableSection(fullSheetData, "Factory electricity", "labour payment"),
          labourCosts: extractTableSection(fullSheetData, "labour payment", "Loading & unloading"),
          loadingCosts: extractTableSection(fullSheetData, "Loading & unloading", "Total Production cost"),
          productionTotal: extractTableSection(fullSheetData, "Total Production cost", "inward  supply"),
          freightCharges: extractTableSection(fullSheetData, "inward  supply", "Total Freight Charges"),
          storesRepairs: extractTableSection(fullSheetData, "repairs", "Total Stores & Repairs"),
          directorSalaries: extractTableSection(fullSheetData, "Director SALARY & BENEFITS", "sales salary"),
          employeeSalaries: extractTableSection(fullSheetData, "employee salary", "incentive"),
          salariesBenefits: extractTableSection(fullSheetData, "SALARY & BENEFITS", "telephones"),
          adminExpenses: extractTableSection(fullSheetData, "telephones", "fuel"),
          vehicleFactoryCosts: extractTableSection(fullSheetData, "fuel", "Total factory Cost"),
          interestCosts: extractTableSection(fullSheetData, "interst from cc & Other charges", "Total Interest charges"),
          otherCosts: extractTableSection(fullSheetData, "Total Packeging cost Cost", "Depriciations Charges"),
          totalCost: extractTableSection(fullSheetData, "Total Cost", "Total Np1"),
          netProfit: extractTableSection(fullSheetData, "Total Np1", "Actual Profit %"),
        };

        setBudgetData(extractedTables);

      } catch (err) {
        console.error('Data fetch error:', err);
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [extractTableSection]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-700">
        Loading budget data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600 text-lg">
        Error: {error.message}
        <p className="text-sm text-gray-500 mt-2">
          Verify Apps Script URL, spreadsheet permissions, and metric names
        </p>
      </div>
    );
  }

  if (!budgetData) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-700">
        No budget data available
      </div>
    );
  }

  const {
    revenueData,
    cogsData,
    gpData,
    gpPercentData,
    productionCosts,
    labourCosts,
    loadingCosts,
    productionTotal,
    freightCharges,
    storesRepairs,
    directorSalaries,
    employeeSalaries,
    salariesBenefits,
    adminExpenses,
    vehicleFactoryCosts,
    interestCosts,
    otherCosts,
    totalCost,
    netProfit
  } = budgetData;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Main Budget</h1>
        <p className="mt-2 text-sm text-gray-600">
          Financial breakdown with monthly comparisons
        </p>
      </div>

      <div className="space-y-8">
        {/* Budget Sales Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">1. Budget Sales</h2>
          
          {revenueData && <FinancialTable title="Revenue" data={revenueData} showMonths={true} />}
          {cogsData && <FinancialTable title="Cost of Goods Sold (COGS)" data={cogsData} showMonths={true} />}
          {gpData && <FinancialTable title="Gross Profit (GP)" data={gpData} showMonths={true} />}
          {gpPercentData && <FinancialTable title="Gross Profit %" data={gpPercentData} showMonths={false} />}
        </div>

        {/* Production Costs Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">2A. Production Costs</h2>
          
          {productionCosts && <FinancialTable title="Factory Electricity" data={productionCosts} showMonths={true} />}
          {labourCosts && <FinancialTable title="Labour Payment" data={labourCosts} showMonths={true} />}
          {loadingCosts && <FinancialTable title="Loading & Unloading" data={loadingCosts} showMonths={true} />}
          {productionTotal && <FinancialTable title="Total Production Cost" data={productionTotal} showMonths={true} />}
          {freightCharges && <FinancialTable title="Freight Charges" data={freightCharges} showMonths={true} />}
          {storesRepairs && <FinancialTable title="Stores & Repairs" data={storesRepairs} showMonths={true} />}
        </div>

        {/* Salaries & Benefits Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">2B. Salaries & Benefits</h2>
          
          {directorSalaries && <FinancialTable title="Director Salaries" data={directorSalaries} showMonths={true} />}
          {employeeSalaries && <FinancialTable title="Employee Salaries" data={employeeSalaries} showMonths={true} />}
          {salariesBenefits && <FinancialTable title="Salary & Benefits Total" data={salariesBenefits} showMonths={true} />}
        </div>

        {/* Other Costs Sections */}
        {adminExpenses && <FinancialTable title="2C. Admin & Office Expenses" data={adminExpenses} showMonths={true} />}
        {vehicleFactoryCosts && <FinancialTable title="2D. Vehicle & Factory Costs" data={vehicleFactoryCosts} showMonths={true} />}
        {interestCosts && <FinancialTable title="2E. Interest Costs" data={interestCosts} showMonths={true} />}
        {otherCosts && <FinancialTable title="2F. Other Costs" data={otherCosts} showMonths={true} />}

        {/* Totals Section */}
        <div className="space-y-6">
          {totalCost && <FinancialTable title="Total Costs" data={totalCost} showMonths={true} />}
          {netProfit && <FinancialTable title="Net Profit" data={netProfit} showMonths={true} />}
        </div>
      </div>
    </div>
  );
};

export default MainBudget;