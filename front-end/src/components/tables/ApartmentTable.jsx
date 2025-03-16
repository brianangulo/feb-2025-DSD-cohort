import { Button, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router";

// Columns Definition
const columns = [
  {
    field: "apartmentNumber",
    headerName: "Apt #",
    flex: 1,
    minWidth: 120,
    renderCell: (params) => (
      <a href={`/apartment-details/${params.row.id}`} className="underline">
        {params.row.apartmentNumber}
      </a>
    ),
  },
  {
    field: "tenantName",
    headerName: "Tenant Name",
    flex: 2,
    minWidth: 200,
    renderCell: (params) => (
      <a href={`/tenant-details/${params.row.tenantId}`} className="underline">
        {params.row.tenantName}
      </a>
    ),
  },
  {
    field: "leaseStatus",
    headerName: "Lease Status",
    flex: 1,
    minWidth: 120,
    renderCell: (params) =>
      params.row.leaseStatus === "Vacant" ? (
        <span>{params.row.leaseStatus}</span>
      ) : (
        <a href={`/lease-details/${params.row.leaseId}`} className="underline">
          {params.row.leaseStatus}
        </a>
      ),
  },
  {
    field: "leaseStart",
    headerName: "Lease Start",
    flex: 2,
    minWidth: 200,
  },
  {
    field: "leaseEnd",
    headerName: "Lease End",
    flex: 2,
    minWidth: 200,
  },
  {
    headerName: "Action",
    type: "action",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    flex: 1,
    minWidth: 200,
    disableColumnMenu: true,
    // Customizes the content of this column based on lease status
    renderCell: (params) => {
      const leaseEndDate = new Date(params.row.leaseEnd);
      const today = new Date();
      const daysUntilEnd = (leaseEndDate - today) / (1000 * 60 * 60 * 24);

      return (
        <div className="flex justify-center items-center gap-2 h-full">
          {params.row.leaseStatus === "Vacant" ? (
            <Button
              component={Link}
              to={`/leases/${params.row.leaseId}`}
              color="primary"
              variant="contained"
            >
              Create Lease
            </Button>
          ) : daysUntilEnd < 30 ? (
            <Button
              component={Link}
              to={`/leases/${params.row.leaseId}`}
              color="warning"
              variant="contained"
            >
              Renew Lease
            </Button>
          ) : null}
        </div>
      );
    },
  },
];

const paginationModel = { page: 0, pageSize: 5 };

const ApartmentTable = () => {
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
};

export default ApartmentTable;

// Mock Data
const rows = [
  {
    id: 1,
    apartmentNumber: "101",
    tenantId: 1001,
    tenantName: "John Doe",
    leaseId: 5001,
    leaseStatus: "Active",
    leaseStart: "2024-01-01",
    leaseEnd: "2025-04-05",
  },
  {
    id: 2,
    apartmentNumber: "102",
    tenantId: 1002,
    tenantName: "Jane Smith",
    leaseId: 5002,
    leaseStatus: "Active",
    leaseStart: "2024-02-01",
    leaseEnd: "2025-05-01",
  },
  {
    id: 3,
    apartmentNumber: "103",
    tenantId: 1003,
    tenantName: "",
    leaseId: 5003,
    leaseStatus: "Vacant",
    leaseStart: "",
    leaseEnd: "",
  },
  {
    id: 4,
    apartmentNumber: "104",
    tenantId: 1004,
    tenantName: "Emily Davis",
    leaseId: 5004,
    leaseStatus: "Active",
    leaseStart: "2024-03-01",
    leaseEnd: "2025-03-20",
  },
  {
    id: 5,
    apartmentNumber: "105",
    tenantId: 1005,
    tenantName: "Chris Brown",
    leaseId: 5005,
    leaseStatus: "Pending",
    leaseStart: "2024-06-01",
    leaseEnd: "2025-06-01",
  },
  {
    id: 6,
    apartmentNumber: "106",
    tenantId: 1006,
    tenantName: "Sophia Wilson",
    leaseId: 5006,
    leaseStatus: "Active",
    leaseStart: "2024-08-15",
    leaseEnd: "2025-08-15",
  },
  {
    id: 7,
    apartmentNumber: "107",
    tenantId: 1007,
    tenantName: "",
    leaseId: 5007,
    leaseStatus: "Vacant",
    leaseStart: "",
    leaseEnd: "",
  },
  {
    id: 8,
    apartmentNumber: "108",
    tenantId: 1008,
    tenantName: "Olivia Taylor",
    leaseId: 5008,
    leaseStatus: "Active",
    leaseStart: "2024-02-01",
    leaseEnd: "2025-04-02",
  },
  {
    id: 9,
    apartmentNumber: "109",
    tenantId: 1009,
    tenantName: "Ethan Anderson",
    leaseId: 5009,
    leaseStatus: "Pending",
    leaseStart: "2024-07-01",
    leaseEnd: "2025-07-01",
  },
  {
    id: 10,
    apartmentNumber: "110",
    tenantId: 1010,
    tenantName: "Ava Thomas",
    leaseId: 5010,
    leaseStatus: "Active",
    leaseStart: "2024-11-01",
    leaseEnd: "2025-11-01",
  },
  {
    id: 11,
    apartmentNumber: "111",
    tenantId: 1011,
    tenantName: "",
    leaseId: 5011,
    leaseStatus: "Vacant",
    leaseStart: "",
    leaseEnd: "",
  },
];
