import { Clock } from "lucide-react";
import GetOrderStatus from "./GetOrderStatus.jsx";
import getBgColor from "../utils/getBgColor.js";
import getTextColor from "../utils/getTextColor.js";
import {toast} from "sonner";
import { approveOrder } from "../services/ManagerServices.jsx";
import { useAuth } from '../hooks/useAuth.jsx';
import { useState } from "react";
import RejectOverlay from "./RejectOverlay.jsx";

const UserOrderCards  = ({order, refetch}) => {
    const {user} = useAuth();
    const date = order?.createdAt
        ? new Date(order.createdAt).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
          })
        : null;
    const handleApprove = async () => {
        try {
            await approveOrder(order._id);
            toast.success("Order approved successfully");
            refetch();
        } catch (err) {
            toast.error(
                err?.response?.data?.message || "Failed to approve order"
            );
        }
    };
    const [rejectModal, setRejectModal] = useState(false);
    return (
        <div className="rounded-lg border bg-white border-gray-200 shadow-lg flex flex-col">
            <div className="rounded-t-lg border-b border-gray-200 p-4 flex justify-between">
                <div className="flex flex-col gap-2">
                    <span className="text-lg font-semibold">Order ID: {order._id}</span>
                    <span className="flex gap-1 text-gray-500 font-medium text-sm"><Clock size={18}/>{date}</span>
                </div>
                <GetOrderStatus orderStatus={order.status}/>
            </div>
            <div className="p-4 overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                        <tr>
                            <th className="text-left px-4 py-3 font-semibold">Name</th>
                            <th className="text-left px-4 py-3 font-semibold">SKU</th>
                            <th className="text-left px-4 py-3 font-semibold">Category</th>
                            <th className="text-left px-4 py-3 font-semibold">Net Quantity</th>
                            <th className="text-left px-4 py-3 font-semibold">Price</th>
                        </tr>
                    </thead>

                    <tbody>
                    {order.products.map((product, index) => (
                        <tr
                        key={product._id || product.sku}
                        className={`border-t border-gray-200 ${
                            index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}
                        >
                        <td className="px-4 py-3 font-medium text-gray-800">
                            {product.name}
                        </td>

                        <td className="px-4 py-3 text-gray-600">
                            {product.sku}
                        </td>

                        <td className="px-4 py-3 capitalize text-gray-700">
                            <span className={`${getBgColor(product.category)} ${getTextColor(product.category)} px-2 font-medium rounded-full`}>{product.category}</span>
                        </td>

                        <td className="px-4 py-3 font-medium">
                            {product.quantity} U
                        </td>

                        <td className="px-4 py-3 font-semibold text-green-600">
                            {product.price} INR
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="w-full flex items-center justify-between p-4 gap-2 border-t border-gray-200">
                <div>
                    {(order.status === "pending_approval" && user.role === "manager") &&
                        <div className="flex gap-4">
                            <button
                                onClick={()=> setRejectModal(true)}
                                className="px-6 py-2 rounded-lg border border-gray-200 font-semibold cursor-pointer"
                            >
                                Reject
                            </button>
                            <button
                                onClick={handleApprove}
                                className="px-6 py-2 rounded-lg bg-black text-white font-semibold cursor-pointer"
                            >
                                Approve
                            </button>
                        </div>
                    }
                    {order.status === "rejected" && 
                        <div className="text-red-500 font-semibold">Comment: {order?.comment}</div>
                    }
                </div>
                <div className="flex items-center place-self-end gap-2">
                    <span className="text-gray-500 font-semibold">
                        Total Price:
                    </span>
                    <span className="text-lg font-semibold text-green-500">{order.price} INR</span>
                </div>
            </div>
            <RejectOverlay
                isOpen={rejectModal}
                onClose={() => setRejectModal(false)}
                orderId={order._id}
                onSuccess={() => {
                    refetch();
                    setRejectModal(false);
                }}
            />
        </div>
    )
}

export default UserOrderCards;