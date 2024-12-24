import { api } from "./api";

export const getBoardPagination = async (
  limit: number,
  page: number,
  user_id: number
) => {
  const res = await api.get(`/boards/${user_id}?limit=${limit}&page=${page}`);
  return res.data;
};

export const getBoardById = async (board_id: string) => {
  const res = await api.get(`/boards/?boardId=${board_id}`);
  return res.data;
};
