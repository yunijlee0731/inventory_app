import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function TableDemo() {
  return (
    <div>
      <table
        id="my_table_id"
        data-url="data/url.json"
        data-id-field="id"
        data-editable-emptytext="Default empty text."
        data-editable-url="/my/editable/update/path"
      >
        <thead>
          <tr>
            <th
              class="col-md-1"
              data-field="id"
              data-sortable="true"
              data-align="center"
            >
              #
            </th>
            <th class="col-md-4" data-field="name" data-editable="true">
              Name
            </th>
            <th
              class="col-md-7"
              data-field="description"
              data-editable="true"
              data-editable-emptytext="Custom empty text."
            >
              Description
            </th>
          </tr>
        </thead>
      </table>
    </div>
  );
}

export default TableDemo;
