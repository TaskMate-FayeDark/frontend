import { createRoute } from '@tanstack/react-router';
import { rootRoute } from '../router';
import {BoardLayout} from "./board-layout.tsx";
import {BoardIndex} from "./boardIndex";

const _boardRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/board',
    component: BoardLayout,
});

export const boardRoute = _boardRoute.addChildren([
    createRoute({
        getParentRoute: () => _boardRoute,
        path: '/$bid',
        component: BoardIndex,
    }),
]);