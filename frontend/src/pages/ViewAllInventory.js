"use client";

import { Card } from "react-bootstrap";
import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  StrictMode,
} from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ClientSideRowModelModule,
  ModuleRegistry,
  NumberEditorModule,
  TextEditorModule,
  ValidationModule,
  RowSelectionModule,
} from "ag-grid-community";
ModuleRegistry.registerModules([
  NumberEditorModule,
  TextEditorModule,
  ClientSideRowModelModule,
  RowSelectionModule,
  ValidationModule /* Development Only */,
]);

const ViewAllInventory = () => {
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: "item_name", minWidth: 180 },
    { field: "description" },
    { field: "quantity", minWidth: 160 },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      editable: false,
    };
  }, []);

  const requestOptions = {
    method: "GET", // Use GET method
    headers: { "Content-Type": "application/json" },
  };

  const onGridReady = useCallback((params) => {
    fetch("/api/inventory/view-all-inventory", requestOptions)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setRowData(data.result);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    // console.log(data);
  }, []);

  return (
    <div style={{ backgroundColor: "#282c34" }}>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="/user-inventory">
            My Inventory
          </a>
          <a class="navbar-brand" href="/view-all-inventory">
            Navbar
          </a>
        </div>
      </nav>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100vh", // Full viewport height for vertical centering
        }}
      >
        <Card
          style={{
            width: "50rem",
          }}
        >
          <div style={{ width: "100%", height: "400px" }}>
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              suppressClickEdit={true}
              onGridReady={onGridReady}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ViewAllInventory;
