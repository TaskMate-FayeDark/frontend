import {createRoute} from "@tanstack/react-router";
import {rootRoute} from "../router.tsx";
import {AuthLayout} from "./auth-layout.tsx";
import {Login} from "./login";
import {Signup} from "./signup";

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
]);
