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
