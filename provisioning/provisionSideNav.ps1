$configFile = "config.json";

if((Test-Path $configFile) -eq $false) {
    $siteUrl = Read-Host -Prompt "Enter the site url"
    $username = Read-Host -Prompt "Enter the username"
    $securePassword = Read-Host -Prompt "Enter your tenant password" -AsSecureString | ConvertFrom-SecureString
    @{username=$username;securePassword=$securePassword;siteUrl=$siteUrl} | ConvertTo-Json | Out-File $configFile
}

$configObject = Get-Content $configFile | ConvertFrom-Json
$password = $configObject.securePassword | ConvertTo-SecureString
$credentials = new-object -typename System.Management.Automation.PSCredential -argumentlist $configObject.username, $password
Connect-PnPOnline -url $configObject.siteUrl -Credentials $credentials

Write-Host ""
Write-Host "Provisioning Site Columns, Content Types, & Lists" -ForegroundColor Yellow
Write-Host "-------------------------------------------------" -ForegroundColor Yellow

Write-Host "Side Navigation" -ForegroundColor Green
Apply-PnPProvisioningTemplate ".\SideNav\definition.xml"

Write-Host "Adding Lookup Field" -ForegroundColor Green
$sideNavList = Get-PnPList -Identity "Lists/SideNavList"

if(!$sideNavList) {
    Write-Host "Could not find the list to connect the lookup field. Check that the Side Nav list exists.";
    return;
}
else {
    $fieldXml = "<Field ID='{068992B0-C110-411E-A152-4C17E17E43DE}' Name='SideNavParent' StaticName='SideNavParent' DisplayName='Parent' Group='Side Nav Columns' Required='false' Type='Lookup' List='"+ $sideNavList.Id +"' ShowField='Title' Overwrite='TRUE' OverwriteInChildScopes='TRUE' />"
    Add-PnPFieldFromXml -List "Side Nav List" -FieldXml $fieldXml | Out-Null
}

Write-Host "Provisioning done" -ForegroundColor Blue