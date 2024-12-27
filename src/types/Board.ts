import { IUser } from "./user";
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

export interface ContentBoard {
  id: string;
  name: string;
  position: number;
  board_id: string;
  created_at: Date;
  updated_at: Date;
  due_date: Date;
  task: {
    id: string;
    title: string;
    description: string;
    position: number;
    due_date: Date;
    list_id: string;
    comments: [];
    label: {
      id: string;
      name: string;
      board_id: string;
      color: string;
    }[];
    assignees: IUser[];
    files: [];
    created_at: Date;
    updated_at: Date;
  };
}
