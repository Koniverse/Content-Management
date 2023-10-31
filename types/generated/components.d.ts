import type { Schema, Attribute } from '@strapi/strapi';

export interface AssetInfoAssetRef extends Schema.Component {
  collectionName: 'components_asset_info_asset_refs';
  info: {
    displayName: 'AssetRef';
  };
  attributes: {
    type: Attribute.Enumeration<['XCM', 'SWAP']>;
    destAsset: Attribute.Relation<
      'asset-info.asset-ref',
      'oneToOne',
      'api::chain-asset.chain-asset'
    >;
  };
}

export interface ChainInfoEvmInfo extends Schema.Component {
  collectionName: 'components_chain_info_evm_infos';
  info: {
    displayName: 'evmInfo';
    icon: 'command';
  };
  attributes: {
    evmChainId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    blockExplorer: Attribute.String;
    existentialDeposit: Attribute.String;
    symbol: Attribute.String;
    decimals: Attribute.Integer;
    supportSmartContract: Attribute.JSON &
      Attribute.CustomField<
        'plugin::multi-select.multi-select',
        ['ERC20', 'ERC721']
      >;
    abiExplorer: Attribute.String;
  };
}

export interface ChainInfoProvider extends Schema.Component {
  collectionName: 'components_chain_info_providers';
  info: {
    displayName: 'Provider';
    icon: 'server';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    url: Attribute.String;
  };
}

export interface ChainInfoSubtrateInfo extends Schema.Component {
  collectionName: 'components_chain_info_substrate_infos';
  info: {
    displayName: 'SubstrateInfo';
    icon: 'headphone';
    description: '';
  };
  attributes: {
    relaySlug: Attribute.Enumeration<
      ['polkadot', 'kusama', 'westend', 'rococo']
    >;
    paraId: Attribute.Integer;
    genesisHash: Attribute.String;
    addressPrefix: Attribute.Integer;
    chainType: Attribute.Enumeration<['PARACHAIN', 'RELAYCHAIN']>;
    crowdloanParaId: Attribute.Integer;
    crowdloanUrl: Attribute.String;
    blockExplorer: Attribute.String;
    existentialDeposit: Attribute.String;
    symbol: Attribute.String;
    decimals: Attribute.Integer;
    hasNativeNft: Attribute.Boolean;
    supportStaking: Attribute.Boolean;
    supportSmartContract: Attribute.JSON &
      Attribute.CustomField<
        'plugin::multi-select.multi-select',
        ['PSP22', 'PSP34']
      >;
  };
}

export interface MarketingItemBanner extends Schema.Component {
  collectionName: 'components_marketing_item_banners';
  info: {
    displayName: 'banner';
    icon: 'chartBubble';
    description: '';
  };
  attributes: {
    media: Attribute.Media & Attribute.Required;
    alt: Attribute.String;
    action: Attribute.Enumeration<['open_url', 'open_view']>;
    metadata: Attribute.JSON;
    buttons: Attribute.Component<'marketing-item.button', true>;
    environments: Attribute.JSON &
      Attribute.CustomField<
        'plugin::multi-select.multi-select',
        ['extension', 'webapp', 'mobile']
      >;
    position: Attribute.JSON &
      Attribute.CustomField<
        'plugin::multi-select.multi-select',
        [
          'home',
          'tokens',
          'crowdloan',
          'staking',
          'earning',
          'history',
          'browser',
          'settings'
        ]
      >;
  };
}

export interface MarketingItemButton extends Schema.Component {
  collectionName: 'components_marketing_item_buttons';
  info: {
    displayName: 'Button';
    icon: 'chartBubble';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    icon: Attribute.String;
    color: Attribute.Enumeration<
      ['none', 'primary', 'secondary', 'danger', 'success', 'info', 'warning']
    >;
    type: Attribute.Enumeration<['open_url', 'open_view']>;
    metadata: Attribute.JSON;
  };
}

export interface MarketingItemNotification extends Schema.Component {
  collectionName: 'components_marketing_item_notifications';
  info: {
    displayName: 'notification';
    icon: 'chartBubble';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    message: Attribute.Text;
    repeat: Attribute.Integer & Attribute.Required & Attribute.DefaultTo<1>;
    repeat_after_minutes: Attribute.Integer &
      Attribute.Required &
      Attribute.DefaultTo<30>;
    action: Attribute.Enumeration<['open_url', 'open_view']>;
    metadata: Attribute.JSON;
    buttons: Attribute.Component<'marketing-item.button', true>;
  };
}

export interface PlatformPlatform extends Schema.Component {
  collectionName: 'components_platform_platforms';
  info: {
    displayName: 'platform';
  };
  attributes: {
    web: Attribute.String;
    mobi: Attribute.String;
    extension: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'asset-info.asset-ref': AssetInfoAssetRef;
      'chain-info.evm-info': ChainInfoEvmInfo;
      'chain-info.provider': ChainInfoProvider;
      'chain-info.subtrate-info': ChainInfoSubtrateInfo;
      'marketing-item.banner': MarketingItemBanner;
      'marketing-item.button': MarketingItemButton;
      'marketing-item.notification': MarketingItemNotification;
      'platform.platform': PlatformPlatform;
    }
  }
}
