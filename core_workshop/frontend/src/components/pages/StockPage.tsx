import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { stockSelector, getProducts } from "@/store/slices/stockSlice";
import { useAppDispatch } from "@/store/store";
import { useSelector } from "react-redux";

const columns: GridColDef[] = [
  { field: "productId", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 130 },
  { field: "price", headerName: "Price", width: 130 },
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
