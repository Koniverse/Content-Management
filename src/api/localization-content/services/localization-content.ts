/**
 * localization-content service
 */

import {factories} from '@strapi/strapi';

export default factories.createCoreService('api::localization-content.localization-content', ({strapi}) => ({
  async customList(params = {}) {
    const _data = await strapi.entityService.findMany('api::localization-content.localization-content', {
      // @ts-ignore
      sort: 'id:asc',
      ...params
    })

    const data = !Array.isArray(_data) ? [_data] : _data

    return data.map((d)=>{
      return {
        "api_base_url": "https://app.texterify.com/api",
        "api_version": "v1",
        // @ts-ignore
        "project_id": d.project_id,
        // @ts-ignore
        "export_configuration_id": d.export_configuration_id,
        // @ts-ignore
        "export_directory": `data/localization-contents/${d.slug}`,
        // @ts-ignore
        "texterify_key": d.texterify_key,
        "project_path": ""
      }
    })
  }
}));
