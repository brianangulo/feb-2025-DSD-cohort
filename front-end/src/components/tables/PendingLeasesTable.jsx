import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';


//Defining the columns
const columns = [
    { field: "apartmentNumber", headerName: "Apt. #", flex: 1, minWidth: 150 },
    {field: "tenantName", headerName: "Tenant Name", flex: 2, minWidth: 150},
    { field: "leaseEnd", headerName: "Lease End", flex: 2, minWidth: 150},
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

//Temp dummy data
const rows = [
    { id: 1, apartmentNumber: 1205, tenantName: "John Drake", leaseEnd: "06/03/2025"},
    { id: 2, apartmentNumber: 805, tenantName: "Max Verstappen", leaseEnd: "07/10/2025"},
    { id: 3, apartmentNumber: 1210, tenantName: "Sergio Perez", leaseEnd: "07/11/2025"},
    { id: 4, apartmentNumber: 803, tenantName: "Lando Norris", leaseEnd: "09/02/2026"},
    { id: 5, apartmentNumber: 702, tenantName: "Daniel Ricciardo", leaseEnd: "10/03/2026"},
    { id: 6, apartmentNumber: 105, tenantName: "Lance Stroll", leaseEnd: "12/12/2027"},
]


const paginationModel = { page: 0, pageSize: 5 };


export default function PendingLeasesTable() {
    return (
      <Paper>
        <DataGrid
          rows={rows}
          columns={columns.map((col) => ({
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


