import {createRoute} from "@tanstack/react-router";
import {rootRoute} from "../router.tsx";
import {AuthLayout} from "./auth-layout.tsx";
import {Login} from "./login";
import {Signup} from "./signup";
import {ResetPassword} from "./reset-password";
import VerificationPage from "./verification-code";

const _authRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/auth',
    component: AuthLayout,
});

export const authRoute = _authRoute.addChildren([
    createRoute({
        getParentRoute: () => _authRoute,
        path: '/login',
        component: Login,
    }),
    createRoute({
        getParentRoute: () => _authRoute,
        path: '/signup',
        component: Signup,
    }),
    createRoute({
        getParentRoute: () => _authRoute,
        path: '/reset-password',
        component: ResetPassword,
    }),
    createRoute({
        getParentRoute: () => _authRoute,
        path: '/verification-code',
        component: VerificationPage,
    }),
]);
