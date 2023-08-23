import { createSlice, nanoid } from "@reduxjs/toolkit";
import { fetchTodos } from "../actions";
import { STATUSES, COLUMNS } from "../../utils/constants";

const initialState = {
  columns: {
    [COLUMNS.ONE]: {
      tasks: [],
    },
    [COLUMNS.TWO]: {
      tasks: [],
    },
    [COLUMNS.THREE]: {
      tasks: [],
    },
  },
  status: "idle",
  error: null,
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTask = {
        id: nanoid(),
        completed: false,
        title: action.payload,
      };

      state.columns[COLUMNS.ONE].tasks.splice(0, 0, newTask);
    },
    toggleTodo: (state, action) => {
      const { columnId, sourceIndex } = action.payload;

      state.columns[columnId].tasks[sourceIndex].completed =
        !state.columns[columnId].tasks[sourceIndex].completed;
    },
    removeTodo: (state, action) => {
      const { columnId, sourceIndex } = action.payload;

      state.columns[columnId].tasks.splice(sourceIndex, 1);
    },
    removeAllThirdColumnTodos: (state) => {
      state.columns[COLUMNS.THREE].tasks = [];
    },
    reorderTodo: (state, action) => {
      const { destination, source } = action.payload;
      const removedTask = state.columns[source.droppableId].tasks.splice(
        source.index,
        1,
      );
      state.columns[destination.droppableId].tasks.splice(
        destination.index,
        0,
        ...removedTask,
      );
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = STATUSES.SUCCEEDED;
        state.columns[COLUMNS.ONE].tasks = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = STATUSES.FAILED;
        state.error = action.error.message;
      });
  },
});

export const {
  addTodo,
  toggleTodo,
  removeTodo,
  removeAllThirdColumnTodos,
  reorderTodo,
} = todosSlice.actions;

export default todosSlice.reducer;
