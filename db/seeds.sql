USE viral_db;

INSERT INTO Categories (name) VALUES ("Everyday Heroes"),("Quarantine Quotes"),("Healing Space"),("Newsworthy");

INSERT INTO `Users`(`id`,`name`,`fullName`,`password`)
VALUES
('1', 'dprice', 'Dylan Price', '$2a$10$sgjuiLpGaMbth5DyqBSv9ekqBMWq9PSxaybA/PYePnJirXbcbJFV6'),
('2', 'Lharrison', 'Lily Harrison', '$2a$10$zZx32mLkZ1d85AayFjudueX7dBq045LtUUSfpNGG8eI12eplyl4h2'),
('3', 'Tlee', 'Tom Lee', '$2a$10$5C2SB9soqRkqnWK0KUx2E.CsrDx.Mf40.pxRNMTrlUj7w2rjXv/j.'),
('4', 'gvee', 'George Vee', '$2a$10$//pHbEHjMk29vV8lPrpiAOKjkuplYmVpl/bAWSs1NLNQP2ItMSclS');

INSERT INTO `Stories` (`id`, `title`, `body`, `createdAt`, `updatedAt`, `CategoryId`, `UserId`)
VALUES
('3', 'Thank You', 'Thanks to all essential workers for all your great work in caring for everyone in our community. You are heroes!', '2020-05-21 09:44:08', '2020-05-21 09:44:08', '1', '2'),
('4', 'Quarantine Feels', 'All dressed up with nowhere to go. Bored in the house, in the house bored.', '2020-05-21 09:48:41', '2020-05-21 09:48:41', '2', '2'),
('5', 'It will be ok', 'It will be ok. We\'ve got to keep calm and carry on.', '2020-05-21 09:51:37', '2020-05-21 09:51:37', '3', '2'),
('6', 'Corona Update', 'LIVE-UPDATE: The World Health Organization has announced that COVID-19 is a pandemic.', '2020-05-21 09:52:22', '2020-05-21 09:52:22', '4', '2'),
('7', 'To all the essential workers', 'From the bottom of our hearts, thank you for keeping us safe.', '2020-05-21 09:53:24', '2020-05-21 09:53:24', '1', '3'),
('8', 'So Proud of our frontline heroes', 'To my beautiful daughter, I\'m so proud to be your dad. You go off to work every shift at the Royal Adelaide Hospital with such a positive attitude, and a smile, while this unprecedented event unfolds. Much love and admiration to all our frontline heroes', '2020-05-21 10:37:08', '2020-05-21 10:37:08', '1', '4'),
('9', 'I hear you. All your feelings are normal.', 'Your disappointment and frustration are valid. You have been planning your LSL for a long time and you have worked hard for it consistently over many years. Yes, the situation IS horribly unfair and frustrating.', '2020-05-21 12:54:35', '2020-05-21 12:54:35', '3', '3'),
('10', 'Not cleaning my house', 'Me in 2019: If I could just have like a week with nothing to do and nowhere to go, I could finally get this house cleaned and organized!\n\nMe now: Nope, that wasn\'t the problem ...', '2020-05-22 00:07:21', '2020-05-22 00:07:21', '2', '3'),
('11', 'Too much news', 'The media is driving the overreaction to the coronavirus\n\nIrresponsible coverage of the coronavirus crisis is contributing to unnecessary fear and panic. Public overreaction is potentially a bigger risk to Australia than the virus itself.', '2020-05-22 00:10:36', '2020-05-22 00:10:36', '4', '3'),
('12', 'Thank you to our teachers', 'Thank you to all the amazing teachers working hard to put classes online, answering endless emails and calls, teaching kids about safety and social distancing, and keeping our kids safe. Thank you to parents, who changed their entire work-life schedules to keep their children at home.', '2020-05-22 00:16:56', '2020-05-22 00:16:56', '1', '1'),
('13', 'Homeschooling', 'Homeschooling is going just great - two students suspended for fighting and one teacher fired for drinking on the job!', '2020-05-22 00:19:13', '2020-05-22 00:19:13', '2', '1'),
('14', 'Terrified!', 'This morning I get a phone call from the high school saying they heard my son coughing and has to go home. He is not allowed at school for the moment.Which is fair enough.I do not know yet if he or any of us have to be tested. I just feel so scared.', '2020-05-22 00:21:44', '2020-05-22 00:21:44', '3', '1'),
('15', 'Economic crash could be worse than coronavirus', 'Experts predict a global downturn ‘at least as bad’ as the 2008 crisis - and possibly worse. \n\nNot only is this crisis affecting business and employment around the world, but it will bring deep social and political changes.', '2020-05-22 00:22:57', '2020-05-22 00:22:57', '4', '1'),
('16', 'Worried about Winter', 'I am feeling anxious about coming into our winter. Will the virus just go wild?', '2020-05-22 00:32:46', '2020-05-22 00:32:46', '3', '4'),
('17', 'Stuck at home', 'Now I understand why pets try to run out of the house when the door opens.', '2020-05-22 00:33:38', '2020-05-22 00:33:38', '2', '4'),
('18', 'Fake News', 'Fake news and misinformation around the coronavirus is wild. Childcare centres are sharing a post claiming some foods could have traces of the virus. Don\'t believe everything you read.', '2020-05-22 00:35:28', '2020-05-22 00:35:28', '4', '4');
