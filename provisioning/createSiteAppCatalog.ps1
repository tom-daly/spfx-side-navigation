$siteUrl = Read-Host -Prompt "Enter the site url"
$adminUrl = Read-Host -Prompt "Enter the admin site url"

Connect-SPOService -url $adminUrl
$site = Get-SPOSite $siteUrl
Add-SPOSiteCollectionAppCatalog -Site $site