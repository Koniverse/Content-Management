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
  async getEnabled(apiID, uid, roles) {
    // @ts-ignore
    const githubActions = await strapi.admin.config.githubActions;
    const {contentTypeActions} = githubActions;
    let enabled = false;
    const permissionList = await strapi.entityService.findMany('admin::permission', {
      filters: {
        action: 'plugin::content-manager.explorer.publish', subject: uid,
        role: {
          id: {
            $in: roles
          }}
      },
      populate: ['role'],
    });
    if (contentTypeActions && contentTypeActions.hasOwnProperty(apiID)) {
      enabled = permissionList.length > 0;
    }
    return {
      enabled
    }
  },
  async executed(apiID, uid, roles) {
    // @ts-ignore
    const githubActions = await strapi.admin.config.githubActions;
    const {contentTypeActions, githubToken, githubOwner, githubRepo, githubBranch, githubWorkflow} = githubActions;
    let urlWorkflow = '';
    let executed = false;
    const {enabled} = await this.getEnabled(apiID, uid, roles);
    if (!enabled) {
      return {
        executed, urlWorkflow
      }
    }
    if (contentTypeActions && contentTypeActions.hasOwnProperty(apiID)) {
      executed = true;
      const dataGithub = contentTypeActions[apiID];
      let {workflow, repository, branch, owner, token, inputs} = dataGithub;
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
      const a = await axios.post(url, {
        ref: branch,
        inputs
      }, {headers: getHeaders(token)});
      urlWorkflow = urlGetWorkflow(owner, repository, workflow);
    }
    return {
      executed, urlWorkflow
    }
  }
});
