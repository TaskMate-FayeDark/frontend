import { Card } from "../../../../../components/ui/card";
import { Badge } from "../../../../../components/ui/badge";
import { Avatar, AvatarFallback } from "../../../../../components/ui/avatar";

const timelineTasks = [
  {
    date: "June 2024",
    tasks: [
      {
        title: "Copywriting Content",
        day: "29",
        priority: "high",
        assignees: ["TA", "LW"],
      },
      {
        title: "UI Design Implementation",
        day: "30",
        priority: "high",
        assignees: ["JK"],
      },
      {
        title: "User Research",
        day: "25",
        priority: "medium",
        assignees: ["TA", "JK"],
        status: "Done",
      },
    ],
  },
  // Add more months as needed
];

export default function TaskTimeline() {
  return (
    <div className="overflow-x-auto">
      <div>
        <div className="space-y-8">
          {timelineTasks.map((month, i) => (
            <div key={i} className="space-y-4">
              <h3 className="text-lg font-semibold">{month.date}</h3>
              <div className="relative space-y-6">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
                {month.tasks.map((task, j) => (
                  <div key={j} className="relative ml-10">
                    <div className="absolute -left-10 mt-2 h-4 w-4 rounded-full border-2 border-primary bg-background" />
                    <Card className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">
                              Day {task.day}
                            </span>
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
                            {task.status && (
                              <Badge
                                variant="outline"
                                className="bg-green-100 text-green-800"
                              >
                                {task.status}
                              </Badge>
                            )}
                          </div>
                          <h4 className="font-medium">{task.title}</h4>
                        </div>
                        <div className="flex -space-x-2">
                          {task.assignees.map((assignee, k) => (
                            <Avatar
                              key={k}
                              className="h-6 w-6 border-2 border-background"
                            >
                              <AvatarFallback>{assignee}</AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
