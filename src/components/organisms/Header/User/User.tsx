import { Button } from "@/components/atoms/Button";
import { signIn, signOut, useSession } from "next-auth/client";
import styles from "./styles.module.css";
// ___________________________________________________________________________
//
export function User() {
  const [session] = useSession();
  return (
    <div className={styles.module}>
      <div className={styles.user}>
        <p className={styles.name}>
          {session?.user?.name ? session.user.name : "Guest User"}
        </p>
        <p className={styles.avatar}>
          {session?.user && typeof session.user.image === "string" && (
            <img src={session.user.image} />
          )}
        </p>
        <div className={styles.signInOut}>
          {session ? (
            <Button onClick={() => signOut()}>SIGN OUT</Button>
          ) : (
            <Button onClick={() => signIn()}>SIGN IN</Button>
          )}
        </div>
      </div>
    </div>
  );
}
