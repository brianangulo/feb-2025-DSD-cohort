import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  TextField,
  Box,
  Stepper,
  Step,
  StepLabel,
  LinearProgress,
  Grid2,
  Paper,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { createLease } from "../api/leaseApi";
import { createNewTenant } from "../api/tenantApi";
import toast from "react-hot-toast";

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
  },
});

// Zod schema for tenant details
const tenantSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.string().email("Invalid email").min(1, "Email is required"),
  phoneNumber: z
    .string()
    .min(10, "Phone number is required")
    .max(15, "Phone number is too long"),
});

// Zod schema for lease details
const leaseSchema = z
  .object({
    leaseStartDate: z.date({ message: "Start date is required" }),
    leaseEndDate: z.date({ message: "End date is required" }),
    rent: z
      .number()
      .min(1, "Rent amount is required")
      .or(z.string().transform((val) => Number(val))),
    apartmentNumber: z.string().min(1, "Apartment number is required"),
    notes: z.string().optional(),
  })
  .refine((data) => data.leaseEndDate > data.leaseStartDate, {
    message: "Lease end date must be after the start date",
    path: ["leaseEndDate"],
  });
const CreateLease = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});

  const {
    register: registerTenant,
    handleSubmit: handleSubmitTenant,
    formState: { errors: tenantErrors },
  } = useForm({
    resolver: zodResolver(tenantSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      additionalInfo: "",
      dateOfBirth: "",
    },
  });

  const {
    control,
    register: registerLease,
    handleSubmit: handleSubmitLease,
    formState: { errors: leaseErrors },
  } = useForm({
    resolver: zodResolver(leaseSchema),
    defaultValues: {
      leaseStartDate: null,
      leaseEndDate: null,
      rent: 0,
      apartmentNumber: "",
      notes: "",
    },
  });

  // Form Steps for Tenant and Lease Forms
  const steps = ["Enter Tenant Details", "Enter Lease Details"];

  // Submit Tenant Details

  const onSubmitTenant = (data) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
    setActiveStep((prevStep) => prevStep + 1);
  };

  const onSubmitLease = async (data) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
    setActiveStep((prevStep) => prevStep + 1);

    //create Tenant

    try {
      const responseTenant = await createNewTenant(formData);
      console.log(responseTenant);
      if (responseTenant.status === 200) {
        toast.success(
          `Tenant ${responseTenant.data.first_name} created successfully!`
        );

        const tenantId = responseTenant.data.id;

        //create Lease
        const responseLease = await createLease(data, tenantId);
        console.log(responseLease);

        if (responseLease.status === 200) {
          toast.success(
            `Lease for ${responseLease.data.apartment_number} created successfully!`
          );
        } else {
          toast.error(`${responseLease.data.message}`);
        }
      } else {
        toast.error(`${responseTenant.message}`);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again", error);
    }
  };

  const onError = (errors) => {
    console.log(errors);
  };

  // Load creattie script when component mounts
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://creattie.com/js/embed.js?id=3f6954fde297cd31b441";
    script.defer = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const renderFormStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <form onSubmit={handleSubmitTenant(onSubmitTenant)}>
            <Typography variant="h6" paddingBottom={1}>
              Tenant Details
            </Typography>
            <TextField
              label="First Name"
              fullWidth
              margin="dense"
              {...registerTenant("firstName")}
              error={!!tenantErrors.firstName}
              helperText={tenantErrors.firstName?.message}
            />
            <TextField
              label="Last Name"
              fullWidth
              margin="dense"
              {...registerTenant("lastName")}
              error={!!tenantErrors.lastName}
              helperText={tenantErrors.lastName?.message}
            />
            <TextField
              label="Email"
              fullWidth
              margin="dense"
              {...registerTenant("email")}
              error={!!tenantErrors.email}
              helperText={tenantErrors.email?.message}
            />

            <TextField
              label="Phone"
              fullWidth
              margin="dense"
              {...registerTenant("phoneNumber")}
              error={!!tenantErrors.phoneNumber}
              helperText={tenantErrors.phoneNumber?.message}
            />

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date of Birth"
                value={formData.dateOfBirth || null}
                onChange={(newValue) =>
                  setFormData({ ...formData, dateOfBirth: newValue })
                }
                sx={{ width: "100%" }}
                slotProps={{
                  textField: {
                    error: !!leaseErrors.dateOfBirth,
                    helperText: leaseErrors.dateOfBirth?.message,
                    fullWidth: true,
                    margin: "normal",
                  },
                }}
              />
            </LocalizationProvider>
            <TextField
              label="Additional Info"
              fullWidth
              margin="dense"
              multiline
              rows={3}
              {...registerTenant("additionalInfo")}
            />
            <Box sx={{ textAlign: "right", paddingTop: 1, paddingRight: 2 }}>
              <Button
                type="submit"
                variant="contained"
                className="!bg-black text-white !text-center "
              >
                Next
              </Button>
            </Box>
          </form>
        );
      case 1:
        return (
          <form onSubmit={handleSubmitLease(onSubmitLease, onError)}>
            <Typography variant="h6" paddingBottom={1}>
              Lease Details
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Grid2 container spacing={2}>
                <Grid2 item xs={6} size={6}>
                  <Controller
                    name="leaseStartDate"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        label="Lease Start Date"
                        value={field.value || null}
                        onChange={(newValue) => field.onChange(newValue)}
                        sx={{ width: "100%" }}
                        slotProps={{
                          textField: {
                            error: !!leaseErrors.leaseStartDate,
                            helperText: leaseErrors.leaseStartDate?.message,
                            fullWidth: true,
                            margin: "normal",
                          },
                        }}
                      />
                    )}
                  />
                </Grid2>

                <Grid2 item xs={6} size={6}>
                  <Controller
                    name="leaseEndDate"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        label="Lease End Date"
                        value={field.value || null}
                        onChange={(newValue) => field.onChange(newValue)}
                        sx={{ width: "100%" }}
                        slotProps={{
                          textField: {
                            error: !!leaseErrors.leaseEndDate,
                            helperText: leaseErrors.leaseEndDate?.message,
                            fullWidth: true,
                            margin: "normal",
                          },
                        }}
                      />
                    )}
                  />
                </Grid2>
              </Grid2>
            </LocalizationProvider>

            <TextField
              label="Monthly Rent (in dollars)"
              fullWidth
              margin="normal"
              type="number"
              {...registerLease("rent", {
                setValueAs: (value) => parseFloat(value) || 0,
              })}
              error={!!leaseErrors.rent}
              helperText={leaseErrors.rent?.message}
            />
            <TextField
              label="Apartment Number"
              fullWidth
              margin="normal"
              {...registerLease("apartmentNumber")}
              error={!!leaseErrors.apartmentNumber}
              helperText={leaseErrors.apartmentNumber?.message}
            />
            <TextField
              label="Notes"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              {...registerLease("notes")}
              error={!!leaseErrors.notes}
              helperText={leaseErrors.notes?.message}
            />
            <Box sx={{ textAlign: "right", paddingTop: 1, paddingRight: 2 }}>
              <Button type="submit" variant="contained" endIcon={<SendIcon />}>
                Send Lease
              </Button>
            </Box>
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
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
            <LinearProgress
              variant="determinate"
              value={(activeStep / steps.length) * 100}
              sx={{ marginBottom: 2, marginTop: 2 }}
            />
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
    </ThemeProvider>
  );
};

export default CreateLease;
