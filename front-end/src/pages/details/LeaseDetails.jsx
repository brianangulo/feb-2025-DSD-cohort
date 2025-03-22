import { Box, Typography } from "@mui/material";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import LeaseView from "../LeaseView";
import Spinner from "../../components/Spinner";
import { fetchLeaseDetails } from "../../api/leaseApi";
const LeaseDetails = () => {
  // Id took from the URL parameters, used to fetch the specific item
  const { id } = useParams();
  const [LeaseDetails, setLeaseDetails] = useState(null);

  useEffect(() => {
    const fetchLease = async () => {
      try {
        const lease = await fetchLeaseDetails(id);
        setLeaseDetails(lease);
      } catch (err) {
        return err;
      }
    };
    fetchLease();
  }, []);

  if (!LeaseDetails) {
    return <Spinner />;
  }
  return (
    <Box>
      <Typography component="h1" align="left" sx={{ fontWeight: "bold", fontSize: "2rem" }}>
        Lease Details for: {id}
        <LeaseView leaseData={LeaseDetails} />
      </Typography>
    </Box>
  );
};

export default LeaseDetails;
