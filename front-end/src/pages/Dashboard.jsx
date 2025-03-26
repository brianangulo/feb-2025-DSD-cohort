import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ApartmentTable from "../components/tables/ApartmentTable";
import PendingLeasesTable from "../components/tables/PendingLeasesTable";
import RenewLeaseTable from "../components/tables/RenewLeaseTable";
import { useLocation } from "react-router";
import { fetchApartmentInformation } from "../api/apartmentApi";
import { fetchRenewals, fetchPending } from "../api/leaseApi";
import { toast } from "react-hot-toast";
const Dashboard = () => {
  const [renewableLeases, setRenewableLeases] = useState([]);
  const [pendingLeases, setPendingLeases] = useState([]);
  const [apartmentInfo, setApartmentInfo] = useState([]);
  const [loadingDashboardData, setLoadingDashboardData] = useState(true);
  const location = useLocation();
  useEffect(() => {
    async function InitialFetch() {
      const [apartmentInformation, renewableInformation, pendingInformation] = await Promise.all([
        fetchApartmentInformation(),
        fetchRenewals(),
        fetchPending(),
      ]);
      setApartmentInfo(apartmentInformation);
      setRenewableLeases(renewableInformation);
      setPendingLeases(pendingInformation);
    }
    setLoadingDashboardData(true);
    InitialFetch();
    setLoadingDashboardData(false);
  }, []);
  return (
    <>
      <Typography component="h1" align="left" fontWeight={"bold"} fontSize={"2rem"} marginBottom={"2rem"}>
        Dashboard
      </Typography>

      <Grid container spacing={10}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h4" fontSize={"1.5rem"} marginBottom={"1rem"}>
            Upcoming Renewals
          </Typography>
          <Box border={"1px solid black"} bgcolor={"#f5f5f5"}>
            <RenewLeaseTable isLoading={loadingDashboardData} renewableLeases={renewableLeases} />
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h4" fontSize={"1.5rem"} marginBottom={"1rem"}>
            Pending Leases
          </Typography>
          <Box border={"1px solid black"} bgcolor={"#f5f5f5"}>
            <PendingLeasesTable isLoading={loadingDashboardData} pendingLeases={pendingLeases} />
          </Box>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Typography variant="h4" fontSize={"1.5rem"} marginBottom={"1rem"}>
            Apartments Info
          </Typography>
          <Box border={"1px solid black"} bgcolor={"#f5f5f5"}>
            <ApartmentTable isLoading={loadingDashboardData} apartmentInfo={apartmentInfo} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
