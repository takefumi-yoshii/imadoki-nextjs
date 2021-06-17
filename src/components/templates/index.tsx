import { Button } from "@/components/atoms/Button";
import { InputText } from "@/components/atoms/InputText";
import Router from "next/router";
import React from "react";
import styles from "./styles.module.css";
// ___________________________________________________________________________
//
export function Template() {
  const [name, setName] = React.useState("");
  return (
    <div className={styles.module}>
      <h1>Next.js x Github API</h1>
      <p className={styles.description}>
        Enter the user account name you want to look up.
      </p>
      <form
        className={styles.form}
        onSubmit={(event) => {
          event.preventDefault();
          Router.push(`/users/${name}`);
        }}
      >
        <p>
          <InputText
            type="text"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </p>
        <p>
          <Button type="submit">SEARCH USER</Button>
        </p>
      </form>
    </div>
  );
}
