import { Card } from "../../../../../components/ui/card";
import { Badge } from "../../../../../components/ui/badge";
import { Avatar, AvatarFallback } from "../../../../../components/ui/avatar";
import { Paperclip, MessageCircle, ChevronRight } from "lucide-react";

const listTasks = [
  {
    title: "Copywriting Content",
    description: "Create content for Mindlax Mobile...",
    status: "Backlog",
    priority: "high",
    assignees: ["TA", "LW"],
    comments: 16,
    attachments: 8,
  },
  {
    title: "UI Design Implementation",
    description: "Create content for Mindlax Mobile...",
    status: "To Do",
    priority: "high",
    assignees: ["JK"],
    comments: 18,
    attachments: 12,
  },
  {
    title: "User Research",
    description: "Conduct user research for Mindlax...",
    status: "Done",
    priority: "medium",
    assignees: ["TA", "JK"],
    comments: 24,
    attachments: 5,
  },
];

export default function TaskList() {
  return (
    <div className="overflow-x-auto">
      <div>
        <div className="space-y-4">
          {listTasks.map((task, i) => (
            <Card
              key={i}
              className="p-4 hover:bg-accent/50 cursor-pointer transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{task.title}</h4>
                    <Badge
                      variant="outline"
                      className={
                        task.status === "Done"
                          ? "bg-green-100 text-green-800"
                          : ""
                      }
                    >
                      {task.status}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={
                        task.priority === "high"
                          ? "text-red-500"
                          : "text-orange-500"
                      }
                    >
                      {task.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {task.description}
                  </p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex -space-x-2">
                    {task.assignees.map((assignee, j) => (
                      <Avatar
                        key={j}
                        className="h-6 w-6 border-2 border-background"
                      >
                        <AvatarFallback>{assignee}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Paperclip className="h-4 w-4" />
                      <span className="text-sm">{task.attachments}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      <span className="text-sm">{task.comments}</span>
                    </div>
                  </div>

                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
