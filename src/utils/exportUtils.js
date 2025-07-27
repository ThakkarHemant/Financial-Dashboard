import * as XLSX from 'xlsx';

export const formatDataForExport = (title, tableData) => {
  if (!tableData || !tableData.headers || !tableData.rows) {
    console.error('Invalid data structure for export');
    return [];
  }

  // Prepare headers
  const headers = tableData.headers;
  
  // Prepare rows with proper data mapping
  const rows = tableData.rows.map(row => {
    return headers.map(header => {
      // Handle currency values
      const value = row[header];
      if (typeof value === 'string' && value.startsWith('₹')) {
        return parseFloat(value.replace(/[₹,]/g, '')) || 0;
      }
      return value;
    });
  });

  return [headers, ...rows];
};

export const exportToExcel = (exportData, filename, sheetName) => {
  try {
    if (!exportData || exportData.length === 0) {
      console.error('No data to export');
      return;
    }

    // Create worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(exportData);
    
    // Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName || 'Sheet1');
    
    // Generate file name with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const finalFilename = `${filename || 'export'}-${timestamp}.xlsx`;
    
    // Write and download file
    XLSX.writeFile(workbook, finalFilename);
    
    console.log(`File "${finalFilename}" downloaded successfully`);
  } catch (error) {
    console.error('Error exporting to Excel:', error);
  }
};