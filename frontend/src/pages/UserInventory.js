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
    // console.log(data);
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

// "use client";

// import { Card } from "react-bootstrap";
// import React, {
//   useCallback,
//   useMemo,
//   useRef,
//   useState,
//   StrictMode,
// } from "react";
// import AddItemComp from "../components/AddItemComp";
// import DelItemComp from "../components/DelItemComp";
// import { AgGridReact } from "ag-grid-react";
// import CellRenderer from "../CellRenderer";
// import {
//   ClientSideRowModelModule,
//   ModuleRegistry,
//   NumberEditorModule,
//   TextEditorModule,
//   ValidationModule,
//   RowSelectionModule,
// } from "ag-grid-community";
// ModuleRegistry.registerModules([
//   NumberEditorModule,
//   TextEditorModule,
//   ClientSideRowModelModule,
//   RowSelectionModule,
//   ValidationModule /* Development Only */,
// ]);

// const UserInventory = () => {
//   // const containerStyle = useMemo(
//   //   () => ({ width: "100%", height: "600px" }),
//   //   []
//   // );
//   // // <div style={{ width: "50%", height: "400px" }}></div>
//   // const gridStyle = useMemo(() => ({ height: "50%", width: "400px" }), []);
//   var printData;
//   const [rowData, setRowData] = useState();
//   const [columnDefs, setColumnDefs] = useState([
//     { field: "athlete", minWidth: 180 },
//     { field: "age" },
//     { field: "country", minWidth: 160 },
//     { field: "year" },
//     { field: "date", minWidth: 160 },
//     { field: "sport", minWidth: 180 },
//     { field: "gold" },
//     { field: "silver" },
//     { field: "bronze" },
//     { field: "total" },
//   ]);
//   const defaultColDef = useMemo(() => {
//     return {
//       flex: 1,
//       minWidth: 100,
//       editable: true,
//       // we use a cell renderer to include a button, so when the button
//       // gets clicked, the editing starts.
//       cellRenderer: CellRenderer,
//     };
//   }, []);
//   const rowSelection = useMemo(() => {
//     return {
//       mode: "singleRow",
//     };
//   }, []);

//   const onGridReady = useCallback((params) => {
//     fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
//       .then((resp) => resp.json())
//       .then((data) => {
//         printData = data;
//         setRowData(data);
//       });
//     console.log(printData);
//   }, []);

//   const onCellEditingStopped = useCallback((event) => {
//     console.log("Editing stopped on:", event.colDef.field);
//     console.log("Updated value:", event.value);
//     console.log("Full row data:", event.data);
//   }, []);

//   return (
//     <div style={{ backgroundColor: "#282c34" }}>
//       <nav class="navbar navbar-expand-lg bg-body-tertiary">
//         <div class="container-fluid">
//           <a class="navbar-brand" href="#">
//             My Inventory
//           </a>
//           <a class="navbar-brand" href="#">
//             Navbar
//           </a>
//         </div>
//       </nav>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           width: "100%",
//           height: "100vh", // Full viewport height for vertical centering
//         }}
//       >
//         <Card
//           style={{
//             width: "50rem",
//           }}
//         >
//           <div style={{ width: "100%", height: "400px" }}>
//             <AgGridReact
//               rowData={rowData}
//               columnDefs={columnDefs}
//               defaultColDef={defaultColDef}
//               suppressClickEdit={true}
//               onGridReady={onGridReady}
//               onCellEditingStopped={onCellEditingStopped}
//               rowSelection={rowSelection}
//             />
//           </div>
//           <div>
//             {/* <Button
//               variant="primary"
//               type="submit"
//               // onClick={handleButtonClick}
//             >
//               Add Item
//             </Button> */}
//             <AddItemComp />
//             <DelItemComp />
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default UserInventory;
