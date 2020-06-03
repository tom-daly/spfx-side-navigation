# Introduction
This project is an SPFx application customizer built for Modern SharePoint sites / pages. It will place itself in the header placeholder of your site and pull navigation items from the list contained within the site. It could be a global navigation if you replace provider -- check out this project [https://github.com/tom-daly/spfx-global-navigation]

Rebuilt fresh on SPFx v1.4 so that it will support both 
+Office 365
+SharePoint 2019 

## Why does this project exist? 
This is just an interesting example of a side navigation that would be useful on Modern Communication sites as they don't have a left navigation. Inspiration taken from the Office 365 Admin Portal Left Navigation.

## Modern Page Demonstration
Designed for Modern Sites
![demo on modern](https://github.com/tom-daly/spfx-side-navigation/blob/master/images/demo.gif)

# Prerequisites
1. [SPFx Development Environment](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-development-environment)
2. [Powershell PnP](https://github.com/SharePoint/PnP-PowerShell/releases)
3. [Tenant App Catalog](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant#create-app-catalog-site)
4. Node 8.x.x or 10.x.x

# Installation & Deployment
The following steps assume that you've cloned this repository or downloaded the files and successfully installed all the dependencies using 'npm install'. Make sure to use the same version of node to get a successfull build. 

## Overview
1. Provision the Global Nav List
2. Build the SPFx Application Customizer
2. Deploy the SPFx Application Customizer
3. Add the App to your site

## Step 1 - Provision the Global Nav List
In this step we will provision the Global Navigation list to your tenant using a Powershell PnP provisioning template and cmdlets. Inside the './provisioning' folder there will be a 'deploy.ps1' that will automate this process.

***It is recommended to deploy the list to the root "https://{domain}.sharepoint.com" of your tenant as this is where the application customizer is designed to look for the list by default.*** 

1. Navigate to a Classic site
2. From the SharePoint Online Management Shell navigate to the 'provisioning' folder
3. Run './deploy.ps1' 
4. Enter url of the classic site that you want to deploy to 'https://{domain}.sharepoint.com/'
5. Enter your credentials

![provision the list](https://i.imgur.com/rQtjBEC.gif)

## Step 2 - Build the Solution
It is recommended to run the 'build.cmd' file from the projects root folder. This file does all the normal SPFx build commands such as build, bundle, package-solution but it will also generate the necessary file needed for support on classic sites. The 'build.cmd' also does a number of other things out of scope for guide. Please refer to the following blogs posts for more information on this file.

+ [Simple Build Script for the SharePoint Framework](https://thomasdaly.net/2018/05/07/simple-build-script-for-the-sharepoint-framework/)
+ [SPFx Automatically Generating Revision Numbers](https://thomasdaly.net/2018/08/12/spfx-automatically-generating-revision-numbers/)
+ [Update: SPFx Automatically Generating Revision Numbers + Versioning](https://thomasdaly.net/2018/08/21/update-spfx-automatically-generating-revision-numbers-versioning/)

![build](https://i.imgur.com/8G55Dym.png)

### Modern App Build
When the build script completes you will have the app package for modern sites located in './sharepoint/solution/spfx-global-navigation.sppkg'

![App Package](https://i.imgur.com/5I1BrRE.png)

### Classic JS File Build
As mentioned in the introduction, by using the 'build.cmd' the build process will generate a JavaScript file suitable for deployment on a Classic site. 

Without going into too much detail, the build process calls a separate webpack configuration that points to a seperate component for Classic Mode. This webpack configuration and the custom component both have additional references and polyfills in order for it to work on a Classic Site. 

After running the build script you will have the .js file for classic sites located in './classic-dist/top-navigation.js'

![JavaScript File](https://i.imgur.com/adOUY2h.png)

***Deploying to a Classic site will target and override the default navigation. The code targets the element '#DeltaTopNavigation'. This reference can be changed in the 'components/ClassicMode/ClassicMode.ts' file*** 

## Step 3 - Deploy the Application Customizer

#### Modern Deployment
Modern site deployment is straightforward. [For more information about this process see official MS Docs](https://docs.microsoft.com/en-us/sharepoint/use-app-catalog)

1. Navigate to your tenant App Catalog
2. Click Apps for SharePoint in the Quick Launch menu
3. Click and drag the .sppkg file into the tenant App Catalog

![deploy app customizer](https://i.imgur.com/il6utDR.gif)
