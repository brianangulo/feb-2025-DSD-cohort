import { zodResolver } from "@hookform/resolvers/zod";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Button,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import api from "../api";

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleClickShowPassword = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(signupSchema) });

  const onSubmit = async (formData) => {
    api
      .post("/auth/signup", formData)
      .then((res) => {
        if (res.status === 200) {
          navigate("/dashboard");
        } else {
          navigate("/signup");
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log("Error Status:", err.response.status);
          console.log("Error Message:", err.response.data.message);
        }
      });
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="bg-gray-100 border border-gray-300 p-8 rounded-xl max-w-md  xl:w-sm"
    >
      <Stack spacing={2}>
        <TextField
          required
          name="firstName"
          label="First Name"
          type="text"
          {...register("firstName")}
          error={errors?.firstName}
          helperText={errors?.firstName?.message}
        />
        <TextField
          required
          name="lastName"
          label="Last Name"
          type="text"
          {...register("lastName")}
          error={errors?.lastName}
          helperText={errors?.lastName?.message}
        />
        <TextField
          required
          name="email"
          label="Email"
          type="email"
          {...register("email")}
          error={errors?.email}
          helperText={errors?.email?.message}
        />
        <TextField
          required
          name="password"
          label="Password"
          {...register("password")}
          error={errors?.password}
          helperText={errors?.password?.message}
          type={showPassword.password ? "text" : "password"}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword.password ? "Hide password" : "Show password"
                    }
                    onClick={() => handleClickShowPassword("password")}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword.password ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        <TextField
          required
          name="confirmPassword"
          label="Confirm Password"
          {...register("confirmPassword")}
          error={errors?.confirmPassword}
          helperText={errors?.confirmPassword?.message}
          type={showPassword.confirmPassword ? "text" : "password"}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword.confirmPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    onClick={() => handleClickShowPassword("confirmPassword")}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword.confirmPassword ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting || Object.keys(errors).length > 0}
        >
          {isSubmitting ? "Submitting..." : "Create new account"}
        </Button>
      </Stack>
      <p className="mt-4 text-center">
        Already have an account? <Link href="/">Login</Link>
      </p>
    </form>
  );
};

export default SignupForm;

// Zod schema to validate inputs and display error messages
const signupSchema = z
  .object({
    firstName: z
      .string()
      .min(1, { message: "First Name is required." })
      .max(30, { message: "First Name cannot exceed 30 characters." })
      .trim(),

    lastName: z
      .string()
      .min(1, { message: "Last Name is required." })
      .max(30, { message: "Last Name cannot exceed 30 characters." })
      .trim(),

    email: z
      .string()
      .min(1, { message: "Email is required." })
      .email({ message: "Please enter a valid email address." })
      .max(30, { message: "Email cannot exceed 30 characters." })
      .toLowerCase()
      .trim(),

    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." }),

    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required." }),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: "Passwords do not match.",
      path: ["confirmPassword"],
    }
  );
