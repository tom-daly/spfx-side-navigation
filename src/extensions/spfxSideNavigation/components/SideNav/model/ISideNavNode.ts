import ISidenavItem from "./ISideNavItem";

export default interface ISideNavNode {
    key: number;
    siteNavItem: ISidenavItem;
    navIsOpened: boolean;
}