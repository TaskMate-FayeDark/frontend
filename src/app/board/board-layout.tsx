import {Outlet} from "@tanstack/react-router";

export const BoardLayout = () => {
    return (
        <>
            <h2>Board</h2>
            <Outlet />
        </>
    )
}