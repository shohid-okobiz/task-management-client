"use client";

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { message } from "antd";
import IllustrationPanel from "@/components/ui/IllustrationPanel";
import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";
import AuthApis from "@/app/apis/auth.apis";
import Link from "next/link";

const Login: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [messageApi, contextHolder] = message.useMessage();

  const { mutate, isPending } = useMutation({
    mutationFn: AuthApis.loginApi,
    onSuccess: async (data: any) => {
      messageApi.success("Login successfully done!");
      if (typeof window !== 'undefined' && data?.accessToken) {
        document.cookie = `accessToken=${data.accessToken}; path=/; secure; samesite=strict`;
        document.cookie = `refreshToken=${data.refreshToken}; path=/; secure; samesite=strict`;
        document.cookie = `isVerified=${data.isVerified}; path=/; secure; samesite=strict`;
      }
      await router.push("/user-dashboard");
    },
    onError: () => {
      messageApi.error("Invalid email or password");
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex overflow-hidden">
      {contextHolder}
      <IllustrationPanel />
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg p-8 space-y-6"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Log In</h1>
            <p className="text-gray-600">Access your account</p>
          </div>
          <InputField
            id="email"
            name="email"
            type="email"
            label="Email Address"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <InputField
            id="password"
            name="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <Button
            type="submit"
            className="w-full"
            loading={isPending}
            disabled={isPending || !formData.email || !formData.password}
          >
            Log In
          </Button>
          <div className="text-end mt-4">
            <Link
              href="/forgot-password"
              className="text-green-500 hover:text-green-600 font-medium focus:outline-none focus:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="text-center mt-2">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link
                href="/"
                className="text-green-500 hover:text-green-600 font-medium focus:outline-none focus:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
