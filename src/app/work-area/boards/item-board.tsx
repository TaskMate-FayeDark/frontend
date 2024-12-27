import { format } from "date-fns";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import useLink from "../../../hooks/useLink";

interface BoardCardProps {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  createdAt: Date;
  expiresAt: Date;
}

export default function ItemBoard({
  id,
  title,
  description,
  createdBy,
  createdAt,
  expiresAt,
}: BoardCardProps) {
  const { navigate } = useLink();
  return (
    <Card className="max-w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold truncate">{title}</CardTitle>
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
        <Button
          onClick={() => {
            navigate({
              to: `/work/boards/${id}`,
            });
          }}
          className="mt-2 w-full"
          variant="outline"
        >
          View Board
        </Button>
      </CardFooter>
    </Card>
  );
}
