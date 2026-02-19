import { useState } from 'react';
import ProfileIcon from '/profile-icon.png';
import { LogOut } from 'lucide-react';
import { logout } from '../services/AuthServices';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProfileDropdown = ({user}) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const {refetchUser} = useAuth();
    const handleLogout = async () => {
        try {
            await logout();
            await refetchUser();
            navigate('/auth/login', { replace: true });
        } catch {
            console.error("Logout Failed");
        }
    };
    return (
        <>
            <button onClick={() => setOpen(!open)} className='flex'>
                <img src={ProfileIcon} alt="Profile icon" className='h-9 w-9 cursor-pointer' />
            </button>
            {open && (
                <div className="absolute right-0 mt-2 bg-white p-4 text-black rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50">
                    <div className='border-b border-gray-300 flex flex-col gap-2 pb-2'>
                        <div className='font-semibold'>{user?.name}</div>
                        <div className='text-sm px-2 rounded-full bg-green-100 w-fit font-semibold text-green-600 capitalize'>{user?.role === "sales_executive" ? "Sales Executive" : user?.role}</div>
                        <div className='text-sm font-semibold text-gray-500'>{user?.email}</div>
                    </div>
                    <button 
                        className='mt-2 py-2 text-center flex items-center gap-2 justify-center hover text-red-600 font-bold w-full hover:bg-red-100 cursor-pointer rounded-xl'
                        onClick={handleLogout}
                    >
                        <LogOut size={22}/>
                        <div className=''>LOG OUT</div>
                    </button>
                </div>
            )}
        </>
    )
}

export default ProfileDropdown;