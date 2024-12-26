import { Droppable, Draggable } from "react-beautiful-dnd";
import { Card } from "../../../../../components/ui/card";
import { Avatar, AvatarFallback } from "../../../../../components/ui/avatar";
import { Badge } from "../../../../../components/ui/badge";
import { Paperclip, MessageCircle, MoreHorizontal } from "lucide-react";
import { Button } from "../../../../../components/ui/button";
import { CardItem } from "../../../../../types/card";

interface TaskColumnProps {
  tasks: CardItem[];
  columnId: string;
}

export default function TaskColumn({ tasks, columnId }: TaskColumnProps) {
  return (
    <Droppable droppableId={columnId}>
      {(provided, snapshot) => (
        <div
          className={`space-y-4 ${
            snapshot.isDraggingOver ? "bg-gray-100" : ""
          }`}
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={{ minHeight: "100px" }}
        >
          {tasks.map((task, index) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
              {(provided) => (
                <Card
                  className="p-4"
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center justify-start flex-wrap">
                        {task.label.map((label, i) => (
                          <Badge
                            key={i}
                            variant="outline"
                            className={`mr-1 mb-1 text-[${label.color}]`}
                          >
                            {label.name}
                          </Badge>
                        ))}
                      </div>
                      <Button
                        className="bg-neutral-100"
                        variant="ghost"
                        size="icon"
                      >
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
                          <span className="text-sm">{task.files.length}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          <span className="text-sm">
                            {task.comments.length}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
