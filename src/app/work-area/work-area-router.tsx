import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../router.tsx";
import { WorkAreaLayout } from "./work-area-layout.tsx";
import { BoardList } from "./boards/board.tsx";
import BoardIndex from "./boards/board-index/index.tsx";
import CalendarPage from "./calendar/index.tsx";

const _workAreaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/work",
  component: WorkAreaLayout,
});

export const workAreaRouter = _workAreaRoute.addChildren([
  createRoute({
    getParentRoute: () => _workAreaRoute,
    path: "/boards",
    component: BoardList,
  }),
  createRoute({
    getParentRoute: () => _workAreaRoute,
    path: "/boards/$board_id",
    component: BoardIndex,
  }),
  createRoute({
    getParentRoute: () => _workAreaRoute,
    path: "/calendar",
    component: CalendarPage,
  }),
]);
