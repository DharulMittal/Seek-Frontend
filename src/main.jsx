import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './Redux/store'
import { Provider } from 'react-redux'
import { BrowserRouter, createBrowserRouter, RouterProvider, Routes,Route } from "react-router";
import "./Styles/tailwind.css";
// import Signup from './pages/Signup.jsx';
// import Loginpage from './pages/Loginpage.jsx';
// import Setting from './pages/Setting.jsx';
// import Profile from './pages/Profile.jsx';
// import { Route } from 'lucide-react'

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//   },
//   {
//     path: "/signup",
//     element: <Signup />,
//   },
//   {
//     path: "/login",
//     element: <Loginpage />,
//   },
//   {
//     path: "/setting",
//     element: <Setting />,
//   },
//   {
//     path: "/profile",
//     element: <Profile />,
//   },
// ]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      {/* <App /> */}
      {/* <RouterProvider router={router} /> */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
  </StrictMode>,
)
