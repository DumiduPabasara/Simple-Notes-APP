import axios, { AxiosResponse } from "axios";
import { Note } from "../model/note";

axios.defaults.baseURL = "https://localhost:5001/api";

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Notes = {
  list: () => requests.get<Note[]>("/notes"),
  create: (note: Note) => requests.post<void>("/notes", note),
  update: (note: Note) => requests.put<void>(`/notes/${note.id}`, note),
  delete: (id: string) => requests.delete<void>(`/notes/${id}`),
};

const apis = {
  Notes,
};

export default apis;
