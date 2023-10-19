import contentTypeActions from './data/contentTypeActions.json';
export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  githubActions: {
    githubToken: env('GITHUB_CONTENT_TOKEN'),
    githubOwner: env('GITHUB_CONTENT_OWNER'),
    githubRepo: env('GITHUB_CONTENT_REPO'),
    githubBranch: env('GITHUB_CONTENT_BRANCH'),
    githubWorkflow: env('GITHUB_CONTENT_WORKFLOW'),
    contentTypeActions,
  }
});
