-- DROP DATABASE `PERFIN`;


CREATE DATABASE  IF NOT EXISTS `perfin` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `perfin`;
-- MySQL dump 10.13  Distrib 5.6.10, for Win64 (x86_64)
--
-- Host: localhost    Database: perfin
-- ------------------------------------------------------
-- Server version 5.6.10

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ENTRY`
--

DROP TABLE IF EXISTS `entry`;
CREATE TABLE `entry` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Price` decimal(12,3) NOT NULL,
  `Description` varchar(300) NULL,
  `RegistryDate` Date NOT NULL,
  `PaymentDate` Date NULL,

  `AccountId` int(11) NOT NULL, 
  `UserId` int(11) NOT NULL,

  PRIMARY KEY (`Id`),
  KEY `FK_ENTRY_ACCOUNT` (`AccountId`),
  KEY `FK_ENTRY_USER` (`UserId`),
  CONSTRAINT `FK_ENTRY_ACCOUNT` FOREIGN KEY (`AccountId`) REFERENCES `account` (`Id`),
  CONSTRAINT `FK_ENTRY_USER` FOREIGN KEY (`UserId`) REFERENCES `user` (`Id`)
);




--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) NOT NULL,
  `Description` varchar(300) NOT NULL,
  `AccountTypeId` int(11) NOT NULL,
  `CategoryId` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,

  PRIMARY KEY (`Id`),
  KEY `FK_ACCOUNT_TYPE` (`AccountTypeId`),
  KEY `FK_ACCOUNT_CATEGORY` (`CategoryId`),
  KEY `FK_ACCOUNT_USER` (`UserId`),
  CONSTRAINT `FK_ACCOUNT_TYPE` FOREIGN KEY (`AccountTypeId`) REFERENCES `accounttype` (`Id`),  
  CONSTRAINT `FK_ACCOUNT_CATEGORY` FOREIGN KEY (`CategoryId`) REFERENCES `category` (`Id`),
  CONSTRAINT `FK_ACCOUNT_USER` FOREIGN KEY (`UserId`) REFERENCES `user` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) NOT NULL,
  `Parent` int(11) DEFAULT '0',
  `UserId` int(11) NOT NULL,
 
  PRIMARY KEY (`Id`),
  KEY `FK_CATEGORY_USER` (`UserId`),
  CONSTRAINT `FK_CATEGORY_USER` FOREIGN KEY (`UserId`) REFERENCES `user` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `accounttype`
--

DROP TABLE IF EXISTS `accounttype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accounttype` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) NOT NULL UNIQUE,
  `UserId` int(11) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `FK_CATEGORY_USER` (`UserId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Login` varchar(45) NOT NULL,
  `Password` varchar(30) DEFAULT NULL,
  `Email` varchar(400) DEFAULT NULL,
  `Name` varchar(45) DEFAULT NULL,
  `Salt` varchar(45) DEFAULT NULL,
  `OAuthId` varchar(200) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `OAuthId_UNIQUE` (`OAuthId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

