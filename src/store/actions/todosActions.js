import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../api";

export {
  addTodo,
  toggleTodo,
  removeTodo,
  removeAllThirdColumnTodos,
  reorderTodo,
} from "../reducers/todosReducer";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", () => {
  return client.get(`todos`).then((response) => response.data);
});
