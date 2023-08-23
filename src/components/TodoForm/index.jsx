import { useState } from "react";
import { useDispatch } from "react-redux";

import { addTodo } from "../../store/actions";

import styles from "./index.module.scss";

export const TodoForm = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const handleChange = ({ target }) => {
    setValue(target.value);
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();
    if (!value.trim()) return;
    dispatch(addTodo(value));
    setValue("");
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmitForm}
      autoComplete="off"
    >
      <div className={styles.inputWrapper}>
        <input
          type="text"
          className={styles.input}
          maxLength={200}
          value={value}
          onChange={handleChange}
          placeholder="Description of the new task"
        />
      </div>
      <button className={styles.submitBtn} type="submit">
        Add task
      </button>
    </form>
  );
};
