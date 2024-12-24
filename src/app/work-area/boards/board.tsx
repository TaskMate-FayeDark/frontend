/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import { api } from "../../../api/api";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import type { RadioChangeEvent } from "antd";
import { Radio } from "antd";
import type { DatePickerProps } from "antd";
import { DatePicker, Space } from "antd";
import { useAuth } from "../../../providers/auth-provider";
import { AxiosError } from "axios";
import ItemBoard from "./item-board";
import { Pagination } from "antd";
import type { PaginationProps } from "antd";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import LoadingPage from "../../../components/loading-page";
import { v4 as uuidv4 } from "uuid";
import useMessage from "../../../hooks/useMessage";
import { IError } from "../../../types/error";
import { getBoardPagination } from "../../../api/boards.crud";

export interface Board {
  created_at: string;
  created_by: number;
  description: string;
  due_date: string;
  id: string;
  name: string;
  updated_at: string;
  viewing_rights: string;
  createdByUser: {
    name: string;
    profile_picture: string;
  };
}

export function BoardList() {
  const { openNotification, contextHolder } = useMessage();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [openDialogCreateBoard, setOpenDialogCreateBoard] = useState(false);
  const [valuePrivacy, setValuePrivacy] = useState("");
  const [dueDate, setDueDate] = useState<string | undefined>(undefined);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dataBoards, setDataBoards] = useState<Board[]>();
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 6;

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
  if (!user && !dataBoards) {
    return <LoadingPage />;
  }
  const handleSubmit = async () => {
    const uniqueId = uuidv4();
    console.log(valuePrivacy);
    if (!user) {
      return;
    }
    const dataCreate: Board = {
      id: uniqueId,
      name: name,
      description: description,
      viewing_rights: valuePrivacy,
      due_date: dueDate || "",
      created_by: user.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      createdByUser: {
        name: user.name,
        profile_picture: user.profile_picture,
      },
    };
    setLoading(true);
    try {
      await api.post("/boards/create", dataCreate);
      setOpenDialogCreateBoard(false);
      openNotification("bottomRight", "Board created successfully!");
      setDataBoards((prevBoards) => [...(prevBoards || []), dataCreate]);
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const dataError = error.response.data as IError;
        if (dataError && dataError.message) {
          openNotification("bottomRight", dataError.message);
        }
      } else {
        openNotification("bottomRight", "An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };
  const getBoard = async (page: number) => {
    if (!user) {
      return;
    }
    try {
      const res = await getBoardPagination(limit, page, user.id);
      if (res.data) {
        setDataBoards(res.data);
        setTotal(res.total);
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const dataError = error.response.data as IError;
        if (dataError && dataError.message) {
          openNotification("bottomRight", dataError.message);
        }
      } else {
        openNotification("bottomRight", "An unexpected error occurred.");
      }
    }
  };

  const handlePagination: PaginationProps["onChange"] = async (page) => {
    setCurrentPage(page);
    await getBoard(page);
  };

  const handleEdit = () => {
    console.log("Edit clicked");
  };

  const handleDelete = () => {
    console.log("Delete clicked");
  };

  useEffect(() => {
    getBoard(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);
  return (
    <>
      {contextHolder}
      <div className="container mx-auto py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Boards</h1>
          <Dialog
            open={openDialogCreateBoard}
            onOpenChange={setOpenDialogCreateBoard}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Create New Board
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create new board</DialogTitle>
                <DialogDescription>
                  Create a new table to work with. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div>
                <form onSubmit={handleSubmit}>
                  <div className="nameBoard">
                    <Label htmlFor="name">Name Board</Label>
                    <Input
                      type="name"
                      placeholder="Enter name board"
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
                      placeholder="Type description here."
                      name="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="radio mt-4 flex items-center">
                    <Label className="mr-12" htmlFor="privacy">
                      Privacy
                    </Label>
                    <Radio.Group
                      onChange={onChangePrivacy}
                      value={valuePrivacy}
                    >
                      <Radio value={"private"}>Private</Radio>
                      <Radio value={"public"}>Public</Radio>
                    </Radio.Group>
                  </div>
                  <div className="due-date flex items-center mt-4">
                    <Label className="mr-8" htmlFor="due-date">
                      Due Date
                    </Label>
                    <Space direction="vertical">
                      <DatePicker onChange={onChangeDate} />
                    </Space>
                  </div>
                </form>
              </div>
              <DialogFooter>
                <Button onClick={handleSubmit} type="submit">
                  {loading && <Loader2 />}
                  Create Board
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-start">
          {dataBoards &&
            dataBoards.map((board, index) => (
              <ItemBoard
                key={index}
                title={board.name}
                description={board.description}
                createdBy={board.createdByUser.name}
                createdAt={new Date(board.created_at)}
                expiresAt={new Date(board.due_date)}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
        </div>
        <div className="flex justify-center mt-8">
          <Pagination
            onChange={handlePagination}
            pageSize={limit}
            defaultCurrent={currentPage}
            total={total}
          />
        </div>
      </div>
    </>
  );
}
