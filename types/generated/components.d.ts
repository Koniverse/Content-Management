import type { Schema, Attribute } from '@strapi/strapi';

export interface AppContentAcAction extends Schema.Component {
  collectionName: 'components_app_content_ac_actions';
  info: {
    displayName: 'ac-action';
    description: '';
  };
  attributes: {
    url: Attribute.String;
    screen: Attribute.String;
    params: Attribute.JSON;
    is_cancel: Attribute.Boolean;
  };
}

export interface AppContentAcButton extends Schema.Component {
  collectionName: 'components_app_content_ac_buttons';
  info: {
    displayName: 'ac-button';
    icon: 'lightbulb';
    description: '';
  };
  attributes: {
    label: Attribute.String;
    color: Attribute.Enumeration<
      ['primary', 'secondary', 'warning', 'success', 'info']
    >;
    instruction: Attribute.Component<'app-content.instruction-link'>;
    action: Attribute.Component<'app-content.ac-action'>;
  };
}

export interface AppContentAcInfo extends Schema.Component {
  collectionName: 'components_app_content_ac_infos';
  info: {
    displayName: 'ac-info';
    icon: 'cube';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    description: Attribute.Text;
    start_time: Attribute.DateTime;
    stop_time: Attribute.DateTime;
    platforms: Attribute.JSON &
      Attribute.CustomField<
        'plugin::multi-select.multi-select',
        ['extension', 'mobile', 'web']
      >;
    os: Attribute.Enumeration<['Android', 'iOS']>;
    is_changelog_popup: Attribute.Boolean;
  };
}

export interface AppContentConditionBalance extends Schema.Component {
  collectionName: 'components_app_content_condition_balances';
  info: {
    displayName: 'condition-balance';
    icon: 'crown';
    description: '';
  };
  attributes: {
    chain_asset: Attribute.Relation<
      'app-content.condition-balance',
      'oneToOne',
      'api::chain-asset.chain-asset'
    >;
    comparison: Attribute.Enumeration<['eq', 'gt', 'gte', 'lt', 'lte']>;
    value: Attribute.Decimal;
  };
}

export interface AppContentConditionCrowdloan extends Schema.Component {
  collectionName: 'components_app_content_condition_crowdloans';
  info: {
    displayName: 'condition-crowdloan';
    icon: 'star';
  };
  attributes: {
    chain: Attribute.Relation<
      'app-content.condition-crowdloan',
      'oneToOne',
      'api::chain.chain'
    >;
  };
}

export interface AppContentConditionEarning extends Schema.Component {
  collectionName: 'components_app_content_condition_earnings';
  info: {
    displayName: 'condition-earning';
    icon: 'seed';
    description: '';
  };
  attributes: {
    pool_slug: Attribute.Enumeration<
      [
        'DOT___native_staking___polkadot',
        'DOT___nomination_pool___polkadot',
        'KSM___native_staking___kusama',
        'KSM___nomination_pool___kusama',
        'GLMR___native_staking___moonbeam',
        'xcDOT___liquid_staking___stellaswap',
        'AZERO___native_staking___aleph',
        'AZERO___nomination_pool___aleph',
        'ASTR___native_staking___astar',
        'DOT___liquid_staking___acala',
        'TZERO___native_staking___alephTest',
        'TZERO___nomination_pool___alephTest',
        'SDN___native_staking___shiden',
        'SBY___native_staking___shibuya',
        'WND___native_staking___westend',
        'WND___nomination_pool___westend',
        'DEV___native_staking___moonbase',
        'MOVR___native_staking___moonriver',
        'TUR___native_staking___turingStaging',
        'TUR___native_staking___turing',
        'BNC___native_staking___bifrost',
        'DOT___liquid_staking___bifrost_dot',
        'BNC___native_staking___bifrost_testnet',
        'KMA___native_staking___calamari',
        'AMPE___native_staking___amplitude',
        'AMPE___native_staking___amplitude_test',
        'DOT___liquid_staking___parallel',
        'EDG___native_staking___edgeware',
        'DOT___lending___interlay',
        'PDEX___native_staking___polkadex',
        'KILT___native_staking___kilt',
        'CAPS___native_staking___ternoa',
        'PEN___native_staking___pendulum',
        'KMA___native_staking___calamari_test',
        'PILT___native_staking___kilt_peregrine',
        'CTC___native_staking___creditcoin',
        'VARA___native_staking___vara_network',
        'VARA___nomination_pool___vara_network',
        'MANTA___native_staking___manta_network',
        'AVL___native_staking___goldberg_testnet',
        'AVL___nomination_pool___goldberg_testnet',
        'KREST___native_staking___krest_network',
        'MANTA___liquid_staking___bifrost_dot'
      ]
    >;
    comparison: Attribute.Enumeration<['eq', 'gt', 'gte', 'lt', 'lte']>;
    value: Attribute.Decimal;
  };
}

