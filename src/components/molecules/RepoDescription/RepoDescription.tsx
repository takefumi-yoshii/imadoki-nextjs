import type { Endpoints } from "@octokit/types";
import styles from "./styles.module.css";
// ___________________________________________________________________________
//
type Props = {
  repo: Endpoints["GET /repos/{owner}/{repo}"]["response"]["data"];
};
// ___________________________________________________________________________
//
export function RepoDescription({ repo }: Props) {
  return (
    <div>
      <h1>
        <a href={repo.html_url} target="_blank">
          {repo.name}
        </a>
      </h1>
      <div className={styles.summary}>
        <h2>★:{repo.stargazers_count}</h2>
        <p className={styles.description}>{repo.description}</p>
      </div>
    </div>
  );
}
