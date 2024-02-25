import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./styles/pages.module.css";

export const NotFound404 = () => {
  return (
    <div className={styles.page}>
      <div className={styles.window}>
      <p className="text text_type_main-large mb-10">
 Page not found
</p>
        <Link to='/' className={styles.link}>Перейти на главную страницу</Link>
      </div>
    </div>
  );
};