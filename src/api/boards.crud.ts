import { api } from "./api";
import { UpdateBoard } from "../types/updateBoard";

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

export const updateBoard = async (boardId: string, data: UpdateBoard) => {
  const res = await api.put(`/boards/update/${boardId}`, data);
  return res.data;
};

export const deleteBoard = async (boardId: string) => {
  const res = await api.delete(`/boards/delete/${boardId}`);
  return res.data;
};
