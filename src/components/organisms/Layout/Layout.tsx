import { Header } from "@/components/organisms/Header";
import React from "react";
import styles from "./styles.module.css";
// ___________________________________________________________________________
//
export function Layout(props: { children?: React.ReactNode }) {
  return (
    <div className={styles.module}>
      <header>
        <Header />
      </header>
      <main>{props.children}</main>
    </div>
  );
}
