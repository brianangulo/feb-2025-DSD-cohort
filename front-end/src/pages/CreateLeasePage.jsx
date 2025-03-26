import { Box, Grid2, LinearProgress, Paper, Step, StepLabel, Stepper } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router";
import LeaseForm from "../components/LeaseForm";
import TenantForm from "../components/TenantForm";

const CreateLease = () => {
  const { id: apartmentId } = useParams();
  const [activeStep, setActiveStep] = useState(0);
  const [tenantFormData, setTenantFormData] = useState({});

  console.log("active step", activeStep);
  const steps = ["Enter Tenant Details", "Enter Lease Details"];

  const renderFormStep = () => {
    switch (activeStep) {
      case 0:
        return <TenantForm setActiveStep={setActiveStep} setTenantFormData={setTenantFormData} />;
      case 1:
        return (
          <LeaseForm setActiveStep={setActiveStep} setTenantFormData={setTenantFormData} tenantFormData={tenantFormData} apartmentId={apartmentId} />
        );
      default:
        return null;
    }
  };

  return (
    <Grid2
      container
      spacing={2}
      padding={2}
      style={{ height: "100vh" }}
      className="min-h-screen flex justify-center items-center"
      sx={{ padding: 2, flexWrap: "nowrap" }}
    >
      <Grid2 item xs={6} md={6} sx={{ color: "black", maxWidth: 600 }}>
        <Paper sx={{ padding: 2, height: "100%" }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={index}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <LinearProgress variant="determinate" value={(activeStep / steps.length) * 100} sx={{ marginBottom: 2, marginTop: 2 }} />
          {renderFormStep()}
        </Paper>
      </Grid2>
      <Grid2 item xs={6} md={6}>
        <Box
          sx={{
            width: "100%",
            maxWidth: 600,
          }}
        >
          <creattie-embed
            key="TenantDetails"
            src="https://d1jj76g3lut4fe.cloudfront.net/saved_colors/116515/1sLGssvLYkqYPJJ5.json"
            delay="1"
            speed="90"
            frame_rate="24"
            trigger="loop"
            style={{ width: "100%", backgroundColor: "#ffffff" }}
          ></creattie-embed>
        </Box>
      </Grid2>
    </Grid2>
  );
};

export default CreateLease;
