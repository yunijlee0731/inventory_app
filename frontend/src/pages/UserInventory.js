// "use client";
// import React, { useState } from "react";
// import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
// import { AgGridReact } from "ag-grid-react";
// import "../App.css";
// import { Form, Button, Card, Alert } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";

// ModuleRegistry.registerModules([AllCommunityModule]);

// const GridExample = () => {
//   const [rowData] = useState([
//     { make: "Tesla", model: "Model Y", price: 64950, electric: true },
//     { make: "Ford", model: "F-Series", price: 33850, electric: false },
//     { make: "Toyota", model: "Corolla", price: 29600, electric: false },
//     { make: "Mercedes", model: "EQA", price: 48890, electric: true },
//     { make: "Fiat", model: "500", price: 15774, electric: false },
//     { make: "Nissan", model: "Juke", price: 20675, electric: false },
//   ]);

//   const [colDefs] = useState([
//     { field: "make" },
//     { field: "model" },
//     { field: "price" },
//     { field: "electric" },
//   ]);

//   const defaultColDef = {
//     flex: 1,
//   };
//   return (
// <div style={{ backgroundColor: "#282c34" }}>
//   <nav class="navbar navbar-expand-lg bg-body-tertiary">
//     <div class="container-fluid">
//       <a class="navbar-brand" href="#">
//         Navbar
//       </a>
//       <button
//         class="navbar-toggler"
//         type="button"
//         data-bs-toggle="collapse"
//         data-bs-target="#navbarNavAltMarkup"
//         aria-controls="navbarNavAltMarkup"
//         aria-expanded="false"
//         aria-label="Toggle navigation"
//       >
//         <span class="navbar-toggler-icon"></span>
//       </button>
//       <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
//         <div class="navbar-nav">
//           <a class="nav-link active" aria-current="page" href="#">
//             Home
//           </a>
//           <a class="nav-link" href="#">
//             Features
//           </a>
//           <a class="nav-link" href="#">
//             Pricing
//           </a>
//           <a class="nav-link disabled" aria-disabled="true">
//             Disabled
//           </a>
//         </div>
//       </div>
//     </div>
//   </nav>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           width: "100%",
//           height: "100vh", // Full viewport height for vertical centering
//         }}
//       >
//         <div style={{ width: "50%", height: "400px" }}>
//           <AgGridReact
//             rowData={rowData}
//             columnDefs={colDefs}
//             defaultColDef={defaultColDef}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GridExample;

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

const UserInventory = () => {
  // const containerStyle = useMemo(
  //   () => ({ width: "100%", height: "600px" }),
  //   []
  // );
  // // <div style={{ width: "50%", height: "400px" }}></div>
  // const gridStyle = useMemo(() => ({ height: "50%", width: "400px" }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: "athlete", minWidth: 180 },
    { field: "age" },
    { field: "country", minWidth: 160 },
    { field: "year" },
    { field: "date", minWidth: 160 },
    { field: "sport", minWidth: 180 },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
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

  const onGridReady = useCallback((params) => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  const onCellEditingStopped = useCallback((event) => {
    console.log("Editing stopped on:", event.colDef.field);
    console.log("Updated value:", event.value);
    console.log("Full row data:", event.data);
  }, []);

  return (
    <div style={{ backgroundColor: "#282c34" }}>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            My Inventory
          </a>
          <a class="navbar-brand" href="#">
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
              onCellEditingStopped={onCellEditingStopped}
              rowSelection={rowSelection}
            />
          </div>
          <div>
            {/* <Button
              variant="primary"
              type="submit"
              // onClick={handleButtonClick}
            >
              Add Item
            </Button> */}
            <AddItemComp />
            <DelItemComp />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UserInventory;
