import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Grid2, TextField, Typography } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const tenantSchema = z.object({
  first_name: z.string().min(1, { message: "First name is required." }),
  last_name: z.string().min(1, { message: "Last name is required." }),
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Please enter a valid email address." })
    .toLowerCase()
    .trim(),
  date_of_birth: z
    .date({ required_error: "Date of birth is required." })
    .refine((date) => !isNaN(date.getTime()), {
      message: "Please select a valid date.",
    }),
  phone_number: z
    .string()
    .min(1, { message: "Phone number is required." })
    .regex(/^\+?[0-9\s\-()]+$/, { message: "Invalid phone number format." })
    .transform((val) => Number(val)),
  additional_information: z.string().nullable().optional(),
});

const TenantForm = ({ setTenantFormData, setActiveStep }) => {
  const {
    register,
    handleSubmit,
    control,
    isSubmitting,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(tenantSchema),
  });

  const onSubmit = (data) => {
    setTenantFormData(data);
    setActiveStep((prevStep) => prevStep + 1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <Typography variant="h6" paddingBottom={1}>
        Tenant Details
      </Typography>
      <Grid2 container spacing={2}>
        <Grid2 item xs={6} size={6}>
          <TextField
            label="First Name"
            fullWidth
            margin="dense"
            {...register("first_name")}
            error={!!errors.first_name}
            helperText={errors.first_name?.message}
          />
        </Grid2>
        <Grid2 item xs={6} size={6}>
          <TextField
            label="Last Name"
            fullWidth
            margin="dense"
            {...register("last_name")}
            error={!!errors.last_name}
            helperText={errors.last_name?.message}
          />
        </Grid2>
      </Grid2>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        {/* Controller needed to manage the mui input state via react hook form with custom error element */}
        <Controller
          name="date_of_birth"
          control={control}
          render={({ field }) => (
            <DatePicker
              {...field}
              label="Date of Birth"
              className="w-full"
              name="date"
              value={field.value || null}
              onChange={(date) => field.onChange(date)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          )}
        />
        <p className="text-xs text-red-700 mt-1.5">
          {errors.date_of_birth?.message}
        </p>
      </LocalizationProvider>
      <TextField
        label="Email"
        fullWidth
        {...register("email")}
        margin="dense"
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        label="Phone"
        fullWidth
        margin="dense"
        type="number"
        {...register("phone_number")}
        error={!!errors.phone_number}
        helperText={errors.phone_number?.message}
      />
      <TextField
        label="Additional Info"
        fullWidth
        margin="dense"
        multiline
        rows={3}
        {...register("additional_information")}
        error={!!errors.additional_information}
        helperText={errors.additional_information?.message}
      />
      <Box sx={{ textAlign: "right", paddingTop: 1, paddingRight: 2 }}>
        <Button
          type="submit"
          variant="contained"
          className="text-center"
          disabled={isSubmitting || Object.keys(errors).length > 0}
        >
          Next
        </Button>
      </Box>
    </form>
  );
};

export default TenantForm;
