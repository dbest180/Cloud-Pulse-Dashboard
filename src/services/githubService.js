const GITHUB_API = 'https://api.github.com/repos';

export const fetchLatestWorkflowRuns = async (owner, repo, token) => {
  const response = await fetch(`${GITHUB_API}/${owner}/${repo}/actions/runs?per_page=5`, {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) throw new Error('Failed to fetch workflows');
  return response.json();
};