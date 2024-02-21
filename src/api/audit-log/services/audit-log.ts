
const KEY_ADD_FIELD_MANY = ['disconnect', 'connect'];
import {factories} from '@strapi/strapi';

function compareValue(a: any, b: any): boolean {
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }
    for (let i = 0; i < a.length; i++) {
      if (!compareValue(a[i], b[i])) {
        return false;
      }
    }
    return true;
  }
  // console.log('a', a)
  // console.log('b', b)

  if (typeof a === "number" && typeof b === "object") {
    if (b && !b.id) {
      return false;
    }
    return b && a === b.id;
  }

  if (typeof b === "number" && typeof a === "object") {
    if (a && !a.id) {
      return false;
    }
    return a && a.id === b;
  }
  if (typeof a === "object" && typeof b === "object") {
    if (b && b.hasOwnProperty('__pivot')) {
      return a.id === b.id;
    }
    let addData = false;
    for (const key of KEY_ADD_FIELD_MANY) {
      if (b && b[key]) {
        addData = true;
        if (b[key].length > 0) {
          addData = false;
        }
      }
    }
    return addData;
  }
  return a === b;
}

function getValues(obj: any): object {
  try {
    const result = JSON.parse(obj);
    if (result) {
      return result;
    }
  } catch (e) {
  }

  if (Array.isArray(obj)) {
    const pivot = obj.some((item) => item.__pivot);
    if (pivot) {
      return obj.map((item) => item.id);
    }
  }
  return obj;
}

function isNullOrUndefined(value: any): boolean {
  return value === null || value === undefined || value === '' || value === 'null';
}

function getFieldHasChanged(obj1: object, obj2: object): object {
  const differentValues: object = {};

  for (const prop in obj2) {
    // console.log('prop', prop);
    // console.log('obj1[prop]', obj1[prop]);
    // console.log('obj2[prop]', obj2[prop]);
    if (!compareValue(obj1[prop], obj2[prop])) {
      const fromData = getValues(obj1[prop]);
      const toData = getValues(obj2[prop]);
      if (!isNullOrUndefined(fromData) || !isNullOrUndefined(toData)) {
        differentValues[prop] = {fromData, toData};
      }
    }
  }
  return differentValues;
}

function getFieldHasMany(obj) {
  const fields = [];
  for (const prop in obj) {
    const value = obj[prop];
    for (const key of KEY_ADD_FIELD_MANY) {
      if (value && value[key]) {
        fields.push(prop);
      }
    }
  }
  return fields;
}

