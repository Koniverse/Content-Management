import {getFieldHasChanged, getFieldHasMany, getValues} from "./utils";
import { Event } from '@strapi/database/dist/lifecycles'


import {factories} from '@strapi/strapi';
import {Common} from "@strapi/types/dist/types";

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


  },

  async handleAuditLog(event: Event) {
    // Get general info
    const action = event.action;
    // @ts-ignore
    const record = event.result || event.params?.data;

    const uid = event.model.uid;
    const populateConfig = {...event.params?.populate};

    // Get raw data
    populateConfig.createdBy && delete populateConfig.createdBy;
    populateConfig.createdAt && delete populateConfig.createdAt;
    populateConfig.updatedBy && delete populateConfig.updatedBy;
    populateConfig.updatedAt && delete populateConfig.updatedAt;

    const rawData = await strapi.entityService.findOne(uid as Common.UID.ContentType, record.id, {
      populate: populateConfig
    })

    // Get user info
    const ctx = strapi.requestContext.get();
    const user = ctx?.state?.user;
    if (!user) {
      return;
    }
    let userName = user.username;
    if (!userName) {
      userName = `${user.firstname} ${user.lastname}`;
    }

    const auditLog = {
      action: 'create',
      contentType: event.model.singularName,
      fromData: {},
      toData: {},
      updatedByUserName: userName,
      updatedById: user.id,
      contentId: record.id,
    }
    if (action === 'afterCreate') {
      auditLog.toData = rawData;
    }
    if (action === 'afterUpdate') {
      auditLog.toData = rawData;
    }
    if (action === 'beforeDelete') {
      auditLog.fromData = rawData;
    }

    // Save audit log
    await strapi.entityService.create('api::audit-log.audit-log', {
      data: auditLog
    });
  }
}));
