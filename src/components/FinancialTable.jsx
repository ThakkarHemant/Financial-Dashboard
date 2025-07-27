/*
import React, { useState } from 'react';
import { ChevronDown, Filter, Download } from 'lucide-react';
import { formatCurrency } from '../utils/currency';
import { formatDataForExport, exportToExcel } from '../utils/exportUtils';

const FinancialTable = ({ title, data, showMonths = true }) => {
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [selectedMonths, setSelectedMonths] = useState(['total']);
  
  // Validate data structure
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

  // Find index of the metric/category column
  const metricIndex = data.headers.findIndex(header => 
    header.toLowerCase().includes('metric') || 
    header.toLowerCase().includes('category') ||
    header.toLowerCase().includes('financial details')
  );
  
  // Get month columns
  const monthColumns = data.headers.filter(header => {
    const lowerHeader = header.toLowerCase();
    return ![
      'metric', 'category', 'financial details', 
      'budget total', 'actual total', 'variance total'
    ].includes(lowerHeader);
  });
  
  // Month name mappings
  const monthNames = {
    'expected april': 'Apr', 'april': 'Apr',
    'expected may': 'May', 'may': 'May',
    'expected june': 'Jun', 'june': 'Jun',
    'expected july': 'Jul', 'july': 'Jul',
    'expected august': 'Aug', 'august': 'Aug',
    'expected september': 'Sep', 'september': 'Sep',
    'expected october': 'Oct', 'october': 'Oct',
    'expected november': 'Nov', 'november': 'Nov',
    'expected december': 'Dec', 'december': 'Dec',
    'expected january': 'Jan', 'january': 'Jan',
    'expected february': 'Feb', 'february': 'Feb',
    'expected march': 'Mar', 'march': 'Mar'
  };

  // Get simplified month name
  const getSimpleMonthName = (header) => {
    const simpleName = monthNames[header.toLowerCase()];
    return simpleName || header;
  };

  // Calculate total for a row
  const calculateRowTotal = (row) => {
    return monthColumns.reduce((sum, month) => {
      const value = parseFloat(row[month]) || 0;
      return sum + value;
    }, 0);
  };

  // Toggle row expansion
  const toggleRowExpansion = (category) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedRows(newExpanded);
  };

  // Handle export
  const handleExport = () => {
    const exportData = formatDataForExport(title, data);
    const filename = title.replace(/[^a-zA-Z0-9]/g, '_');
    exportToExcel(exportData, filename, title);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className="flex items-center space-x-3">
          {showMonths && monthColumns.length > 0 && (
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedMonths.includes('total') ? 'total' : 'months'}
                onChange={(e) => {
                  if (e.target.value === 'total') {
                    setSelectedMonths(['total']);
                  } else {
                    setSelectedMonths(monthColumns);
                  }
                }}
              >
                <option value="total">Total View</option>
                <option value="months">Monthly View</option>
              </select>
            </div>
          )}
          <button
            onClick={handleExport}
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
                {metricIndex >= 0 ? data.headers[metricIndex] : 'Category'}
              </th>
              
              {selectedMonths.includes('total') ? (
                <>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                </>
              ) : (
                selectedMonths.map((month) => (
                  <th 
                    key={month} 
                    className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {getSimpleMonthName(month)}
                  </th>
                ))
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.rows.map((row, rowIndex) => {
              const category = metricIndex >= 0 ? row[data.headers[metricIndex]] : `Row ${rowIndex + 1}`;
              const isExpanded = expandedRows.has(category);
              const isTotalRow = category.toLowerCase().includes('total');
              const rowTotal = calculateRowTotal(row);
              
              return (
                <React.Fragment key={rowIndex}>
                  <tr 
                    className={`hover:bg-gray-50 cursor-pointer transition-colors ${isTotalRow ? 'font-semibold' : ''}`}
                    onClick={() => showMonths && monthColumns.length > 0 && toggleRowExpansion(category)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 sticky left-0 bg-white z-10 border-r border-gray-200">
                      <div className="flex items-center">
                        {showMonths && monthColumns.length > 0 && (
                          <ChevronDown 
                            className={`h-4 w-4 mr-2 text-gray-400 transition-transform ${
                              isExpanded ? 'transform rotate-180' : ''
                            }`}
                          />
                        )}
                        {category}
                      </div>
                    </td>
                    
                    {selectedMonths.includes('total') ? (
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                        {formatCurrency(rowTotal)}
                      </td>
                    ) : (
                      selectedMonths.map((month) => (
                        <td 
                          key={month} 
                          className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-center"
                        >
                          {formatCurrency(row[month])}
                        </td>
                      ))
                    )}
                  </tr>

                  {showMonths && isExpanded && selectedMonths.includes('total') && monthColumns.length > 0 && (
                    monthColumns.map((month) => (
                      <tr key={`${category}-${month}`} className="bg-gray-50">
                        <td className="px-6 py-3 pl-12 whitespace-nowrap text-sm text-gray-600 sticky left-0 bg-gray-50 z-10 border-r border-gray-200">
                          {getSimpleMonthName(month)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 text-center">
                          {formatCurrency(row[month])}
                        </td>
                      </tr>
                    ))
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinancialTable;
*/

import React, { useState, useMemo } from 'react';
import { ChevronDown, Filter, Download } from 'lucide-react';
import { formatCurrency } from '../utils/currency';
import { formatDataForExport, exportToExcel } from '../utils/exportUtils';

