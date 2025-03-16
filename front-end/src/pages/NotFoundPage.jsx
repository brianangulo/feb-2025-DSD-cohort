import { Box, Link, Typography } from "@mui/material";

const NotFoundPage = () => {
  return (
    <Box className="h-full flex flex-col items-center justify-center">
      <Typography
        component="h1"
        align="left"
        sx={{ fontWeight: "bold", fontSize: "2rem" }}
      >
        404 Page not found
      </Typography>
      <div>
        Go back to{" "}
        <Link href="/" underline="always">
          Homepage
        </Link>
      </div>
    </Box>
  );
};

export default NotFoundPage;
