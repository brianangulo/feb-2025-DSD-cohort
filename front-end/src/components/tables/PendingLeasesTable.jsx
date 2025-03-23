import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Spinner from "../Spinner";
import { Link } from "react-router";

const columns = [
  {
    field: "apartmentNumber",
    headerName: "Apt. #",
    flex: 1,
    minWidth: 150,
    renderCell: (params) => (
      <Link to={`/apartment-details/${params.row.apartmentId}`} className="underline">
        {params.row.apartmentNumber}
      </Link>
    ),
  },
  {
    field: "tenantName",
    headerName: "Tenant Name",
    flex: 2,
    minWidth: 150,
    renderCell: (params) => (
      <Link to={`/tenant-details/${params.row.tenantId}`} className="underline">
        {params.row.tenantName}
      </Link>
    ),
  },
  { field: "leaseEnd", headerName: "Lease End", flex: 2, minWidth: 150 },
  {
    field: "leaseStatus",
    headerName: "Status",
    flex: 2,
    width: 150,
    renderCell: (params) => (
      <Button
        component={Link}
        to={`/lease/${params.row.leaseId}`}
        variant="contained"
        color="warning"
      >
        Pending
      </Button>
    ),
  },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function PendingLeasesTable({ isLoading, pendingLeases }) {
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Paper sx={{ height: 370, width: "100%" }}>
      <DataGrid
        rows={pendingLeases}
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
        localeText={{ noRowsLabel: "No pending leases" }}
      />
    </Paper>
  );
}

