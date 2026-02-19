import { TrendingUp } from "lucide-react";

const TopPerformer = ({topPerformer}) => {
    return (
        <div className="w-full border border-gray-200 p-2 rounded-lg flex justify-between">
            <div className="flex gap-4 items-center">
                <div className="bg-gray-200 text-gray-500 p-2 rounded-full"><TrendingUp/></div>
                <div className="flex flex-col">
                    <div className="font-semibold">{topPerformer?.name}</div>
                    <div className="text-sm text-gray-500">{topPerformer?.sku}</div>
                </div>
            </div>
            <div className="flex gap-4 items-center">
                <div className="flex flex-col items-end">
                    <div className="font-semibold">{topPerformer?.price} INR</div>
                    <div className="text-sm text-gray-500">{topPerformer?.totalQuantity} Units</div>
                </div>
            </div>
        </div>
    )
}

export default TopPerformer;