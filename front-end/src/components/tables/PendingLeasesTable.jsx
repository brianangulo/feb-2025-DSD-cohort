import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
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

// const PendingLeasesTable = () => {
//     return (
//         <div style={{ height: 300, width: "100%" }}>
//             <DataGrid
//               rows={rows}
//               columns={columns}
//               disableRowSelectionOnClick
//               pageSize={5}
//               rowsPerPageOptions={[5]}
//             />
//         </div>
//     )
// }
