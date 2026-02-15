import { useSignupSendOtpMutation } from "@/service/authApi";
import { useFormik } from "formik";
import { Loader, X } from "lucide-react";
import toast from "react-hot-toast";
import * as Yup from "yup";

function SignupForm({ setActiveTab, onClose, sendOtpInfo, setSendOtpInfo }) {
  const [signupSendOtp, { isLoading }] = useSignupSendOtpMutation();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      phone: sendOtpInfo?.phone || "",
      role: sendOtpInfo?.role || "customer",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full Name is required"),
      phone: Yup.string()
        .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits")
        .required("Mobile Number is required"),
      role: Yup.string().oneOf(["customer", "agent", "builder"], "Select a valid role").required("Role is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await signupSendOtp({
          fullName: values.fullName,
          phone: values.phone,
          role: values.role,
        }).unwrap();
        
        toast.success(response?.message || "OTP sent successfully");
        
        // Store signup info for verify OTP
        setSendOtpInfo({
          fullName: values.fullName,
          phone: values.phone,
          role: values.role,
          isSignup: true, // Flag to indicate this is signup flow
        });
        
        setActiveTab("verifyOtp");
      } catch (err) {
        console.log(err);
        const errorMessage = err?.data?.message || err?.data?.error || 'Something went wrong';
        
        // Check if user already exists - redirect to login
        if (errorMessage.toLowerCase().includes('already exists') || 
            errorMessage.toLowerCase().includes('already registered')) {
          toast.error("User already exists. Please login instead.");
          setSendOtpInfo({
            phone: values.phone,
            role: values.role,
          });
          setActiveTab("sendOtp");
        } else {
          toast.error(errorMessage);
        }
      }
    },
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Welcome to TRS - Sign Up</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-white cursor-pointer">
          <X className="h-5 w-5" />
        </button>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              className="w-full px-3 py-2 bg-[#2a1f45] border border-[#3a2a5a] rounded text-white focus:outline-none"
              placeholder="Enter your full name"
              {...formik.getFieldProps("fullName")}
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <div className="text-red-500 text-sm">{formik.errors.fullName}</div>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              maxLength={10}
              className="w-full px-3 py-2 bg-[#2a1f45] border border-[#3a2a5a] rounded text-white focus:outline-none"
              placeholder="Enter 10-digit phone number"
              {...formik.getFieldProps("phone")}
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className="text-red-500 text-sm">{formik.errors.phone}</div>
            )}
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-1">
              Role
            </label>
            <select
              id="role"
              className="w-full px-3 py-2 bg-[#2a1f45] border border-[#3a2a5a] rounded text-white"
              {...formik.getFieldProps("role")}
            >
              <option value="customer">Customer</option>
              <option value="agent">Agent</option>
              <option value="builder">Builder</option>
            </select>
            {formik.touched.role && formik.errors.role && (
              <div className="text-red-500 text-sm">{formik.errors.role}</div>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-6 bg-[#2a1f45] hover:bg-[#3a2a5a] text-white font-medium py-2 rounded transition-colors h-10 flex items-center justify-center cursor-pointer"
        >
          {isLoading ? (
            <div className="animate-spin">
              <Loader />
            </div>
          ) : (
            "Send OTP"
          )}
        </button>

        <div className="mt-4 text-center">
          <p className="text-gray-400 text-sm">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => setActiveTab("sendOtp")}
              className="text-amber-400 hover:text-amber-300 font-medium cursor-pointer"
            >
              Login
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
