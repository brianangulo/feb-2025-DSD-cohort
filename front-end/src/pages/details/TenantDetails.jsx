import { Box, Typography } from "@mui/material";
import { useParams } from "react-router";

const TenantDetails = () => {
  // Id took from the URL parameters, used to fetch the specific item
  const { id } = useParams();

  return (
    <Box>
      <Typography
        component="h1"
        align="left"
        sx={{ fontWeight: "bold", fontSize: "2rem" }}
      >
        Tenant Details for: {id}
      </Typography>
    </Box>
  );
};

export default TenantDetails;