const FinancialTable = ({ title, data, showMonths = true }) => {
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [selectedMonths, setSelectedMonths] = useState(['total']);

  // Normalize data structure to handle both formats
  const normalizedData = useMemo(() => {
    if (!data) return null;
    
    // Original format: { headers, rows }
    if (data.headers && data.rows) {
      return data;
    }
    
    // New format: { budget: [], actual: [] }
    if (data.budget && data.actual) {
      const allMonths = [
        ...new Set([
          ...data.budget.map(item => item.month),
          ...data.actual.map(item => item.month)
        ])
      ];
      
      const headers = ['Category', ...allMonths];
      
      // Combine budget and actual into rows
      const rows = [
        ...data.budget.map(item => {
          const row = { Category: item.category };
          allMonths.forEach(month => {
            row[month] = month === item.month ? item.value : '';
          });
          return row;
        }),
        ...data.actual.map(item => {
          const row = { Category: item.category };
          allMonths.forEach(month => {
            row[month] = month === item.month ? item.value : '';
          });
          return row;
        })
      ];
      
      return { headers, rows };
    }
    
    return null;
  }, [data]);

  // Validate data structure
  if (!normalizedData || !normalizedData.headers || !normalizedData.rows) {
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

  // Find index of the metric/category column
  const metricIndex = normalizedData.headers.findIndex(header => 
    header.toLowerCase().includes('metric') || 
    header.toLowerCase().includes('category') ||
    header.toLowerCase().includes('financial details')
  );
  
  // Get month columns
  const monthColumns = normalizedData.headers.filter(header => {
    const lowerHeader = header.toLowerCase();
    return ![
      'metric', 'category', 'financial details', 
      'budget total', 'actual total', 'variance total'
    ].includes(lowerHeader);
  });
  
  // Month name mappings
  const monthNames = {
    'expected april': 'Apr', 'april': 'Apr',
    'expected may': 'May', 'may': 'May',
    'expected june': 'Jun', 'june': 'Jun',
    'expected july': 'Jul', 'july': 'Jul',
    'expected august': 'Aug', 'august': 'Aug',
    'expected september': 'Sep', 'september': 'Sep',
    'expected october': 'Oct', 'october': 'Oct',
    'expected november': 'Nov', 'november': 'Nov',
    'expected december': 'Dec', 'december': 'Dec',
    'expected january': 'Jan', 'january': 'Jan',
    'expected february': 'Feb', 'february': 'Feb',
    'expected march': 'Mar', 'march': 'Mar'
  };

  // Get simplified month name
  const getSimpleMonthName = (header) => {
    const simpleName = monthNames[header.toLowerCase()];
    return simpleName || header;
  };

  // Calculate total for a row
  const calculateRowTotal = (row) => {
    return monthColumns.reduce((sum, month) => {
      const value = parseFloat(row[month]) || 0;
      return sum + value;
    }, 0);
  };

  // Toggle row expansion
  const toggleRowExpansion = (category) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedRows(newExpanded);
  };

  // Handle export
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

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className="flex items-center space-x-3">
          {showMonths && monthColumns.length > 0 && (
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedMonths.includes('total') ? 'total' : 'months'}
                onChange={(e) => {
                  if (e.target.value === 'total') {
                    setSelectedMonths(['total']);
                  } else {
                    setSelectedMonths(monthColumns);
                  }
                }}
              >
                <option value="total">Total View</option>
                <option value="months">Monthly View</option>
              </select>
            </div>
          )}
          <button
            onClick={handleExport}
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
                {metricIndex >= 0 ? normalizedData.headers[metricIndex] : 'Category'}
              </th>
              
              {selectedMonths.includes('total') ? (
                <>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                </>
              ) : (
                selectedMonths.map((month) => (
                  <th 
                    key={month} 
                    className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {getSimpleMonthName(month)}
                  </th>
                ))
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {normalizedData.rows.map((row, rowIndex) => {
              const category = metricIndex >= 0 ? row[normalizedData.headers[metricIndex]] : `Row ${rowIndex + 1}`;
              const isExpanded = expandedRows.has(category);
              const isTotalRow = category.toLowerCase().includes('total');
              const rowTotal = calculateRowTotal(row);
              
              return (
                <React.Fragment key={rowIndex}>
                  <tr 
                    className={`hover:bg-gray-50 cursor-pointer transition-colors ${isTotalRow ? 'font-semibold' : ''}`}
                    onClick={() => showMonths && monthColumns.length > 0 && toggleRowExpansion(category)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 sticky left-0 bg-white z-10 border-r border-gray-200">
                      <div className="flex items-center">
                        {showMonths && monthColumns.length > 0 && (
                          <ChevronDown 
                            className={`h-4 w-4 mr-2 text-gray-400 transition-transform ${
                              isExpanded ? 'transform rotate-180' : ''
                            }`}
                          />
                        )}
                        {category}
                      </div>
                    </td>
                    
                    {selectedMonths.includes('total') ? (
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                        {formatCurrency(rowTotal)}
                      </td>
                    ) : (
                      selectedMonths.map((month) => (
                        <td 
                          key={month} 
                          className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-center"
                        >
                          {formatCurrency(row[month])}
                        </td>
                      ))
                    )}
                  </tr>

                  {showMonths && isExpanded && selectedMonths.includes('total') && monthColumns.length > 0 && (
                    monthColumns.map((month) => (
                      <tr key={`${category}-${month}`} className="bg-gray-50">
                        <td className="px-6 py-3 pl-12 whitespace-nowrap text-sm text-gray-600 sticky left-0 bg-gray-50 z-10 border-r border-gray-200">
                          {getSimpleMonthName(month)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 text-center">
                          {formatCurrency(row[month])}
                        </td>
                      </tr>
                    ))
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinancialTable;