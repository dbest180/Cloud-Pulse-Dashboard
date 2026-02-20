export const fetchDeploymentStatus = async (owner, repo, token, workflowId = 'deploy.yml') => {
  const response = await fetch(`${GITHUB_API}/${owner}/${repo}/actions/workflows/${workflowId}/runs?per_page=1`, {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) throw new Error('Failed to fetch deployment status');
  const data = await response.json();
  return data.workflow_runs[0]; 
};