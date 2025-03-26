import { zodResolver } from "@hookform/resolvers/zod";
import SendIcon from "@mui/icons-material/Send";
import { Box, Button, Grid2, TextField, Typography } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { createLease } from "../api/leaseApi";
import Spinner from "../components/Spinner";

import { useNavigate } from "react-router";
const leaseSchema = z.object({
  lease_start_date: z.date({ required_error: "Lease start date is required." }).refine(date => !isNaN(date.getTime()), {
    message: "Please select a valid date",
  }),
  lease_end_date: z.date({ required_error: "Lease end date is required." }).refine(date => !isNaN(date.getTime()), {
    message: "Please select a valid date",
  }),
  monthly_rent_in_dollars: z.string().transform(val => Number(val)),
  notes: z.string().max(100).optional(),
  apartment_id: z.string().transform(val => Number(val)),
});

const LeaseForm = ({ setActiveStep, tenantFormData, apartmentId }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    isSubmitting,
    formState: { errors },
  } = useForm({
    defaultValues: {
      apartment_id: apartmentId,
    },
    resolver: zodResolver(leaseSchema),
  });

  console.log("step 2", tenantFormData);
  const { mutate } = useMutation({
    mutationFn: async data => {
      try {
        const response = await createLease(data);
        if (response.status === 200) {
          toast.success("Lease created successfully");
          navigate(`/lease-details/${response.data.id}`);
        } else {
          toast.error(response.response.data.message);

          console.log("inside else mthod");
          setActiveStep(0);
        }
      } catch (error) {
        setActiveStep(0);
        toast.error(error.message || "An error occurred. Please try again");
      }
    },
    onError: error => {
      console.log("on oeerror occured");
      toast.error(error.message || "An error occurred. Please try again");
      setActiveStep(0);
    },
    onMutate: () => {
      return <Spinner />;
    },
    onSuccess: () => {
      setActiveStep(prevStep => prevStep + 1);
    },
  });

  const onSubmit = async leaseFormData => {
    mutate({ ...tenantFormData, ...leaseFormData });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" {...register("apartment_id")} />
      <Typography variant="h6" paddingBottom={1}>
        Lease Details
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Grid2 container spacing={2}>
          <Grid2 item xs={6} size={6}>
            {/* Controllers needed to manage the mui input state via react hook form with custom error element */}
            <Controller
              name="lease_start_date"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="Start Date"
                  className="w-full"
                  disablePast
                  value={field.value || null}
                  onChange={date => field.onChange(date)}
                  renderInput={params => <TextField {...params} fullWidth />}
                />
              )}
            />
            <p className="text-xs text-red-700 mt-1.5">{errors.lease_start_date?.message}</p>
          </Grid2>
          <Grid2 item xs={6} size={6}>
            <Controller
              name="lease_end_date"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="End Date"
                  disablePast
                  className="w-full"
                  value={field.value || null}
                  onChange={date => field.onChange(date)}
                />
              )}
            />
            <p className="text-xs text-red-700 mt-1.5">{errors.lease_start_date?.message}</p>
          </Grid2>
        </Grid2>
      </LocalizationProvider>
      <TextField
        label="Monthly Rent (in dollars)"
        fullWidth
        type="number"
        margin="normal"
        {...register("monthly_rent_in_dollars")}
        error={!!errors.monthly_rent_in_dollars}
        helperText={errors.monthly_rent_in_dollars?.message}
      />
      <TextField
        label="Notes"
        fullWidth
        margin="normal"
        multiline
        rows={4}
        {...register("notes")}
        error={!!errors.notes}
        helperText={errors.notes?.message}
      />
      <Box sx={{ textAlign: "right", paddingTop: 1, paddingRight: 2 }}>
        <Button type="submit" variant="contained" disabled={isSubmitting || Object.keys(errors).length > 0} endIcon={<SendIcon />}>
          {isSubmitting ? "Submitting..." : "Send Lease"}
        </Button>
      </Box>
    </form>
  );
};

export default LeaseForm;
