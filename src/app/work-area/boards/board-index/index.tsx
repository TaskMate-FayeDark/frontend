import { useState, useEffect } from "react";
import ProjectHeader from "./components/project-header";
import ViewOptions from "./components/view-options";
import TaskBoard from "./components/task-board";
import TaskTable from "./components/task-table.tsx";
import TaskTimeline from "./components/task-timeline.tsx";
import TaskList from "./components/task-list.tsx";
import { getBoardById } from "../../../../api/boards.crud.ts";
import { useParams } from "@tanstack/react-router";
import { useAuth } from "../../../../providers/auth-provider.tsx";
import useLink from "../../../../hooks/useLink.ts";
import useMessage from "../../../../hooks/useMessage.ts";
import { AxiosError } from "axios";
import { IError } from "../../../../types/error.ts";
import LoadingPage from "../../../../components/loading-page.tsx";
import { Board } from "../../../../types/Board.ts";
import { IUser } from "../../../../types/user.ts";
import PrivateBoardNotice from "../../../../components/private-board-notice.tsx";
import { UpdateBoard } from "../../../../types/updateBoard.ts";
import { updateBoard } from "../../../../api/boards.crud.ts";

type ViewType = "table" | "board" | "timeline" | "list";

export default function Page() {
  const { navigate } = useLink();
  const { openNotification, contextHolder } = useMessage();
  const { user } = useAuth();
  const [role, setRole] = useState<string | undefined>(undefined);
  const [dataBoard, setDataBoard] = useState<Board>();
  const [members, setMembers] = useState<IUser[]>();
  const [activeView, setActiveView] = useState<ViewType>("board");
  const { board_id } = useParams({ strict: false });
  const [loading, setLoading] = useState(false);
  const getBoard = async () => {
    try {
      const res = await getBoardById(board_id);
      setRole(res.role);
      setDataBoard(res.data);
      setMembers(res.member);
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const dataError = error.response.data as IError;
        if (dataError && dataError.message) {
          openNotification("bottomRight", dataError.message);
        }
      } else {
        openNotification("bottomRight", "An unexpected error occurred.");
      }
    }
  };

  useEffect(() => {
    getBoard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board_id]);
  if (!user) {
    navigate({
      to: "/auth/login",
    });
  }
  if (!role || !dataBoard || !members) {
    return <LoadingPage />;
  }
  if (dataBoard.viewing_rights === "private" && !role) {
    return <PrivateBoardNotice />;
  }
  const actionUpdateBoard = async (
    boardId: string,
    dataUpdate: UpdateBoard
  ) => {
    try {
      await updateBoard(boardId, dataUpdate);
      openNotification("bottomRight", "Board updated successfully!");
      getBoard();
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const dataError = error.response.data as IError;
        if (dataError && dataError.message) {
          openNotification("bottomRight", dataError.message);
        }
      } else {
        openNotification("bottomRight", "An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {contextHolder}
      <div className="min-h-screen bg-background p-6">
        <div className="mx-auto space-y-6">
          <ProjectHeader
            dataBoard={dataBoard}
            members={members}
            role={role}
            onUpdate={actionUpdateBoard}
            loading={loading}
          />
          <ViewOptions activeView={activeView} onViewChange={setActiveView} />

          {activeView === "table" && <TaskTable />}
          {activeView === "board" && <TaskBoard />}
          {activeView === "timeline" && <TaskTimeline />}
          {activeView === "list" && <TaskList />}
        </div>
      </div>
    </>
  );
}
