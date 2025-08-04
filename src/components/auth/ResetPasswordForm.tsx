'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input, Button, message, Space, Typography, Divider } from 'antd';
import axios from 'axios';
import { apiBaseUrl } from '@/config/config';
import { useRouter } from 'next/navigation';

const { Title, Text } = Typography;

interface Props {
  email: string;
}

const ResetPasswordForm: React.FC<Props> = ({ email }) => {
  const router = useRouter()
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ otp: string; newPassword: string }>();

  const onSubmit = async (data: { otp: string; newPassword: string }) => {
    try {
      await axios.post(`${apiBaseUrl}/reset-password`, {
        email,
        otp: data.otp,
        newPassword: data.newPassword,
      });
      message.success('Password reset successfully!');
      router.replace('/login')
    } catch (error) {
      console.error(error);
      message.error('Invalid OTP or error occurred.');
    }
  };

  const handleResendOtp = async () => {
    try {
      await axios.post(`${apiBaseUrl}/resend-forgot-password`, { email });
      message.success('OTP resent successfully!');
    } catch (error) {
      message.error('Failed to resend OTP.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 p-2 md:p-0"
    >
      <div className="text-center">
        <Title level={3}>Reset Your Password</Title>
        <Text type="secondary">
          Enter the OTP sent to <span className="font-medium">{email}</span> and choose a new password.
        </Text>
      </div>

      <Divider className="my-2" />

      <div>
        <label className="block mb-1 font-medium text-gray-700">OTP</label>
        <Controller
          name="otp"
          control={control}
          rules={{ required: 'OTP is required' }}
          render={({ field }) => (
            <Input
              {...field}
              size="large"
              placeholder="Enter OTP"
              className="rounded-lg"
            />
          )}
        />
        {errors.otp && (
          <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700">New Password</label>
        <Controller
          name="newPassword"
          control={control}
          rules={{
            required: 'New password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          }}
          render={({ field }) => (
            <Input.Password
              {...field}
              size="large"
              placeholder="Enter new password"
              className="rounded-lg"
            />
          )}
        />
        {errors.newPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>
        )}
      </div>

      <div className="flex flex-col space-y-3 pt-2">
        <Button
          type="primary"
          htmlType="submit"
          block
          size="large"
          loading={isSubmitting}
          className="rounded-lg !bg-green-500 !hover:bg-green-600"
        >
          Reset Password
        </Button>

        <Button
          type="default"
          block
          size="large"
          onClick={handleResendOtp}
          className="rounded-lg !text-end !border-0"
        >
          Resend OTP
        </Button>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
