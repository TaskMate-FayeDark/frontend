import { Tabs, TabsList, TabsTrigger } from "../../../../../components/ui/tabs";
import { LayoutGrid, List, Table2, TimerIcon, Plus } from "lucide-react";
import { Button } from "../../../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../../components/ui/dialog";

interface ViewOptionsProps {
  activeView: string;
  onViewChange: (view: "table" | "board" | "timeline" | "list") => void;
}

export default function ViewOptions({
  activeView,
  onViewChange,
}: ViewOptionsProps) {
  return (
    <div className="flex items-center justify-between">
      <Tabs
        value={activeView}
        onValueChange={onViewChange as (value: string) => void}
      >
        <TabsList className="h-12">
          <TabsTrigger value="table" className="flex items-center gap-2 h-10">
            <Table2 className="h-4 w-4" />
            Table
          </TabsTrigger>
          <TabsTrigger value="board" className="flex items-center gap-2 h-10">
            <LayoutGrid className="h-4 w-4" />
            Board
          </TabsTrigger>
          <TabsTrigger
            value="timeline"
            className="flex items-center gap-2 h-10"
          >
            <TimerIcon className="h-4 w-4" />
            Timeline
          </TabsTrigger>
          <TabsTrigger value="list" className="flex items-center gap-2 h-10">
            <List className="h-4 w-4" />
            List
          </TabsTrigger>
        </TabsList>
      </Tabs>
      {/* Add List Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Plus className="h-4 w-4" />
            Add New List
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          {/* Form */}
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
