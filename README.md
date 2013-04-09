Perfin
======

### What is the Perfin

This is an **open oource** small web application for Personal Financial Control.


### Why Open Source

This project have being developed for two reasons:

1. We have not found any app that we really liked and enjoyed to use for a long time.
2. We have been seen many new frameworks and patterns lately emerging and this app was the best way we found to practice all these news.


### Configurations

1. Install [MySQL Community Server 5.5.29](http:// "http://www.mysql.com/downloads/mysql/")
2. Create the databse "Perfin"
3. Execute the script `\Perfin\Perfin\Scripts.Database\GenerateMySQLDatabse.sql` into the database.
4. Installing NuGet packages from packages.config executing `c:\path\to\nuget.exe install -o packages project-folder\packages.config` or just Turn on "Allow NuGet to download missing packages during build" on Visual Studio as you can see on [Scott Halseman Post](http://www.hanselman.com/blog/NuGet20NETPackageManagerReleasedGOUPGRADENOWAndHeresWhy.aspx)