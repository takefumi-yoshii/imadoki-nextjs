import { RepoCommits } from "@/components/molecules/RepoCommits";
import { RepoDescription } from "@/components/molecules/RepoDescription";
import type { Endpoints } from "@octokit/types";
import Link from "next/link";
import { useRouter } from "next/router";
// ___________________________________________________________________________
//
type Props = {
  repo: Endpoints["GET /repos/{owner}/{repo}"]["response"]["data"];
  commits: Endpoints["GET /repos/{owner}/{repo}/commits"]["response"]["data"];
};
// ___________________________________________________________________________
//
export function Template({ repo, commits }: Props) {
  const { query } = useRouter();
  const username = typeof query.username !== "string" ? "" : query.username;
  return (
    <div>
      <Link href={`/users/${username}`}>
        <a>&lt; Back</a>
      </Link>
      <RepoDescription repo={repo} />
      <RepoCommits commits={commits} />
    </div>
  );
}
