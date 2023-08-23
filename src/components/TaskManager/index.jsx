import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Header } from "../Header";
import { TodoForm } from "../TodoForm";
import { TodoLists } from "../TodoLists";
import { Footer } from "../Footer";

import { fetchTodos } from "../../store/actions";

import styles from "./index.module.scss";

export const TaskManager = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  return (
    <section className={styles.scheduler}>
      <main className={styles.main}>
        <Header />
        <TodoForm />
        <TodoLists />
        <Footer />
      </main>
    </section>
  );
};