export interface AppContentConditionHasMoney extends Schema.Component {
  collectionName: 'components_app_content_condition_has_monies';
  info: {
    displayName: 'condition-has-money';
    icon: 'car';
  };
  attributes: {
    has_money: Attribute.JSON &
      Attribute.CustomField<
        'plugin::multi-select.multi-select',
        ['balance', 'crowdloan', 'earning', 'nft']
      >;
  };
}

export interface AppContentConditionNft extends Schema.Component {
  collectionName: 'components_app_content_condition_nfts';
  info: {
    displayName: 'condition-nft';
    icon: 'landscape';
  };
  attributes: {
    chain: Attribute.Relation<
      'app-content.condition-nft',
      'oneToOne',
      'api::chain.chain'
    >;
    collection_id: Attribute.String;
  };
}

export interface AppContentInstructionLink extends Schema.Component {
  collectionName: 'components_app_content_instruction_links';
  info: {
    displayName: 'instruction-link';
    icon: 'question';
  };
  attributes: {
    instruction: Attribute.Relation<
      'app-content.instruction-link',
      'oneToOne',
      'api::instruction.instruction'
    >;
    confirm_label: Attribute.String;
    cancel_label: Attribute.String;
  };
}

export interface AppContentParams extends Schema.Component {
  collectionName: 'components_app_content_params';
  info: {
    displayName: 'params';
    icon: 'bulletList';
  };
  attributes: {
    property: Attribute.String;
    value: Attribute.String;
  };
}

export interface AssetInfoAssetRef extends Schema.Component {
  collectionName: 'components_asset_info_asset_refs';
  info: {
    displayName: 'AssetRef';
    description: '';
  };
  attributes: {
    type: Attribute.Enumeration<['XCM', 'SWAP']>;
    destAsset: Attribute.Relation<
      'asset-info.asset-ref',
      'oneToOne',
      'api::chain-asset.chain-asset'
    >;
    disable: Attribute.Boolean & Attribute.DefaultTo<false>;
    metadata: Attribute.JSON;
  };
}

export interface BuyTokenServiceInfo extends Schema.Component {
  collectionName: 'components_buy_token_service_infos';
  info: {
    displayName: 'ServiceInfo';
    description: '';
  };
  attributes: {
    service: Attribute.Enumeration<
      ['transak', 'banxa', 'coinbase', 'moonpay', 'onramper']
    >;
    network: Attribute.String;
    symbol: Attribute.String;
    isSuspended: Attribute.Boolean & Attribute.DefaultTo<false>;
  };
}

export interface ChainInfoBitcoinInfo extends Schema.Component {
  collectionName: 'components_chain_info_bitcoin_infos';
  info: {
    displayName: 'bitcoinInfo';
    description: '';
  };
  attributes: {
    blockExplorer: Attribute.String;
    existentialDeposit: Attribute.String;
    decimals: Attribute.Integer;
    symbol: Attribute.String;
    bitcoinNetwork: Attribute.Enumeration<
      ['mainnet', 'testnet', 'regtest', 'signet']
    >;
  };
}

