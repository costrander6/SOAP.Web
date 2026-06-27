import { fetchAuthSession } from "aws-amplify/auth"

const URL = import.meta.env.VITE_SOAP_URL;

async function GetToken() {
const session = await fetchAuthSession();
  return session.tokens?.idToken?.toString();
}

export async function GetAllRepoMainResults() {
  const authToken = await GetToken();

  const response = await fetch(`${URL}/workflow-run/current/all`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  });

  if (!response.ok) throw new Error(`API error: ${response.status}`);
  

  return response.json();
}