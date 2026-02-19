import { X } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import FormInput from "../components/FormInput";
import { rejectOrder } from "../services/ManagerServices";

const validationSchema = Yup.object({
  comment: Yup.string()
    .trim()
    .required("Comment is required"),
});

const RejectOverlay = ({ isOpen, onClose, orderId, onSuccess }) => {
  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await rejectOrder(orderId, values.comment);
        toast.success("Order rejected successfully");
        resetForm();
        onSuccess();
      } catch (err) {
        toast.error(
          err?.response?.data?.message || "Failed to reject order"
        );
      } finally {
        setSubmitting(false);
      }
    },
  });
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-[40%] flex flex-col overflow-hidden">
        <div className="flex justify-between items-center px-6 py-4 bg-blue-950 text-white">
          <h2 className="text-lg font-bold">Reject Order</h2>

          <button
            onClick={onClose}
            className="hover:opacity-70 cursor-pointer"
          >
            <X />
          </button>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col"
        >
          <div className="p-6 bg-gray-50 flex flex-col gap-6">
            <FormInput
              label="Rejection Comment"
              name="comment"
              type="textarea"
              placeholder="Enter reason for rejecting this order..."
              required
              value={formik.values.comment}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.comment}
              touched={formik.touched.comment}
            />
          </div>
          <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-300 bg-white">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 font-medium hover:bg-gray-100 cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="px-5 py-2 rounded-lg bg-black text-white font-semibold hover:bg-gray-800 disabled:opacity-50 cursor-pointer"
            >
              {formik.isSubmitting ? "Submitting..." : "Reject Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RejectOverlay;
