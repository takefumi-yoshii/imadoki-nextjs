import { Button } from "@/components/atoms/Button";
import { signIn } from "next-auth/client";
import styles from "./styles.module.css";
// ___________________________________________________________________________
//
export function RequireLogin() {
  return (
    <div className={styles.module}>
      <h1>Unauthorized.</h1>
      <p className={styles.description}>
        This contents needs your github permissions.
        <br />
        please sign in.
      </p>
      <Button className={styles.button} onClick={() => signIn()}>
        Sign in with Github
      </Button>
    </div>
  );
}
