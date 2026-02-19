import { Outlet } from 'react-router-dom';
const AuthLayout = () => {
  return (
    <main className="h-screen bg-[url('/login_bg_image.png')] bg-cover bg-center">
      <Outlet />
    </main>
  );
};
export default AuthLayout;
