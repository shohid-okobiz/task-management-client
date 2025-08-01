import AuthApis from "@/app/apis/auth.apis";
import { LoginResponse, OtpResponse, SignupResponse } from "@/types/authTypes/authTypes";


const {
    loginApi,
    refreshTokenApi,
    logoutApi,
    signupApi,
    verifyEmailOtpApi,
    otpResendApi,
    changedPassApi,
    forgotPasswordApi,
    resetPasswordApi,
    resendForgotPasswordOtpApi,
} = AuthApis;

export const AuthServices = {
    processSignup: async (payload: {
        name: string;
        email: string;
        password: string;
        
    }): Promise<SignupResponse> => {
        try {
            const response = await signupApi(payload);
            return response?.data as SignupResponse;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error("Unknown error occurred in processSignup");
            }
        }
    },
    processChangePassword: async (payload: {
        oldPassword: string;
        newPassword: string;
    }) => {
        try {
            const response = await changedPassApi(payload);
            return response;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error("Unknown error occurred in processChangedPass");
            }
        }
    },
    processLogin: async (payload: {
        email: string;
        password: string;
    }): Promise<LoginResponse> => {
        try {
            const response = await loginApi(payload);
            return response.data as LoginResponse;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error("Unknown error occurred in processLogin");
            }
        }
    },
    processVerifyEmailOtp: async (payload: {
        email: string;
        otp: string;
    }): Promise<OtpResponse> => {
        try {
            const response = await verifyEmailOtpApi(payload);
            return response?.data as OtpResponse;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error("Unknown error occurred in processSignup");
            }
        }
    },
    processResendOtp: async (payload: {
        email: string;
    }): Promise<OtpResponse> => {
        try {
            const response = await otpResendApi(payload);
            return response.data as OtpResponse;
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error("Unknown error occurred in processResendOtp");
            }
        }
    },

    processLogout: async () => {
        try {
            const response = await logoutApi();
            return response?.data;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error("Unknown error occurred in processLogout");
            }
        }
    },

    processRefreshToken: async () => {
        try {
            const response = await refreshTokenApi();
            return response?.data;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error("Unknown error occurred in processRefreshToken");
            }
        }
    },
    processForgotPassword: async (payload: { email: string }) => {
        const response = await forgotPasswordApi(payload);
        return response?.data;
    },

    processResetPassword: async (payload: {
        email: string;
        otp: string;
        newPassword: string;
    }) => {
        const response = await resetPasswordApi(payload);
        return response?.data;
    },

    processResendForgotOtp: async (payload: { email: string }) => {
        const response = await resendForgotPasswordOtpApi(payload);
        return response?.data;
    },
};

export const getUser = async () => {
    const token = localStorage.getItem("accessToken");
    return token;
};
