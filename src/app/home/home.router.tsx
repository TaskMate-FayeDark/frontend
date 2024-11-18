import { createRoute } from '@tanstack/react-router';
import { rootRoute } from '../router';
import {HomePage} from "./index.tsx";

export const homeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: HomePage,
});
