import React, { useState } from "react";
import { AgGridReact } from "@ag-grid-community/react"; // React Grid Logic
import "@ag-grid-community/styles/ag-grid.css"; // Core CSS
import "@ag-grid-community/styles/ag-theme-quartz.css"; // Theme

import { ColDef, ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { errorLogsData } from "@/data/errorLogs";
ModuleRegistry.registerModules([ClientSideRowModelModule]);

interface IRow {
  timestamp: string;
  model: string;
  price: number;
  electric: boolean;
}

interface GridProps {
  searchQuery: string;
}

const Grid: React.FC<GridProps> = ({ searchQuery }) => {
  const [rowData, setRowData] = useState(errorLogsData);

  const [colDefs, setColDefs] = useState([
    { field: "timestamp" },
    { field: "errorMessage" },
    { field: "errorType" },
  ]);

  const defaultColDef: ColDef = {
    flex: 1,
  };

  return (
    <div
      className={"ag-theme-quartz-dark"}
      style={{ width: "100%", height: "100%" }}>
      <AgGridReact
        quickFilterText={searchQuery}
        pagination={true}
        paginationPageSizeSelector={[5, 10, 20]}
        paginationPageSize={10}
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
      />
    </div>
  );
};

export default Grid;
