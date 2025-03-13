import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import api from "../api";
import ApartmentTable from "../components/tables/ApartmentTable";
import PendingLeasesTable from "../components/tables/PendingLeasesTable";

const Dashboard = () => {
  const [expiredLeases, setExpiredLeases] = useState([]);
  const [loading, setLoading] = useState(false);
  //fetches expired leases from backend
  useEffect(() => {
    const fetchExpiredLeases = async () => {
      api
        .get("/api/dashboard/expiringLeases")
        .then(res => {
          setExpiredLeases(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        });
    };
    setLoading(true);
    fetchExpiredLeases();
  }, []);
  return (
    <>
      <Typography
        component="h1"
        align="left"
        fontWeight={"bold"}
        fontSize={"2rem"}
        marginBottom={"2rem"}
      >
        Dashboard
      </Typography>

      <Grid container spacing={10}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h4" fontSize={"1.5rem"} marginBottom={"1rem"}>
            Upcoming Renewals
          </Typography>
          <Box border={"1px solid black"} bgcolor={"#f5f5f5"}>
            <Typography>hello from left box</Typography>

            {loading ? (
              <Typography>loading...</Typography>
            ) : expiredLeases.length === 0 ? (
              <Typography>no expired leases</Typography>
            ) : (
              expiredLeases.map(lease => (
                <Box key={lease.id}>
                  <Typography>{lease.lease_end_date}</Typography>
                </Box>
              ))
            )}
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h4" fontSize={"1.5rem"} marginBottom={"1rem"}>
            Pending Leases
          </Typography>
          <Box border={"1px solid black"} bgcolor={"#f5f5f5"}>
            <PendingLeasesTable />
          </Box>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Typography variant="h4" fontSize={"1.5rem"} marginBottom={"1rem"}>
            Apartments Info
          </Typography>
          <Box border={"1px solid black"} bgcolor={"#f5f5f5"}>
            <ApartmentTable />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
