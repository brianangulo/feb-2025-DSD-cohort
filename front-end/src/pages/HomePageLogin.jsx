import { Grid2, Typography } from "@mui/material";
import apartmentPhoto from "../assets/ApartmentPhoto.jpeg";
import LoginForm from "../components/LoginForm";

const HomePage = () => {
  return (
    <Grid2 container spacing={2} padding={2} className="min-h-screen">
      <Grid2 size={{ xs: 12, md: 6 }}>
        <img
          src={apartmentPhoto}
          alt="A stylish urban apartment building with large glass windows and balconies, surrounded by tall, leafy green trees. The building has a sleek, contempora.webp"
          className="h-full object-cover"
        />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <div className="h-full flex flex-col items-center justify-center bg-slate-500 p-6">
          <Typography
            component="h1"
            sx={{
              fontWeight: "bold",
              fontSize: "2rem",
              color: "white",
              marginBottom: "1rem",
            }}
          >
            Login
          </Typography>
          <LoginForm />
        </div>
      </Grid2>
    </Grid2>
  );
};

export default HomePage;
