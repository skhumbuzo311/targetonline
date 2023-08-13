import React from 'react'
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import './style.css'
import Store from './store'
import Home from './views/home'
import Login from './views/login'
import Signup from './views/signup'
import Partner from './views/partner'
import Consulting from './views/consulting'
import UIUXDesign from './views/ui-ux-design'
import Outsourcing from './views/outsourcing'
import Partnership from './views/partnership'
import SoftwareDevelopment from './views/software-development'

const root = ReactDOM.createRoot(
  document.getElementById('app') as HTMLElement
);

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/partner", element: <Partner /> },
  { path: "/consulting", element: <Consulting /> },
  { path: "/ui-ux-design", element: <UIUXDesign /> },
  { path: "/outsourcing", element: <Outsourcing /> },
  { path: "/partnership", element: <Partnership /> },
  { path: "/software-development", element: <SoftwareDevelopment /> },
]);


root.render(
  <React.StrictMode>
    <Store>
      <RouterProvider router={router} />
      <ToastContainer />
    </Store>
  </React.StrictMode>
);