import { Box, Typography, Grid2 } from "@mui/material";
import { Link } from "react-router";

const LeaseApartmentDetails = ({ apartment }) => {
  return (
    <Box>
      <Typography>Apartment Details</Typography>
      <Grid2 size={{ xs: 12, md: 20 }}>
        <p>
          Apt. #:{" "}
          <Link
            className="underline"
            to={`/apartment-details/${apartment.apartmentId}`}
          >
            {apartment.apartmentNumber}
          </Link>
        </p>
        <p>Address: {apartment.apartmentAddress}</p>
      </Grid2>
    </Box>
  );
};

export default LeaseApartmentDetails;
