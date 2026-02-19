import { ChartColumn, CircleCheckBig, ClipboardClock, ClockAlert, Logs } from "lucide-react";
import Loader from "../components/Loader";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { getUserOrders } from "../services/SalesExecutiveServices";
import SummaryCards from "../components/SummaryCards";
import UserOrderCards from "../components/UserOrderCards";

const PastOrders = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [ordersData, setOrdersData] = useState([]);

    const loadOrders = async () => {
        try {
        setLoading(true);
            const data = await getUserOrders();
            setOrdersData(data);
        } catch {
            setError("Error fetching orders from backend. Please try again");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        loadOrders();
    }, []);

    if (loading) return <div className="flex justify-center items-center h-full"><Loader/></div>;
    if (error) return (
        <div className="flex justify-center items-center h-full">
            <div className="text-red-500 font-medium">{error}</div>
        </div>);
    return(
        <div className="flex flex-col h-full">
            <div className="p-6 bg-white flex gap-2 items-center border-b-2 border-gray-200">
                <div className="p-3 bg-blue-950 text-white rounded-xl"><ClipboardClock size={32}/></div>
                <Header subtitle={"Your orders from past"} title={"Past Orders"}/>
            </div>
            <div className="bg-gray-50 p-8 h-full overflow-auto flex flex-col gap-6">
                <div className="grid grid-cols-4 gap-4">
                    <SummaryCards
                        purpose={"Total orders"}
                        value={ordersData.count}
                        background={"blue"}
                        icon={<ChartColumn/>}
                    />
                    <SummaryCards
                        purpose={"Rejected orders"}
                        value={ordersData?.orders?.filter((order) => (order).status === "rejected").length}
                        background={"orange"}
                        icon={<Logs/>}
                    />
                    <SummaryCards
                        purpose={"Pending Approvals"}
                        value={ordersData?.orders?.filter((order) => (order).status === "pending_approval").length}
                        background={"purple"}
                        icon={<ClockAlert/>}
                    />
                    <SummaryCards
                        purpose={"Approved Orders"}
                        value={ordersData?.orders?.filter((order) => (order).status === "approved").length}
                        background={"green"}
                        icon={<CircleCheckBig/>}
                    />
                </div>
                {ordersData?.orders?.map((order) => {
                    return <UserOrderCards order={order}/>
                })}
            </div>
        </div>
    )
}

export default PastOrders;