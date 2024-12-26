import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { LockIcon, HomeIcon, BriefcaseIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";

export default function PrivateBoardNotice() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="mx-auto bg-primary-foreground p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
          <LockIcon className="w-6 h-6 text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold">Private Board</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-muted-foreground">
          This board is private and cannot be viewed. Please contact the
          administrator for access.
        </p>
      </CardContent>
      <CardFooter className="flex justify-center space-x-4">
        <Button asChild variant="outline">
          <Link href="/home">
            <HomeIcon className="w-4 h-4 mr-2" />
            Home
          </Link>
        </Button>
        <Button asChild>
          <Link href="/work">
            <BriefcaseIcon className="w-4 h-4 mr-2" />
            Work
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
