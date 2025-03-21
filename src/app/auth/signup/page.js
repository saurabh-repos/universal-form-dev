"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TextField, Button, Box, Typography } from "@mui/material";
import { TbCircleDotted } from "react-icons/tb";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    resetField,
    getValues,
  } = useForm();
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [emailDisabled, setEmailDisabled] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    if (!isEmailVerified) {
      toast.error("Please verify your email first!");
      return;
    }
    
    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
          dob: data.dob,
        }),
      });

      const responseData = await response.json();
      if (!responseData.success) {
        throw new Error(responseData.errors);
      }


      toast.success("Signup Successful!");
      document.cookie = `token=${responseData.data.accessToken}; path=/`;
        
        // router.push("/forms/create?id=0"); 
        window.location.href = "/forms/create";
    } catch (error) {
      toast.error(error.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyEmail = async () => {
    const email = getValues("email");
    if (!email) {
      toast.error("Please enter an email address");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/sendOtp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          username: email.split('@')[0],
          reason: "Register"
        }),
      });
      const responseData = await response.json();
      if (!responseData.success) {
        throw new Error(responseData.errors);
      }

      setOtpSent(true);
      setEmailDisabled(true);
      toast.info("OTP sent to your email!");
    } catch (error) {
      toast.error(error.message || "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpVerification = async () => {
    const otp = getValues("otp");
    const email = getValues("email");
    
    if (!otp) {
      toast.error("Please enter OTP");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/verifyOtp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          otp: parseInt(otp),
        }),
      });
      const responseData = await response.json();
      if (!responseData.success) {
        throw new Error(responseData.errors);
      }

      setIsEmailVerified(true);
      toast.success("Email Verified Successfully!");
    } catch (error) {
      toast.error(error.message || "OTP verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    toast.info("Google login clicked");
  };

  const handleChangeEmail = () => {
    setIsEmailVerified(false);
    setOtpSent(false);
    setEmailDisabled(false);
    resetField("email"); // Clear the email field
    resetField("otp"); // Clear the OTP field if any
    toast.info("You can now enter a new email.");
  };

  return (
    <div className="p-2 h-screen flex flex-col">
      <div className="w-40 flex justify-center items-center p-2 gap-1 border border-black rounded-2xl">
        <TbCircleDotted />
        <p>Approval System</p>
      </div>
      <Box className="flex justify-center items-center flex-1 bg-white">
        <Box className="w-[27%] flex flex-col gap-2">
          <p className="w-full text-center text-2xl font-bold">
            Welcome to Approval System
          </p>
          <div
            className="flex justify-center items-center gap-2 border border-black rounded-md py-2 mt-4 cursor-pointer"
            onClick={handleGoogleLogin}
          >
            <FcGoogle />
            <p>Continue with Google</p>
          </div>

          <Typography className="text-center text-gray-500 mt-2">or</Typography>
          <TextField
            label="Email"
            type="email"
            fullWidth
            variant="filled"
            disabled={emailDisabled || isEmailVerified}
            {...register("email", { required: "Email is required" })}
            error={!!errors.email}
            helperText={errors.email?.message}
            className="mt-4"
          />

          {/* Verify Email Button (Hidden After Click) */}
          {!otpSent && (
            <Button
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "black",
                color: "white",
                height: "3rem",
                mt: 2,
              }}
              onClick={handleVerifyEmail}
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Verify Email"}
            </Button>
          )}

          {/* OTP Field */}
          {otpSent && !isEmailVerified && (
            <>
              <div className="mt-4">
                <TextField
                  label="Enter OTP"
                  type="text"
                  fullWidth
                  variant="filled"
                  {...register("otp", { required: "OTP is required" })}
                  error={!!errors.otp}
                  helperText={errors.otp?.message}
                  className="mt-4"
                />
              </div>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  height: "3rem",
                  mt: 2,
                }}
                onClick={handleOtpVerification}
              >
                Confirm OTP
              </Button>
            </>
          )}

          {/* Sign-Up Fields */}
          {isEmailVerified && (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4 mt-6"
            >
              <TextField
                label="Username"
                type="text"
                fullWidth
                variant="filled"
                {...register("username", { required: "Username is required" })}
                error={!!errors.username}
                helperText={errors.username?.message}
              />

              <TextField
                label="Password"
                type="password"
                fullWidth
                variant="filled"
                {...register("password", { required: "Password is required" })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />

              <TextField
                label="Confirm Password"
                type="password"
                fullWidth
                variant="filled"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
              />

              <TextField
                label="Date of Birth"
                type="date"
                fullWidth
                variant="filled"
                InputLabelProps={{ shrink: true }}
                {...register("dob", { required: "Date of Birth is required" })}
                error={!!errors.dob}
                helperText={errors.dob?.message}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  height: "3rem",
                }}
              >
                Sign Up
              </Button>
            </form>
          )}

          <p
            className="text-center mt-1 text-blue-500 text-sm hover:underline cursor-pointer"
            onClick={() => router.push("/auth/login")}
          >
            Already have an account? Log in
          </p>
          {/* Change Email Button */}
          {(otpSent || isEmailVerified) && (
            <p
              className="text-center mt-1 mb-4 text-blue-500 text-sm hover:underline cursor-pointer"
              onClick={handleChangeEmail}
            >
              Change Email
            </p>
          )}
        </Box>
      </Box>
    </div>
  );
}
