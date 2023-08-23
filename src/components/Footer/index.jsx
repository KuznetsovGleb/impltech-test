import { useSelector, useDispatch } from "react-redux";

import { removeAllThirdColumnTodos } from "../../store/actions";
import { COLUMNS } from "../../utils/constants";

import styles from "./index.module.scss";

export const Footer = () => {
  const dispatch = useDispatch();
  const columns = useSelector(
    (state) => state.todos.columns[COLUMNS.THREE].tasks,
  );

  const handleDeleteClick = () => {
    dispatch(removeAllThirdColumnTodos());
  };

  return (
    <footer className={styles.footer}>
      {Boolean(columns.length) && (
        <button
          className={styles.submitBtn}
          type="button"
          onClick={handleDeleteClick}
        >
          Delete
        </button>
      )}
    </footer>
  );
};
