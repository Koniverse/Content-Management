import {removeAttribute} from "./utils";
import {Event} from '@strapi/database/dist/lifecycles'
import {factories} from '@strapi/strapi';
import {Common} from "@strapi/types/dist/types";
import axios from "axios";
import {TriggerButtonInfo} from "../../../plugins/github-action-trigger/types";

const RESOURCE_URL = 'https://static-data.subwallet.app';
export default factories.createCoreService('api::audit-log.audit-log', ({strapi}) => ({
  getUserName() {
    const ctx = strapi.requestContext.get();
    const user = ctx?.state?.user;
    if (!user) {
      return;
    }
    let userName = user.username;
    if (!userName) {
      userName = `${user.firstname ?? ''} ${user.lastname ?? ''}`;
    }
    return {id: user.id, username: userName};
  },

  async generateData() {
    const contentTypes = [
      'airdrop-campaign',
      'buy-service-info',
      'buy-token-config',
      'category',
      'chain',
      'chain-asset',
      'change-log',
      'crowdloan-fund',
      'dapp',
      'instruction',
      'markdown-content',
      'marketing-campaign',
      'multi-chain-asset',
      'share-preview',
      'version-buy',
      'mobile-feature',
    ];
    const promises = [];
    for (const contentType of contentTypes) {
      const singularName = `api::${contentType}.${contentType}` as Common.UID.ContentType;
      const items = await strapi.entityService.findMany(singularName, {
        sort: 'id:asc',
        populate: '*'
      });

      const auditLogData = await strapi.entityService.findMany('api::audit-log.audit-log', {
        filters: {contentType: contentType, action: 'create'},
        sort: 'createdAt:desc',
      });
      const existAuditLogContentIds = auditLogData.map((item) => Number(item.contentId));
      const itemList = Array.isArray(items) ? items : [items];
      for (const item of itemList) {
        // @ts-ignore
        if (existAuditLogContentIds.includes(item.id)) {
          continue;
        }
        const {updatedBy} = item;
        let userName = 'SubWallet Admin';
        let userId = 1;
        if (updatedBy) {
          userName = updatedBy.username;
          // @ts-ignore
          userId = updatedBy.id;
          if (!userName) {
            userName = `${updatedBy.firstname ?? ''} ${updatedBy.lastname ?? ''}`;
          }
        }
        const {createdAt, updatedAt} = item;
        const auditLog = {
          action: 'create',
          contentType: contentType,
          fromData: {},
          toData: removeAttribute(item),
          updatedByUserName: userName,
          updatedById: userId,
          contentId: item.id,
          createdAt: createdAt,
          updatedAt: updatedAt
        }
        promises.push(strapi.entityService.create('api::audit-log.audit-log', {
          data: auditLog
        }));
      }
    }
    await Promise.all(promises);
    return {generateData: `${promises.length} audit logs created`};
  },
  async getAuditLogBefore(id: number, singularName: string) {
    let _fromData = {};
    const auditLogData = await strapi.entityService.findMany('api::audit-log.audit-log', {
      filters: {contentId: id, contentType: singularName, action: {$in: ['create', 'update']}},
      sort: 'createdAt:desc',
      limit: 1
    });
    if (auditLogData.length > 0) {
      const itemLog = auditLogData[0];
      _fromData = itemLog.toData;
    }
    return _fromData;
  },
  async addAuditLogDeploy(buttonInfo: TriggerButtonInfo) {
    const {buttonID, apiID} = buttonInfo;
    // @ts-ignore
    const inputs = buttonInfo?.inputs || {};
    if (!inputs) {
      return;
    }
    const {environment, folder} = inputs;
    if (!environment || !folder) {
      return;
    }
    const isProduction = environment === 'production';
    const nameFile = isProduction ? 'list' : 'preview';
    const action = isProduction ? 'deploy_production' : 'deploy_development';
    const user = this.getUserName();
    if (!user) {
      return;
    }
    const url = `${RESOURCE_URL}/${folder}/${nameFile}.json`;
    let fromData = {};

    try {
      const response = await axios.get(url);
      fromData = response.data;
    } catch (e) {
      console.log('error', e);
    }
    const singularName = `api::${apiID}.${apiID}`;

    const generalParams = {
      publicationState: !isProduction ? 'preview' : 'live',
      locale: 'en'
    }
    // @ts-ignore
    const toData = await strapi.service(singularName).customList(generalParams)
    const auditLog = {
      action: action,
      contentType: apiID,
      fromData,
      toData,
      updatedByUserName: user.username,
      updatedById: user.id,
      contentId: 0,
      buttonID: buttonID
    }
    // axios
    await strapi.entityService.create('api::audit-log.audit-log', {
      data: auditLog
    });
  },
  async handleAuditLog(event: Event) {
    // Get general info
    const action = event.action;
    const {data, where} = event.params;
    // @ts-ignore
    const record = event.result || data;
    let id = record?.id;
    if (!id && where) {
      id = where?.id;
    }
    const singularName = event.model.singularName;

    const uid = event.model.uid as Common.UID.ContentType;


    // Get user info
    const ctx = strapi.requestContext.get();
    const user = ctx?.state?.user;
    if (!user) {
      return;
    }
    let userName = user.username;
    if (!userName) {
      userName = `${user.firstname ?? ''} ${user.lastname ?? ''}`;
    }

    const populateConfig = '*';
    // Create audit log delete many
    if (action === 'beforeDeleteMany') {
      const beforeData = await strapi.entityService.findMany(uid, {
        filters: where,
        populate: populateConfig,
      });
      const promises = (beforeData as Array<any>).map((item) => {
        item = removeAttribute(item);
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
    // Create audit log update many
    if (action === 'afterUpdateMany' && data.hasOwnProperty('publishedAt')) {
      const {publishedAt} = data;
      const newAction = publishedAt ? 'publish' : 'unpublish';
      // @ts-ignore
      const beforeData = await strapi.entityService.findMany(uid, {
        filters: where,
        populate: populateConfig,
      });
      const promises = [];
      for (let item of (beforeData as Array<any>)) {
        // @ts-ignore
        if (!item.hasOwnProperty('publishedAt')) {
          break
        }
        item = removeAttribute(item);
        // @ts-ignore
        const _fromData = await this.getAuditLogBefore(item.id, singularName);

        const dataLog = {
          action: newAction,
          contentType: singularName,
          fromData: _fromData,
          toData: item,
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

    let rawData = await strapi.entityService.findOne(uid, id, {
      populate: populateConfig
    })

    if (!rawData) {
      return;
    }
    rawData = removeAttribute(rawData);
    const _fromData = await this.getAuditLogBefore(id, singularName);

    const auditLog = {
      action: 'create',
      contentType: singularName,
      fromData: {},
      toData: {},
      updatedByUserName: userName,
      updatedById: user.id,
      contentId: id,
    }
    if (action === 'afterCreate') {
      auditLog.toData = rawData;
    }
    if (action === 'afterUpdate') {
      auditLog.toData = rawData;
      auditLog.fromData = _fromData;
      auditLog.action = 'update';
      if (Object.keys(data).length === 3) {
        const keyUpdate = ['createdBy', 'updatedAt', 'updatedBy'];
        const keys = Object.keys(data);
        const check = keys.every((key) => keyUpdate.includes(key));
        if (check) {
          return;
        }
      }
      // @ts-ignore
      if (data.hasOwnProperty('publishedAt')) {
        // && rawData.hasOwnProperty('publishedAt') && data.publishedAt !== rawData.publishedAt

        const {publishedAt} = data;
        let check = false;
        if (!publishedAt) {
          check = true;
        }
        // @ts-ignore
        if ((publishedAt && rawData.hasOwnProperty('publishedAt') && publishedAt !== rawData.publishedAt)) {
          check = true;
        }
        if (check) {
          auditLog.action = publishedAt ? 'publish' : 'unpublish';
        }
      }
    }
    if (action === 'beforeDelete') {
      auditLog.fromData = rawData;
      auditLog.action = 'delete';
    }

    // Save audit log
    await strapi.entityService.create('api::audit-log.audit-log', {
      data: auditLog
    });
  }
}));
