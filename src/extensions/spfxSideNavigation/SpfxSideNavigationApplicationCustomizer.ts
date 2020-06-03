
import * as React from "react";
import * as ReactDom from "react-dom";
import { override } from '@microsoft/decorators';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from "@microsoft/sp-application-base";
import { setup as pnpSetup } from "@pnp/common";
import SideNav from "./components/SideNav/SideNav";

// import * as strings from 'SpfxSideNavigationApplicationCustomizerStrings';

export interface ISpfxSideNavigationApplicationCustomizerProperties {}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class SpfxSideNavigationApplicationCustomizer
  extends BaseApplicationCustomizer<ISpfxSideNavigationApplicationCustomizerProperties> {

    private topPlaceholder: PlaceholderContent | undefined;

    @override
    public onInit(): Promise<void> {
      return super.onInit().then(_ => {
        pnpSetup({
          spfxContext: this.context
        });
        this.context.placeholderProvider.changedEvent.add(
          this,
          this.renderPlaceHolders
        );
      });
    }

    private renderPlaceHolders(): void {
      if (!this.topPlaceholder) {
        this.topPlaceholder = this.context.placeholderProvider.tryCreateContent(
          PlaceholderName.Top
        );

        if (!this.topPlaceholder) {
          return;
        }

        if (this.topPlaceholder.domElement) {
          const element: React.ReactElement<{}> = React.createElement(
            SideNav,
            {}
          );
          ReactDom.render(element, this.topPlaceholder.domElement);
        }
      }
    }
}
