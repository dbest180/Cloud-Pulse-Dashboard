<script setup>
import { ref, onMounted } from 'vue';
import { fetchLatestWorkflowRuns } from '../services/githubService';

const runs = ref([]);
const error = ref(null);

// Replace with your repository details and a valid Personal Access Token
const owner = 'YOUR_GITHUB_USERNAME';
const repo = 'YOUR_REPO_NAME';
const token = import.meta.env.VITE_GITHUB_TOKEN; 

onMounted(async () => {
  try {
    const data = await fetchLatestWorkflowRuns(owner, repo, token);
    runs.value = data.workflow_runs;
  } catch (err) {
    error.value = err.message;
  }
});
</script>

<template>
  <div class="dashboard">
    <h2>Cloud-Pulse: Latest Actions</h2>
    <div v-if="error">{{ error }}</div>
    <ul v-else>
      <li v-for="run in runs" :key="run.id">
        {{ run.name }} - {{ run.status }} ({{ run.conclusion || 'pending' }})
      </li>
    </ul>
  </div>
</template>