import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Paper, Typography } from "@mui/material";
import Spinner from "../Spinner";
import { Link } from "react-router";

//Defining the columns
const columns = [
  {
    field: "apartmentNumber",
    headerName: "Apt. #",
    flex: 1,
    minWidth: 150,
    renderCell: (params) => (
      <a href={`/apartment-details/${params.row.apartmentId}`} className="underline">
        {params.row.apartmentNumber}
      </a>
    ),
  },
  {
    field: "tenantName",
    headerName: "Tenant Name",
    flex: 2,
    minWidth: 150,
    renderCell: (params) => (
      <a href={`/tenant-details/${params.row.tenantId}`} className="underline">
        {params.row.tenantName}
      </a>
    ),
  },
  { field: "leaseEnd", headerName: "Lease End", flex: 2, minWidth: 150 },
  {
    field: "leaseStatus",
    headerName: "Status",
    flex: 2,
    width: 150,
    renderCell: () => (
      <Button
        component={Link}
        to={"/create-lease"}
        color="warning"
        variant="contained"
      >
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
