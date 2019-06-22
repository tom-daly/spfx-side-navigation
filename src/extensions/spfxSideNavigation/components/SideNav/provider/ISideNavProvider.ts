import ISideNavItem from "../model/ISideNavItem";

export default interface ISideNavProvider {
    getSideMenu(): Promise<ISideNavItem[]>;
}
