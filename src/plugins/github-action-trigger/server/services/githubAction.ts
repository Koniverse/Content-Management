/**
 * listing service
 */
import axios from 'axios';
import {Strapi} from "@strapi/strapi";
import {GithubActionEnabledResponse, TriggerButtonInfo} from "../../types";

const urlPostTrigger = (owner: string, repo: string, workflow: string) => `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflow}/dispatches`;
const getHeaders = (token: string) => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`,
  'Accept': 'application/vnd.github+json',
})

const urlGetWorkflow = (owner: string, repo: string, workflow: string) => `https://github.com/${owner}/${repo}/actions/workflows/${workflow}`;

export default ({ strapi }: { strapi: Strapi }) => ({
  async getButtons(apiID: string) {
    // @ts-ignore
    const githubActions = await strapi.admin.config.githubActions;
    const {triggerButtons} = githubActions;
    let enabled = false;

    const buttons: TriggerButtonInfo[] = (triggerButtons || [])
      .filter((button) => button.apiID === apiID)
      .map(({
              buttonID,
              apiID,
              label,
              variant
            }) => ({
        buttonID,
        apiID,
        label,
        variant
      }));

    if (buttons.length > 0) {
      enabled = true;
    }

    if (enabled) {
      const {triggerButtons, disabled} = githubActions;
      console.log('triggerButtons=========', triggerButtons, disabled, apiID)
      if (triggerButtons && triggerButtons.hasOwnProperty(apiID) && !disabled) {
        buttons.push(...triggerButtons[apiID]);
      }
      if (disabled) {
        enabled = false;
      }
    }

    return {
      enabled,
      buttons
    } as GithubActionEnabledResponse;
  },
  async trigger(buttonID: string) {
    // @ts-ignore
    const githubActions = await strapi.admin.config.githubActions;
    const {
      triggerButtons,
      githubToken,
      githubOwner,
      githubRepo,
      githubBranch,
      githubWorkflow
    } = githubActions;
    let urlWorkflow = '';
    let executed = false;

    const buttonInfo = triggerButtons.find((button) => button.buttonID === buttonID);
    const {enabled} = await this.getButtons(buttonInfo.apiID);
    if (!enabled) {
      return {
        executed,
        urlWorkflow
      }
    }

    if (buttonInfo) {
      executed = true;
      let {
        workflow,
        repository,
        branch,
        owner,
        token,
        inputs
      } = buttonInfo;
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

      try {
        console.log('Trigger Github Action with config', url, branch, inputs);
        const data = await axios.post(url, {
          ref: branch,
          inputs
        }, {headers: getHeaders(token)});

        urlWorkflow = urlGetWorkflow(owner, repository, workflow);
      } catch (error) {
        const data = error.response.data;
        if (data && data.message) {
          return {
            executed: false,
            message: data.message
          }
        }
      }
    }
    return {
      executed,
      urlWorkflow
    }
  }
});
