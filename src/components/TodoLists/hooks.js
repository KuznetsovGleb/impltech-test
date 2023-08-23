import { useState } from "react";
import { useDispatch } from "react-redux";

import { reorderTodo } from "../../store/reducers/todosReducer";
import { COLUMNS } from "../../utils/constants";

export const useDragDropContext = () => {
  const [startDragIndex, setStartDragIndex] = useState(null);

  const dispatch = useDispatch();

  const handleDragStart = (start) => {
    setStartDragIndex(start.source.droppableId);
  };

  const handleDragEnd = (result) => {
    setStartDragIndex(null);
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    dispatch(reorderTodo({ destination, source }));
  };

  const checkDropDisabled = (columnId) =>
    columnId === COLUMNS.ONE && startDragIndex !== COLUMNS.ONE;

  return { checkDropDisabled, handleDragStart, handleDragEnd };
};
