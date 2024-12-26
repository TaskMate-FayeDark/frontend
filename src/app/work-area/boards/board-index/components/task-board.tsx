import { useState } from "react";
import TaskColumn from "./task-column";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

const initialColumns = [
  {
    id: "backlog",
    title: "Backlog",
    tasks: [
      {
        id: "1",
        title: "Copywriting Content",
        description: "Create content for Mindlax Mobile...",
        position: 1,
        due_date: new Date(),
        list_id: "backlog",
        comments: [],
        label: [
          {
            id: "1",
            name: "UI",
            board_id: "1",
            color: "#eb4034",
          },
          {
            id: "2",
            name: "Function",
            board_id: "1",
            color: "#eb4034",
          },
          {
            id: "3",
            name: "Design",
            board_id: "1",
            color: "#eb4034",
          },
        ],
        assignees: [],
        files: [],
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "2",
        title: "Copywriting Content",
        description: "Create content for Mindlax Mobile...",
        position: 1,
        due_date: new Date(),
        list_id: "backlog",
        comments: [],
        label: [
          {
            id: "1",
            name: "UI",
            board_id: "1",
            color: "#eb4034",
          },
          {
            id: "2",
            name: "Function",
            board_id: "1",
            color: "#eb4034",
          },
          {
            id: "3",
            name: "Design",
            board_id: "1",
            color: "#eb4034",
          },
        ],
        assignees: [],
        files: [],
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
  },
  {
    id: "todo",
    title: "To Do",
    tasks: [
      {
        id: "3",
        title: "UI Design Implementation",
        description: "Create content for Mindlax Mobile...",
        position: 1,
        due_date: new Date(),
        list_id: "todo",
        comments: [],
        label: [
          {
            id: "1",
            name: "UI",
            board_id: "1",
            color: "#eb4034",
          },
          {
            id: "2",
            name: "Design",
            board_id: "1",
            color: "#eb4034",
          },
        ],
        assignees: [],
        files: [],
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
  },
  {
    id: "inprogress",
    title: "In Progress",
    tasks: [
      {
        id: "4",
        title: "Competitor Research",
        description: "Competitor research about Mindl...",
        position: 1,
        due_date: new Date(),
        list_id: "inprogress",
        comments: [],
        label: [
          {
            id: "1",
            name: "Function",
            board_id: "1",
            color: "#eb4034",
          },
        ],
        assignees: [],
        files: [],
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
  },
  {
    id: "needreview",
    title: "Need Review",
    tasks: [
      {
        id: "5",
        title: "Information Architecture",
        description: "Create information architecture f...",
        position: 1,
        due_date: new Date(),
        list_id: "needreview",
        comments: [],
        label: [
          {
            id: "1",
            name: "Function",
            board_id: "1",
            color: "#eb4034",
          },
        ],
        assignees: [],
        files: [],
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
  },
  {
    id: "done",
    title: "Done",
    tasks: [
      {
        id: "6",
        title: "User Research",
        description: "Conduct user research for Mindlax...",
        position: 1,
        due_date: new Date(),
        list_id: "done",
        comments: [],
        label: [
          {
            id: "1",
            name: "Function",
            board_id: "1",
            color: "#eb4034",
          },
        ],
        assignees: [],
        files: [],
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
  },
];

export default function TaskBoard() {
  const [columns, setColumns] = useState(initialColumns);

  const onDragEnd = (result: DropResult) => {
    const { source, destination, type } = result;
    if (!destination) return;
    if (type === "COLUMN") {
      const updatedColumns = Array.from(columns);
      const [movedColumn] = updatedColumns.splice(source.index, 1);
      updatedColumns.splice(destination.index, 0, movedColumn);
      setColumns(updatedColumns);
    } else {
      const sourceColumnIndex = columns.findIndex(
        (column) => column.id === source.droppableId
      );
      const destinationColumnIndex = columns.findIndex(
        (column) => column.id === destination.droppableId
      );

      const sourceColumn = columns[sourceColumnIndex];
      const destinationColumn = columns[destinationColumnIndex];

      const sourceTasks = Array.from(sourceColumn.tasks || []);
      const [movedTask] = sourceTasks.splice(source.index, 1);

      if (sourceColumnIndex === destinationColumnIndex) {
        sourceTasks.splice(destination.index, 0, movedTask);
        setColumns((prevColumns) => {
          const updatedColumns = prevColumns.map((column, index) => {
            if (index === sourceColumnIndex) {
              return { ...column, tasks: sourceTasks };
            }
            return column;
          });
          return updatedColumns;
        });
      } else {
        const destinationTasks = Array.from(destinationColumn.tasks || []);
        destinationTasks.splice(destination.index, 0, movedTask);

        setColumns((prevColumns) => {
          const updatedColumns = prevColumns.map((column, index) => {
            if (index === sourceColumnIndex) {
              return { ...column, tasks: sourceTasks };
            }
            if (index === destinationColumnIndex) {
              return { ...column, tasks: destinationTasks };
            }
            return column;
          });
          return updatedColumns;
        });
      }
    }
  };

  return (
    <div
      className="overflow-x-auto overflow-y-auto scrollbar-thin pb-3"
      style={{ maxHeight: "100vh" }}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="columns" direction="horizontal" type="COLUMN">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex gap-6"
              style={{ width: `${columns.length * 300}px` }}
            >
              {columns.map((column, index) => (
                <Draggable
                  key={column.id}
                  draggableId={column.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="w-[300px] flex-shrink-0 bg-neutral-100 px-3 py-4 rounded-lg shadow flex flex-col space-y-2 items-center"
                      style={{
                        height: `calc(60px + ${column.tasks.length * 180}px)`,
                        ...provided.draggableProps.style,
                      }}
                    >
                      <div
                        {...provided.dragHandleProps}
                        className="w-full px-3"
                      >
                        <div className=" w-full flex items-center justify-between">
                          <h3 className="font-medium">{column.title}</h3>
                          <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
                            {column.tasks.length}
                          </span>
                        </div>
                      </div>
                      <TaskColumn {...column} columnId={column.id} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
