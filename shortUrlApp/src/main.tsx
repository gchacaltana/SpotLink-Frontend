import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login.tsx";
import { AuthProvider } from "./providers/AuthProvider.tsx";
import Profile from './components/Profile.tsx';
import ProtectedRoute from "./routes/ProtectedRoute.tsx";
import AdminPanel from "./components/AdminPanel.tsx";
import { RedirectUrl } from './components/RedirectUrl.tsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/admin",
        element: <AdminPanel />,
      },
      {
        path: "/me",
        element: <Profile />,
      },
    ],
  },
  {
    path: "*",
    element: <RedirectUrl />,
  },
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
)
