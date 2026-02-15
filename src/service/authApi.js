import { realStateAPI, newRealStateAPI } from "@/redux/createAPI";

/* ==========================================
   OLD API ENDPOINTS (ACTIVE - Using Old Base URL)
   ========================================== */

const authApiOld = realStateAPI.injectEndpoints({
    endpoints: (build) => ({
        sendOtp: build.mutation({
            query: (formValues) => {
                const formData = new FormData();
                formData.append("mobile_no", formValues?.phone);
                formData.append("role", formValues?.role);
                return {
                    url: `authentication/v1/user/send_otp/`,
                    method: "POST",
                    body: formData,
                    formData: true,
                }
            },
        }),
        verifyOtp: build.mutation({
            query: ({ otp, phone, role }) => {
                const formData = new FormData();
                formData.append("mobile_no", phone);
                formData.append("role", role);
                formData.append("otp", otp);
                return {
                    url: `authentication/v1/user/verify_otp/`,
                    method: "POST",
                    body: formData,
                    formData: true,
                }
            },
        }),
        signUp: build.mutation({
            query: (formValues) => {
                const formData = new FormData();
                formData.append("first_name", formValues?.first_name);
                formData.append("last_name", formValues?.last_name);
                formData.append("email", formValues?.email);
                formData.append("mobile_no", formValues?.mobile_no);
                formData.append("company_name", formValues?.company_name);
                formData.append("city", formValues?.city);
                formData.append("role", formValues?.role);
                return {
                    url: `authentication/v1/user/register/`,
                    method: "POST",
                    body: formData,
                    formData: true,
                }
            },
        }),
    }),
});

/* ==========================================
   NEW API ENDPOINTS (Using New Base URL)
   ========================================== */

const authApiNew = newRealStateAPI.injectEndpoints({
    endpoints: (build) => ({
        // 1. Signup - Send OTP
        // POST /api/auth/signup
        signupSendOtp: build.mutation({
            query: (formValues) => ({
                url: `/api/auth/signup`,
                method: "POST",
                body: {
                    fullName: formValues.fullName,
                    phone: formValues.phone,
                    role: formValues.role, // customer, builder, or agent
                },
            }),
        }),

        // 2. Signup - Verify OTP
        // POST /api/auth/signup/verify-otp
        signupVerifyOtp: build.mutation({
            query: (formValues) => ({
                url: `/api/auth/signup/verify-otp`,
                method: "POST",
                body: {
                    fullName: formValues.fullName,
                    phone: formValues.phone,
                    otp: formValues.otp,
                    role: formValues.role,
                },
            }),
        }),

        // 3. Login - Send OTP
        // POST /api/auth/send-otp
        loginSendOtp: build.mutation({
            query: (formValues) => ({
                url: `/api/auth/send-otp`,
                method: "POST",
                body: {
                    phone: formValues.phone,
                },
            }),
        }),

        // 4. Login - Verify OTP
        // POST /api/auth/verify-otp
        loginVerifyOtp: build.mutation({
            query: (formValues) => ({
                url: `/api/auth/verify-otp`,
                method: "POST",
                body: {
                    phone: formValues.phone,
                    otp: formValues.otp,
                },
            }),
        }),

        // 5. Get Current User
        // GET /api/auth/me
        getCurrentUser: build.query({
            query: () => `/api/auth/me`,
            providesTags: ['currentUser'],
        }),
    }),
});

// Export OLD hooks (existing code continues to work)
export const { 
    useSendOtpMutation, 
    useVerifyOtpMutation, 
    useSignUpMutation 
} = authApiOld;

// Export NEW hooks (for new API integration)
export const {
    useSignupSendOtpMutation,
    useSignupVerifyOtpMutation,
    useLoginSendOtpMutation,
    useLoginVerifyOtpMutation,
    useGetCurrentUserQuery,
} = authApiNew;




