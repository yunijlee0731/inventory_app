import React from "react";

export default function cellRenderer(props) {
  const handleClick = () => {
    props.api.startEditingCell({
      rowIndex: props.node.rowIndex,
      colKey: props.column.getId(),
    });
    console.log(props);
  };
  return (
    <span>
      <button
        style={{
          height: "30px",
          width: "30px", // Optional: Set width to make it square
          // display: "flex",

          alignItems: "center",
          justifyContent: "center",
          padding: "0px", // Remove default padding
          fontSize: "16px", // Adjust font size of emoji if needed
        }}
        onClick={handleClick}
      >
        ✎
      </button>
      <span style={{ paddingLeft: "4px" }}>{props.value}</span>
    </span>
  );
}
