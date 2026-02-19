import { X } from "lucide-react";
import * as Yup from 'yup';
import { useState } from "react";
import { useFormik } from 'formik';
import { inviteUser } from "../services/AdminServices";
import FormInput from "../components/FormInput";

const validationSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),
    role: Yup.string().required("Role is required"),
});


const InviteOverlay = ({ isOpen, onClose, onSuccess }) => {
    const [submitLoading, setSubmitLoading] = useState(false);
    const [submitError, setSubmitError] = useState("");

    const formik = useFormik({
        initialValues: {
            email: "",
            role: "admin",
        },
        validationSchema,
        validateOnMount: true, 
        onSubmit: async (values) => {
            setSubmitLoading(true);
            try {
            setSubmitError("");
            await inviteUser(values);
            formik.resetForm();
            onSuccess?.();
            onClose?.();
            } catch (err) {
            setSubmitError(
                err?.response?.data?.message ||
                "Failed to send invite. Please try again."
            );
            } finally {
            setSubmitLoading(false);
            }
        },
    });

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 overflow-hidden">
            <div className="bg-white rounded-lg shadow-xl p-6 h-[80%] w-[40%] relative overflow-y-auto no-scrollbar flex flex-col gap-6">
                <h2 className="text-xl font-bold">Invite User</h2>

                <button
                    disabled={submitLoading}
                    onClick={() => {
                        formik.resetForm();
                        onClose();
                    }}
                    className="absolute top-3 right-3 text-gray-600 hover:text-black cursor-pointer disabled:opacity-50"
                >
                    <X />
                </button>

                <form
                    onSubmit={formik.handleSubmit}
                    className="w-[90%] relative self-center rounded-lg h-full border border-border-grey flex flex-col"
                >
                    <div className="rounded-t-lg p-4 flex flex-col gap-3 bg-blue-100">
                        <div className="text-lg font-semibold">
                            Invite Details
                        </div>
                    </div>

                    <div className="w-full relative h-full flex flex-col gap-6 py-10 px-6 bg-gray-50 rounded-b-lg overflow-auto">
                        <FormInput
                            label="Email"
                            name="email"
                            type="email"
                            required
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.errors.email}
                            touched={formik.touched.email}
                            placeholder="Enter email"
                        />
                        <FormInput
                            label="Role"
                            name="role"
                            type="dropdown"
                            required
                            value={formik.values.role}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.errors.role}
                            touched={formik.touched.role}
                            options={[
                                { label: "Admin", value: "admin" },
                                { label: "Sales Executive", value: "sales_executive" },
                                { label: "Manager", value: "manager" }
                            ]}
                        />
                        {submitError && (
                            <div className="text-sm text-red-600">
                                {submitError}
                            </div>
                        )}
                    </div>

                    <div className="w-full flex justify-end rounded-b-lg bg-blue-100 p-3">
                        <button
                            type="submit"
                            disabled={!formik.isValid || submitLoading}
                            className={`px-4 py-1 rounded-lg font-medium ${
                                !formik.isValid || submitLoading
                                ? "text-gray-400 cursor-not-allowed"
                                : "hover:underline cursor-pointer"
                            }`}
                        >
                            {submitLoading ? "Sending..." : "Send Invite"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default InviteOverlay;