export interface ChainInfoEvmInfo extends Schema.Component {
  collectionName: 'components_chain_info_evm_infos';
  info: {
    displayName: 'evmInfo';
    icon: 'command';
    description: '';
  };
  attributes: {
    evmChainId: Attribute.Integer & Attribute.Required;
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

export interface ChainInfoExtraInfo extends Schema.Component {
  collectionName: 'components_chain_info_extra_infos';
  info: {
    displayName: 'extraInfo';
    icon: 'cloud';
    description: '';
  };
  attributes: {
    subscanSlug: Attribute.String;
    chainBalanceSlug: Attribute.String;
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
    disable: Attribute.Boolean & Attribute.DefaultTo<false>;
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
      ['polkadot', 'kusama', 'westend', 'rococo', 'enjin_relaychain']
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
        ['PSP22', 'PSP34', 'GRC20', 'GRC721', 'VFT']
      >;
  };
}

export interface InstructionInstructionBlock extends Schema.Component {
  collectionName: 'components_instruction_instruction_blocks';
  info: {
    displayName: 'InstructionBlock';
    description: '';
  };
  attributes: {
    icon: Attribute.Enumeration<
      [
        'Activity',
        'AddressBook',
        'Airplane',
        'AirplaneInFlight',
        'AirplaneLanding',
        'AirplaneTakeoff',
        'AirplaneTilt',
        'Airplay',
        'Alarm',
        'Alien',
        'AlignBottom',
        'AlignBottomSimple',
        'AlignCenterHorizontal',
        'AlignCenterHorizontalSimple',
        'AlignCenterVertical',
        'AlignCenterVerticalSimple',
        'AlignLeft',
        'AlignLeftSimple',
        'AlignRight',
        'AlignRightSimple',
        'AlignTop',
        'AlignTopSimple',
        'Anchor',
        'AnchorSimple',
        'AndroidLogo',
        'AngularLogo',
        'Aperture',
        'AppStoreLogo',
        'AppWindow',
        'AppleLogo',
        'ApplePodcastsLogo',
        'Archive',
        'ArchiveBox',
        'ArchiveTray',
        'Armchair',
        'ArrowArcLeft',
        'ArrowArcRight',
        'ArrowBendDoubleUpLeft',
        'ArrowBendDoubleUpRight',
        'ArrowBendDownLeft',
        'ArrowBendDownRight',
        'ArrowBendLeftDown',
        'ArrowBendLeftUp',
        'ArrowBendRightDown',
        'ArrowBendRightUp',
        'ArrowBendUpLeft',
        'ArrowBendUpRight',
        'ArrowCircleDown',
        'ArrowCircleDownLeft',
        'ArrowCircleDownRight',
        'ArrowCircleLeft',
        'ArrowCircleRight',
        'ArrowCircleUp',
        'ArrowCircleUpLeft',
        'ArrowCircleUpRight',
        'ArrowClockwise',
        'ArrowCounterClockwise',
        'ArrowDown',
        'ArrowDownLeft',
        'ArrowDownRight',
        'ArrowElbowDownLeft',
        'ArrowElbowDownRight',
        'ArrowElbowLeft',
        'ArrowElbowLeftDown',
        'ArrowElbowLeftUp',
        'ArrowElbowRight',
        'ArrowElbowRightDown',
        'ArrowElbowRightUp',
        'ArrowElbowUpLeft',
        'ArrowElbowUpRight',
        'ArrowFatDown',
        'ArrowFatLeft',
        'ArrowFatLineDown',
        'ArrowFatLineLeft',
        'ArrowFatLineRight',
        'ArrowFatLineUp',
        'ArrowFatLinesDown',
        'ArrowFatLinesLeft',
        'ArrowFatLinesRight',
        'ArrowFatLinesUp',
        'ArrowFatRight',
        'ArrowFatUp',
        'ArrowLeft',
        'ArrowLineDown',
        'ArrowLineDownLeft',
        'ArrowLineDownRight',
        'ArrowLineLeft',
        'ArrowLineRight',
        'ArrowLineUp',
        'ArrowLineUpLeft',
        'ArrowLineUpRight',
        'ArrowRight',
        'ArrowSquareDown',
        'ArrowSquareDownLeft',
        'ArrowSquareDownRight',
        'ArrowSquareIn',
        'ArrowSquareLeft',
        'ArrowSquareOut',
        'ArrowSquareRight',
        'ArrowSquareUp',
        'ArrowSquareUpLeft',
        'ArrowSquareUpRight',
        'ArrowUDownLeft',
        'ArrowUDownRight',
        'ArrowULeftDown',
        'ArrowULeftUp',
        'ArrowURightDown',
        'ArrowURightUp',
        'ArrowUUpLeft',
        'ArrowUUpRight',
        'ArrowUp',
        'ArrowUpLeft',
        'ArrowUpRight',
        'ArrowsClockwise',
        'ArrowsCounterClockwise',
        'ArrowsDownUp',
        'ArrowsHorizontal',
        'ArrowsIn',
        'ArrowsInCardinal',
        'ArrowsInLineHorizontal',
        'ArrowsInLineVertical',
        'ArrowsInSimple',
        'ArrowsLeftRight',
        'ArrowsOut',
        'ArrowsOutCardinal',
        'ArrowsOutLineHorizontal',
        'ArrowsOutLineVertical',
        'ArrowsOutSimple',
        'ArrowsVertical',
        'Article',
        'ArticleMedium',
        'ArticleNyTimes',
        'Asterisk',
        'AsteriskSimple',
        'At',
        'Atom',
        'Baby',
        'Backpack',
        'Backspace',
        'Bag',
        'BagSimple',
        'Balloon',
        'Bandaids',
        'Bank',
        'Barbell',
        'Barcode',
        'Barricade',
        'Baseball',
        'Basketball',
        'Bathtub',
        'BatteryCharging',
        'BatteryChargingVertical',
        'BatteryEmpty',
        'BatteryFull',
        'BatteryHigh',
        'BatteryLow',
        'BatteryMedium',
        'BatteryPlus',
        'BatteryWarning',
        'BatteryWarningVertical',
        'Bed',
        'BeerBottle',
        'BehanceLogo',
        'Bell',
        'BellRinging',
        'BellSimple',
        'BellSimpleRinging',
        'BellSimpleSlash',
        'BellSimpleZ',
        'BellSlash',
        'BellZ',
        'BezierCurve',
        'Bicycle',
        'Binoculars',
        'Bird',
        'Bluetooth',
        'BluetoothConnected',
        'BluetoothSlash',
        'BluetoothX',
        'Boat',
        'Book',
        'BookBookmark',
        'BookOpen',
        'Bookmark',
        'BookmarkSimple',
        'Bookmarks',
        'BookmarksSimple',
        'Books',
        'BoundingBox',
        'BracketsAngle',
        'BracketsCurly',
        'BracketsRound',
        'BracketsSquare',
        'Brain',
        'Brandy',
        'Briefcase',
        'BriefcaseMetal',
        'Broadcast',
        'Browser',
        'Browsers',
        'Bug',
        'BugBeetle',
        'BugDroid',
        'Buildings',
        'Bus',
        'Butterfly',
        'Cactus',
        'Cake',
        'Calculator',
        'Calendar',
        'CalendarBlank',
        'CalendarCheck',
        'CalendarPlus',
        'CalendarX',
        'Camera',
        'CameraRotate',
        'CameraSlash',
        'Campfire',
        'Car',
        'CarSimple',
        'Cardholder',
        'Cards',
        'CaretCircleDoubleDown',
        'CaretCircleDoubleLeft',
        'CaretCircleDoubleRight',
        'CaretCircleDoubleUp',
        'CaretCircleDown',
        'CaretCircleLeft',
        'CaretCircleRight',
        'CaretCircleUp',
        'CaretDoubleDown',
        'CaretDoubleLeft',
        'CaretDoubleRight',
        'CaretDoubleUp',
        'CaretDown',
        'CaretLeft',
        'CaretRight',
        'CaretUp',
        'Cat',
        'CellSignalFull',
        'CellSignalHigh',
        'CellSignalLow',
        'CellSignalMedium',
        'CellSignalNone',
        'CellSignalSlash',
        'CellSignalX',
        'Chalkboard',
        'ChalkboardSimple',
        'ChalkboardTeacher',
        'ChartBar',
        'ChartBarHorizontal',
        'ChartLine',
        'ChartLineUp',
        'ChartPie',
        'ChartPieSlice',
        'Chat',
        'ChatCentered',
        'ChatCenteredDots',
        'ChatCenteredText',
        'ChatCircle',
        'ChatCircleDots',
        'ChatCircleText',
        'ChatDots',
        'ChatTeardrop',
        'ChatTeardropDots',
        'ChatTeardropText',
        'ChatText',
        'Chats',
        'ChatsCircle',
        'ChatsTeardrop',
        'Check',
        'CheckCircle',
        'CheckSquare',
        'CheckSquareOffset',
        'Checks',
        'Circle',
        'CircleDashed',
        'CircleHalf',
        'CircleHalfTilt',
        'CircleNotch',
        'CircleWavy',
        'CircleWavyCheck',
        'CircleWavyQuestion',
        'CircleWavyWarning',
        'CirclesFour',
        'CirclesThree',
        'CirclesThreePlus',
        'Clipboard',
        'ClipboardText',
        'Clock',
        'ClockAfternoon',
        'ClockClockwise',
        'ClockCounterClockwise',
        'ClosedCaptioning',
        'Cloud',
        'CloudArrowDown',
        'CloudArrowUp',
        'CloudCheck',
        'CloudFog',
        'CloudLightning',
        'CloudMoon',
        'CloudRain',
        'CloudSlash',
        'CloudSnow',
        'CloudSun',
        'Club',
        'CoatHanger',
        'Code',
        'CodeSimple',
        'CodepenLogo',
        'CodesandboxLogo',
        'Coffee',
        'Coin',
        'CoinVertical',
        'Coins',
        'Columns',
        'Command',
        'Compass',
        'ComputerTower',
        'Confetti',
        'Cookie',
        'CookingPot',
        'Copy',
        'CopySimple',
        'Copyleft',
        'Copyright',
        'CornersIn',
        'CornersOut',
        'Cpu',
        'CreditCard',
        'Crop',
        'Crosshair',
        'CrosshairSimple',
        'Crown',
        'CrownSimple',
        'Cube',
        'CurrencyBtc',
        'CurrencyCircleDollar',
        'CurrencyCny',
        'CurrencyDollar',
        'CurrencyDollarSimple',
        'CurrencyEth',
        'CurrencyEur',
        'CurrencyGbp',
        'CurrencyInr',
        'CurrencyJpy',
        'CurrencyKrw',
        'CurrencyKzt',
        'CurrencyNgn',
        'CurrencyRub',
        'Cursor',
        'CursorText',
        'Cylinder',
        'Database',
        'Desktop',
        'DesktopTower',
        'Detective',
        'DeviceMobile',
        'DeviceMobileCamera',
        'DeviceMobileSpeaker',
        'DeviceTablet',
        'DeviceTabletCamera',
        'DeviceTabletSpeaker',
        'Diamond',
        'DiamondsFour',
        'DiceFive',
        'DiceFour',
        'DiceOne',
        'DiceSix',
        'DiceThree',
        'DiceTwo',
        'Disc',
        'DiscordLogo',
        'Divide',
        'Dog',
        'Door',
        'DotsNine',
        'DotsSix',
        'DotsSixVertical',
        'DotsThree',
        'DotsThreeCircle',
        'DotsThreeCircleVertical',
        'DotsThreeOutline',
        'DotsThreeOutlineVertical',
        'DotsThreeVertical',
        'Download',
        'DownloadSimple',
        'DribbbleLogo',
        'Drop',
        'DropHalf',
        'DropHalfBottom',
        'Ear',
        'EarSlash',
        'Egg',
        'EggCrack',
        'Eject',
        'EjectSimple',
        'Envelope',
        'EnvelopeOpen',
        'EnvelopeSimple',
        'EnvelopeSimpleOpen',
        'Equalizer',
        'Equals',
        'Eraser',
        'Exam',
        'Export',
        'Eye',
        'EyeClosed',
        'EyeSlash',
        'Eyedropper',
        'EyedropperSample',
        'Eyeglasses',
        'FaceMask',
        'FacebookLogo',
        'Factory',
        'Faders',
        'FadersHorizontal',
        'FastForward',
        'FastForwardCircle',
        'FigmaLogo',
        'File',
        'FileArrowDown',
        'FileArrowUp',
        'FileAudio',
        'FileCloud',
        'FileCode',
        'FileCss',
        'FileCsv',
        'FileDoc',
        'FileDotted',
        'FileHtml',
        'FileImage',
        'FileJpg',
        'FileJs',
        'FileJsx',
        'FileLock',
        'FileMinus',
        'FilePdf',
        'FilePlus',
        'FilePng',
        'FilePpt',
        'FileRs',
        'FileSearch',
        'FileText',
        'FileTs',
        'FileTsx',
        'FileVideo',
        'FileVue',
        'FileX',
        'FileXls',
        'FileZip',
        'Files',
        'FilmScript',
        'FilmSlate',
        'FilmStrip',
        'Fingerprint',
        'FingerprintSimple',
        'FinnTheHuman',
        'Fire',
        'FireSimple',
        'FirstAid',
        'FirstAidKit',
        'Fish',
        'FishSimple',
        'Flag',
        'FlagBanner',
        'FlagCheckered',
        'Flame',
        'Flashlight',
        'Flask',
        'FloppyDisk',
        'FloppyDiskBack',
        'FlowArrow',
        'Flower',
        'FlowerLotus',
        'FlyingSaucer',
        'Folder',
        'FolderDotted',
        'FolderLock',
        'FolderMinus',
        'FolderNotch',
        'FolderNotchMinus',
        'FolderNotchOpen',
        'FolderNotchPlus',
        'FolderOpen',
        'FolderPlus',
        'FolderSimple',
        'FolderSimpleDotted',
        'FolderSimpleLock',
        'FolderSimpleMinus',
        'FolderSimplePlus',
        'FolderSimpleStar',
        'FolderSimpleUser',
        'FolderStar',
        'FolderUser',
        'Folders',
        'Football',
        'ForkKnife',
        'FrameCorners',
        'FramerLogo',
        'Function',
        'Funnel',
        'FunnelSimple',
        'GameController',
        'GasPump',
        'Gauge',
        'Gear',
        'GearSix',
        'GenderFemale',
        'GenderIntersex',
        'GenderMale',
        'GenderNeuter',
        'GenderNonbinary',
        'GenderTransgender',
        'Ghost',
        'Gif',
        'Gift',
        'GitBranch',
        'GitCommit',
        'GitDiff',
        'GitFork',
        'GitMerge',
        'GitPullRequest',
        'GithubLogo',
        'GitlabLogo',
        'GitlabLogoSimple',
        'Globe',
        'GlobeHemisphereEast',
        'GlobeHemisphereWest',
        'GlobeSimple',
        'GlobeStand',
        'GoogleChromeLogo',
        'GoogleLogo',
        'GooglePhotosLogo',
        'GooglePlayLogo',
        'GooglePodcastsLogo',
        'Gradient',
        'GraduationCap',
        'Graph',
        'GridFour',
        'Hamburger',
        'Hand',
        'HandEye',
        'HandFist',
        'HandGrabbing',
        'HandPalm',
        'HandPointing',
        'HandSoap',
        'HandWaving',
        'Handbag',
        'HandbagSimple',
        'HandsClapping',
        'Handshake',
        'HardDrive',
        'HardDrives',
        'Hash',
        'HashStraight',
        'Headlights',
        'Headphones',
        'Headset',
        'Heart',
        'HeartBreak',
        'HeartStraight',
        'HeartStraightBreak',
        'Heartbeat',
        'Hexagon',
        'HighlighterCircle',
        'Horse',
        'Hourglass',
        'HourglassHigh',
        'HourglassLow',
        'HourglassMedium',
        'HourglassSimple',
        'HourglassSimpleHigh',
        'HourglassSimpleLow',
        'HourglassSimpleMedium',
        'House',
        'HouseLine',
        'HouseSimple',
        'Icon',
        'IconContext',
        'IconProps',
        'IconWeight',
        'IdentificationBadge',
        'IdentificationCard',
        'Image',
        'ImageSquare',
        'Infinity',
        'Info',
        'InstagramLogo',
        'Intersect',
        'Jeep',
        'Kanban',
        'Key',
        'KeyReturn',
        'Keyboard',
        'Keyhole',
        'Knife',
        'Ladder',
        'LadderSimple',
        'Lamp',
        'Laptop',
        'Layout',
        'Leaf',
        'Lifebuoy',
        'Lightbulb',
        'LightbulbFilament',
        'Lightning',
        'LightningSlash',
        'LineSegment',
        'LineSegments',
        'Link',
        'LinkBreak',
        'LinkSimple',
        'LinkSimpleBreak',
        'LinkSimpleHorizontal',
        'LinkSimpleHorizontalBreak',
        'LinkedinLogo',
        'LinuxLogo',
        'List',
        'ListBullets',
        'ListChecks',
        'ListDashes',
        'ListNumbers',
        'ListPlus',
        'Lock',
        'LockKey',
        'LockKeyOpen',
        'LockLaminated',
        'LockLaminatedOpen',
        'LockOpen',
        'LockSimple',
        'LockSimpleOpen',
        'MagicWand',
        'Magnet',
        'MagnetStraight',
        'MagnifyingGlass',
        'MagnifyingGlassMinus',
        'MagnifyingGlassPlus',
        'MapPin',
        'MapPinLine',
        'MapTrifold',
        'MarkerCircle',
        'Martini',
        'MaskHappy',
        'MaskSad',
        'MathOperations',
        'Medal',
        'MediumLogo',
        'Megaphone',
        'MegaphoneSimple',
        'MessengerLogo',
        'Microphone',
        'MicrophoneSlash',
        'MicrophoneStage',
        'MicrosoftExcelLogo',
        'MicrosoftPowerpointLogo',
        'MicrosoftTeamsLogo',
        'MicrosoftWordLogo',
        'Minus',
        'MinusCircle',
        'Money',
        'Monitor',
        'MonitorPlay',
        'Moon',
        'MoonStars',
        'Mountains',
        'Mouse',
        'MouseSimple',
        'MusicNote',
        'MusicNoteSimple',
        'MusicNotes',
        'MusicNotesPlus',
        'MusicNotesSimple',
        'NavigationArrow',
        'Needle',
        'Newspaper',
        'NewspaperClipping',
        'Note',
        'NoteBlank',
        'NotePencil',
        'Notebook',
        'Notepad',
        'Notification',
        'NumberCircleEight',
        'NumberCircleFive',
        'NumberCircleFour',
        'NumberCircleNine',
        'NumberCircleOne',
        'NumberCircleSeven',
        'NumberCircleSix',
        'NumberCircleThree',
        'NumberCircleTwo',
        'NumberCircleZero',
        'NumberEight',
        'NumberFive',
        'NumberFour',
        'NumberNine',
        'NumberOne',
        'NumberSeven',
        'NumberSix',
        'NumberSquareEight',
        'NumberSquareFive',
        'NumberSquareFour',
        'NumberSquareNine',
        'NumberSquareOne',
        'NumberSquareSeven',
        'NumberSquareSix',
        'NumberSquareThree',
        'NumberSquareTwo',
        'NumberSquareZero',
        'NumberThree',
        'NumberTwo',
        'NumberZero',
        'Nut',
        'NyTimesLogo',
        'Octagon',
        'Option',
        'Package',
        'PaintBrush',
        'PaintBrushBroad',
        'PaintBrushHousehold',
        'PaintBucket',
        'PaintRoller',
        'Palette',
        'PaperPlane',
        'PaperPlaneRight',
        'PaperPlaneTilt',
        'Paperclip',
        'PaperclipHorizontal',
        'Parachute',
        'Password',
        'Path',
        'Pause',
        'PauseCircle',
        'PawPrint',
        'Peace',
        'Pen',
        'PenNib',
        'PenNibStraight',
        'Pencil',
        'PencilCircle',
        'PencilLine',
        'PencilSimple',
        'PencilSimpleLine',
        'Percent',
        'Person',
        'PersonSimple',
        'PersonSimpleRun',
        'PersonSimpleWalk',
        'Perspective',
        'Phone',
        'PhoneCall',
        'PhoneDisconnect',
        'PhoneIncoming',
        'PhoneOutgoing',
        'PhoneSlash',
        'PhoneX',
        'PhosphorLogo',
        'PianoKeys',
        'PictureInPicture',
        'Pill',
        'PinterestLogo',
        'Pinwheel',
        'Pizza',
        'Placeholder',
        'Planet',
        'Play',
        'PlayCircle',
        'Playlist',
        'Plug',
        'Plugs',
        'PlugsConnected',
        'Plus',
        'PlusCircle',
        'PlusMinus',
        'PokerChip',
        'PoliceCar',
        'Polygon',
        'Popcorn',
        'Power',
        'Prescription',
        'Presentation',
        'PresentationChart',
        'Printer',
        'Prohibit',
        'ProhibitInset',
        'ProjectorScreen',
        'ProjectorScreenChart',
        'PushPin',
        'PushPinSimple',
        'PushPinSimpleSlash',
        'PushPinSlash',
        'PuzzlePiece',
        'QrCode',
        'Question',
        'Queue',
        'Quotes',
        'Radical',
        'Radio',
        'RadioButton',
        'Rainbow',
        'RainbowCloud',
        'Receipt',
        'Record',
        'Rectangle',
        'Recycle',
        'RedditLogo',
        'Repeat',
        'RepeatOnce',
        'Rewind',
        'RewindCircle',
        'Robot',
        'Rocket',
        'RocketLaunch',
        'Rows',
        'Rss',
        'RssSimple',
        'Rug',
        'Ruler',
        'Scales',
        'Scan',
        'Scissors',
        'Screencast',
        'ScribbleLoop',
        'Scroll',
        'Selection',
        'SelectionAll',
        'SelectionBackground',
        'SelectionForeground',
        'SelectionInverse',
        'SelectionPlus',
        'SelectionSlash',
        'Share',
        'ShareNetwork',
        'Shield',
        'ShieldCheck',
        'ShieldCheckered',
        'ShieldChevron',
        'ShieldPlus',
        'ShieldSlash',
        'ShieldStar',
        'ShieldWarning',
        'ShoppingBag',
        'ShoppingBagOpen',
        'ShoppingCart',
        'ShoppingCartSimple',
        'Shower',
        'Shuffle',
        'ShuffleAngular',
        'ShuffleSimple',
        'Sidebar',
        'SidebarSimple',
        'SignIn',
        'SignOut',
        'Signpost',
        'SimCard',
        'SketchLogo',
        'SkipBack',
        'SkipBackCircle',
        'SkipForward',
        'SkipForwardCircle',
        'Skull',
        'SlackLogo',
        'Sliders',
        'SlidersHorizontal',
        'Smiley',
        'SmileyBlank',
        'SmileyMeh',
        'SmileyNervous',
        'SmileySad',
        'SmileySticker',
        'SmileyWink',
        'SmileyXEyes',
        'SnapchatLogo',
        'Snowflake',
        'SoccerBall',
        'SortAscending',
        'SortDescending',
        'Spade',
        'Sparkle',
        'SpeakerHigh',
        'SpeakerLow',
        'SpeakerNone',
        'SpeakerSimpleHigh',
        'SpeakerSimpleLow',
        'SpeakerSimpleNone',
        'SpeakerSimpleSlash',
        'SpeakerSimpleX',
        'SpeakerSlash',
        'SpeakerX',
        'Spinner',
        'SpinnerGap',
        'Spiral',
        'SpotifyLogo',
        'Square',
        'SquareHalf',
        'SquareHalfBottom',
        'SquareLogo',
        'SquaresFour',
        'Stack',
        'StackOverflowLogo',
        'StackSimple',
        'Stamp',
        'Star',
        'StarFour',
        'StarHalf',
        'Sticker',
        'Stop',
        'StopCircle',
        'Storefront',
        'Strategy',
        'StripeLogo',
        'Student',
        'Suitcase',
        'SuitcaseSimple',
        'Sun',
        'SunDim',
        'SunHorizon',
        'Sunglasses',
        'Swap',
        'Swatches',
        'Sword',
        'Syringe',
        'TShirt',
        'Table',
        'Tabs',
        'Tag',
        'TagChevron',
        'TagSimple',
        'Target',
        'Taxi',
        'TelegramLogo',
        'Television',
        'TelevisionSimple',
        'TennisBall',
        'Terminal',
        'TerminalWindow',
        'TestTube',
        'TextAa',
        'TextAlignCenter',
        'TextAlignJustify',
        'TextAlignLeft',
        'TextAlignRight',
        'TextBolder',
        'TextH',
        'TextHFive',
        'TextHFour',
        'TextHOne',
        'TextHSix',
        'TextHThree',
        'TextHTwo',
        'TextIndent',
        'TextItalic',
        'TextOutdent',
        'TextStrikethrough',
        'TextT',
        'TextUnderline',
        'Textbox',
        'Thermometer',
        'ThermometerCold',
        'ThermometerHot',
        'ThermometerSimple',
        'ThumbsDown',
        'ThumbsUp',
        'Ticket',
        'TiktokLogo',
        'Timer',
        'ToggleLeft',
        'ToggleRight',
        'Toilet',
        'ToiletPaper',
        'Tote',
        'ToteSimple',
        'TrademarkRegistered',
        'TrafficCone',
        'TrafficSign',
        'TrafficSignal',
        'Train',
        'TrainRegional',
        'TrainSimple',
        'Translate',
        'Trash',
        'TrashSimple',
        'Tray',
        'Tree',
        'TreeEvergreen',
        'TreeStructure',
        'TrendDown',
        'TrendUp',
        'Triangle',
        'Trophy',
        'Truck',
        'TwitchLogo',
        'TwitterLogo',
        'Umbrella',
        'UmbrellaSimple',
        'Upload',
        'UploadSimple',
        'User',
        'UserCircle',
        'UserCircleGear',
        'UserCircleMinus',
        'UserCirclePlus',
        'UserFocus',
        'UserGear',
        'UserList',
        'UserMinus',
        'UserPlus',
        'UserRectangle',
        'UserSquare',
        'UserSwitch',
        'Users',
        'UsersFour',
        'UsersThree',
        'Vault',
        'Vibrate',
        'VideoCamera',
        'VideoCameraSlash',
        'Vignette',
        'Voicemail',
        'Volleyball',
        'Wall',
        'Wallet',
        'Warning',
        'WarningCircle',
        'WarningOctagon',
        'Watch',
        'WaveSawtooth',
        'WaveSine',
        'WaveSquare',
        'WaveTriangle',
        'Waves',
        'Webcam',
        'WhatsappLogo',
        'Wheelchair',
        'WifiHigh',
        'WifiLow',
        'WifiMedium',
        'WifiNone',
        'WifiSlash',
        'WifiX',
        'Wind',
        'WindowsLogo',
        'Wine',
        'Wrench',
        'X',
        'XCircle',
        'XSquare',
        'YinYang',
        'YoutubeLogo'
      ]
    >;
    icon_color: Attribute.String &
      Attribute.CustomField<'plugin::color-picker.color'>;
    title: Attribute.RichText;
    description: Attribute.RichText;
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
    media: Attribute.Media<'videos' | 'images'> & Attribute.Required;
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
          'token-details',
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

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'app-content.ac-action': AppContentAcAction;
      'app-content.ac-button': AppContentAcButton;
      'app-content.ac-info': AppContentAcInfo;
      'app-content.condition-balance': AppContentConditionBalance;
      'app-content.condition-crowdloan': AppContentConditionCrowdloan;
      'app-content.condition-earning': AppContentConditionEarning;
      'app-content.condition-has-money': AppContentConditionHasMoney;
      'app-content.condition-nft': AppContentConditionNft;
      'app-content.instruction-link': AppContentInstructionLink;
      'app-content.params': AppContentParams;
      'asset-info.asset-ref': AssetInfoAssetRef;
      'buy-token.service-info': BuyTokenServiceInfo;
      'chain-info.bitcoin-info': ChainInfoBitcoinInfo;
      'chain-info.evm-info': ChainInfoEvmInfo;
      'chain-info.extra-info': ChainInfoExtraInfo;
      'chain-info.provider': ChainInfoProvider;
      'chain-info.subtrate-info': ChainInfoSubtrateInfo;
      'instruction.instruction-block': InstructionInstructionBlock;
      'marketing-item.banner': MarketingItemBanner;
      'marketing-item.button': MarketingItemButton;
      'marketing-item.notification': MarketingItemNotification;
    }
  }
}
