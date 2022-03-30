import * as SvgIconsComponent from "../components/icons";

/**
 * Icons Component map.
 *
 * @param {string} name Icon Name.
 * @returns {*}
 */
export const getIconComponentByName = (name: string, props?: any) => {
  const ComponentsMap: any = {
    CheckDark: SvgIconsComponent.CheckDark,
    CheckDarkHighlited: SvgIconsComponent.CheckDarkHighlited,
    CheckGreen: SvgIconsComponent.CheckGreen,
    CheckOrange: SvgIconsComponent.CheckOrange,
    CheckOrangeHighlighted: SvgIconsComponent.CheckOrangeHighlighted,
    Discord: SvgIconsComponent.Discord,
    Ergonaut: SvgIconsComponent.Ergonaut,
    ErgoNode: SvgIconsComponent.ErgoNode,
    Github: SvgIconsComponent.Github,
    Highlight: SvgIconsComponent.Highlight,
    Ledger: SvgIconsComponent.Ledger,
    Linkedin: SvgIconsComponent.Linkedin,
    Logo: SvgIconsComponent.Logo,
    LogoWhite: SvgIconsComponent.LogoWhite,
    LogoWithText: SvgIconsComponent.LogoWithText,
    MenuClose: SvgIconsComponent.MenuClose,
    MenuOpen: SvgIconsComponent.MenuOpen,
    Power: SvgIconsComponent.Power,
    Reddit: SvgIconsComponent.Reddit,
    Sync: SvgIconsComponent.Sync,
    Telegram: SvgIconsComponent.Telegram,
    ThemeDarkBig: SvgIconsComponent.ThemeDarkBig,
    ThemeDarkSmall: SvgIconsComponent.ThemeDarkSmall,
    ThemeLightBig: SvgIconsComponent.ThemeLightBig,
    ThemeLightSmall: SvgIconsComponent.ThemeLightSmall,
    Twitter: SvgIconsComponent.Twitter,
    Wechat: SvgIconsComponent.Wechat,
    X: SvgIconsComponent.X,
    XHightlighted: SvgIconsComponent.XHightlighted,
    XWhite: SvgIconsComponent.XWhite,
    XWhiteHighlighted: SvgIconsComponent.XWhiteHighlighted,
    Youtube: SvgIconsComponent.Youtube,
    ArrowRightBlack: SvgIconsComponent.ArrowRightBlack,
    ArrowRightOrange: SvgIconsComponent.ArrowRightOrange,
    Sigmaverse: SvgIconsComponent.Sigmaverse,
    Line: SvgIconsComponent.Line,
    LanguageSelector: SvgIconsComponent.LanguageSelector,
    LanguageSelectorWhite: SvgIconsComponent.LanguageSelectorWhite,
    Highlights1: SvgIconsComponent.Highlights1,
    Highlights2: SvgIconsComponent.Highlights2,
    Highlights3: SvgIconsComponent.Highlights3,
    Highlights1big: SvgIconsComponent.Highlights1big,
    Highlights2big: SvgIconsComponent.Highlights2big,
    Highlights3big: SvgIconsComponent.Highlights3big,
    Sigmanauts: SvgIconsComponent.Sigmanauts,
    UsingErgBuyIt: SvgIconsComponent.UsingErgBuyIt,
    UsingErgBuyItLight: SvgIconsComponent.UsingErgBuyItLight,
    UsingErgMineIt: SvgIconsComponent.UsingErgMineIt,
    UsingErgMineItLight: SvgIconsComponent.UsingErgMineItLight,
    UsingErgStoreIt: SvgIconsComponent.UsingErgStoreIt,
    UsingErgStoreItLight: SvgIconsComponent.UsingErgStoreItLight,
    RoadmapPlanned: SvgIconsComponent.RoadmapPlanned,
    RoadmapInProgress: SvgIconsComponent.RoadmapInProgress,
    RoadmapCompleted: SvgIconsComponent.RoadmapCompleted,
    ErgoFoundationIcon: SvgIconsComponent.ErgoFoundationIcon,
    ErgoFoundationIconLight: SvgIconsComponent.ErgoFoundationIconLight,
    Discourse: SvgIconsComponent.Discourse,
  };

  if (name in ComponentsMap) {
    const IconComponent = ComponentsMap[name];
    return <IconComponent {...props} />;
  } else {
    return null;
  }
};
