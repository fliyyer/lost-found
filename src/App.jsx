import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import UploadItems from "./pages/upload-items"
import Homepage from "./pages/homepage"
import History from "./pages/history"
import Profile from "./pages/profile"


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
    element: <UploadItems />
  },
  {
    path: '/history',
    element: <History />
  },
  {
    path: '/profile',
    element: <Profile />
  }
])

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}