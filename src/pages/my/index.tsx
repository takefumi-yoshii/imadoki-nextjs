import { GeneratedAt } from "@/components/atoms/GeneratedAt";
import { Loading } from "@/components/atoms/Loading";
import { Template } from "@/components/templates/my";
import Error from "@/pages/_error";
import { now } from "@/utils/date";
import { Octokit } from "@octokit/core";
import type { Endpoints } from "@octokit/types";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getSession } from "next-auth/client";
// ___________________________________________________________________________
//
type StaticProps = {
  user: {
    data: Endpoints["GET /users/{username}"]["response"]["data"] | null;
  };
  repos: {
    data: Endpoints["GET /user/repos"]["response"]["data"] | null;
  };
  err: { status: number; message: string } | null;
  generatedAt: string;
};
type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;
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
});
// ___________________________________________________________________________
//
export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // session がなければ早期エラーリターン
  const session = await getSession(context);
  if (!session) {
    return propsFactory({
      err: {
        status: 401,
        message: "Unauthorized",
      },
    });
  }
  try {
    // accessToken を付与した Octokit インスタンス生成
    const octokit = new Octokit({
      auth: session.accessToken,
    });
    // ログインユーザー名の取得
    const username = await octokit
      .request("GET /user")
      .then(({ data }) => data.login);
    const param = { username };
    // プライベートリポジトリ情報も含めたリクエスト
    const res = await Promise.all([
      octokit.request("GET /users/{username}", param),
      octokit.request("GET /user/repos", {
        type: "owner",
      }),
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
  if (err) {
    return <Error statusCode={err.status} title={err.message} />;
  }
  if (!user.data || !repos.data) return <Loading />;
  return (
    <>
      <Template user={user.data} repos={repos.data} />
      <GeneratedAt label={generatedAt} />
    </>
  );
}
