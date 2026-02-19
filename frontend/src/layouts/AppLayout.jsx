import { Link, Outlet } from 'react-router-dom';

import { ClipboardClock, FileText, Home, Logs, Plus, Users } from 'lucide-react';
import HamburgerItem from '../components/HamburgerItem';
import ProfileDropdown from '../components/ProfileDropdown.jsx';
import { useAuth } from '../hooks/useAuth.jsx';

const AppLayout = () => {
  const {user} = useAuth();

  return (
    <main className="flex flex-col h-screen">
        <header className='bg-black w-full h-16 flex px-9 items-center justify-end text-white'>
            <div className='relative'>
                <ProfileDropdown user={user} />
            </div>
        </header>
        <section className='flex flex-1 overflow-hidden'>
            <nav className={`w-80 px-4 py-6 border-r border-gray-200`}>
                <ul className='flex flex-col gap-2'>
                    <li>
                        <HamburgerItem
                            title={"Home"}
                            subtitle={"Overview and analytics"}
                            icon={<Home size={20}/>}
                            to={"/app/home"}
                            />
                    </li>
                    {user.role === "admin" &&
                        <li>
                            <HamburgerItem
                                title={"Inventory"}
                                subtitle={"View and manage products"}
                                icon={<FileText size={20}/>}
                                to={"/app/inventory"}
                            />
                        </li>
                    }
                    {user.role === "admin" &&
                        <li>
                            <HamburgerItem
                                title={"Team Management"}
                                subtitle={"User administration"}
                                icon={<Users size={20}/>}
                                to={"/app/manage-users"}
                                />
                        </li>
                    }
                    {user.role === "sales_executive" &&
                        <li>
                            <HamburgerItem
                                title={"Products"}
                                subtitle={"Place order"}
                                icon={<Logs size={20}/>}
                                to={"/app/products"}
                                />
                        </li>
                    }
                    {user.role === "sales_executive" &&
                        <li>
                            <HamburgerItem
                                title={"Orders"}
                                subtitle={"View past orders"}
                                icon={<ClipboardClock size={20}/>}
                                to={"/app/past-orders"}
                                />
                        </li>
                    }
                    {user.role === "manager" &&
                        <li>
                            <HamburgerItem
                                title={"Order Management"}
                                subtitle={"View all orders"}
                                icon={<ClipboardClock size={20}/>}
                                to={"/app/orders"}
                            />
                        </li>
                    }
                </ul>
            </nav>
            <div className='flex-1 overflow-y-auto'>
                <Outlet/>
            </div>
        </section>
    </main>
  );
};
export default AppLayout;