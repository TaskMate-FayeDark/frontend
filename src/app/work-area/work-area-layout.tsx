import React, { useState, useEffect } from "react";
import { Outlet } from "@tanstack/react-router";
import {
    Calendar,
    UsersRound,
    LayoutGrid,
    Settings,
    HelpCircle,
    Search,
    Bell,
    GitCompareArrows,
    MessageCircle,
    User,
    LogOut,
} from "lucide-react";
import { Button, Popover } from "antd";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Input } from "../../components/ui/input";
import { Link } from "@tanstack/react-router";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "../../components/ui/avatar";
import { useAuth } from "../../providers/auth-provider";
import { LocalStorageKey } from "../../types/localstorage";
import useLink from "../../hooks/useLink";
import LoadingPage from "../../components/loading-page";

type PropPopover = {
    onClose: () => void;
};
const PopoverUser: React.FC<PropPopover> = ({ onClose }) => {
    const { navigate } = useLink();
    const { logout } = useAuth();
    const gotoProfile = () => {
        navigate({
            to: "/profile",
        });
    };
    const logOut = async () => {
        await logout();
        onClose();
        navigate({
            to: "/auth/login",
        });
    };
    return (
        <div className="flex flex-col items-start justify-start">
            <Button
                onClick={gotoProfile}
                type="text"
                className="w-30 flex items-center"
            >
                <User className="w-4 h-4 mr-1" />
                Profile
            </Button>
            <Button
                onClick={logOut}
                type="text"
                className="w-30 flex items-center"
            >
                <LogOut className="mr-1 w-4 h-4" />
                Logout
            </Button>
        </div>
    );
};
export const WorkAreaLayout: React.FC = () => {
    const { user } = useAuth();
    const { navigate } = useLink();
    const token = localStorage.getItem(LocalStorageKey.ACCESS_TOKEN);
    const [openNotification, setOpenNotification] = useState(false);
    const [openUser, setOpenUser] = useState(false);
    const [loading, setLoading] = useState(true);
    const hideNotification = () => {
        setOpenNotification(false);
    };
    const handleOpenNotification = (newOpen: boolean) => {
        setOpenNotification(newOpen);
    };
    const hideUser = () => {
        setOpenUser(false);
    };
    const handleOpenUser = (newOpen: boolean) => {
        setOpenUser(newOpen);
    };
    useEffect(() => {
        if (user !== undefined) {
            setLoading(false);
        }
    }, [user]);
    useEffect(() => {
        if (!token) {
            navigate({ to: "/auth/login" });
        }
    }, [token, navigate]);
    if (loading) {
        return <LoadingPage />;
    }
    if (!user) {
        navigate({ to: "/auth/login" });
    }
    return (
        <>
            <div className="flex min-h-screen">
                {/* Sidebar */}
                <div className="w-64 border-r">
                    <div className="flex h-full flex-col">
                        {/* Logo */}
                        <div className="flex h-14 items-center px-4 cursor-pointer select-none">
                            <GitCompareArrows className="h-6 w-6 text-blue-600" />
                            <span className="ml-2 text-2xl font-semibold">
                                TaskMate
                            </span>
                        </div>

                        {/* Navigation */}
                        <ScrollArea className="flex-1 px-3 py-1 mt-4 ">
                            <div className="space-y-4">
                                <Link
                                    to={"/work/boards"}
                                    className="w-full flex items-center justify-start pl-4 py-2 rounded-md text-neutral-900 hover:bg-gray-100 hover:text-neutral-700"
                                >
                                    <LayoutGrid className="mr-2 h-4 w-4" />
                                    My Boards
                                </Link>
                                <Link
                                    to={"/work/calendar"}
                                    className="w-full flex items-center justify-start pl-4 py-2 rounded-md text-neutral-900 hover:bg-gray-100 hover:text-neutral-700"
                                >
                                    <Calendar className="mr-2 h-4 w-4" />
                                    Calendar
                                </Link>
                                <Link
                                    to={"/work/members"}
                                    className="w-full flex items-center justify-start pl-4 py-2 rounded-md text-neutral-900 hover:bg-gray-100 hover:text-neutral-700"
                                >
                                    <UsersRound className="mr-2 h-4 w-4" />
                                    Member
                                </Link>
                                <Link
                                    to={"/work/chat"}
                                    className="w-full flex items-center justify-start pl-4 py-2 rounded-md text-neutral-900 hover:bg-gray-100 hover:text-neutral-700"
                                >
                                    <MessageCircle className="mr-2 h-4 w-4" />
                                    Message
                                </Link>
                                <Link
                                    to={"/work/settings"}
                                    className="w-full flex items-center justify-start pl-4 py-2 rounded-md text-neutral-900 hover:bg-gray-100 hover:text-neutral-700"
                                >
                                    <Settings className="mr-2 h-4 w-4" />
                                    Settings
                                </Link>
                                <Link
                                    to={"#"}
                                    className="w-full flex items-center justify-start pl-4 py-2 rounded-md text-neutral-900 hover:bg-gray-100 hover:text-neutral-700"
                                >
                                    <HelpCircle className="mr-2 h-4 w-4" />
                                    Support
                                </Link>
                            </div>
                        </ScrollArea>

                        {/* Upgrade Section */}
                        <div className="border-t p-4">
                            <div className="rounded-lg bg-gray-50 p-4">
                                <div className="mb-2 flex items-center">
                                    <span className="mr-2">🚀</span>
                                    <span className="font-semibold">
                                        Become Pro
                                    </span>
                                </div>
                                <p className="mb-3 text-sm text-muted-foreground">
                                    Upgrade for premium features
                                </p>
                                <Button color="primary" variant="filled">
                                    Manage your plan
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex flex-1 flex-col">
                    {/* Header */}
                    <header className="flex h-14 items-center gap-4 shadow-md px-6">
                        <div className="flex-1">
                            <form>
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="search"
                                        placeholder="Search by boards, card, label, user..."
                                        className="w-96 pl-8"
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="flex items-center gap-4">
                            <Popover
                                content={
                                    <a onClick={hideNotification}>Close</a>
                                }
                                title="Notification"
                                trigger="click"
                                open={openNotification}
                                onOpenChange={handleOpenNotification}
                            >
                                <Button type="text">
                                    <Bell className="h-4 w-4" />
                                    <span className="sr-only">
                                        Notifications
                                    </span>
                                </Button>
                            </Popover>
                            <Popover
                                content={<PopoverUser onClose={hideUser} />}
                                title=""
                                trigger="click"
                                open={openUser}
                                onOpenChange={handleOpenUser}
                            >
                                <Avatar>
                                    <AvatarImage
                                        src={
                                            user && user.profile_picture
                                                ? user.profile_picture
                                                : "/default-avt-user.webp"
                                        }
                                        alt="User"
                                    />
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                            </Popover>
                        </div>
                    </header>

                    {/* Page Content */}
                    <main className="flex-1 p-6">
                        <Outlet />
                    </main>
                </div>
            </div>
        </>
    );
};
