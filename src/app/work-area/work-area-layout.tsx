import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "@tanstack/react-router";
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
  Menu,
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
      <Button onClick={logOut} type="text" className="w-30 flex items-center">
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
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const location = useLocation();

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
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
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
      <div className="flex min-h-screen w-full">
        {/* Sidebar */}
        {sidebarVisible && (
          <div className="border-r h-screen">
            <div className="flex h-full flex-col">
              {/* Logo */}
              <div className="flex h-14 items-center px-4 cursor-pointer select-none">
                <GitCompareArrows className="h-6 w-6 text-blue-600" />
                <span className="ml-2 text-2xl font-semibold">TaskMate</span>
              </div>

              {/* Navigation */}
              <ScrollArea className="flex-1 px-3 py-1 mt-4">
                <div className="space-y-4">
                  <Link
                    to={"/work/boards"}
                    className={`w-full flex items-center justify-start pl-4 py-2 rounded-md text-neutral-900 hover:bg-gray-100 hover:text-neutral-700 ${
                      location.pathname.startsWith("/work/boards")
                        ? "bg-gray-200"
                        : ""
                    }`}
                  >
                    <LayoutGrid className="mr-2 h-4 w-4" />
                    My Boards
                  </Link>
                  <Link
                    to={"/work/calendar"}
                    className={`w-full flex items-center justify-start pl-4 py-2 rounded-md text-neutral-900 hover:bg-gray-100 hover:text-neutral-700 ${
                      location.pathname === "/work/calendar"
                        ? "bg-gray-200"
                        : ""
                    }`}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Calendar
                  </Link>
                  <Link
                    to={"/work/members"}
                    className={`w-full flex items-center justify-start pl-4 py-2 rounded-md text-neutral-900 hover:bg-gray-100 hover:text-neutral-700 ${
                      location.pathname === "/work/members" ? "bg-gray-200" : ""
                    }`}
                  >
                    <UsersRound className="mr-2 h-4 w-4" />
                    Member
                  </Link>
                  <Link
                    to={"/work/chat"}
                    className={`w-full flex items-center justify-start pl-4 py-2 rounded-md text-neutral-900 hover:bg-gray-100 hover:text-neutral-700 ${
                      location.pathname === "/work/chat" ? "bg-gray-200" : ""
                    }`}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Message
                  </Link>
                  <Link
                    to={"/work/settings"}
                    className={`w-full flex items-center justify-start pl-4 py-2 rounded-md text-neutral-900 hover:bg-gray-100 hover:text-neutral-700 ${
                      location.pathname === "/work/settings"
                        ? "bg-gray-200"
                        : ""
                    }`}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                  <Link
                    to={"#"}
                    className={`w-full flex items-center justify-start pl-4 py-2 rounded-md text-neutral-900 hover:bg-gray-100 hover:text-neutral-700 ${
                      location.pathname === "#" ? "bg-gray-200" : ""
                    }`}
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
                    <span className="font-semibold">Become Pro</span>
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
        )}

        {/* Main Content */}
        <div
          className="flex flex-col overflow-auto"
          style={{
            backgroundImage:
              "radial-gradient(circle, #e8e8e8 2px, transparent 1px)",
            backgroundSize: "35px 35px",
            width: "100%",
          }}
        >
          {/* Header */}
          <header className="w-auto max-w-full flex h-14 items-center gap-4 shadow-md px-6 bg-white overflow-hidden flex-wrap">
            {/* Sidebar toggle */}
            <Button type="text" onClick={toggleSidebar} className="shrink-0">
              <Menu className="h-6 w-6" />
            </Button>

            {/* Search form */}
            <div className="flex-1 min-w-[200px]">
              <form>
                <div className="relative w-[300px]">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search by boards, card, label, user..."
                    className="pl-8 w-full"
                  />
                </div>
              </form>
            </div>

            {/* Notifications and User Profile */}
            <div className="flex items-center gap-4 shrink-0">
              {/* Notification */}
              <Popover
                content={<a onClick={hideNotification}>Close</a>}
                title="Notification"
                trigger="click"
                open={openNotification}
                onOpenChange={handleOpenNotification}
              >
                <Button type="text">
                  <Bell className="h-4 w-4" />
                  <span className="sr-only">Notifications</span>
                </Button>
              </Popover>

              {/* User Avatar */}
              <Popover
                content={<PopoverUser onClose={hideUser} />}
                title=""
                trigger="click"
                open={openUser}
                onOpenChange={handleOpenUser}
              >
                <Avatar>
                  <AvatarImage
                    src={user?.profile_picture || undefined}
                    alt="User"
                  />
                  <AvatarFallback>
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </Popover>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-6 w-full overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};
