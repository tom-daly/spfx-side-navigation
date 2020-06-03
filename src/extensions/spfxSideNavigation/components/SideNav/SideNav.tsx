import * as React from "react";
import { IconButton } from "office-ui-fabric-react/lib/Button";
import SideNavNode from "./SideNavNode";
import ISideNavItem from "./model/ISideNavItem";
import ISideNavProvider from "./provider/ISideNavProvider";
import SideNavProvider from "./provider/SideNavProvider";
import ISideNavProps from "./ISideNavProps";
import ISideNavState from "./ISideNavState";

export default class SideNav extends React.Component<
  ISideNavProps,
  ISideNavState
> {
  private sideNavProvider: ISideNavProvider;

  constructor(props: ISideNavProps) {
    super(props);
    this.state = {
      siteNavItems: [],
      isOpened: false
    };
    window.addEventListener("click", this.handleOutsideClick, true);
  }

  public componentWillMount(): void {
    this.sideNavProvider = new SideNavProvider();
  }

  public componentDidMount(): void {
    this.sideNavProvider
      .getSideNav()
      .then((result: ISideNavItem[]): void => {
        this.setState({
          siteNavItems: result
        });
      })
      .catch((error) => {
        // console.log(error);
      });
  }

  public render(): JSX.Element {
    const siteMenuClass: string = this.state.isOpened
      ? "site-menu opened"
      : "site-menu";
    const toggleIconName: string = this.state.isOpened
      ? "DoubleChevronLeft8"
      : "DoubleChevronRight8";
    return (
      <div
        className={`site-menu-panel ms-slideRightIn40 visible-i`}
        style={{
          visibility: "hidden"
        }} /* set to hidden then onces css loads it will be visible */
      >
        <div className={siteMenuClass}>
          <div className="menu-toggle">
            {
              <IconButton
                className="site-menu-icon"
                checked={false}
                iconProps={{
                  iconName: toggleIconName
                }}
                title="Toggle Menu"
                ariaLabel="Toggle Menu"
                onClick={this.toggleNav}
              />
            }
          </div>

          {this.state.siteNavItems.length > 0 &&
            this.state.siteNavItems.map(this.renderSideNavNodes)}
        </div>
      </div>
    );
  }

  private handleOutsideClick = (event: any) => {
    if (!this.state.isOpened) { return; } // if site nav is already closed, abort

    let foundSideNavPanel: boolean = false;
    for (let i: number = 0; i < event.path.length; i++) {
      const node: HTMLElement = event.path[i];
      if (!node.className) { continue; } // skip if no class name
      if (node.className.toLowerCase().indexOf("site-menu-panel") !== -1) {
        foundSideNavPanel = true;
        break;
      }
    }

    if (!foundSideNavPanel) {
      this.toggleNav(); // if no site menu panel found, close the site menu
    }
  };

  private toggleNav = (): void => {
    this.setState((state, props) => ({
      isOpened: !state.isOpened
    }));
  };

  private renderSideNavNodes = (
    siteNavItem: ISideNavItem,
    index: number
  ): JSX.Element => {
    return (
      <SideNavNode
        key={index}
        siteNavItem={siteNavItem}
        navIsOpened={this.state.isOpened}
      />
    );
  };
}
