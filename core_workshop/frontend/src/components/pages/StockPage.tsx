import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { stockSelector, getProducts } from "@/store/slices/stockSlice";
import { useAppDispatch } from "@/store/store";
import { useSelector } from "react-redux";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
];

export default function DataTable() {
  const stockReducer = useSelector(stockSelector);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    // first - called during created
    dispatch(getProducts());

    return () => {
      // second - called during destroyed
      console.log("Stock page was destroyed");
    };
  }, [dispatch]);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={stockReducer.stockAllResult}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}

// import { getProducts, stockSelector } from "@/store/slices/stockSlice";
// import { useAppDispatch } from "@/store/store";
// import React, { useEffect } from "react";
// import { useSelector } from "react-redux";

// type Props = {};

// export default function StockPage({}: Props) {
//   const products = ["Product1", "Product2", "Product3", "Product4"];
//   const stockReducer = useSelector(stockSelector);
//   const dispatch = useAppDispatch();

//   useEffect(() => {
//     // first - called during created
//     dispatch(getProducts());

//     return () => {
//       // second - called during destroyed
//       console.log("Stock page was destroyed");
//     };
//   }, [dispatch]);

//   return (
//     <div>
//       StockPage
//       <ul>
//         {stockReducer.stockAllResult.map((item) => (
//           <li key={item._id}>{item.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }
