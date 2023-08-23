import { useDispatch } from "react-redux";
import { removeTodo, toggleTodo } from "../../store/reducers/todosReducer";
import { COLUMNS } from "../../utils/constants";

export const useRemoveTask = ({ index, columnId }) => {
  const dispatch = useDispatch();

  const isRemovable = columnId === COLUMNS.TWO;

  const handleRemoveTask = () => {
    const isDeleted = confirm("Are you sure?");

    if (isDeleted) {
      dispatch(removeTodo({ columnId, sourceIndex: index }));
    }
  };

  return {
    isRemovable,
    handleRemoveTask,
  };
};

export const useToggleTaskStatus = ({ index, columnId }) => {
  const dispatch = useDispatch();

  const handleToggleTaskStatus = () => {
    dispatch(toggleTodo({ columnId, sourceIndex: index }));
  };

  return {
    handleToggleTaskStatus,
  };
};
