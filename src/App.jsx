import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import UploadItems from "./pages/upload-items";
import Homepage from "./pages/homepage";
import History from "./pages/history";
import Profile from "./pages/profile";
import Admin from "./pages/admin";
import ProtectedRoute from "./components/ProtectedRoute";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: '/upload',
    element: (
      <ProtectedRoute allowedRoles={['admin', 'user']}>
        <UploadItems />
      </ProtectedRoute>
    )
  },
  {
    path: '/history',
    element: (
      <ProtectedRoute allowedRoles={['user', 'admin']}>
        <History />
      </ProtectedRoute>
    )
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute allowedRoles={['user', 'admin']}>
        <Profile />
      </ProtectedRoute>
    )
  },
  {
    path: '/accept',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <Admin />
      </ProtectedRoute>
    )
  }
]);

export default function App() {
  return (
    <RouterProvider router={router} />
  );
}
