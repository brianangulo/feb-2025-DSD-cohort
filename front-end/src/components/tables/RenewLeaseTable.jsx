import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Paper, Typography } from "@mui/material";
import Spinner from "../Spinner";

//Defining the columns
const columns = [
  { field: "apartmentNumber", headerName: "Apt. #", flex: 1, minWidth: 150 },
  { field: "tenantName", headerName: "Tenant Name", flex: 2, minWidth: 150 },
  { field: "leaseEnd", headerName: "Lease End", flex: 2, minWidth: 150 },
  {
    field: "leaseStatus",
    headerName: "Status",
    flex: 2,
    width: 150,
    renderCell: () => (
      <Button variant="contained" color="warning">
        Renew
      </Button>
    ),
  },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function RenewLeaseTable({ isLoading, renewableLeases }) {
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Paper sx={{ height: 370, width: "100%" }}>
      <DataGrid
        rows={renewableLeases}
        columns={columns.map(col => ({
          ...col,
          align: "center",
          headerAlign: "center",
        }))}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
        align={"center"}
        disableColumnResize
        disableColumnSelector
        disableRowSelectionOnClick
        localeText={{ noRowsLabel: "No renewals currently" }}
      />
    </Paper>
  );
}
