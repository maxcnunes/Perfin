-- CREATE DATABASE PERFIN; -- || PERFINSTER;
-- USE PERFINSTER;

USE PERFIN;

delimiter $$
--
-- User Table
--
CREATE TABLE `user` (
  `Id` int(11) NOT NULL,
  `Login` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB 

--
-- Category Table
--
CREATE TABLE `category` (
  `Id` int(11) NOT NULL,
  `Name` varchar(45) NOT NULL,
  `Parent` int(11) DEFAULT '0',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB


--
-- ACCOUNT TYPE
--
CREATE TABLE `AccountType`(

	`Id` int(11) NOT NULL,

	`Name` varchar(45) NOT NULL,

	
	CONSTRAINT `PK_Id` PRIMARY KEY CLUSTERED 
(
`Id` ASC)
); 



--
-- ACCOUNT
--
CREATE TABLE `Account`(

	`Id` int(11) NOT NULL,

	`Name` varchar(45) NOT NULL,

	`Description` varchar(300)NOT NULL,

	`Type` int(11) NOT NULL,

	`Category` int(11) NOT NULL,



	CONSTRAINT `PK_Id` PRIMARY KEY CLUSTERED 
(
`Id` ASC),

	CONSTRAINT FK_TYPE
  FOREIGN KEY (`Type`)
 
		REFERENCES AccountType(`ID`),


	CONSTRAINT FK_CATEGORY
 FOREIGN KEY (`Category`)
		REFERENCES Category(`ID`)


); 
