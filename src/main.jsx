import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Navbar from './components/Navbar.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Footer from './components/Footer.jsx';
import ProtectedRoutes from './ProtectedRoutes.jsx';
import SemiPublicRoutes from './SemiPublicRoutes.jsx';
import PreviousScore from './components/PreviousScore.jsx';

const router = createBrowserRouter([

  {
    element: <ProtectedRoutes />, // Wrap protected routes with ProtectedRoutes
    children: [
      {
        path: "/",
        element: <><Navbar /><App /><Footer /></>
      },
      {
        path: "/prevScore",
        element: <><Navbar /><PreviousScore /><Footer /></>
      },
    ],
  },
  {
    element: <SemiPublicRoutes />, // Wrap protected routes with SemiPublicRoutes
    children: [
      {
        path: "/login",
        element: <><Navbar /><Login /><Footer /></>
      },
      {
        path: "/register",
        element: <><Navbar /><Register /><Footer /></>
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
