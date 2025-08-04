'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input, Button, message } from 'antd';
import axios from 'axios';
import { apiBaseUrl } from '@/config/config';

interface Props {
  onSuccess: (email: string) => void;
}

const ForgotPasswordForm: React.FC<Props> = ({ onSuccess }) => {
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<{ email: string }>();

  const onSubmit = async (data: { email: string }) => {
    try {
      await axios.post(`${apiBaseUrl}/forgot-password`, { email: data.email });
      message.success("OTP sent to your email");
      onSuccess(data.email);
    } catch (error) {
      console.error(error);
      message.error("Failed to send OTP. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-2xl font-semibold text-center">Forgot Password</h2>

      <Controller
        name="email"
        control={control}
        rules={{ required: "Email is required" }}
        render={({ field }) => (
          <Input
            {...field}
            placeholder="Enter your email"
            type="email"
          />
        )}
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

      <Button type="primary" htmlType="submit" block loading={isSubmitting}>
        Send OTP
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;
