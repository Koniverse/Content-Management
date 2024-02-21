/**
 * buy-service-info service
 */

import {type Attribute, factories} from '@strapi/strapi';

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
    const keys = ['disconnect', 'connect'];
    let addData = false;
    for (const key of keys) {
      if (b && b[key] ) {
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
  console.log('obj', obj)
  try {
    const result = JSON.parse(obj);
    console.log('result-------------------------', result)
    if (result) {
      return result;
    }
  }
  catch (e) {
    return obj;
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

  for (const prop in obj1) {
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
    const keys = ['disconnect', 'connect'];
    const value = obj[prop];
    for (const key of keys) {
      if (value && value[key]) {
        fields.push(prop);
      }
    }
  }
  return fields;
}

export default factories.createCoreService('api::audit-log.audit-log', ({strapi}) => ({
  async addAuditLogs(action: string, event: Event,) {
    // @ts-ignore
    const result = event?.result ?? null;
    // @ts-ignore
    const {data, where} = event.params;
    let id = data.id ?? null;
    // @ts-ignore
    const {singularName} = event.model;
    const serviceName = `api::${singularName}.${singularName}`;
    const formData = {};
    const toData = {};
    // @ts-ignore
    const oldData = await strapi.entityService.findOne(serviceName, id, {
      populate: '*',
    });
    // console.log('oldData', oldData)
    let differentValues = data;
    let isCreate = true;
    if (oldData) {
      isCreate = false;
      differentValues = getFieldHasChanged(oldData, data);
    }
    const fieldsHasMany = getFieldHasMany(data);
    const fieldNotLog = ['createdAt', 'updatedAt', 'publishedAt', 'createdBy', 'updatedBy', 'publishedBy'];
    for (const differentValuesKey in differentValues) {
      if (!fieldNotLog.includes(differentValuesKey)) {
        if (isCreate) {
          formData[differentValuesKey] = data[differentValuesKey];
        } else {
          formData[differentValuesKey] = differentValues[differentValuesKey].fromData;
          toData[differentValuesKey] = differentValues[differentValuesKey].toData;
        }
      }
    }

    if (fieldsHasMany.length > 0) {
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
        }
      }
    }
    const ctx = strapi.requestContext.get();
    const user = ctx?.state?.user;
    if (!user) {
      return;
    }
    if (!id) {
      if (result?.id){
        id = result.id;
      }else if (where && where.id) {
        id = where.id;

      }
    }
    let userName = user.username;
    if (!userName) {
      userName = `${user.firstname} ${user.lastname}`;
    }
    // console.log('userName', userName)
    // console.log('formData', formData)
    // console.log('toData', toData)
    if (Object.keys(formData).length === 0 && Object.keys(toData).length === 0) {
      return;
    }
    await strapi.entityService.create('api::audit-log.audit-log', {
      data: {
        action: action,
        contentType: singularName,
        formData: JSON.stringify(formData),
        toData: JSON.stringify(toData),
        updatedByUserName: userName,
        updatedById: user.id,
        contentId: id,
      },
    });


  }
}));
