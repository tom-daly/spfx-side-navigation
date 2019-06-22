import * as React from "react";
import * as ReactDOM from "react-dom";
import ISideNavNodeProps from "./model/ISideNavNodeProps";
import ISideNavNodeState from "./model/ISideNavNodeState";
import ISideNavItem from "./model/ISideNavItem";
import { IconButton } from "office-ui-fabric-react/lib/Button";
require("./site-menu.scss");

export default class SideNavNode extends React.Component<
  ISideNavNodeProps,
  ISideNavNodeState
> {
  constructor(props: ISideNavNodeProps) {
    super(props);
    this.state = {
      isOpened: false
    };
    this.nodeClick = this.nodeClick.bind(this);
  }

  private check(): void {
    let node: Element = ReactDOM.findDOMNode(this.refs.children) as Element;
    if (!node) {
      return;
    }

    let rect: ClientRect = node.getBoundingClientRect();
    let space: number = window.innerHeight - (rect.top + rect.height);
    if (space < 0) {
      // it's off screen
      let heightStyle: string =
        "height: " + String(node.clientHeight + space) + "px;";
      let overflowStyle: string = "overflow-y: auto; -webkit-overflow-scrolling: touch;";
      node.setAttribute("style", heightStyle + overflowStyle);
    } else {
      node.setAttribute("style", "height: auto;");
    }
  }

  private nodeClick(e: React.MouseEvent<HTMLDivElement>): void {
    if (!this.props.siteNavItem) {
      return;
    }
    if (this.props.siteNavItem.url) {
      /* if has a url navigate to that address */
      if (this.props.siteNavItem.openInNewWindow) {
        window.open(this.props.siteNavItem.url, "_blank");
      } else {
        window.location.href = this.props.siteNavItem.url;
      }
      return;
    }
    if (!this.props.siteNavItem.url) {
      /* if no url then change the state */

      if (this.props.navIsOpened) {
        /* only change state if the navigation is opened */
        this.setState(
          {
            isOpened: !this.state.isOpened
          },
          () => this.check()
        );
      }
      return;
    }
  }

  private renderSubNavItems = (
    siteNavItem: ISideNavItem,
    index: number
  ): JSX.Element => {
    return (
      <SideNavNode
        key={index}
        siteNavItem={siteNavItem}
        navIsOpened={this.props.navIsOpened}
      />
    );
  };

  public render(): JSX.Element {
    var nodeClasses: string[] = ["site-nav-node"];
    if (this.state.isOpened && this.props.navIsOpened) {
      nodeClasses.push("opened");
    }
    if (this.props.siteNavItem.subNavItems) {
      nodeClasses.push("dropdown");
    }
    return (
      <div key={this.props.key} className={nodeClasses.join(" ")}>
        <div onClick={e => this.nodeClick(e)}>
          {(this.props.siteNavItem.svg && (
            <div className="icon-node ms-fadeIn400">
              <div
                className="icon ms-fadeIn400"
                style={{ maxWidth: 50, color: "#fff" }}
                dangerouslySetInnerHTML={{ __html: this.props.siteNavItem.svg }}
              />
              {this.props.navIsOpened && (
                <div>
                  <div className="title noselect">
                    {this.props.siteNavItem.title}
                  </div>
                  {(this.props.siteNavItem.subNavItems &&
                    !this.state.isOpened && (
                      <IconButton
                        className="sub-nav-item-icon"
                        checked={false}
                        iconProps={{ iconName: "ChevronDownSmall" }}
                        title="Toggle Sub Menu"
                        ariaLabel="Toggle Sub Menu"
                      />
                    )) ||
                    (this.props.siteNavItem.subNavItems &&
                      this.state.isOpened && (
                        <IconButton
                          className="sub-nav-item-icon"
                          checked={false}
                          iconProps={{ iconName: "ChevronUpSmall" }}
                          title="Toggle Sub Menu"
                          ariaLabel="Toggle Sub Menu"
                        />
                      ))}
                </div>
              )}
            </div>
          )) ||
            (!this.props.siteNavItem.svg && (
              <div className="title-node">
                <div>
                  <div className="title noselect">
                    {this.props.siteNavItem.title}
                  </div>
                </div>
              </div>
            ))}
        </div>
        {(this.props.siteNavItem.subNavItems &&
          !this.props.navIsOpened && (
            <div className="dynamic-children flyouts">
              {this.props.siteNavItem.subNavItems.map(this.renderSubNavItems)}
            </div>
          )) ||
          (this.props.siteNavItem.subNavItems &&
            this.props.navIsOpened &&
            this.state.isOpened && (
              <div className="dynamic-children" ref="children">
                {this.props.siteNavItem.subNavItems.map(this.renderSubNavItems)}
              </div>
            ))}
      </div>
    );
  }
}
