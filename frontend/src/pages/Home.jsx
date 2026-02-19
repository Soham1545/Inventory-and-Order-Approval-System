import { CircleCheckBig, House, Logs, ChartColumn } from "lucide-react";
import Header from "../components/Header";
import SummaryCards from "../components/SummaryCards.jsx";
import { useEffect, useState } from "react";
import { fetchHome } from "../services/AppServices.jsx";
import Loader from "../components/Loader.jsx";
import TopPerformer from "../components/TopPerformer.jsx";
import PendingApproval from "../components/PendingApproval.jsx"

const Home = () => {
    const [dashboardData, setDashboardData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const loadDashboard = async () => {
        try {
            setLoading(true);
            const data = await fetchHome();
            setDashboardData(data.dashboard);
        } catch {
            setError("Error fetching dashboard from backend. Please try again");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        loadDashboard();
    }, []);
    if (loading) return <div className="flex justify-center items-center h-full"><Loader/></div>;
    if (error) return (
        <div className="flex justify-center items-center h-full">
            <div className="text-red-500 font-medium">{error}</div>
        </div>);
    return (
        <div className="flex flex-col h-full">
            <div className="flex gap-2 items-center p-6 bg-white border-b-2 border-gray-200">
                <div className="p-3 bg-blue-950 text-white rounded-xl"><House size={32}/></div>
                <div>
                    <Header subtitle={`Overview of system`} title={"Dashboard"}/>
                </div>
            </div>
            <div className="bg-gray-50 p-6 h-full overflow-auto grid grid-cols-3 grid-rows-[auto_1fr] gap-4">
                <SummaryCards
                    purpose={"Total orders"}
                    value={dashboardData.totalOrders}
                    background={"blue"}
                    icon={<ChartColumn/>}
                />
                <SummaryCards
                    purpose={"Rejected orders"}
                    value={dashboardData.rejectedOrders}
                    background={"green"}
                    icon={<Logs/>}
                />
                <SummaryCards
                    purpose={"Pending Approvals"}
                    value={dashboardData?.pendingApprovals?.length}
                    background={"purple"}
                    icon={<CircleCheckBig/>}
                />
                <div className="col-span-2 flex flex-col gap-4">
                    <div className="flex flex-col rounded-xl border-gray-200 shadow-md">
                        <div className="p-4 bg-gray-100 border-b border-gray-200 flex flex-col rounded-t-xl">
                            <div className="font-semibold text-xl">Top Performing Products</div>
                            <div className="text-gray-500">Best selling products</div>
                        </div>
                        <div className="p-6 flex flex-col gap-2">
                            {dashboardData?.topProducts?.map((topPerformer) => {
                                return(
                                    <TopPerformer topPerformer={topPerformer} />
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex flex-col rounded-xl border-gray-200 shadow-md">
                        <div className="p-4 bg-gray-100 border-b border-gray-200 flex flex-col rounded-t-xl">
                            <div className="font-semibold text-xl">Pending Approvals</div>
                            <div className="text-gray-500">Scheduled approvals</div>
                        </div>
                        <div className="p-6 flex flex-col gap-2">
                            {dashboardData?.pendingApprovals?.length === 0 && (
                                <div className="text-center font-semibold text-gray-500">No pending approvals</div>
                            )}
                            {dashboardData?.pendingApprovals?.map((pendingApproval) => {
                                return(
                                    <PendingApproval pendingApproval={pendingApproval} />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Home;