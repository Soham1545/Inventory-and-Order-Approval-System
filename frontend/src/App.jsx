import { createBrowserRouter, RouterProvider } from "react-router-dom"
import RootRedirect from "./routes/RootRedirect";
import AuthRoute from "./routes/AuthRoutes";
import AppRoute from "./routes/AppRoutes";
import AuthLayout from "./layouts/AuthLayout"
import AppLayout from "./layouts/AppLayout"
import Login from "./pages/Login"
import Signup from "./pages/SignUp"
import Home from "./pages/Home";
import { Toaster } from "sonner";
import Inventory from "./pages/Inventory";
import ManageUsers from "./pages/ManageUsers";
import Products from "./pages/Products";
import PastOrders from "./pages/PastOrders";
import Orders from "./pages/Orders";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <RootRedirect/> },
    {
      element: <AuthRoute />,
      children: [
        {
          path: "/auth",
          element: <AuthLayout />,
          children: [
            { index: true, element: <Login /> },
            { path: "login", element: <Login /> },
            { path: "signup", element: <Signup /> },
          ],
        },
      ],
    },
    {
      element: <AppRoute />,
      children: [
        {
          path: "/app",
          element: <AppLayout />,
          children: [
            { index: true, element: <Home /> },
            { path: "home", element: <Home /> },
            { path: "inventory", element: <Inventory /> },
            { path: "manage-users", element: <ManageUsers /> },
            { path: "products", element: <Products /> },
            { path: "past-orders", element: <PastOrders /> },
            { path: "orders", element: <Orders /> },
          ],
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" duration={10000} richColors className="text-xl" />
    </>
  );
}

export default App
