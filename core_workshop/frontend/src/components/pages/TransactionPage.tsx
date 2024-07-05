// import { getTransactions, shopSelector } from "@/store/slices/shopSlice";
// import { useAppDispatch } from "@/store/store";
// import React, { useEffect } from "react";
// import { useSelector } from "react-redux";

// type Props = {};

// export default function TransactionPage({}: Props) {
//   const shopReducer = useSelector(shopSelector);
//   const dispatch = useAppDispatch();

//   useEffect(() => {
//     dispatch(getTransactions());
//   }, [dispatch]);

//   return (
//     <div>
//       TransactionPage
//       <ul>
//         {shopReducer.transactionAllResult.map((trx) => (
//           <li>
//             {trx.transactionId}, {trx.paid}, {trx.total}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { shopSelector, getTransactions } from "@/store/slices/shopSlice";
import { useAppDispatch } from "@/store/store";
import { useSelector } from "react-redux";

const columns: GridColDef[] = [
  { field: "transactionId", headerName: "ID", width: 70 },
  { field: "paid", headerName: "Paid", width: 130 },
  { field: "total", headerName: "Total", width: 130 },
];

export default function DataTable() {
  const shopReducer = useSelector(shopSelector);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        getRowId={(row) => row.transactionId}
        rows={shopReducer.transactionAllResult}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
}
