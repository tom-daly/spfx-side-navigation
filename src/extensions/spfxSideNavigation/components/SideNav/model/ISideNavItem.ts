export default interface ISideNavItem {
    title: string;
    url?: string;
    image?: string;
    svg?: string;
    openInNewWindow?: boolean;
    subNavItems?: ISideNavItem[];
}