export default interface ISPSideNavItem {
  Title: string;
  SideNavIconSvg?: string;
  SideNavUrl?: string;
  SideNavOpenInNewWindow?: boolean;
  SideNavParent?: {
    Title: string;
  };
}
