import {createRoute} from "@tanstack/react-router";
import {rootRoute} from "../router.tsx";
import {ProfileLayout} from "./profile-layout.tsx";
import {ProfileIndex} from "./profileIndex";

const _profileRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/profile",
    component: ProfileLayout
})

export const profileRoute = _profileRoute.addChildren([
    createRoute({
        getParentRoute: () => _profileRoute,
        path: "/$index",
        component: ProfileIndex,
    })
])