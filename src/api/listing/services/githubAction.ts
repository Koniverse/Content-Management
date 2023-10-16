/**
 * listing service
 */
import axios from 'axios';

const urlPostTrigger = (owner: string, repo: string, workflow: string) => `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflow}/dispatches`;
const getHeaders = (token: string) => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`,
  'Accept': 'application/vnd.github+json',
})

const urlGetWorkflow = (owner: string, repo: string, workflow: string) => `https://github.com/${owner}/${repo}/actions/workflows/${workflow}`;

export default () => ({
  async getEnabled(pluralId) {
    // @ts-ignore
    const githubActions = await strapi.admin.config.githubActions;
    const {contentTypeActions} = githubActions;
    let enabled = false;
    if (contentTypeActions && contentTypeActions.hasOwnProperty(pluralId)) {
      enabled = true;
    }
    return {
      enabled
    }
  },
  async executed(pluralId) {
    // @ts-ignore
    const githubActions = await strapi.admin.config.githubActions;
    const {contentTypeActions, githubToken, githubOwner, githubRepo, githubBranch, githubWorkflow} = githubActions;
    let urlWorkflow = '';
    let executed = false;
    if (contentTypeActions && contentTypeActions.hasOwnProperty(pluralId)) {
      executed = true;
      const dataGithub = contentTypeActions[pluralId];
      let {workflow, repository, branch, owner, token} = dataGithub;
      if (!workflow) {
        workflow = githubWorkflow;
      }
      if (!repository) {
        repository = githubRepo;
      }
      if (!branch) {
        branch = githubBranch;
      }
      if (!owner) {
        owner = githubOwner;
      }
      if (!token) {
        token = githubToken;
      }
      const url = urlPostTrigger(owner, repository, workflow);
      const response = await axios.post(url, {
        ref: branch,
      }, {headers: getHeaders(token)});
      urlWorkflow = urlGetWorkflow(owner, repository, workflow);
    }
    return {
      executed, urlWorkflow
    }
  }
});