export default factories.createCoreService('api::audit-log.audit-log', ({strapi}) => ({
  async addAuditLogs(action: string, event: Event) {
    console.log('event=============================', event)
    // @ts-ignore
    const result = event?.result ?? null;
    // @ts-ignore
    const {data, where} = event.params;
    let id = data?.id ?? null;
    if (action === 'update' && where && where.id && !id) {
      return;
    }
    if (!id) {
      if (result?.id) {
        id = result.id;
      } else if (where && where.id) {
        id = where.id;
      }
    }

    const ctx = strapi.requestContext.get();
    const user = ctx?.state?.user;
    if (!user) {
      return;
    }
    let userName = user.username;
    if (!userName) {
      userName = `${user.firstname} ${user.lastname}`;
    }
    // @ts-ignore
    const {singularName} = event.model;
    const serviceName = `api::${singularName}.${singularName}`;
    if (action === 'deleteMany') {
      // @ts-ignore
      const oldData = await strapi.entityService.findMany(serviceName, {
        filters: where,
        publicationState: 'preview',
        populate: '*',
      });
      const promises = oldData.map( (item) => {
          const dataLog = {
          action: 'delete',
          contentType: singularName,
          fromData: item,
          toData: {},
          updatedByUserName: userName,
          updatedById: user.id,
          contentId: item.id,
        };
        return strapi.entityService.create('api::audit-log.audit-log', {
          data: dataLog
        });
      });
      await Promise.all(promises);
      return;
    }
    if (action === 'updateMany' && data.hasOwnProperty('publishedAt')) {
      const {publishedAt} = data;
      const newAction = publishedAt ? 'publish' : 'unpublish';
      // @ts-ignore
      const oldData = await strapi.entityService.findMany(serviceName, {
        filters: where,
        publicationState: 'preview',
        populate: '*',
      });
      const promises = [];
      for (const item of oldData) {
        // @ts-ignore
        if (!item.hasOwnProperty('publishedAt')) {
          break
        }
        // @ts-ignore
        const oldPublishedAt = item.publishedAt;

        const dataLog = {
          action: newAction,
          contentType: singularName,
          fromData: {publishedAt: oldPublishedAt},
          toData: data,
          updatedByUserName: userName,
          updatedById: user.id,
          contentId: item.id,
        };
        promises.push(strapi.entityService.create('api::audit-log.audit-log', {
          data: dataLog
        }));
      }
      await Promise.all(promises);
      return;
    }
    const fromData = {};
    const toData = {};
    // @ts-ignore
    const oldData = await strapi.entityService.findOne(serviceName, id, {
      populate: '*',
      publicationState: 'preview'
    });

    if (action === 'update' && data.hasOwnProperty('publishedAt') && oldData && oldData.hasOwnProperty('publishedAt')) {
      const {publishedAt} = data;
      const newAction = publishedAt ? 'publish' : 'unpublish';
      // @ts-ignore
      const oldPublishedAt = oldData.publishedAt;
      const dataLog = {
        action: newAction,
        contentType: singularName,
        fromData: {publishedAt: oldPublishedAt},
        toData: {publishedAt: publishedAt},
        updatedByUserName: userName,
        updatedById: user.id,
        contentId: id,
      };
      await strapi.entityService.create('api::audit-log.audit-log', {
        data: dataLog
      });
      return;

    }

    // console.log('oldData', oldData)
    let differentValues = data;
    let isCreate = true;
    if (oldData && action === 'update') {
      isCreate = false;
      differentValues = getFieldHasChanged(oldData, data);
    }
    if (oldData && action === 'delete') {
      differentValues = oldData;
    }
    const fieldsHasMany = getFieldHasMany(data);
    const fieldNotLog = ['createdAt', 'updatedAt', 'createdBy', 'updatedBy', 'publishedBy', 'publishedAt'];
    for (const differentValuesKey in differentValues) {
      if (!fieldNotLog.includes(differentValuesKey)) {
        if (isCreate || action === 'delete') {
          let value = differentValues[differentValuesKey];
          if (value && value.connect && value.disconnect) {
            let newValue = {}
            if (value.connect && value.connect.length > 0) {
              newValue['add'] = value.connect.map((item) => item.id);
            }
            if (value.disconnect && value.disconnect.length > 0) {
              newValue['remove'] = value.disconnect.map((item) => item.id);
            }

            if (Object.keys(newValue).length > 0) {
              fromData[differentValuesKey] = newValue;
            }
          } else {
            fromData[differentValuesKey] = getValues(differentValues[differentValuesKey]);
          }
        } else {
          const _fromData = differentValues[differentValuesKey].fromData;
          const _toData = differentValues[differentValuesKey].toData;
          fromData[differentValuesKey] = _fromData;
          toData[differentValuesKey] = _toData;
        }
      }
    }

    if (fieldsHasMany.length > 0 && !isCreate) {
      for (const element of fieldsHasMany) {
        delete toData[element];
        const dataHasMany = data[element];
        const value = {};
        if (dataHasMany.connect && dataHasMany.connect.length > 0) {
          value['add'] = dataHasMany.connect.map((item) => item.id);
        }
        if (dataHasMany.disconnect && dataHasMany.disconnect.length > 0) {
          value['remove'] = dataHasMany.disconnect.map((item) => item.id);
        }
        if (Object.keys(value).length > 0) {
          toData[element] = value;
          fromData[element] = oldData[element];
        }
      }
    }
    if (Object.keys(fromData).length === 0 && Object.keys(toData).length === 0) {
      return;
    }
    const dataLog = {
      action: action,
      contentType: singularName,
      fromData: fromData,
      toData: toData,
      updatedByUserName: userName,
      updatedById: user.id,
      contentId: id,
    };
    await strapi.entityService.create('api::audit-log.audit-log', {
      data: dataLog
    });


  }
}));
