import { createRootRoute, createRouter, Outlet } from '@tanstack/react-router';
import {TanStackRouterDevtools} from "@tanstack/router-devtools";
import {homeRoute} from "./home/home.router.tsx";
import {cardRoute} from "./card/card.router.tsx";
import {boardRoute} from "./board/board.router.tsx";
import {authRoute} from "./auth/auth.router.tsx";
import {profileRoute} from "./profile/profile-router.tsx";
import {workAreaRouter} from "./work-area/work-area-router.tsx";

export const rootRoute = createRootRoute({
    component: () => (
        <>
            <Outlet />
            <TanStackRouterDevtools />
        </>
    ),
    // notFoundComponent: NotFound,
});


export const routeTree = rootRoute.addChildren([
    homeRoute,
    cardRoute,
    boardRoute,
    authRoute,
    profileRoute,
    workAreaRouter
]);

export const router = createRouter({
    routeTree,
    // defaultNotFoundComponent: NotFound,
});

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}
