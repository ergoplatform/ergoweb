import dynamic from 'next/dynamic';

/**
 * Icons Component map.
 *
 * @param {string} name Icon Name.
 * @returns {*}
 */
export const getIconComponentByName = (name: string, props?: any) => {
  const ComponentsMap: { [key: string]: any } = {
    CheckDark: dynamic(() => import('../components/icons/CheckDark'), {
      ssr: false,
    }),
    CheckDarkHighlited: dynamic(() => import('../components/icons/CheckDarkHighlited'), {
      ssr: false,
    }),
    CheckGreen: dynamic(() => import('../components/icons/CheckGreen'), {
      ssr: false,
    }),
    CheckOrange: dynamic(() => import('../components/icons/CheckOrange'), {
      ssr: false,
    }),
    CheckOrangeHighlighted: dynamic(() => import('../components/icons/CheckOrangeHighlighted'), {
      ssr: false,
    }),
    Discord: dynamic(() => import('../components/icons/Discord'), {
      ssr: false,
    }),
    Wiki: dynamic(() => import('../components/icons/Wiki'), {
      ssr: false,
    }),
    ErgoNode: dynamic(() => import('../components/icons/ErgoNode'), {
      ssr: false,
    }),
    Github: dynamic(() => import('../components/icons/Github'), {
      ssr: false,
    }),
    Highlight: dynamic(() => import('../components/icons/Highlight'), {
      ssr: false,
    }),
    Ledger: dynamic(() => import('../components/icons/Ledger'), {
      ssr: false,
    }),
    Linkedin: dynamic(() => import('../components/icons/Linkedin'), {
      ssr: false,
    }),
    Logo: dynamic(() => import('../components/icons/Logo'), {
      ssr: false,
    }),
    LogoWhite: dynamic(() => import('../components/icons/LogoWhite'), {
      ssr: false,
    }),
    LogoWithText: dynamic(() => import('../components/icons/LogoWithText'), {
      ssr: false,
    }),
    MenuClose: dynamic(() => import('../components/icons/MenuClose'), {
      ssr: false,
    }),
    MenuOpen: dynamic(() => import('../components/icons/MenuOpen'), {
      ssr: false,
    }),
    Power: dynamic(() => import('../components/icons/Power'), {
      ssr: false,
    }),
    Reddit: dynamic(() => import('../components/icons/Reddit'), {
      ssr: false,
    }),
    Sync: dynamic(() => import('../components/icons/Sync'), {
      ssr: false,
    }),
    Telegram: dynamic(() => import('../components/icons/Telegram'), {
      ssr: false,
    }),
    ThemeDarkBig: dynamic(() => import('../components/icons/ThemeDarkBig'), {
      ssr: false,
    }),
    ThemeDarkSmall: dynamic(() => import('../components/icons/ThemeDarkSmall'), {
      ssr: false,
    }),
    ThemeLightBig: dynamic(() => import('../components/icons/ThemeLightBig'), {
      ssr: false,
    }),
    ThemeLightSmall: dynamic(() => import('../components/icons/ThemeLightSmall'), {
      ssr: false,
    }),
    Wechat: dynamic(() => import('../components/icons/Wechat'), {
      ssr: false,
    }),
    X: dynamic(() => import('../components/icons/X'), {
      ssr: false,
    }),
    XHightlighted: dynamic(() => import('../components/icons/XHightlighted'), {
      ssr: false,
    }),
    XWhite: dynamic(() => import('../components/icons/XWhite'), {
      ssr: false,
    }),
    XWhiteHighlighted: dynamic(() => import('../components/icons/XWhiteHighlighted'), {
      ssr: false,
    }),
    Youtube: dynamic(() => import('../components/icons/Youtube'), {
      ssr: false,
    }),
    ArrowRightBlack: dynamic(() => import('../components/icons/ArrowRightBlack'), {
      ssr: false,
    }),
    ArrowRightOrange: dynamic(() => import('../components/icons/ArrowRightOrange'), {
      ssr: false,
    }),
    Sigmaverse: dynamic(() => import('../components/icons/Sigmaverse'), {
      ssr: false,
    }),
    Line: dynamic(() => import('../components/icons/Line'), {
      ssr: false,
    }),
    LanguageSelector: dynamic(() => import('../components/icons/LanguageSelector'), {
      ssr: false,
    }),
    LanguageSelectorWhite: dynamic(() => import('../components/icons/LanguageSelectorWhite'), {
      ssr: false,
    }),
    Highlights1: dynamic(() => import('../components/icons/Highlights1'), {
      ssr: false,
    }),
    Highlights2: dynamic(() => import('../components/icons/Highlights2'), {
      ssr: false,
    }),
    Highlights3: dynamic(() => import('../components/icons/Highlights3'), {
      ssr: false,
    }),
    Highlights1big: dynamic(() => import('../components/icons/Highlights1big'), {
      ssr: false,
    }),
    Highlights2big: dynamic(() => import('../components/icons/Highlights2big'), {
      ssr: false,
    }),
    Highlights3big: dynamic(() => import('../components/icons/Highlights3big'), {
      ssr: false,
    }),
    Sigmanauts: dynamic(() => import('../components/icons/Sigmanauts'), {
      ssr: false,
    }),
    UsingErgBuyIt: dynamic(() => import('../components/icons/UsingErgBuyIt'), {
      ssr: false,
    }),
    UsingErgBuyItLight: dynamic(() => import('../components/icons/UsingErgBuyItLight'), {
      ssr: false,
    }),
    UsingErgMineIt: dynamic(() => import('../components/icons/UsingErgMineIt'), {
      ssr: false,
    }),
    UsingErgMineItLight: dynamic(() => import('../components/icons/UsingErgMineItLight'), {
      ssr: false,
    }),
    UsingErgStoreIt: dynamic(() => import('../components/icons/UsingErgStoreIt'), {
      ssr: false,
    }),
    UsingErgStoreItLight: dynamic(() => import('../components/icons/UsingErgStoreItLight'), {
      ssr: false,
    }),
    UsingErgUseIt: dynamic(() => import('../components/icons/UsingErgUseIt'), {
      ssr: false,
    }),
    UsingErgUseItLight: dynamic(() => import('../components/icons/UsingErgUseItLight'), {
      ssr: false,
    }),
    RoadmapPlanned: dynamic(() => import('../components/icons/RoadmapPlanned'), {
      ssr: false,
    }),
    RoadmapInProgress: dynamic(() => import('../components/icons/RoadmapInProgress'), {
      ssr: false,
    }),
    RoadmapCompleted: dynamic(() => import('../components/icons/RoadmapCompleted'), {
      ssr: false,
    }),
    ErgoFoundationIcon: dynamic(() => import('../components/icons/ErgoFoundationIcon'), {
      ssr: false,
    }),
    ErgoFoundationIconLight: dynamic(() => import('../components/icons/ErgoFoundationIconLight'), {
      ssr: false,
    }),
    Discourse: dynamic(() => import('../components/icons/Discourse'), {
      ssr: false,
    }),
    UniqueErgo1: dynamic(() => import('../components/icons/UniqueErgo1'), {
      ssr: false,
    }),
    UniqueErgo2: dynamic(() => import('../components/icons/UniqueErgo2'), {
      ssr: false,
    }),
    UniqueErgo3: dynamic(() => import('../components/icons/UniqueErgo3'), {
      ssr: false,
    }),
    UniqueErgo4: dynamic(() => import('../components/icons/UniqueErgo4'), {
      ssr: false,
    }),
    ErgoWiki: dynamic(() => import('../components/icons/ErgoWiki'), {
      ssr: false,
    }),
    Coingecko: dynamic(() => import('../components/icons/Coingecko'), {
      ssr: false,
    }),
  };

  if (name in ComponentsMap) {
    const IconComponent = ComponentsMap[name];
    return <IconComponent {...props} />;
  } else {
    return null;
  }
};
