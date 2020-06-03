import ISideNavItem from "../SideNav/model/ISideNavItem";

export default interface ISideNavProvider {
    getSideNav(): Promise<ISideNavItem[]>;
}
