import { Box, Typography, Grid2 } from "@mui/material";
import { Link } from "react-router";

const LeaseTenantDetails = ({ tenant }) => {
  return (
    <Box>
      <Typography>Tenant</Typography>
      <Grid2 size={{ xs: 12, md: 20 }}>
        <Link className="underline" to={`/tenant-details/${tenant.tenantId}`}>
          <p>{tenant.tenantName}</p>
        </Link>
      </Grid2>
    </Box>
  );
};

export default LeaseTenantDetails;
