'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input, Button, message, Typography, Card } from 'antd';
import axios from 'axios';
import { apiBaseUrl } from '@/config/config';

const { Title, Text } = Typography;

interface Props {
  onSuccess: (email: string) => void;
}

const ForgotPasswordForm: React.FC<Props> = ({ onSuccess }) => {
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<{ email: string }>();

  const onSubmit = async (data: { email: string }) => {
    try {
      await axios.post(`${apiBaseUrl}/forgot-password`, { email: data.email });
      message.success("OTP sent to your email.");
      onSuccess(data.email);
    } catch (error) {
      console.error(error);
      message.error("Failed to send OTP. Please try again.");
    }
  };

  return (
    <div className="">
      <Card className="w-full max-w-lg  rounded-xl p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="text-center">
            <Title level={3}>Forgot Password</Title>
            <Text type="secondary">Enter your registered email to receive an OTP.</Text>
          </div>

          <div>
            <Controller
              name="email"
              control={control}
              rules={{ required: "Email is required" }}
              render={({ field }) => (
                <Input {...field} placeholder="Enter your email" type="email" size="large" />
              )}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            loading={isSubmitting}
            className='!bg-green-500 !hover:bg-green-600'
          >
            Send OTP
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ForgotPasswordForm;
