import { Box, Typography } from "@mui/material";

const SettingsPage = () => {
  return (
    <Box>
      <Typography
        component="h1"
        align="left"
        sx={{ fontWeight: "bold", fontSize: "2rem" }}
      >
        Account Settings
      </Typography>
    </Box>
  );
};

export default SettingsPage;
