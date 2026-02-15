import { useDirectLoginMutation } from "@/service/authApi";
import { setToken, setUser } from "@/redux/authSlice";
import { useFormik } from "formik";
import { Loader, X } from "lucide-react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useDispatch } from "react-redux";

function SendOtpForm({ onClose, setSendOtpInfo, setActiveTab }) {
    const dispatch = useDispatch();
    const [directLogin, { isLoading }] = useDirectLoginMutation();

    const formik = useFormik({
        initialValues: {
            phone: "",
        },
        validationSchema: Yup.object({
            phone: Yup.string()
                .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits")
                .required("Mobile Number is required"),
        }),
        onSubmit: async (values) => {
            try {
                const response = await directLogin({ phone: values.phone }).unwrap();
                
                // Handle successful login
                const token = response?.token || response?.data?.token;
                const user = response?.user || response?.data?.user;
                
                if (token && user) {
                    dispatch(setToken(token));
                    dispatch(setUser(user));
                    toast.success(response?.message || "Login successful");
                    window.dispatchEvent(new Event("resume-form-submit"));
                    onClose();
                }
            } catch (err) {
                console.log(err);
                // Check if user not found - redirect to signup
                const errorMessage = err?.data?.message || err?.data?.error || '';
                if (errorMessage.toLowerCase().includes('not found') || 
                    errorMessage.toLowerCase().includes('not registered') ||
                    errorMessage.toLowerCase().includes('please signup') ||
                    errorMessage.toLowerCase().includes('user does not exist') ||
                    errorMessage.toLowerCase().includes('please login')) {
                    toast.error("User not found. Please signup first.");
                    // Pre-fill signup form with phone
                    setSendOtpInfo({
                        phone: values?.phone,
                    });
                    setActiveTab("signup");
                } else {
                    toast.error(errorMessage || 'Something went wrong');
                }
            }
        },
    });

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Welcome to TRS - Login</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-white cursor-pointer">
                    <X className="h-5 w-5" />
                </button>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <div className="mb-4">
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
                    {formik.errors.phone && (
                        <div className="text-red-500 text-sm">{formik.errors.phone}</div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#2a1f45] hover:bg-[#3a2a5a] text-white font-medium py-2 rounded transition-colors h-10 flex items-center justify-center cursor-pointer"
                >
                    {isLoading ? (
                        <div className="animate-spin">
                            <Loader />
                        </div>
                    ) : (
                        "Login"
                    )}
                </button>

                <div className="mt-4 text-center">
                    <p className="text-gray-400 text-sm">
                        Don't have an account?{" "}
                        <button
                            type="button"
                            onClick={() => setActiveTab("signup")}
                            className="text-amber-400 hover:text-amber-300 font-medium cursor-pointer"
                        >
                            Sign up
                        </button>
                    </p>
                </div>
            </form >
        </div >
    );
}

export default SendOtpForm;
