DROP DATABASE IF EXISTS viral_db;
CREATE DATABASE viral_db;
USE viral_db;

DROP TABLE IF EXISTS `Stories`;
DROP TABLE IF EXISTS `Categories`;
DROP TABLE IF EXISTS `Users`;

CREATE TABLE IF NOT EXISTS `Categories` (
    `id` INTEGER NOT NULL auto_increment , 
    `name` VARCHAR(255) NOT NULL, 
    `createdAt` DATETIME NOT NULL, 
    `updatedAt` DATETIME NOT NULL, 
    PRIMARY KEY (`id`));

CREATE TABLE IF NOT EXISTS `Users` (
    `id` INTEGER NOT NULL auto_increment , 
    `name` VARCHAR(255) NOT NULL UNIQUE, 
    `password` VARCHAR(255) NOT NULL, 
    `createdAt` DATETIME NOT NULL, 
    `updatedAt` DATETIME NOT NULL, 
    PRIMARY KEY (`id`));

CREATE TABLE IF NOT EXISTS `Stories` (
    `id` INTEGER NOT NULL auto_increment , 
    `title` VARCHAR(255) NOT NULL, 
    `body` TEXT NOT NULL, 
    `createdAt` DATETIME NOT NULL, 
    `updatedAt` DATETIME NOT NULL, 
    `CategoryId` INTEGER NOT NULL, 
    `UserId` INTEGER NOT NULL, 
    PRIMARY KEY (`id`), 
    FOREIGN KEY (`CategoryId`) REFERENCES `Categories` (`id`) 
        ON DELETE NO ACTION ON UPDATE CASCADE, 
    FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) 
        ON DELETE NO ACTION ON UPDATE CASCADE);


