// import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { Button, TextField, Box, Stepper, Step, StepLabel, LinearProgress, Grid2, Paper, Typography } from "@mui/material";
// import SendIcon from "@mui/icons-material/Send";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { createLease } from "../api/leaseApi";
// import { useNavigate } from "react-router";

// const darkTheme = createTheme({
//   palette: {
//     primary: {
//       main: "#000000",
//     },
//   },
// });

// const tenantSchema = z.object({
//   name: z.string().min(1, "Name is required"),
//   email: z.string().email("Invalid email").min(1, "Email is required"),
//   phone: z.string().min(10, "Phone number is required").max(15, "Phone number is too long"),
// });

// const leaseSchema = z.object({
//   rentAmount: z.number().min(1, "Rent amount is required"),
//   apartmentNumber: z.string().min(1, "Apartment number is required"),
//   notes: z.string().optional(),
// });

// const CreateLease = () => {
//   const [activeStep, setActiveStep] = useState(0);
//   const [formData, setFormData] = useState({});
//   const navigate = useNavigate();

//   const {
//     register: registerTenant,
//     handleSubmit: handleSubmitTenant,
//     formState: { errors: tenantErrors },
//   } = useForm({
//     resolver: zodResolver(tenantSchema),
//     defaultValues: {
//       name: "",
//       email: "",
//       phone: "",
//       additionalInfo: "",
//       dob: "",
//     },
//   });

//   const {
//     register: registerLease,
//     handleSubmit: handleSubmitLease,
//     formState: { errors: leaseErrors },
//   } = useForm({
//     resolver: zodResolver(leaseSchema),
//     defaultValues: {
//       leaseStartDate: "",
//       leaseEndDate: "",
//       rentAmount: 0,
//       apartmentNumber: "",
//       notes: "",
//     },
//   });

//   const steps = ["Enter Tenant Details", "Enter Lease Details"];

//   const onSubmitTenant = data => {
//     setFormData(prevData => ({ ...prevData, ...data }));
//     setActiveStep(prevStep => prevStep + 1);
//   };

//   const onSubmitLease = async data => {
//     // setFormData(prevData => ({ ...prevData, ...data }));
//     // setActiveStep(prevStep => prevStep + 1);

//     // try {
//     //   const response = await createLease(formData);
//     // } catch (err) {
//     //   console.log("error", err);
//     // }
//     // // navigate(`/lease-details/${response.leaseId}`, {
//     // //   state: { message: response },
//     // // });
//     console.log("Current formData before update:", formData);
//     console.log("Incoming data:", data);

//     const updatedFormData = { ...formData, ...data };
//     console.log("Updated formData to be sent:", updatedFormData);

//     // const response = await createLease(updatedFormData);
//     // console.log("Lease created successfully:", response);
//     // console.log("Error inside createLease:", err);
//   };

//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://creattie.com/js/embed.js?id=3f6954fde297cd31b441";
//     script.defer = true;
//     document.body.appendChild(script);
//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   const renderFormStep = () => {
//     switch (activeStep) {
//       case 0:
//         return (
//           <form onSubmit={handleSubmitTenant(onSubmitTenant)}>
//             <Typography variant="h6" paddingBottom={1}>
//               Tenant Details
//             </Typography>
//             <TextField
//               label="Name"
//               fullWidth
//               margin="dense"
//               {...registerTenant("name")}
//               error={!!tenantErrors.name}
//               helperText={tenantErrors.name?.message}
//             />
//             <TextField
//               label="Email"
//               fullWidth
//               margin="dense"
//               {...registerTenant("email")}
//               error={!!tenantErrors.email}
//               helperText={tenantErrors.email?.message}
//             />

//             <TextField
//               label="Phone"
//               fullWidth
//               margin="dense"
//               {...registerTenant("phone")}
//               error={!!tenantErrors.phone}
//               helperText={tenantErrors.phone?.message}
//             />

