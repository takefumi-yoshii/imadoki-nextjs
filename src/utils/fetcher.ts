import { Octokit } from "@octokit/core";
export const octokit = new Octokit({
  auth: process.env.GITHUB_ACCESS_TOKEN,
});
