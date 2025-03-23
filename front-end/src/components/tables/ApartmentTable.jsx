import { Button, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router";
import Spinner from "../Spinner";
// Columns Definition
const columns = [
  {
    field: "apartmentNumber",
    headerName: "Apt #",
    flex: 1,
    minWidth: 120,
    renderCell: (params) => (
      <Link to={`/apartment-details/${params.row.id}`} className="underline">
        {params.row.apartmentNumber}
      </Link>
    ),
  },
  {
    field: "tenantName",
    headerName: "Tenant Name",
    flex: 2,
    minWidth: 200,
    renderCell: (params) =>
      params.row.tenantName === "Vacant" ? (
        <span>{params.row.tenantName}</span>
      ) : (
        <Link to={`/tenant-details/${params.row.tenantId}`} className="underline">
          {params.row.tenantName}
        </Link>
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
        <Link to={`/lease/${params.row.leaseId}`} className="underline">
          {params.row.leaseStatus}
        </Link>
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
              to={"/create-lease"}
              color="primary"
              variant="contained"
            >
              Create Lease
            </Button>
          ) : daysUntilEnd < 30 ? (
            <Button
              component={Link}
              to={"/create-lease"}
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

const ApartmentTable = ({ isLoading, apartmentInfo }) => {
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Paper>
      <DataGrid
        rows={apartmentInfo}
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
        localeText={{ noRowsLabel: "No apartment information" }}
      />
    </Paper>
  );
};

export default ApartmentTable;
