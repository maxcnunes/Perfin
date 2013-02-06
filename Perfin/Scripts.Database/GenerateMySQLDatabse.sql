delimiter $$
--
-- User Table
--
CREATE TABLE `user` (
  `Id` int(11) NOT NULL,
  `Login` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1$$

--
-- Category Table
--
CREATE TABLE `category` (
  `Id` int(11) NOT NULL,
  `Name` varchar(45) NOT NULL,
  `Parent` int(11) DEFAULT '0',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1$$