//             <LocalizationProvider dateAdapter={AdapterDateFns}>
//               <DatePicker
//                 label="Date of Birth"
//                 value={formData.dob || null}
//                 onChange={newValue => setFormData({ ...formData, dob: newValue })}
//                 sx={{ width: "100%" }}
//                 slotProps={{
//                   textField: {
//                     error: !!leaseErrors.dob,
//                     helperText: leaseErrors.dob?.message,
//                     fullWidth: true,
//                     margin: "normal",
//                   },
//                 }}
//               />
//             </LocalizationProvider>
//             <TextField label="Additional Info" fullWidth margin="dense" multiline rows={3} {...registerTenant("additionalInfo")} />
//             <Box sx={{ textAlign: "right", paddingTop: 1, paddingRight: 2 }}>
//               <Button type="submit" variant="contained" className="!bg-black text-white !text-center ">
//                 Next
//               </Button>
//             </Box>
//           </form>
//         );
//       case 1:
//         return (
//           <form onSubmit={handleSubmitLease(onSubmitLease)}>
//             <Typography variant="h6" paddingBottom={1}>
//               Lease Details
//             </Typography>
//             <LocalizationProvider dateAdapter={AdapterDateFns}>
//               <Grid2 container spacing={2}>
//                 <Grid2 item xs={6} size={6}>
//                   <DatePicker
//                     label="Lease Start Date"
//                     value={formData.leaseStartDate || null}
//                     onChange={newValue => setFormData({ ...formData, leaseStartDate: newValue })}
//                     sx={{ width: "100%" }}
//                     renderInput={params => (
//                       <TextField
//                         {...params}
//                         error={!!leaseErrors.leaseStartDate}
//                         helperText={leaseErrors.leaseStartDate?.message}
//                         fullWidth
//                         margin="normal"
//                       />
//                     )}
//                   />
//                 </Grid2>

//                 <Grid2 item xs={6} size={6}>
//                   <DatePicker
//                     label="Lease End Date"
//                     value={formData.leaseEndDate || null}
//                     onChange={newValue => setFormData({ ...formData, leaseEndDate: newValue })}
//                     sx={{ width: "100%" }}
//                     renderInput={params => (
//                       <TextField
//                         {...params}
//                         error={!!leaseErrors.leaseEndDate}
//                         helperText={leaseErrors.leaseEndDate?.message}
//                         fullWidth
//                         margin="normal"
//                       />
//                     )}
//                   />
//                 </Grid2>
//               </Grid2>
//             </LocalizationProvider>
//             <TextField
//               label="Monthly Rent (in dollars)"
//               fullWidth
//               margin="normal"
//               type="number"
//               {...registerLease("rentAmount", {
//                 setValueAs: value => parseFloat(value) || 0,
//               })}
//               error={!!leaseErrors.rentAmount}
//               helperText={leaseErrors.rentAmount?.message}
//             />
//             <TextField
//               label="Apartment Number"
//               fullWidth
//               margin="normal"
//               {...registerLease("apartmentNumber")}
//               error={!!leaseErrors.apartmentNumber}
//               helperText={leaseErrors.apartmentNumber?.message}
//             />
//             <TextField
//               label="Notes"
//               fullWidth
//               margin="normal"
//               multiline
//               rows={4}
//               {...registerLease("notes")}
//               error={!!leaseErrors.notes}
//               helperText={leaseErrors.notes?.message}
//             />
//             <Box sx={{ textAlign: "right", paddingTop: 1, paddingRight: 2 }}>
//               <Button type="submit" variant="contained" endIcon={<SendIcon />}>
//                 Send Lease
//               </Button>
//             </Box>
//           </form>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <ThemeProvider theme={darkTheme}>
//       <Grid2
//         container
//         spacing={2}
//         padding={2}
//         style={{ height: "100vh" }}
//         className="min-h-screen flex justify-center items-center"
//         sx={{ padding: 2, flexWrap: "nowrap" }}
//       >
//         <Grid2 item xs={6} md={6} sx={{ color: "black", maxWidth: 600 }}>
//           <Paper sx={{ padding: 2, height: "100%" }}>
//             <Stepper activeStep={activeStep} alternativeLabel>
//               {steps.map((label, index) => (
//                 <Step key={index}>
//                   <StepLabel>{label}</StepLabel>
//                 </Step>
//               ))}
//             </Stepper>
//             <LinearProgress variant="determinate" value={(activeStep / steps.length) * 100} sx={{ marginBottom: 2, marginTop: 2 }} />
//             {renderFormStep()}
//           </Paper>
//         </Grid2>
//         <Grid2 item xs={6} md={6}>
//           <Box
//             sx={{
//               width: "100%",
//               maxWidth: 600,
//             }}
//           >
//             <creattie-embed
//               key="TenantDetails"
//               src="https://d1jj76g3lut4fe.cloudfront.net/saved_colors/116515/1sLGssvLYkqYPJJ5.json"
//               delay="1"
//               speed="90"
//               frame_rate="24"
//               trigger="loop"
//               style={{ width: "100%", backgroundColor: "#ffffff" }}
//             ></creattie-embed>
//           </Box>
//         </Grid2>
//       </Grid2>
//     </ThemeProvider>
//   );
// };

// export default CreateLease;
