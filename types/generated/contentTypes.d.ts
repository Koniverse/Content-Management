import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    timezone: Attribute.String;
    status: Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Attribute.Required;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    isEntryValid: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 50;
        },
        number
      >;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginSlugifySlug extends Schema.CollectionType {
  collectionName: 'slugs';
  info: {
    singularName: 'slug';
    pluralName: 'slugs';
    displayName: 'slug';
  };
  options: {
    draftAndPublish: false;
    comment: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    slug: Attribute.Text;
    count: Attribute.Integer;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::slugify.slug',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::slugify.slug',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAirdropCampaignAirdropCampaign
  extends Schema.CollectionType {
  collectionName: 'airdrop_campaigns';
  info: {
    singularName: 'airdrop-campaign';
    pluralName: 'airdrop-campaigns';
    displayName: 'Airdrop Campaign';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    status: Attribute.Enumeration<
      ['upcoming', 'live', 'claimable', 'archived']
    >;
    ordinal: Attribute.Integer & Attribute.DefaultTo<999>;
    description: Attribute.Text;
    start_time: Attribute.DateTime;
    end_time: Attribute.DateTime;
    url: Attribute.String & Attribute.Required;
    campaign_url: Attribute.String & Attribute.Required;
    twitter_url: Attribute.String;
    logo: Attribute.Media<'images'> & Attribute.Required;
    backdrop_image: Attribute.Media<'images'> & Attribute.Required;
    total_supply: Attribute.String;
    reward: Attribute.String;
    total_winner: Attribute.String;
    chains: Attribute.Relation<
      'api::airdrop-campaign.airdrop-campaign',
      'oneToMany',
      'api::chain.chain'
    >;
    tags: Attribute.JSON &
      Attribute.CustomField<
        'plugin::multi-select.multi-select',
        ['lucky_draw', 'fcfs', 'manual_selection', 'points']
      >;
    categories: Attribute.Relation<
      'api::airdrop-campaign.airdrop-campaign',
      'oneToMany',
      'api::category.category'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::airdrop-campaign.airdrop-campaign',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::airdrop-campaign.airdrop-campaign',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAppBannerAppBanner extends Schema.CollectionType {
  collectionName: 'app_banners';
  info: {
    singularName: 'app-banner';
    pluralName: 'app-banners';
    displayName: 'App Banner';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    info: Attribute.Component<'app-content.ac-info'> & Attribute.Required;
    position: Attribute.Enumeration<
      [
        'token',
        'token_detail',
        'nft',
        'crowdloan',
        'dapp',
        'in_app_browser',
        'missionPools'
      ]
    > &
      Attribute.Required;
    position_params: Attribute.Component<'app-content.params', true>;
    priority: Attribute.Integer;
    media: Attribute.Media<'images'> & Attribute.Required;
    conditions: Attribute.DynamicZone<
      [
        'app-content.condition-balance',
        'app-content.condition-crowdloan',
        'app-content.condition-earning',
        'app-content.condition-has-money',
        'app-content.condition-nft'
      ]
    >;
    instruction: Attribute.Component<'app-content.instruction-link'>;
    action: Attribute.Component<'app-content.ac-action'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::app-banner.app-banner',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::app-banner.app-banner',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAppChangeLogAppChangeLog extends Schema.CollectionType {
  collectionName: 'app_change_logs';
  info: {
    singularName: 'app-change-log';
    pluralName: 'app-change-logs';
    displayName: 'App Change Log';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    platform: Attribute.Enumeration<['extension', 'mobile', 'webapp']> &
      Attribute.Required;
    version: Attribute.String & Attribute.Required;
    content: Attribute.RichText;
    buttons: Attribute.Component<'app-content.ac-button', true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::app-change-log.app-change-log',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::app-change-log.app-change-log',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAppConfirmationAppConfirmation
  extends Schema.CollectionType {
  collectionName: 'app_confirmations';
  info: {
    singularName: 'app-confirmation';
    pluralName: 'app-confirmations';
    displayName: 'App Confirmation';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    position: Attribute.Enumeration<
      [
        'home',
        'token',
        'send-fund',
        'earning',
        'crowdloan',
        'history',
        'missionPools',
        'stake',
        'unstake',
        'withdraw'
      ]
    > &
      Attribute.Required &
      Attribute.DefaultTo<'home'>;
    position_params: Attribute.Component<'app-content.params', true>;
    repeat: Attribute.Enumeration<
      ['one', 'everytime', 'daily', 'weekly', 'monthly']
    > &
      Attribute.Required;
    confirm_label: Attribute.String & Attribute.DefaultTo<'OK'>;
    cancel_label: Attribute.String & Attribute.DefaultTo<'Cancel'>;
    conditions: Attribute.DynamicZone<
      [
        'app-content.condition-balance',
        'app-content.condition-crowdloan',
        'app-content.condition-earning',
        'app-content.condition-has-money',
        'app-content.condition-nft'
      ]
    >;
    content: Attribute.RichText;
    repeat_every_x_days: Attribute.Integer;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::app-confirmation.app-confirmation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::app-confirmation.app-confirmation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAppPopupAppPopup extends Schema.CollectionType {
  collectionName: 'app_popups';
  info: {
    singularName: 'app-popup';
    pluralName: 'app-popups';
    displayName: 'App Popup';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    info: Attribute.Component<'app-content.ac-info'> & Attribute.Required;
    priority: Attribute.Integer & Attribute.DefaultTo<999>;
    position: Attribute.Enumeration<
      [
        'token',
        'nft',
        'earning',
        'crowdloan',
        'dapp',
        'mission_pool',
        'history'
      ]
    > &
      Attribute.Required;
    position_params: Attribute.Component<'app-content.params', true>;
    repeat: Attribute.Enumeration<
      ['once', 'every_time', 'daily', 'weekly', 'monthly']
    > &
      Attribute.Required &
      Attribute.DefaultTo<'once'>;
    media: Attribute.Media<'images'>;
    content: Attribute.RichText;
    buttons: Attribute.Component<'app-content.ac-button', true>;
    conditions: Attribute.DynamicZone<
      [
        'app-content.condition-balance',
        'app-content.condition-crowdloan',
        'app-content.condition-earning',
        'app-content.condition-has-money',
        'app-content.condition-nft'
      ]
    >;
    repeat_every_x_days: Attribute.Integer;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::app-popup.app-popup',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::app-popup.app-popup',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAuditLogAuditLog extends Schema.CollectionType {
  collectionName: 'audit_logs';
  info: {
    singularName: 'audit-log';
    pluralName: 'audit-logs';
    displayName: 'Audit Logs';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    contentType: Attribute.String;
    action: Attribute.String;
    contentId: Attribute.BigInteger;
    updatedByUserName: Attribute.String;
    updatedById: Attribute.Relation<
      'api::audit-log.audit-log',
      'oneToOne',
      'admin::user'
    >;
    fromData: Attribute.JSON;
    toData: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::audit-log.audit-log',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::audit-log.audit-log',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBrowserConfigBrowserConfig extends Schema.CollectionType {
  collectionName: 'browser_configs';
  info: {
    singularName: 'browser-config';
    pluralName: 'browser-configs';
    displayName: 'Browser Config';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    value: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::browser-config.browser-config',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::browser-config.browser-config',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBuyButtonBuyButton extends Schema.CollectionType {
  collectionName: 'buy_buttons';
  info: {
    singularName: 'buy-button';
    pluralName: 'buy-buttons';
    displayName: 'Buy Button';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    version: Attribute.String & Attribute.Required & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::buy-button.buy-button',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::buy-button.buy-button',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBuyServiceInfoBuyServiceInfo extends Schema.CollectionType {
  collectionName: 'buy_service_infos';
  info: {
    singularName: 'buy-service-info';
    pluralName: 'buy-service-infos';
    displayName: 'Buy Service Info';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    slug: Attribute.String & Attribute.Required;
    name: Attribute.String & Attribute.Required;
    contactUrl: Attribute.String & Attribute.Required;
    termUrl: Attribute.String & Attribute.Required;
    policyUrl: Attribute.String & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::buy-service-info.buy-service-info',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::buy-service-info.buy-service-info',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBuyTokenConfigBuyTokenConfig extends Schema.CollectionType {
  collectionName: 'buy_token_configs';
  info: {
    singularName: 'buy-token-config';
    pluralName: 'buy-token-configs';
    displayName: 'Buy Token Config';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    chain_asset: Attribute.Relation<
      'api::buy-token-config.buy-token-config',
      'oneToOne',
      'api::chain-asset.chain-asset'
    >;
    support: Attribute.Enumeration<['SUBSTRATE', 'ETHEREUM']>;
    ordinal: Attribute.Integer & Attribute.DefaultTo<999>;
    services: Attribute.Component<'buy-token.service-info', true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::buy-token-config.buy-token-config',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::buy-token-config.buy-token-config',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCategoryCategory extends Schema.CollectionType {
  collectionName: 'categories';
  info: {
    singularName: 'category';
    pluralName: 'categories';
    displayName: 'Category';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    slug: Attribute.String;
    name: Attribute.String;
    color: Attribute.Enumeration<
      [
        'primary',
        'secondary',
        'success',
        'processing',
        'error',
        'default',
        'warning',
        'danger',
        'red',
        'volcano',
        'orange',
        'gold',
        'yellow',
        'lime',
        'green',
        'cyan',
        'blue',
        'geekblue',
        'purple',
        'magenta'
      ]
    >;
    description: Attribute.Text;
    ordinal: Attribute.Integer & Attribute.DefaultTo<99>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::category.category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::category.category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiChainChain extends Schema.CollectionType {
  collectionName: 'chains';
  info: {
    singularName: 'chain';
    pluralName: 'chains';
    displayName: 'Chain';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    ordinal: Attribute.Integer & Attribute.DefaultTo<9999>;
    slug: Attribute.String & Attribute.Required & Attribute.Unique;
    name: Attribute.String;
    isTestnet: Attribute.Boolean;
    chainStatus: Attribute.Enumeration<['ACTIVE', 'INACTIVE', 'STOPPED']> &
      Attribute.DefaultTo<'ACTIVE'>;
    icon: Attribute.Media<'images'>;
    providers: Attribute.Component<'chain-info.provider', true>;
    substrateInfo: Attribute.Component<'chain-info.subtrate-info'>;
    evmInfo: Attribute.Component<'chain-info.evm-info'>;
    crowdloanFunds: Attribute.Relation<
      'api::chain.chain',
      'oneToMany',
      'api::crowdloan-fund.crowdloan-fund'
    >;
    extraInfo: Attribute.Component<'chain-info.extra-info'>;
    bitcoinInfo: Attribute.Component<'chain-info.bitcoin-info'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::chain.chain',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::chain.chain',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiChainAssetChainAsset extends Schema.CollectionType {
  collectionName: 'chain_assets';
  info: {
    singularName: 'chain-asset';
    pluralName: 'chain-assets';
    displayName: 'Chain Asset';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    ordinal: Attribute.Integer & Attribute.DefaultTo<9999>;
    originChain: Attribute.Relation<
      'api::chain-asset.chain-asset',
      'oneToOne',
      'api::chain.chain'
    > &
      Attribute.Required;
    slug: Attribute.String & Attribute.Required & Attribute.Unique;
    name: Attribute.String & Attribute.Required;
    symbol: Attribute.String & Attribute.Required;
    decimals: Attribute.Integer;
    priceId: Attribute.String;
    minAmount: Attribute.String;
    assetType: Attribute.Enumeration<
      [
        'NATIVE',
        'LOCAL',
        'ERC20',
        'ERC721',
        'PSP22',
        'PSP34',
        'GRC20',
        'GRC721',
        'RUNE',
        'BRC20',
        'UNKNOWN'
      ]
    > &
      Attribute.Required;
    metadata: Attribute.JSON;
    hasValue: Attribute.Boolean;
    icon: Attribute.Media<'images'>;
    multiChainAsset: Attribute.Relation<
      'api::chain-asset.chain-asset',
      'manyToOne',
      'api::multi-chain-asset.multi-chain-asset'
    >;
    assetRefs: Attribute.Component<'asset-info.asset-ref', true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::chain-asset.chain-asset',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::chain-asset.chain-asset',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCrowdloanFundCrowdloanFund extends Schema.CollectionType {
  collectionName: 'crowdloan_funds';
  info: {
    singularName: 'crowdloan-fund';
    pluralName: 'crowdloan-funds';
    displayName: 'Crowdloan Fund';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    relayChain: Attribute.Enumeration<['polkadot', 'kusama']>;
    chain: Attribute.Relation<
      'api::crowdloan-fund.crowdloan-fund',
      'manyToOne',
      'api::chain.chain'
    >;
    paraId: Attribute.Integer;
    fundId: Attribute.String;
    status: Attribute.Enumeration<['in_auction', 'won', 'withdraw', 'failed']>;
    auctionIndex: Attribute.Integer;
    firstPeriod: Attribute.Integer;
    lastPeriod: Attribute.Integer;
    startTime: Attribute.DateTime;
    endTime: Attribute.DateTime;
    metadata: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::crowdloan-fund.crowdloan-fund',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::crowdloan-fund.crowdloan-fund',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDappDapp extends Schema.CollectionType {
  collectionName: 'dapps';
  info: {
    singularName: 'dapp';
    pluralName: 'dapps';
    displayName: 'DApp';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    ordinal: Attribute.Integer & Attribute.DefaultTo<9999>;
    title: Attribute.String & Attribute.Required;
    subtitle: Attribute.String;
    is_featured: Attribute.Boolean & Attribute.DefaultTo<false>;
    description: Attribute.Text;
    url: Attribute.String & Attribute.Required;
    icon: Attribute.Media<'images'>;
    preview_image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    is_substrate: Attribute.Boolean;
    is_evm: Attribute.Boolean;
    chains: Attribute.Relation<
      'api::dapp.dapp',
      'oneToMany',
      'api::chain.chain'
    >;
    category_rels: Attribute.Relation<
      'api::dapp.dapp',
      'oneToMany',
      'api::category.category'
    >;
    desktop_mode: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::dapp.dapp', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::dapp.dapp', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiDiscordInfoDiscordInfo extends Schema.CollectionType {
  collectionName: 'discord_infos';
  info: {
    singularName: 'discord-info';
    pluralName: 'discord-infos';
    displayName: 'Discord info';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    discord_id: Attribute.String & Attribute.Required;
    type: Attribute.Enumeration<['user', 'role']> & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::discord-info.discord-info',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::discord-info.discord-info',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiHealthCheckHealthCheck extends Schema.CollectionType {
  collectionName: 'health_checks';
  info: {
    singularName: 'health-check';
    pluralName: 'health-checks';
    displayName: 'Health Check';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    url: Attribute.String & Attribute.Required & Attribute.Unique;
    live_status: Attribute.Enumeration<['None', 'Live', 'Error']> &
      Attribute.Required &
      Attribute.DefaultTo<'None'>;
    status_code: Attribute.Integer &
      Attribute.Required &
      Attribute.DefaultTo<200>;
    time_out: Attribute.BigInteger &
      Attribute.Required &
      Attribute.DefaultTo<'10000'>;
    request_data: Attribute.JSON;
    discord_infos: Attribute.Relation<
      'api::health-check.health-check',
      'oneToMany',
      'api::discord-info.discord-info'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::health-check.health-check',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::health-check.health-check',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiInstructionInstruction extends Schema.CollectionType {
  collectionName: 'instructions';
  info: {
    singularName: 'instruction';
    pluralName: 'instructions';
    displayName: 'Instruction';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    group: Attribute.Enumeration<['earning']> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    slug: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    instructions: Attribute.Component<'instruction.instruction-block', true> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    title: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    media: Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::instruction.instruction',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::instruction.instruction',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::instruction.instruction',
      'oneToMany',
      'api::instruction.instruction'
    >;
    locale: Attribute.String;
  };
}

export interface ApiLocalizationContentLocalizationContent
  extends Schema.CollectionType {
  collectionName: 'localization_contents';
  info: {
    singularName: 'localization-content';
    pluralName: 'localization-contents';
    displayName: 'Localization Content';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    project_id: Attribute.String & Attribute.Required;
    project_name: Attribute.String;
    export_configuration_id: Attribute.String & Attribute.Required;
    slug: Attribute.UID<
      'api::localization-content.localization-content',
      'project_name'
    > &
      Attribute.Required;
    texterify_key: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::localization-content.localization-content',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::localization-content.localization-content',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMarkdownContentMarkdownContent
  extends Schema.CollectionType {
  collectionName: 'markdown_contents';
  info: {
    singularName: 'markdown-content';
    pluralName: 'markdown-contents';
    displayName: 'Markdown Content';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    folder: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    description: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    content: Attribute.RichText &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::markdown-content.markdown-content',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::markdown-content.markdown-content',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::markdown-content.markdown-content',
      'oneToMany',
      'api::markdown-content.markdown-content'
    >;
    locale: Attribute.String;
  };
}

export interface ApiMarketingCampaignMarketingCampaign
  extends Schema.CollectionType {
  collectionName: 'marketing_campaigns';
  info: {
    singularName: 'marketing-campaign';
    pluralName: 'marketing-campaigns';
    displayName: 'Marketing Campaign';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    description: Attribute.String;
    start_time: Attribute.DateTime;
    end_time: Attribute.DateTime;
    condition: Attribute.JSON;
    banners: Attribute.Component<'marketing-item.banner', true>;
    notifications: Attribute.Component<'marketing-item.notification', true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::marketing-campaign.marketing-campaign',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::marketing-campaign.marketing-campaign',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMobileFeatureMobileFeature extends Schema.CollectionType {
  collectionName: 'mobile_features';
  info: {
    singularName: 'mobile-feature';
    pluralName: 'mobile-features';
    displayName: 'Mobile Feature';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    version: Attribute.String & Attribute.Required & Attribute.Unique;
    ios_buy: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<true>;
    ios_swap: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<true>;
    ios_browser: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<true>;
    android_buy: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<true>;
    android_swap: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<true>;
    android_browser: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::mobile-feature.mobile-feature',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::mobile-feature.mobile-feature',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMultiChainAssetMultiChainAsset
  extends Schema.CollectionType {
  collectionName: 'multi_chain_assets';
  info: {
    singularName: 'multi-chain-asset';
    pluralName: 'multi-chain-assets';
    displayName: 'Multi Chain Asset';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    slug: Attribute.String & Attribute.Required & Attribute.Unique;
    name: Attribute.String;
    symbol: Attribute.String;
    priceId: Attribute.String;
    hasValue: Attribute.Boolean;
    icon: Attribute.Media<'images'>;
    originChainAsset: Attribute.Relation<
      'api::multi-chain-asset.multi-chain-asset',
      'oneToOne',
      'api::chain-asset.chain-asset'
    >;
    chainAssets: Attribute.Relation<
      'api::multi-chain-asset.multi-chain-asset',
      'oneToMany',
      'api::chain-asset.chain-asset'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::multi-chain-asset.multi-chain-asset',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::multi-chain-asset.multi-chain-asset',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSharePreviewSharePreview extends Schema.CollectionType {
  collectionName: 'share_previews';
  info: {
    singularName: 'share-preview';
    pluralName: 'share-previews';
    displayName: 'Share Preview';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    slug: Attribute.String & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    title: Attribute.String & Attribute.Required;
    description: Attribute.String;
    preview_image: Attribute.Media<'images'> & Attribute.Required;
    fallback_image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::share-preview.share-preview',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::share-preview.share-preview',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'plugin::slugify.slug': PluginSlugifySlug;
      'api::airdrop-campaign.airdrop-campaign': ApiAirdropCampaignAirdropCampaign;
      'api::app-banner.app-banner': ApiAppBannerAppBanner;
      'api::app-change-log.app-change-log': ApiAppChangeLogAppChangeLog;
      'api::app-confirmation.app-confirmation': ApiAppConfirmationAppConfirmation;
      'api::app-popup.app-popup': ApiAppPopupAppPopup;
      'api::audit-log.audit-log': ApiAuditLogAuditLog;
      'api::browser-config.browser-config': ApiBrowserConfigBrowserConfig;
      'api::buy-button.buy-button': ApiBuyButtonBuyButton;
      'api::buy-service-info.buy-service-info': ApiBuyServiceInfoBuyServiceInfo;
      'api::buy-token-config.buy-token-config': ApiBuyTokenConfigBuyTokenConfig;
      'api::category.category': ApiCategoryCategory;
      'api::chain.chain': ApiChainChain;
      'api::chain-asset.chain-asset': ApiChainAssetChainAsset;
      'api::crowdloan-fund.crowdloan-fund': ApiCrowdloanFundCrowdloanFund;
      'api::dapp.dapp': ApiDappDapp;
      'api::discord-info.discord-info': ApiDiscordInfoDiscordInfo;
      'api::health-check.health-check': ApiHealthCheckHealthCheck;
      'api::instruction.instruction': ApiInstructionInstruction;
      'api::localization-content.localization-content': ApiLocalizationContentLocalizationContent;
      'api::markdown-content.markdown-content': ApiMarkdownContentMarkdownContent;
      'api::marketing-campaign.marketing-campaign': ApiMarketingCampaignMarketingCampaign;
      'api::mobile-feature.mobile-feature': ApiMobileFeatureMobileFeature;
      'api::multi-chain-asset.multi-chain-asset': ApiMultiChainAssetMultiChainAsset;
      'api::share-preview.share-preview': ApiSharePreviewSharePreview;
    }
  }
}
