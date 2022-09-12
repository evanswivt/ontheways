// import { lazy } from 'react';

// project imports
// import Loadable from "../ui-component/Loadable";
import MinimalLayout from "../layouts/MinimalLayout";
import Login from "../components/authentication/login/login";
import ForgotPassword from "../components/authentication/forgotPassword/forgotPassword.component";
import Register from "../components/authentication/register/register";
import Verification from "../components/authentication/verification/verification.component";
import ResetPassword from "../components/authentication/resetPassword/resetPassword.component";

// login option 3 routing
// const AuthLogin = Loadable(lazy(() => import('../components/authentication/login/login')));
// const AuthForgotPassword = Loadable(lazy(() => import('../components/authentication/forgotPassword/forgotPassword.component')));
// const AuthRegister = Loadable(lazy(() => import('../components/authentication/register/register')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/',
            element: <Login />
        },
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/forgotPassword',
            element: <ForgotPassword />
        },
        {
            path: '/register',
            element: <Register />
        },
        {
            path: '/verification',
            element: <Verification />
        },
        {
            path: '/resetPassword',
            element: <ResetPassword />
        }
    ]
};

export default AuthenticationRoutes;
