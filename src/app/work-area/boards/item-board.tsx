import { MoreVertical, Edit2, Trash2 } from "lucide-react";
import { format } from "date-fns";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { Button } from "../../../components/ui/button";

interface BoardCardProps {
  title: string;
  description: string;
  createdBy: string;
  createdAt: Date;
  expiresAt: Date;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function ItemBoard({
  title,
  description,
  createdBy,
  createdAt,
  expiresAt,
  onEdit,
  onDelete,
}: BoardCardProps) {
  return (
    <Card className="max-w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold truncate">{title}</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-0 bg-slate-50">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onEdit}>
              <Edit2 className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete} className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground overflow-hidden">
          {description}
        </p>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Created by: {createdBy}</span>
        </div>
        <div className="flex flex-col gap-1 text-xs text-muted-foreground">
          <span>Created: {format(createdAt, "MMM dd, yyyy HH:mm")}</span>
          <span>Expires: {format(expiresAt, "MMM dd, yyyy HH:mm")}</span>
        </div>
        <Button className="mt-2 w-full" variant="outline">
          View Board
        </Button>
      </CardFooter>
    </Card>
  );
}
