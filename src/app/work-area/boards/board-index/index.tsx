import { useState } from "react";
import ProjectHeader from "./components/project-header";
import ViewOptions from "./components/view-options";
import TaskBoard from "./components/task-board";
import TaskTable from "./components/task-table.tsx";
import TaskTimeline from "./components/task-timeline.tsx";
import TaskList from "./components/task-list.tsx";

type ViewType = "table" | "board" | "timeline" | "list";

export default function Page() {
  const [activeView, setActiveView] = useState<ViewType>("board");

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto space-y-6">
        <ProjectHeader />
        <ViewOptions activeView={activeView} onViewChange={setActiveView} />

        {activeView === "table" && <TaskTable />}
        {activeView === "board" && <TaskBoard />}
        {activeView === "timeline" && <TaskTimeline />}
        {activeView === "list" && <TaskList />}
      </div>
    </div>
  );
}
