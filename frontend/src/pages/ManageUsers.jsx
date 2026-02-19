import { useState } from "react";
import Loader from "../components/Loader";
import { Users } from "lucide-react";
import Header from "../components/Header";
import InviteOverlay from "../components/InviteOverlay";
import useUsers from "../hooks/useUsers";

const ManageUsers = () => {
    const {userData, loading, error, refetch} = useUsers();
    const [inviteModal, setInviteModal] = useState(false);
    const getColor = (role) => {
        if(role === "admin") return "bg-purple-100 text-purple-700";
        if(role === "manager") return "bg-green-100 text-green-700";
        return "bg-blue-100 text-blue-700"
    }
    if (loading) return <div className="flex justify-center items-center h-full"><Loader/></div>;
    if (error) return (
        <div className="flex justify-center items-center h-full">
            <div className="text-red-500 font-medium">{error}</div>
        </div>);
    return (
        <div className="flex flex-col h-full">
            <div className="p-6 bg-white flex justify-between border-b-2 border-gray-200">
                <div className="flex gap-2 items-center">
                    <div className="p-3 bg-blue-950 text-white rounded-xl"><Users size={32}/></div>
                    <div>
                        <Header subtitle={"View and invite users"} title={"Team Management"}/>
                    </div>
                </div>
                <button 
                    className="bg-blue-800 w-fit cursor-pointer rounded-lg px-6 text-[18px] py-2 font-semibold text-white hover:bg-blue-900 self-center" 
                    onClick={() => {
                        setInviteModal(true);
                    }}
                >+ Invite Users</button>
            </div>
            <div className="bg-gray-50 p-8 h-full overflow-auto">
                <div className="border-2 border-gray-200 shadow rounded-md overflow-hidden">
                    <div className="flex bg-white items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                        <div className="flex flex-col">
                            <h1 className="font-bold text-2xl">Member-Role Mappings</h1>
                            <div className="text-gray-500">Current member assignments</div>
                        </div>
                    </div>
                    <table className="w-full border-collapse text-base">
                        <thead className="bg-gray-100 border-b-2 border-gray-200">
                            <tr className="text-left">
                                <th className="px-4 py-3 font-semibold text-gray-500">Member Name</th>
                                <th className="px-4 py-3 font-semibold text-gray-500">Email</th>
                                <th className="px-4 py-3 font-semibold text-gray-500">Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(userData.users || []).map((user, index) => { 
                                return (    
                                    <tr
                                        key={user.userId}
                                        className={`border-b border-gray-200 last:border-b-0 ${index%2 === 0 ? "bg-white" : "bg-gray-50"}`}
                                    >
                                        <td className="px-4 py-3 font-medium">{user.name}</td>
                                        <td className="px-4 py-3 font-normal text-gray-500">{user.email}</td>
                                        <td>
                                            <div className={`w-fit px-2 font-medium rounded-full capitalize ${getColor(user.role)}`}>{user.role === "sales_executive" ? "Sales Executive" : user.role}</div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <InviteOverlay
                isOpen={inviteModal}
                onClose={() => setInviteModal(false)}
                onSuccess={() => {
                    setInviteModal(false);
                    refetch();
                }}
            />
        </div>
    )
}

export default ManageUsers;