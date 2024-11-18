import { createRoute } from '@tanstack/react-router';
import { rootRoute } from '../router';
import {CardLayout} from "./card-layout.tsx"
import {CardItem} from "./cardItem";

const _cardRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/card',
    component: CardLayout
});

export const cardRoute = _cardRoute.addChildren([
    createRoute({
        getParentRoute: () => _cardRoute,
        path: '/$idCard',
        component: CardItem,
    }),
]);