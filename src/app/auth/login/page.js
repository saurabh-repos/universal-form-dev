"use client";

import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TextField, Button, Box, Typography } from "@mui/material";
import { TbCircleDotted } from "react-icons/tb";
import { Router } from "next/router";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Login Data:", data);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/user/login `, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        
        // Set the token in cookies
        document.cookie = `token=${responseData.data.accessToken}; path=/`;
        
        toast.success("Login Successful!");
        // router.push("/forms/create?id=0"); 
        window.location.href = "/forms/create?id=0";
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error("An error occurred during login");
    }
  };

  return (
    <div className="p-2 h-screen flex flex-col">
      <div className="w-40 flex justify-center items-center p-2 gap-1 border border-black rounded-2xl">
        <TbCircleDotted />
        <p>Approval System</p>
      </div>
      <Box className="flex justify-center items-center flex-1 bg-white">
        <Box className="w-[27%]">
          <p className="w-full text-center text-2xl font-bold">
            Welcome to Approval System
          </p>
          <div className="flex flex-col mt-8 gap-4">
            <div className="flex justify-center items-center gap-2 border border-black rounded-md py-2">
              <FcGoogle />
              <p>Continue with Google</p>
            </div>

            <Typography className="text-center text-gray-500">or</Typography>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              variant="filled"
              {...register("email", { required: "Email is required" })}
              error={!!errors.email}
              helperText={errors.email?.message}
              margin="normal"
              className="outline-none"
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              variant="filled"
              {...register("password", { required: "Password is required" })}
              error={!!errors.password}
              helperText={errors.password?.message}
              margin="normal"
            />
            <div className="mt-2">
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
                Get Started
              </Button>
            </div>
          </form>

          <p className="text-center mt-4">
            <a href="#" className="text-blue-500 text-sm hover:underline">
              Reset password
            </a>
          </p>
        </Box>
      </Box>
    </div>
  );
}
