import { Box, Typography, Grid2 } from "@mui/material";

const LeaseRent = ({ rent }) => {
  return (
    <Box sx={{ 
      display: "flex", 
      flexDirection: "column",
      justifyContent: 'space-between', 
      border: 1,
      p:2 }}
    >
      <Typography>Rent</Typography>
      <Box sx={{ 
        display: "flex", 
        justifyContent: 'space-between'}}
      >
        <Grid2 size={{ xs: 12, md: 20 }}>
          <Typography>Payable on</Typography>
          <p>First of every month</p>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 20 }}>
          <Typography>Current Rent</Typography>
          <p>${rent} per month</p>
        </Grid2>
      </Box>
    </Box>
  );
};

export default LeaseRent;
