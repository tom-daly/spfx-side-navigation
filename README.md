# Introduction
This project is an SPFx application customizer built for Modern SharePoint sites / pages. It will place itself in the header placeholder of your site and pull navigation items from the list contained within the site. It could be a global navigation if you replace provider -- check out this project [https://github.com/tom-daly/spfx-global-navigation]

Rebuilt fresh on SPFx v1.4 so that it will support:

Environments
+ Office 365
+ SharePoint 2019 

Browers
+ IE 11
+ Chrome
+ FireFox

## Why does this project exist? 
This is just an interesting example of a side navigation that would be useful on Modern Communication sites as they don't have a left navigation. Inspiration taken from the Office 365 Admin Portal Left Navigation.

## Modern Page Demonstration
Designed for Modern Sites
![demo on modern](https://github.com/tom-daly/spfx-side-navigation/blob/master/images/demo.gif)

# Prerequisites to Build
1. [SPFx Development Environment](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-development-environment)
2. [Tenant App Catalog](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant#create-app-catalog-site)
4. Node 8.x.x or 10.x.x

# Installation & Deployment
The following steps assume that you've cloned this repository or downloaded the files and successfully installed all the dependencies using 'npm install'. Make sure to use the same version of node to get a successfull build. 

## Overview
1. Build the SPFx Application Customizer
2. Deploy the SPFx Application Customizer
3. Add the App to your site

## Step 1 - Build the Solution
It is recommended to run the 'build.cmd' file from the projects root folder. This file does all the normal SPFx build commands such as build, bundle, package-solution but it will also generate the necessary file needed for support on classic sites. The 'build.cmd' also does a number of other things out of scope for guide. Please refer to the following blogs posts for more information on this file.

+ [Simple Build Script for the SharePoint Framework](https://thomasdaly.net/2018/05/07/simple-build-script-for-the-sharepoint-framework/)
+ [SPFx Automatically Generating Revision Numbers](https://thomasdaly.net/2018/08/12/spfx-automatically-generating-revision-numbers/)
+ [Update: SPFx Automatically Generating Revision Numbers + Versioning](https://thomasdaly.net/2018/08/21/update-spfx-automatically-generating-revision-numbers-versioning/)

![build](https://github.com/tom-daly/spfx-side-navigation/blob/master/images/build.png)

### Modern App Build
When the build script completes you will have the app package for modern sites located in './sharepoint/solution/spfx-side-navigation.sppkg'

![App Package](https://github.com/tom-daly/spfx-side-navigation/blob/master/images/package.png)

## Step 2 - Deploy the Application Customizer

#### Modern Deployment
Modern site deployment is straightforward. [For more information about this process see official MS Docs](https://docs.microsoft.com/en-us/sharepoint/use-app-catalog)

1. Navigate to your tenant App Catalog
2. Click Apps for SharePoint in the Quick Launch menu
3. Click and drag the .sppkg file into the tenant App Catalog

![deploy app customizer](https://i.imgur.com/il6utDR.gif)

## Step 3 - Activate the App
Activation on a Modern site deployment is straightforward. [For more information about this process see official MS Docs](https://docs.microsoft.com/en-us/sharepoint/use-app-catalog)

1. Navigate to your Modern site
2. From the gear icon, click 'Add an App'
3. In the left menu, click 'From your Organization'
4. Click 'spfx-side-navigation-client-side-solution'

***In a minute or two it will be activated on that modern site***

![update colors](https://github.com/tom-daly/spfx-side-navigation/blob/master/images/add_app.gif)

# Modifications

## Updating the Styles + Changing Colors
The project was written with a global sass stylesheet for Modern sites first and was then extended to support Classic sites. It should be simple enough to update the hex colors and rebuild to match your site's palette. 

+ site-menu.scss - Contains all the styles for the menu for both Classic and Modern sites. This file contains sass variables to easily update the colors of the menus to match your environment. All the other sass should not be adjusted as it controls the function of the menu.

![update colors](https://github.com/tom-daly/spfx-side-navigation/blob/master/images/colors.png)

# How To Use
It's super easy to use, once activated just add items to the list.

## Side Nav List
In Site Contents you'll see a new list called "Side Nav List" just add new list items.

The current implementation supports ANY SVG icon as long as its one color and you can provide the list item the SVG code. This way we can recolor with CSS and it will seamless fit into the 
navigation. 

![update colors](https://github.com/tom-daly/spfx-side-navigation/blob/master/images/new_item.gif)
