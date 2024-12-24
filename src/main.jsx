import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './Redux/store'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider, } from "react-router";
import Signup from './pages/Signup.jsx';
import Loginpage from './pages/Loginpage.jsx';
import Setting from './pages/Setting.jsx';
import Profile from './pages/Profile.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signup",
    element: <Signup/>,
  },
  {
    path: "/login",
    element: <Loginpage />,
  },
  {
    path: "/setting",
    element: <Setting />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>,
  </StrictMode>,
)
