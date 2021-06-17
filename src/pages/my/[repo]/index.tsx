import { Loading } from "@/components/atoms/Loading";
import { Template } from "@/components/templates/my/[repo]";
import Error from "@/pages/_error";
import { Octokit } from "@octokit/core";
import type { Session } from "next-auth";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
// ___________________________________________________________________________
//
type Props = { session: Session; repo: string };
// ___________________________________________________________________________
//
function PageBase({ session, repo }: Props) {
  const key = `GET /repos/${repo}`;
  const { data, error } = useSWR(key, async () => {
    // accessToken を付与した Octokit インスタンス生成
    const octokit = new Octokit({
      auth: session.accessToken,
    });
    // ログインユーザー名の取得
    const owner = await octokit
      .request("GET /user")
      .then(({ data }) => data.login);
    const param = { owner, repo };
    // プライベートリポジトリ情報も含めたリクエスト
    return Promise.all([
      octokit.request("GET /repos/{owner}/{repo}", param),
      octokit.request("GET /repos/{owner}/{repo}/commits", param),
    ]);
  });
  if (error) {
    return <Error statusCode={error.status || 500} title={error.message} />;
  }
  if (!data) return <Loading />;
  return <Template repo={data[0].data} commits={data[1].data} />;
}
// ___________________________________________________________________________
//
export default function Page() {
  const [session] = useSession();
  const router = useRouter();
  const repo = router.query.repo;
  if (typeof repo !== "string") {
    return <Error statusCode={400} title="Bad Request" />;
  }
  if (!session?.accessToken) {
    return <Error statusCode={401} title="Unauthorized" />;
  }
  return <PageBase session={session} repo={repo} />;
}
