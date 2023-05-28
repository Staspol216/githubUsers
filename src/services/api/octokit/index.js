import { Octokit } from '@octokit/core';

export const OctokitInstance = new Octokit({ auth: process.env.API_KEY });
