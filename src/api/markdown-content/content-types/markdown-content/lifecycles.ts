import {errors} from "@strapi/utils";

async function getDataValueDefaultI18n(folderName: string, locale: string = 'en') {
  return await strapi.entityService.findMany('api::markdown-content.markdown-content', {
    filters: {folderName: folderName},
    populate: {
      localizations: {
        fields: ['folderName', 'id', 'locale'],
      },
    },
    locale,
  })
}

async function validateUniqueFolderName(data: any, _id: number = 0) {
  let {locale, folderName, localizations, id} = data;
  console.log('validateUniqueFolderName', data)
  console.log('validateUniqueFolderName', localizations)
  if (!folderName) {
    return;
  }
  if (id) {
    id = _id;
  }
  let parentId = localizations ?? [];
  console.log('validateUniqueFolderName', id, data)
  if (!locale) {
    locale = 'en';
  }
  let defaultList = await getDataValueDefaultI18n(folderName);
  if (parentId && parentId.length > 0) {
    defaultList = defaultList.filter((item: any) => !parentId.includes(item.id));
  }
  console.log('defaultList', defaultList)
  console.log('pa', parentId)
  let isCheck = false;
  if (defaultList && defaultList.length > 0) {

    for (const defaultListElement of defaultList) {
      if (!id) {
        if (defaultListElement.folderName === folderName && defaultListElement.locale === locale) {
          isCheck = true;
          break;
        }
      } else {
        if (defaultListElement.folderName === folderName && defaultListElement.locale === locale && defaultListElement.id !== id) {
          isCheck = true;
          break;
        }
      }
      for (const localeListElement of defaultListElement.localizations) {
        if (!id) {
          if (localeListElement.folderName === folderName && localeListElement.locale === locale) {
            isCheck = true;
            break;
          }
        } else {
          if (localeListElement.folderName === folderName && localeListElement.locale === locale && localeListElement.id !== id) {
            isCheck = true;
            break;
          }
        }

      }
    }

  }
  if (isCheck) {
    throw new errors.ValidationError(`Folder name must be unique`, {});
  }
}

export default {
  beforeCreate: async (event: Event) => {
    // @ts-ignore
    const {params} = event;
    // console.log('beforeCreate')
    // console.log('beforeCreate', params)
    // await validateUniqueFolderName(params.data);
    // @ts-ignore}}`;
  },
  beforeUpdate: async (event: Event) => {
    // @ts-ignore
    // const {params} = event;
    // console.log('beforeUpdate')
    // console.log('beforeUpdate',params)
    // const where = params.where;
    // const id = where.id ?? 0;
    // await validateUniqueFolderName(params.data, id);
  }
};
