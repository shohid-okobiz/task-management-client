"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card } from "antd";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

const ResetPasswordPage: React.FC = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const router = useRouter();

  // If no email in query, redirect to forgot-password
  React.useEffect(() => {
    if (!email) {
      router.replace("/forgot-password");
    }
  }, [email, router]);

  if (!email) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <ResetPasswordForm email={email} />
      </Card>
    </div>
  );
};

export default ResetPasswordPage;
