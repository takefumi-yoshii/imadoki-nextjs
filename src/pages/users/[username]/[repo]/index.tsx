import { GeneratedAt } from "@/components/atoms/GeneratedAt";
import { Loading } from "@/components/atoms/Loading";
import { Template } from "@/components/templates/users/[username]/[repo]";
import Error from "@/pages/_error";
import { now } from "@/utils/date";
import { octokit } from "@/utils/fetcher";
import type { Endpoints } from "@octokit/types";
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import React from "react";
// ___________________________________________________________________________
//
export const getStaticPaths = async () => {
  return { paths: [], fallback: true };
};
// ___________________________________________________________________________
//
type StaticProps = {
  repo: {
    data: Endpoints["GET /repos/{owner}/{repo}"]["response"]["data"] | null;
  };
  commits: {
    data:
      | Endpoints["GET /repos/{owner}/{repo}/commits"]["response"]["data"]
      | null;
  };
  err: { status: number; message: string } | null;
  generatedAt: string;
};
type PageProps = InferGetStaticPropsType<typeof getStaticProps>;
// ___________________________________________________________________________
//
const propsFactory = (injects?: Partial<StaticProps>) => ({
  props: {
    repo: { data: null },
    commits: { data: null },
    err: null,
    generatedAt: now(),
    ...injects,
  },
  revalidate: 10,
});
// ___________________________________________________________________________
//
export const getStaticProps = async (context: GetStaticPropsContext) => {
  const owner = context.params?.username;
  const repo = context.params?.repo;
  if (typeof owner !== "string" || typeof repo !== "string") {
    return propsFactory({
      err: {
        status: 400,
        message: "Bad Request",
      },
    });
  }
  try {
    const param = { owner, repo };
    const res = await Promise.all([
      octokit.request("GET /repos/{owner}/{repo}", param),
      octokit.request("GET /repos/{owner}/{repo}/commits", param),
    ]);
    return propsFactory({
      repo: res[0],
      commits: res[1],
    });
  } catch (err) {
    return propsFactory({
      err: {
        status: err.status,
        message: err.message,
      },
    });
  }
};
// ___________________________________________________________________________
//
export default function Page({ repo, commits, err, generatedAt }: PageProps) {
  const router = useRouter();
  if (err) {
    return <Error statusCode={err.status} title={err.message} />;
  }
  if (router.isFallback || !repo.data || !commits.data) {
    return <Loading />;
  }
  return (
    <>
      <Template repo={repo.data} commits={commits.data} />
      <GeneratedAt label={generatedAt} />
    </>
  );
}
