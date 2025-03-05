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
  } = useForm();
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [emailDisabled, setEmailDisabled] = useState(false);
  const router = useRouter();

  const onSubmit = (data) => {
    if (!isEmailVerified) {
      toast.error("Please verify your email first!");
      return;
    }
    console.log("Signup Data:", data);
    toast.success("Signup Successful!");
    router.push("/auth/login");
  };

  const handleVerifyEmail = () => {
    setOtpSent(true);
    setEmailDisabled(true);
    toast.info("OTP sent to your email!");
  };

  const handleOtpVerification = () => {
    setIsEmailVerified(true);
    toast.success("Email Verified Successfully!");
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
            >
              Verify Email
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
