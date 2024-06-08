import { prefixPluginTranslations } from '@strapi/helper-plugin';

import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import TriggerGithubAction from './components/TriggerGithubAction';
import JsonDiffButton from './components/JsonDiffButton/index';

const name = pluginPkg.strapi.name;

export default {
  register(app: any) {
    app.injectContentManagerComponent('listView', 'actions', { name: 'trigger-github-action', Component: TriggerGithubAction});
    app.injectContentManagerComponent('editView', 'right-links', { name: 'json-diff-button', Component: JsonDiffButton});
  },

  bootstrap(app: any) {}
};
