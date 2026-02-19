const GetOrderStatus = ({orderStatus}) => {
    if (orderStatus === "pending_approval"){
        return(
            <div 
                className="bg-yellow-200 text-yellow-700 flex gap-1 px-2 rounded-full text-sm items-center font-medium h-fit"
            >
                <span className="bg-yellow-700 p-1 rounded-full"></span>
                <span>Pending</span>
            </div>
        )
    }
    if (orderStatus === "approved"){
        return(
            <div 
                className="bg-green-200 text-green-700 flex gap-1 px-2 rounded-full text-sm items-center font-medium h-fit"
            >
                <span className="bg-green-700 p-1 rounded-full"></span>
                <span>Approved</span>
            </div>
        )
    }
    if (orderStatus === "rejected"){
        return(
            <div 
                className="bg-red-200 text-red-700 flex gap-1 px-2 rounded-full text-sm items-center font-medium h-fit"
            >
                <span className="bg-red-700 p-1 rounded-full"></span>
                <span>Rejected</span>
            </div>
        )
    }
    return(
        <div 
            className="bg-gray-200 text-gray-700 flex gap-1 px-2 rounded-full text-sm items-center font-medium h-fit"
        >
            <span className="bg-gray-700 p-1 rounded-full"></span>
            <span>Draft</span>
        </div>
    )
} 

export default GetOrderStatus;