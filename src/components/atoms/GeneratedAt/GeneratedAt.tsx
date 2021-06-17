import React from "react";
import styles from "./styles.module.css";
// ___________________________________________________________________________
//
type Props = {
  label: string;
};
// ___________________________________________________________________________
//
export function GeneratedAt({ label }: Props) {
  return <p className={styles.generatedAt}>generatedAt: {label}</p>;
}
