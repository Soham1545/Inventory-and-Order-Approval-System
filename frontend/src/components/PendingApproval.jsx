import { Calendar, User } from "lucide-react";

const PendingApproval = ({pendingApproval}) => {
    const date = pendingApproval.createdAt
        ? new Date(pendingApproval.createdAt).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
          })
        : "";
    return (
        <div className="w-full border border-gray-200 p-2 rounded-lg flex justify-between items-start">
            <div className="flex flex-col gap-1">
                <div className="font-semibold">Order ID: {pendingApproval?._id}</div>
                <div className="text-sm text-gray-500 flex gap-2 items-center"><User size={18}/>{pendingApproval?.user.name}</div>
                <div className="flex items-center gap-2 text-gray-500"><Calendar size={18}/>{date}</div>
            </div>
            {pendingApproval?.priority === "high" ? (
                <div className="rounded-full px-2 text-sm font-medium text-red-700 bg-red-100">high</div>
            ): pendingApproval?.priority === "medium" ? (
                <div className="rounded-full px-2 text-sm font-medium text-yellow-700 bg-yellow-100">medium</div>
            ) : (
                <div className="rounded-full px-2 text-sm font-medium text-green-700 bg-green-100">low</div>
            )}
        </div>
    )
}

export default PendingApproval;