import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { stockSelector, getProducts } from "@/store/slices/stockSlice";
import { useAppDispatch } from "@/store/store";
import { useSelector } from "react-redux";
import { NumericFormat } from "react-number-format";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/th";

const columns: GridColDef[] = [
  { field: "productId", headerName: "ID", width: 70 },
  {
    field: "image",
    headerName: "Name",
    width: 100,
    renderCell: ({ value }) => (
      <img
        src="https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_square.jpg"
        alt=""
        className="h-[50px] w-[50px]"
      />
    ),
  },
  { field: "name", headerName: "Name", width: 330 },
  {
    field: "stock",
    headerName: "Stock",
    width: 130,
    renderCell: ({ value }) => (
      <Typography variant="body1" className="text-red-500">
        <NumericFormat
          value={value}
          displayType={"text"}
          thousandSeparator={true}
          decimalScale={2}
          suffix=" pcs."
          fixedDecimalScale={true}
        />
      </Typography>
    ),
  },
  { field: "price", headerName: "Price", width: 130 },
  {
    field: "created",
    headerName: "Created",
    width: 200,
    renderCell: ({ value }) => (
      <Typography variant="body1">
        {/* 543 diff thai years */}
        {dayjs(value).locale("th").add(543, "year").format("DD MMMM YYYY")}
      </Typography>
    ),
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
        getRowId={(row) => row.productId}
        rows={stockReducer.stockAllResult}
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
