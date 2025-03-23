import { Box, Grid2, Button } from "@mui/material";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { fetchLease } from "../../api/leaseApi";
import Spinner from "../../components/Spinner";
import LeaseDetailsHeader from "../../components/leaseDetails/LeaseDetailsHeader";
import LeaseApartmentDetails from "../../components/leaseDetails/LeaseApartmentDetails";
import LeaseTenantDetails from "../../components/leaseDetails/LeaseTenantDetails";
import LeaseDuration from "../../components/leaseDetails/LeaseDuration";
import LeaseRent from "../../components/leaseDetails/LeaseRent";

const Lease = () => {
  // Id took from the URL parameters, used to fetch the specific item
  const { id } = useParams();
  const [lease, setLease] = useState(null);

  useEffect(() => {
    async function fetchLeaseInfo() {
      try {
        const lease = await fetchLease(id);
        setLease(lease);
      } catch (err) {
        return err;
      }
    }
    fetchLeaseInfo(id);
  }, [id]);

  if (!lease) {
    return <Spinner />;
  }

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", minHeight: "90vh", p: 2 }}
    >
      <Button
        component={Link} 
        to={`/lease-details/${id}`}
        variant="contained"
        sx={{ display: "flex", marginLeft: "auto", marginBottom: "5px", width: "15%", p: 1 }}
      >
        View PDF
      </Button>

      <LeaseDetailsHeader status={lease.leaseStatus} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          border: 1,
          p: 2,
        }}
      >
        <LeaseApartmentDetails apartment={lease.apartmentInformation} />
        <LeaseTenantDetails tenant={lease.tenantInformation} />
      </Box>

      <LeaseDuration
        startDate={lease.leaseStartDate}
        endDate={lease.leaseEndDate}
      />

      <LeaseRent rent={lease.monthlyRent} />
    </Box>
  );
};

export default Lease;
