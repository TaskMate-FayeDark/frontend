import TaskColumn from "./task-column";

const columns = [
  {
    title: "Backlog",
    tasks: [
      {
        title: "Copywriting Content",
        description: "Create content for Mindlax Mobile...",
        priority: "high" as "high" | "medium" | "low",
        comments: 16,
        attachments: 8,
      },
    ],
  },
  {
    title: "To Do",
    tasks: [
      {
        title: "UI Design Implementation",
        description: "Create content for Mindlax Mobile...",
        priority: "high" as "high" | "medium" | "low",
        comments: 18,
        attachments: 12,
      },
    ],
  },
  {
    title: "In Progress",
    tasks: [
      {
        title: "Competitor Research",
        description: "Competitor research about Mindl...",
        priority: "medium" as "high" | "medium" | "low",
        comments: 48,
        attachments: 21,
      },
    ],
  },
  {
    title: "Need Review",
    tasks: [
      {
        title: "Information Architecture",
        description: "Create information architecture f...",
        priority: "high" as "high" | "medium" | "low",
        comments: 38,
        attachments: 8,
      },
    ],
  },
  {
    title: "Done",
    tasks: [
      {
        title: "User Research",
        description: "Conduct user research for Mindlax...",
        priority: "medium " as "high" | "medium" | "low",
        comments: 24,
        attachments: 5,
      },
    ],
  },
];

export default function TaskBoard() {
  return (
    <div className="overflow-x-auto scrollbar-thin pb-3">
      <div
        className="flex gap-6"
        style={{ width: `${columns.length * 300}px` }}
      >
        {columns.map((column) => (
          <div key={column.title} className="w-[300px] flex-shrink-0">
            <TaskColumn {...column} />
          </div>
        ))}
      </div>
    </div>
  );
}
