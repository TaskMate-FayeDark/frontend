import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../../components/ui/table";
import { Avatar, AvatarFallback } from "../../../../../components/ui/avatar";
import { Badge } from "../../../../../components/ui/badge";
import { Paperclip, MessageCircle } from "lucide-react";

const tasks = [
  {
    title: "Copywriting Content",
    status: "Backlog",
    priority: "high",
    assignees: ["TA", "LW"],
    comments: 16,
    attachments: 8,
    dueDate: "2024-06-29",
  },
  {
    title: "UI Design Implementation",
    status: "To Do",
    priority: "high",
    assignees: ["JK"],
    comments: 18,
    attachments: 12,
    dueDate: "2024-06-29",
  },
  {
    title: "User Research",
    status: "Done",
    priority: "medium",
    assignees: ["TA", "JK"],
    comments: 24,
    attachments: 5,
    dueDate: "2024-06-25",
  },
];

export default function TaskTable() {
  return (
    <div className="overflow-x-auto">
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Assignees</TableHead>
              <TableHead>Comments</TableHead>
              <TableHead>Attachments</TableHead>
              <TableHead>Due Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{task.title}</TableCell>
                <TableCell>
                  <Badge variant="outline">{task.status}</Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      task.priority === "high"
                        ? "text-red-500"
                        : task.priority === "medium"
                        ? "text-orange-500"
                        : "text-green-500"
                    }
                  >
                    {task.priority}
                  </Badge>
                </TableCell>
                <TableCell>
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
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>{task.comments}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Paperclip className="h-4 w-4" />
                    <span>{task.attachments}</span>
                  </div>
                </TableCell>
                <TableCell>{task.dueDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
