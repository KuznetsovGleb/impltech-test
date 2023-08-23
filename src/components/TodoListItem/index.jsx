import { Draggable } from "react-beautiful-dnd";
import PropType from "prop-types";
import cx from "classnames";

import { useRemoveTask, useToggleTaskStatus } from "./hooks";

import styles from "./index.module.scss";

export const TodoListItem = ({ task, columnId, index }) => {
  const { id, title, completed } = task;

  const { isRemovable, handleRemoveTask } = useRemoveTask({ index, columnId });
  const { handleToggleTaskStatus } = useToggleTaskStatus({ index, columnId });

  return (
    <Draggable draggableId={String(id)} index={index}>
      {(provided, snapshot) => (
        <li
          className={cx(styles.wrapper, {
            [styles.isDragging]: snapshot.isDragging,
          })}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className={styles.content}>
            <input
              type="checkbox"
              checked={completed}
              onChange={handleToggleTaskStatus}
            />
            <span className={styles.title}>{title}</span>
          </div>
          {isRemovable && (
            <div>
              <button
                type="button"
                onClick={handleRemoveTask}
                className={styles.deleteBtn}
              >
                Delete
              </button>
            </div>
          )}
        </li>
      )}
    </Draggable>
  );
};

TodoListItem.propTypes = {
  columnId: PropType.string,
  index: PropType.number,
  task: PropType.shape({
    id: PropType.number.isRequired,
    title: PropType.string.isRequired,
    completed: PropType.bool.isRequired,
  }),
};
