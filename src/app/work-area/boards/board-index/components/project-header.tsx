import {
  Eye,
  Clock,
  Tag,
  MoreHorizontal,
  Share2,
  ShieldCheck,
  Flame,
  LockKeyhole,
  LockKeyholeOpen,
  Plus,
} from "lucide-react";
import { Button } from "../../../../../components/ui/button";
import { Avatar, AvatarImage } from "../../../../../components/ui/avatar";
import { Badge } from "../../../../../components/ui/badge";
import { Board } from "../../../../../types/Board";
import { IUser } from "../../../../../types/user";
import { FormEditBoard } from "../../../../../components/form-edit-board";
import { Popover } from "antd";
import { UpdateBoard } from "../../../../../types/updateBoard";

interface ProjectHeaderProps {
  dataBoard: Board;
  members: IUser[];
  role: string;
  onUpdate?: (boardId: string, dataUpdate: UpdateBoard) => Promise<void>;
  loading: boolean;
}

export default function ProjectHeader({
  dataBoard,
  members,
  role,
  onUpdate,
  loading,
}: ProjectHeaderProps) {
  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{dataBoard.name}</h1>
          <div className="flex items-center gap-2">
            <Button
              className="bg-blue-500 text-white"
              variant="ghost"
              size="icon"
            >
              <Share2 className="h-4 w-4" />
            </Button>
            {role !== "viewer" && (
              <Popover
                trigger="click"
                content={
                  <FormEditBoard
                    dataBoard={dataBoard}
                    onUpdate={onUpdate}
                    loading={loading}
                  />
                }
              >
                <Button
                  className="bg-blue-500 text-white"
                  variant="ghost"
                  size="icon"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </Popover>
            )}
          </div>
        </div>

        <div className="flex justify-between items-start flex-wrap">
          <div className="flex flex-col flex-wrap gap-4 justify-start items-start">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Visibility</span>

              {dataBoard.viewing_rights === "private" ? (
                <>
                  <Badge
                    className="bg-rose-100 text-red-500 flex items-center"
                    variant="secondary"
                  >
                    <LockKeyhole className="h-3 w-3 mr-2" />
                    <p>Private Board</p>
                  </Badge>
                </>
              ) : (
                <>
                  <Badge
                    className="bg-sky-100 text-blue-500 flex items-center"
                    variant="secondary"
                  >
                    <LockKeyholeOpen className="h-3 w-3 mr-2" />
                    <p>Public Board</p>
                  </Badge>
                </>
              )}
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Created by</span>
              <Avatar className="cursor-pointer h-8 w-8">
                <AvatarImage
                  src={
                    dataBoard.createdByUser?.profile_picture ||
                    "/default-avt-user.webp"
                  }
                  alt="User"
                />
              </Avatar>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <Flame className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Assigned to</span>
              {members.length > 0 && (
                <>
                  <div className="flex -space-x-2">
                    {members.slice(0, 4).map((member, i) => (
                      <Avatar
                        key={i}
                        className="h-8 w-8 border-2 border-background"
                      >
                        <AvatarImage
                          src={
                            member.profile_picture || "/default-avt-user.webp"
                          }
                          alt="User"
                        />
                      </Avatar>
                    ))}
                    {members.length > 4 && (
                      <Button
                        variant="secondary"
                        className="h-6 w-6 rounded-full text-xs font-medium"
                      >
                        +{members.length - 4}
                      </Button>
                    )}
                  </div>
                </>
              )}
              {role && role !== "viewer" && (
                <Button
                  variant="outline"
                  className="ml-2 p-3 h-8 w-8 rounded-full border-dashed border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                >
                  <Plus className="h-8 w-8" />
                </Button>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{dataBoard.due_date || ""}</span>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <Badge className="bg-sky-200 text-blue-500" variant="secondary">
                Mobile App Design
              </Badge>
              <Badge
                className="bg-yellow-200 text-amber-600"
                variant="secondary"
              >
                Redesign
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
