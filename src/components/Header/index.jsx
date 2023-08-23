import styles from "./index.module.scss";

export const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Task manager</h1>
    </header>
  );
};
