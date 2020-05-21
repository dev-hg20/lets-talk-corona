
USE viral_db;

ALTER TABLE `Users` 
ADD `fullName` varchar(255) NOT NULL AFTER `name`;

UPDATE `Users` SET `fullName` = `name`;