
USE viral_db;

ALTER TABLE `users` 
ADD `fullName` varchar(255) NOT NULL AFTER `name`;

UPDATE `users` SET `fullName` = `name`;