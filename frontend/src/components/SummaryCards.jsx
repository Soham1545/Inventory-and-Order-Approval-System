import { MoveUp } from "lucide-react";

const colorMap = {
  blue: {
    bg: "bg-blue-300",
    text: "text-blue-700",
  },
  green: {
    bg: "bg-green-300",
    text: "text-green-700",
  },
  purple: {
    bg: "bg-purple-300",
    text: "text-purple-700",
  },
  orange: {
    bg: "bg-orange-300",
    text: "text-orange-700",
  },
};

const SummaryCards = ({ value, purpose, icon, background }) => {
  const colors = colorMap[background];

  return (
    <div className="p-4 flex justify-between border h-fit items-center shadow-md rounded-xl border-gray-200">
      <div className="flex flex-col justify-between">
        <div className="font-semibold">{purpose}</div>
        <div className="text-xl font-bold">
          {value}
        </div>
      </div>

      <div className={`${colors.bg} ${colors.text} p-4 h-fit rounded-xl`}>
        {icon}
      </div>
    </div>
  );
};

export default SummaryCards;
