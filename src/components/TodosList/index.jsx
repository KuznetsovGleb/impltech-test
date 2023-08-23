import { Droppable } from "react-beautiful-dnd";
import PropType from "prop-types";

import { TodoListItem } from "../TodoListItem";

import styles from "./index.module.scss";

export const TodosList = ({ tasks, columnId, isDropDisabled }) => {
  return (
    <Droppable droppableId={columnId} isDropDisabled={isDropDisabled}>
      {(provided) => (
        <ul
          className={styles.list}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {tasks?.map((task, index) => (
            <TodoListItem
              key={task.id}
              task={task}
              columnId={columnId}
              index={index}
            />
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
};

TodosList.propTypes = {
  columnId: PropType.string,
  isDropDisabled: PropType.bool,
  tasks: PropType.arrayOf(
    PropType.shape({
      id: PropType.number.isRequired,
      title: PropType.string.isRequired,
      completed: PropType.bool.isRequired,
    })
  ),
};
