import type { Endpoints } from "@octokit/types";
import styles from "./styles.module.css";
// ___________________________________________________________________________
//
type Props = {
  user: Endpoints["GET /users/{username}"]["response"]["data"];
};
// ___________________________________________________________________________
//
export function UserDescription({ user }: Props) {
  return (
    <div className={styles.module}>
      <p className={styles.avatar}>
        <img src={user.avatar_url} width="230" />
      </p>
      <div className={styles.description}>
        <h1>{user.name}</h1>
        <h3>{user.bio}</h3>
        {user.email && <p>{user.email}</p>}
        {user.twitter_username && (
          <p>
            <a href={`https://twitter.com/${user.twitter_username}`}>
              @{user.twitter_username}
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
