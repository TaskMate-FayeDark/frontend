export interface CardItem {
  id: string;
  title: string;
  description: string;
  position: number;
  due_date: Date;
  list_id: string;
  comments: object[];
  label: {
    id: string;
    name: string;
    color: string;
    board_id: string;
  }[];
  assignees: object[];
  files: object[];
  created_at: Date;
  updated_at: Date;
}
