'use client';

import React from "react";
import { useRouter } from "next/navigation";
import { Card } from "antd";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

const ForgotPasswordPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 w-full px-4">
      <Card className="w-full max-w-lg">
        <ForgotPasswordForm
          onSuccess={(submittedEmail) => {
            router.push(`/forgot-password/reset?email=${encodeURIComponent(submittedEmail)}`);
          }}
        />
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
