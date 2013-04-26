Perfin
======

### What is the Perfin

This is an **open source** small web application for Personal Financial Control.


### Why Open Source

This project have being developed for two reasons:

1. We have not found any app that we really liked and enjoyed to use for a long time.
2. We have been seen many new frameworks and patterns lately emerging and this app was the best way we found to practice all these news.


### Configurations

1. Install [MySQL Community Server 5.5.29](http:// "http://www.mysql.com/downloads/mysql/")
2. Execute the script `\Perfin\Perfin\Scripts.Database\GenerateMySQLDatabse.sql` into the database.
3. Installing NuGet packages from packages.config executing `c:\path\to\nuget.exe install -o packages project-folder\packages.config` or just Turn on "Allow NuGet to download missing packages during build" on Visual Studio as you can see on [Scott Halseman Post](http://www.hanselman.com/blog/NuGet20NETPackageManagerReleasedGOUPGRADENOWAndHeresWhy.aspx)
4. **Authentication** - The authentication is provided by Auth0 API.
 
 1) You will need register on [Auth0](http:// "http://auth0.com/")
 
 2) Then will need create a new Application: [settings](http:// "https://app.auth0.com/#/settings")
 
 3) Set the App Callback URLs for this App as `http://localhost:53962/#/`
 
 4) Create the file `appSettings.config` inside the project `Perfin.UI.Web`. This file must have the same values of your Auth0 settings.

```xml
 <appSettings>
  <add key="AUTH0_CLIENT_ID" value="" />
  <add key="AUTH0_CLIENT_SECRET" value="" />
</appSettings>
```