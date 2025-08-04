'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input, Button, message, Space, } from 'antd';
import axios from 'axios';
import { apiBaseUrl } from '@/config/config';

interface Props {
  email: string;
}

const ResetPasswordForm: React.FC<Props> = ({ email }) => {
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<{
    otp: string;
    newPassword: string;
  }>();

  const onSubmit = async (data: { otp: string; newPassword: string }) => {
    try {
      await axios.post(`${apiBaseUrl}/reset-password`, {
        email,
        otp: data.otp,
        newPassword: data.newPassword,
      });
      message.success("Password reset successfully!");
    } catch (error) {
      console.error(error);
      message.error("Invalid OTP or error occurred.");
    }
  };

  const handleResendOtp = async () => {
    try {
      await axios.post(`${apiBaseUrl}/resend-forgot-password`, { email });
      message.success("OTP resent successfully!");
    } catch (error) {
      message.error("Failed to resend OTP.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-2xl font-semibold text-center">Reset Password</h2>


      <Controller
        name="otp"
        control={control}
        rules={{ required: "OTP is required" }}
        render={({ field }) => (
          <Input
            {...field}
            placeholder="Enter OTP"
            type="text"
          />
        )}
      />
      {errors.otp && <p className="text-red-500 text-sm">{errors.otp.message}</p>}

      <Controller
        name="newPassword"
        control={control}
        rules={{
          required: "New password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters",
          },
        }}
        render={({ field }) => (
          <Input.Password
            {...field}
            placeholder="New Password"
          />
        )}
      />
      {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword.message}</p>}

      <Space className="w-full flex flex-col">
        <Button type="primary" htmlType="submit" block loading={isSubmitting}>
          Reset Password
        </Button>
        <Button type="link" onClick={handleResendOtp}>
          Resend OTP
        </Button>
      </Space>
    </form>
  );
};

export default ResetPasswordForm;
