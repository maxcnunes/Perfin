Perfin
======

O que é o Perfin
================
Perfin é uma pequena aplicação web Open Source para Controle Financeiro Pessoal.


Porque Open Source
==================
E desenvolvida com  o intuito de aplicar conhecimentos no quais estamos estudando para elevar nosso nível de desenvolvimento. Utilizando tecnologias atualizadas, como: (completar).


Quem pode contribuir
====================
Qualquer um, basta fazer um fork.


Configurations
=============

1. Install [MySQL Community Server 5.5.29](http:// "http://www.mysql.com/downloads/mysql/")
2. Install [MySQL Connector/Net 6.6.4](http://www.mysql.com/downloads/connector/net/)
3. Create the databse "Perfin"
4. Create the tabel "User" running the follow query:

``` sql
delimiter $$

CREATE TABLE `user` (
  `Id` int(11) NOT NULL,
  `Login` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1$$
```

CREATE TABLE `CATEGORY` (	
	`Id` int(11) NOT NULL,
  	`Name` varchar(45) NOT NULL,
  	`Parent` INTEGER DEFAULT 0 , 

	PRIMARY KEY (`Id`)
) ENGINE=InnoDB 



(THIS TEXT MUST BE TRANSLATED TO ENGLISH)