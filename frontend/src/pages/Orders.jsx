import { Check, ClipboardClock, X } from "lucide-react";
import Header from "../components/Header";
import { useState } from "react";
import useOrders from "../hooks/useOrders";
import Loader from "../components/Loader";
import UserOrderCards from "../components/UserOrderCards";

const baseTabs = [
	{ key: "pending_approval", label: "Pending Approvals", icon: <ClipboardClock size={16} /> },
	{ key: "approved", label: "Approved", icon: <Check size={16} /> },
	{ key: "rejected", label: "Rejected", icon: <X size={16} /> },
];

const Orders = () => {
    const [activeStatus, setActiveStatus] = useState("pending_approval");
    const {loading, error, orders, refetch} = useOrders();
    const filteredOrders = orders.orders?.filter(
        (order) => order.status === activeStatus
    );

    if (loading) return <div className="flex justify-center items-center h-full"><Loader/></div>;
    if (error) return (
        <div className="flex justify-center items-center h-full">
            <div className="text-red-500 font-medium">{error}</div>
        </div>);
    return (
        <div className="flex flex-col h-full">
            <div className="p-6 bg-white flex gap-2 items-center border-b-2 border-gray-200">
                <div className="p-3 bg-blue-950 text-white rounded-xl"><ClipboardClock size={32}/></div>
                <Header subtitle={"Monitor and manage all orders"} title={"Orders Management"}/>
            </div>
            <div className="bg-gray-50 p-8 h-full overflow-auto flex flex-col gap-6">
                <div className="flex gap-2 border-b border-gray-300 w-full">
                    {baseTabs.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveStatus(tab.key)}
                            className={`flex items-center gap-2 px-4 py-2 font-semibold cursor-pointer ${
                                activeStatus === tab.key
                                    ? "border-b-2"
                                    : "text-gray-500 hover:text-gray-600"
                            }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>
                {filteredOrders?.map((order) => {
                    return (
                        <UserOrderCards order={order} refetch={refetch} />
                    );
                })}
            </div>
        </div>
    )
}

export default Orders;