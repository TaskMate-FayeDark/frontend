import {createRoute} from "@tanstack/react-router";
import {rootRoute} from "../router.tsx";
import {WorkAreaLayout} from "./work-area-layout.tsx";
import {WorkAreaUser} from "./work-area-user";

const _workAreaRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/work",
    component: WorkAreaLayout,
})

export const workAreaRouter = _workAreaRoute.addChildren([
    createRoute({
        getParentRoute: () => _workAreaRoute,
        path: `/$idUser`,
        component: WorkAreaUser,
    })
])