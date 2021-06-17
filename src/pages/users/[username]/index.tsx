import { GeneratedAt } from "@/components/atoms/GeneratedAt";
import { Loading } from "@/components/atoms/Loading";
import { Template } from "@/components/templates/users/[username]";
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
  user: {
    data: Endpoints["GET /users/{username}"]["response"]["data"] | null;
  };
  repos: {
    data: Endpoints["GET /users/{username}/repos"]["response"]["data"] | null;
  };
  err: { status: number; message: string } | null;
  generatedAt: string;
};
type PageProps = InferGetStaticPropsType<typeof getStaticProps>;
// ___________________________________________________________________________
//
const propsFactory = (injects?: Partial<StaticProps>) => ({
  props: {
    user: { data: null },
    repos: { data: null },
    err: null,
    generatedAt: now(),
    ...injects,
  },
  revalidate: 10,
});
// ___________________________________________________________________________
//
export const getStaticProps = async (context: GetStaticPropsContext) => {
  const username = context.params?.username;
  if (typeof username !== "string") {
    return propsFactory({
      err: {
        status: 400,
        message: "Bad Request",
      },
    });
  }
  try {
    const param = { username };
    const res = await Promise.all([
      octokit.request("GET /users/{username}", param),
      octokit.request("GET /users/{username}/repos", param),
    ]);
    return propsFactory({
      user: res[0],
      repos: res[1],
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
export default function Page({ user, repos, err, generatedAt }: PageProps) {
  const router = useRouter();
  if (err) {
    return <Error statusCode={err.status} title={err.message} />;
  }
  if (router.isFallback || !user.data || !repos.data) {
    return <Loading />;
  }
  return (
    <>
      <Template user={user.data} repos={repos.data} />
      <GeneratedAt label={generatedAt} />
    </>
  );
}
