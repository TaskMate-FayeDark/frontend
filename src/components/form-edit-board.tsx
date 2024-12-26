import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Radio } from "antd";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { useState } from "react";
import type { RadioChangeEvent } from "antd";
import type { DatePickerProps } from "antd";
import { Pencil, Trash, Loader2 } from "lucide-react";
import { useAuth } from "../providers/auth-provider";
import { Board } from "../types/Board";
import { Button } from "../components/ui/button";
import { UpdateBoard } from "../types/updateBoard";
import { deleteBoard } from "../api/boards.crud";
import useLink from "../hooks/useLink";
import { PopconfirmProps } from "antd";
import { message, Popconfirm } from "antd";

interface FormEditBoardProps {
  dataBoard: Board;
  onUpdate?: (boardId: string, dataUpdate: UpdateBoard) => Promise<void>;
  loading: boolean;
}

export const FormEditBoard = ({
  dataBoard,
  onUpdate,
  loading,
}: FormEditBoardProps) => {
  const { user } = useAuth();
  const { navigate } = useLink();
  const [openDialogUpdateBoard, setOpenDialogUpdateBoard] = useState(false);
  const [valuePrivacy, setValuePrivacy] = useState(dataBoard.viewing_rights);
  const [dueDate, setDueDate] = useState<string | undefined>(
    dataBoard.due_date
  );
  const [name, setName] = useState(dataBoard.name);
  const [description, setDescription] = useState(dataBoard.description);

  const onChangePrivacy = (e: RadioChangeEvent) => {
    setValuePrivacy(e.target.value);
  };
  const onChangeDate: DatePickerProps["onChange"] = (date) => {
    if (date) {
      setDueDate(date.format("YYYY-MM-DD"));
    } else {
      setDueDate(undefined);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) {
      return;
    }
    const dataUpdate: UpdateBoard = {
      name: name || dataBoard.name,
      description: description || dataBoard.description,
      viewing_rights: valuePrivacy || dataBoard.viewing_rights,
      due_date: dueDate || dataBoard.due_date,
      updated_at: new Date().toISOString(),
    };
    if (onUpdate) {
      await onUpdate(dataBoard.id, dataUpdate);
      setOpenDialogUpdateBoard(false);
    }
  };

  const handleDeleteBoard = async (boardId: string) => {
    try {
      await deleteBoard(boardId);
      navigate({ to: "/work/boards" });
    } catch (error) {
      console.log(error);
    }
  };
  const confirm: PopconfirmProps["onConfirm"] = () => {
    handleDeleteBoard(dataBoard.id);
    message.success("Successfully deleted board");
  };

  const cancel: PopconfirmProps["onCancel"] = () => {
    message.error("Canceled deleting board");
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <Dialog
          open={openDialogUpdateBoard}
          onOpenChange={setOpenDialogUpdateBoard}
        >
          <DialogTrigger asChild>
            <Button variant="outline">
              <Pencil className="h-4 w-4" />
              <p>Edit</p>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit board</DialogTitle>
              <DialogDescription>
                Edit the board details below. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div>
              <form onSubmit={handleSubmit}>
                <div className="nameBoard">
                  <Label htmlFor="name">Name Board</Label>
                  <Input
                    type="name"
                    placeholder={dataBoard.name}
                    name="name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="description mt-4">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder={dataBoard.description}
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="radio mt-4 flex items-center">
                  <Label className="mr-12" htmlFor="privacy">
                    Privacy
                  </Label>
                  <Radio.Group onChange={onChangePrivacy} value={valuePrivacy}>
                    <Radio value={"private"}>Private</Radio>
                    <Radio value={"public"}>Public</Radio>
                  </Radio.Group>
                </div>
                <div className="due-date flex items-center mt-4">
                  <Label className="mr-8" htmlFor="due-date">
                    Due Date
                  </Label>
                  <Space direction="vertical">
                    <DatePicker
                      onChange={onChangeDate}
                      defaultValue={
                        dataBoard.due_date
                          ? dayjs(dataBoard.due_date)
                          : undefined
                      }
                    />
                  </Space>
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    className="bg-blue-500 text-white mt-8 hover:bg-blue-600 hover:text-white"
                  >
                    {loading && <Loader2 />}
                    Save Change
                  </Button>
                </DialogFooter>
              </form>
            </div>
          </DialogContent>
        </Dialog>
        <Popconfirm
          title="Delete the board"
          description="Are you sure to delete this board?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button
            className="bg-rose-100 text-red-500 hover:bg-red-500 hover:text-white "
            variant="outline"
          >
            <Trash className="h-4 w-4" />
            <p>Delete</p>
          </Button>
        </Popconfirm>
      </div>
    </>
  );
};
