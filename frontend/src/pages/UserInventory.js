"use client";

import { Card } from "react-bootstrap";
import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  StrictMode,
} from "react";
import AddItemComp from "../components/AddItemComp";
import DelItemComp from "../components/DelItemComp";
import { AgGridReact } from "ag-grid-react";
import CellRenderer from "../CellRenderer";
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

export const userInventoryWindow = window.location;
//   const currWindow = window.location;
//   console.log(currWindow);
//   window.location.reload();
// };

export const UserInventory = () => {
  // const containerStyle = useMemo(
  //   () => ({ width: "100%", height: "600px" }),
  //   []
  // );
  // // <div style={{ width: "50%", height: "400px" }}></div>
  // const gridStyle = useMemo(() => ({ height: "50%", width: "400px" }), [];
  // var currSelectedRow = null;

  const [currSelectedRow, setCurrSelectedRow] = useState(null);
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
      editable: true,
      // we use a cell renderer to include a button, so when the button
      // gets clicked, the editing starts.
      cellRenderer: CellRenderer,
    };
  }, []);
  const rowSelection = useMemo(() => {
    return {
      mode: "singleRow",
    };
  }, []);

  const requestOptions = {
    method: "GET", // Use GET method
    headers: { "Content-Type": "application/json" },
  };
  const onGridReady = useCallback((params) => {
    fetch(
      `/api/inventory/view-user-inventory?userId=${sessionStorage.getItem(
        "userId"
      )}`,
      requestOptions
    )
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setRowData(data.result);
      });
  }, []);

  const onCellEditingStopped = useCallback((event) => {
    console.log("Editing stopped on:", event.colDef.field);
    console.log("Updated value:", event.value);
    console.log("Full row data:", event.data);
  }, []);

  // logic to handle when row is selected and not selected
  const onSelectionChanged = (params) => {
    const selectedNode = params.api.getSelectedNodes()[0];
    if (selectedNode) {
      setCurrSelectedRow(selectedNode.data); // Update state with the selected row data
    } else {
      setCurrSelectedRow(null); // Clear state when no row is selected
    }
  };

  return (
    <div style={{ backgroundColor: "#282c34" }}>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="/user-inventory">
            My Inventory
          </a>
          <a class="navbar-brand" href="/view-all-inventory">
            View All Inventory
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
              onCellEditingStopped={onCellEditingStopped}
              rowSelection={rowSelection}
              onSelectionChanged={onSelectionChanged}
              // onRowSelected={onRowSelected}
            />
          </div>
          <div>
            <AddItemComp />
            <DelItemComp currSelectedRow={currSelectedRow} />
          </div>
        </Card>
      </div>
    </div>
  );
};

// export default UserInventory;
