-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.32-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for test
CREATE DATABASE IF NOT EXISTS `test` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `test`;

-- Dumping structure for table test.action
CREATE TABLE IF NOT EXISTS `action` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `action` text NOT NULL,
  `datetime` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table test.action: ~9 rows (approximately)
DELETE FROM `action`;
INSERT INTO `action` (`id`, `username`, `action`, `datetime`) VALUES
	(6, 'gg', 'ได้เข้าสู่ระบบ', '2025-02-07 14:23:29'),
	(7, 'ii', 'ได้เข้าสู่ระบบ', '2025-02-07 14:38:19'),
	(8, 'gg', 'ได้เข้าสู่ระบบ', '2025-02-07 14:50:02'),
	(9, 'gg', 'ได้เข้าสู่ระบบ', '2025-02-07 14:52:24'),
	(10, 'gg', 'ได้เข้าสู่ระบบ', '2025-02-07 14:52:42'),
	(11, 'gg', 'ได้เข้าสู่ระบบ', '2025-02-07 14:53:14'),
	(12, 'rr', 'ได้เข้าสู่ระบบ', '2025-02-07 14:54:22'),
	(13, 'rr', 'ได้เข้าสู่ระบบ', '2025-02-07 14:57:17'),
	(14, 'rr', 'ได้เข้าสู่ระบบ', '2025-02-07 14:58:35');

-- Dumping structure for table test.estimate
CREATE TABLE IF NOT EXISTS `estimate` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `estimate1` int(11) DEFAULT NULL,
  `estimate2` int(11) DEFAULT NULL,
  `estimate3` int(11) DEFAULT NULL,
  `estimate4` int(11) DEFAULT NULL,
  `estimate5` int(11) DEFAULT NULL,
  `estimate6` int(11) DEFAULT NULL,
  `estimate7` int(11) DEFAULT NULL,
  `estimate8` int(11) DEFAULT NULL,
  `estimate9` int(11) DEFAULT NULL,
  `estimate10` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  CONSTRAINT `estimate_chk_1` CHECK (`estimate1` between 1 and 10),
  CONSTRAINT `estimate_chk_10` CHECK (`estimate10` between 1 and 10),
  CONSTRAINT `estimate_chk_2` CHECK (`estimate2` between 1 and 10),
  CONSTRAINT `estimate_chk_3` CHECK (`estimate3` between 1 and 10),
  CONSTRAINT `estimate_chk_4` CHECK (`estimate4` between 1 and 10),
  CONSTRAINT `estimate_chk_5` CHECK (`estimate5` between 1 and 10),
  CONSTRAINT `estimate_chk_6` CHECK (`estimate6` between 1 and 10),
  CONSTRAINT `estimate_chk_7` CHECK (`estimate7` between 1 and 10),
  CONSTRAINT `estimate_chk_8` CHECK (`estimate8` between 1 and 10),
  CONSTRAINT `estimate_chk_9` CHECK (`estimate9` between 1 and 10)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table test.estimate: ~0 rows (approximately)
DELETE FROM `estimate`;

-- Dumping structure for table test.role
CREATE TABLE IF NOT EXISTS `role` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `label` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `label` (`label`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table test.role: ~3 rows (approximately)
DELETE FROM `role`;
INSERT INTO `role` (`id`, `label`) VALUES
	(1, 'ผู้ระบาย'),
	(2, 'ผู้รับฟัง'),
	(3, 'ผู้ใช้งานทั่วไป');

-- Dumping structure for table test.room
CREATE TABLE IF NOT EXISTS `room` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `roomname` varchar(100) NOT NULL,
  `datetime` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table test.room: ~1 rows (approximately)
DELETE FROM `room`;
INSERT INTO `room` (`id`, `username`, `roomname`, `datetime`) VALUES
	(1, '', 'Room', '2025-02-07 14:03:17');

-- Dumping structure for table test.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` text NOT NULL,
  `roleid` int(11) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table test.user: ~3 rows (approximately)
DELETE FROM `user`;
INSERT INTO `user` (`id`, `username`, `password`, `roleid`, `email`) VALUES
	(2, 'gg', '$2b$10$./GWfn5X1GRZPdc86I.DiOt5Qjk.mnnFZpp9y.kLphVgJQBD8R7E6', 3, 'gg@gmail.com'),
	(3, 'tt', '$2b$10$.v0QT67FtsWMU9NJKFwbzeR1QGuWaxAvm/9VJAHo5IpcBWzSWXHyu', 3, 'ii@gmail.com'),
	(4, 'rr', '$2b$10$SOSAOve4hbyTzE1wwv8a0OMIQ0tsPxFGGqH0jAEcd5bOj5JhlitAy', 3, 'rr@gmail');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
