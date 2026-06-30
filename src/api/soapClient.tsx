import { fetchAuthSession } from "aws-amplify/auth"
import { MultipleRepoRuns } from "../models/MultipleRepoRuns";
import { WorkflowRunDetails } from "../models/WorkflowRunDetails";

const BASE_URL = import.meta.env.VITE_SOAP_URL;

async function GetToken() {
  const session = await fetchAuthSession();
  return session.tokens?.idToken?.toString();
}

export async function getAllRepoMainResults() {
  const authToken = await GetToken();

  const response = await fetch(`${BASE_URL}/workflow-run/current/all`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  });

  if (!response.ok) throw new Error(`API error: ${response.status}`);

  const data = await response.json();
  

  return {
    ...data,
    workflowRuns: data.workflowRuns.map((run: WorkflowRunDetails) => ({
      ...run,
      timestamp: new Date(run.timestamp)
    }))
  }
}

export async function getScanForRepo(repo: string, branch: string | null) {
  const authToken = await GetToken();

  let url = `${BASE_URL}/workflow-run/current?repo=${repo}`;
  if (branch) url += `&branch=${branch}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })

  if (!response.ok) throw new Error(`API error: ${response.status}`);

  return response.json() as Promise<WorkflowRunDetails>;
}