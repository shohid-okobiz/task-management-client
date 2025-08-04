"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card } from "antd";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

const ResetPasswordClient: React.FC = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const router = useRouter();

  React.useEffect(() => {
    if (!email) {
      router.replace("/forgot-password");
    }
  }, [email, router]);

  if (!email) return null;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-lg">
        <ResetPasswordForm email={email} />
      </Card>
    </div>
  );
};

export default ResetPasswordClient;
