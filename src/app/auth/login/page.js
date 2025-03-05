"use client";

import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TextField, Button, Box, Typography } from "@mui/material";
import { TbCircleDotted } from "react-icons/tb";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter()

  const onSubmit = (data) => {
    console.log("Login Data:", data);
    toast.success("Login Successful!");
  };

  const handleSignUp = () =>{
    router.push('/auth/signup')
  }

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

          <p className="text-center mt-4 text-blue-500 text-sm hover:underline cursor-pointer">
            Reset password
          </p>
          <p className="text-center mt-1 text-blue-500 text-sm hover:underline cursor-pointer" onClick={handleSignUp}>
            Sign Up
          </p>
        </Box>
      </Box>
    </div>
  );
}
