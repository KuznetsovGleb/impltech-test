import { useSelector } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import { TodosList } from "../TodosList";

import { STATUSES } from "../../utils/constants";
import { useDragDropContext } from "./hooks";

import styles from "./index.module.scss";

export const TodoLists = () => {
  const columns = useSelector((state) => state.todos.columns);
  const status = useSelector((state) => state.todos.status);

  const { checkDropDisabled, handleDragStart, handleDragEnd } =
    useDragDropContext();

  if (status === STATUSES.LOADING) {
    return <span>Loading...</span>;
  }

  return (
    <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className={styles.list}>
        {Object.keys(columns).map((columnId) => (
          <TodosList
            key={columnId}
            columnId={columnId}
            tasks={columns[columnId].tasks}
            isDropDisabled={checkDropDisabled(columnId)}
          />
        ))}
      </div>
    </DragDropContext>
  );
};
