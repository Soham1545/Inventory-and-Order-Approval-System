import { X, Package } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormInput from "../components/FormInput";
import { addProduct, editProduct } from "../services/AdminServices";
import { toast } from "sonner";

const validationSchema = Yup.object({
  name: Yup.string().required("Product name is required"),
  category: Yup.string().required("Category is required"),
  availableQuantity: Yup.number()
    .typeError("Must be a number")
    .min(0, "Cannot be negative")
    .required("Quantity is required"),
  price: Yup.number()
    .typeError("Must be a number")
    .min(1, "Cannot be less than 1")
    .required("Price is required"),
});

const categoryOptions = [
  { label: "Electronics", value: "electronics" },
  { label: "Household", value: "household" },
  { label: "Fashion", value: "fashion" },
];

const ProductOverlay = ({ isOpen, onClose, onSuccess, product }) => {
  const isEdit = !!product;

  const formik = useFormik({
    initialValues: {
      name: product?.name || "",
      category: product?.category || "electronics",
      availableQuantity: product?.availableQuantity || "",
      price: product?.price || "",
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (isEdit) {
            await editProduct(product.sku, values);
            toast.success("Product updated");
        } else {
            await addProduct(values);
            toast.success("Product added");
        }
        onSuccess();
      } catch (err) {
        toast.error(err?.response?.data?.message || "Operation failed");
      } finally {
        setSubmitting(false);
      }
    },
  });
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-[40%] max-h-[85%] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-blue-950 text-white">
          <div className="flex items-center gap-3">
            <Package />
            <h2 className="text-lg font-bold">
              {isEdit ? "Edit Product" : "Add Product"}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="hover:opacity-70 cursor-pointer"
          >
            <X />
          </button>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col h-full"
        >
          <div className="flex flex-col gap-6 p-6 bg-gray-50 overflow-auto">

            <FormInput
              label="Product Name"
              name="name"
              placeholder="Enter product name"
              required
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.name}
              touched={formik.touched.name}
            />

            <FormInput
              label="Category"
              name="category"
              type="dropdown"
              options={categoryOptions}
              required
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.category}
              touched={formik.touched.category}
            />

            <FormInput
              label="Available Quantity"
              name="availableQuantity"
              type="number"
              placeholder="Enter quantity"
              required
              value={formik.values.availableQuantity}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.availableQuantity}
              touched={formik.touched.availableQuantity}
            />

            <FormInput
              label="Price (₹)"
              name="price"
              type="number"
              placeholder="Enter price"
              required
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.price}
              touched={formik.touched.price}
            />
          </div>
          <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-400 bg-white">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 cursor-pointer rounded-lg border border-gray-300 font-medium hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="px-5 py-2 cursor-pointer rounded-lg bg-black text-white font-semibold hover:bg-gray-800 disabled:opacity-50"
            >
              {formik.isSubmitting
                ? "Saving..."
                : isEdit
                ? "Update Product"
                : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductOverlay;
