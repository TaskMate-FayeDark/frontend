import { Card } from "../../../../../components/ui/card";
import { Avatar, AvatarFallback } from "../../../../../components/ui/avatar";
import { Badge } from "../../../../../components/ui/badge";
import { Paperclip, MessageCircle, MoreHorizontal } from "lucide-react";
import { Button } from "../../../../../components/ui/button";

interface Task {
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  comments: number;
  attachments: number;
}

export interface TaskColumnProps {
  title: string;
  tasks: Task[];
}

export default function TaskColumn({ title, tasks }: TaskColumnProps) {
  const getBadgeColor = (priority: "high" | "medium" | "low") => {
    switch (priority) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-orange-500";
      case "low":
        return "text-green-500";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">{title}</h3>
        <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
          {tasks.length}
        </span>
      </div>

      <div className="space-y-4">
        {tasks.map((task, i) => (
          <Card key={i} className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge
                  variant="outline"
                  className={getBadgeColor(task.priority)}
                >
                  {task.priority}
                </Badge>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>

              <div>
                <h4 className="font-medium">{task.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {task.description}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  {Array.from({ length: 2 }).map((_, i) => (
                    <Avatar
                      key={i}
                      className="h-6 w-6 border-2 border-background"
                    >
                      <AvatarFallback>U{i}</AvatarFallback>
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
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
