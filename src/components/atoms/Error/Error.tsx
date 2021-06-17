import React from "react";
import styles from "./styles.module.css";
// ___________________________________________________________________________
//
type Props = {
  statusCode: number;
  title?: string;
};
// ___________________________________________________________________________
//
export function Error({ statusCode, title }: Props) {
  return (
    <div className={styles.module}>
      <h1>{statusCode}</h1>
      <p>{title}</p>
    </div>
  );
}
