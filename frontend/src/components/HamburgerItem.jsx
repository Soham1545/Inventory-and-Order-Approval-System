import { NavLink } from "react-router-dom";

const HamburgerItem = ({icon, title, subtitle, to}) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                        `w-full flex items-center justify-between gap-2 py-3 px-4 rounded-lg cursor-pointer
                        ${isActive ? 'text-white bg-[#282442]' : ''}`
                    }
        >
            {({isActive}) => (
                <>
                    <div className="flex items-center gap-2">
                        {icon}
                        <div className="flex flex-col">
                            <div className="font-semibold text-sm">{title}</div>
                            <div className={`font-normal text-xs ${isActive ? "text-white" : "text-gray-500"}`}>{subtitle}</div>
                        </div>
                    </div>
                    <div className={`rounded-full bg-blue-600 w-2 h-2 ${!isActive && "hidden"}`}></div>
                </>
            )}
        </NavLink>
    )
}

export default HamburgerItem;