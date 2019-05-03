# ************************************************************
# Sequel Pro SQL dump
# Versión 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.5.5-10.1.16-MariaDB)
# Base de datos: tareas
# Tiempo de Generación: 2019-05-03 16:40:44 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Volcado de tabla cards
# ------------------------------------------------------------

DROP TABLE IF EXISTS `cards`;

CREATE TABLE `cards` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(120) DEFAULT NULL,
  `label` varchar(50) DEFAULT NULL,
  `description` text,
  `date1` date DEFAULT NULL,
  `date2` date DEFAULT NULL,
  `FK_id_user` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `cards` WRITE;
/*!40000 ALTER TABLE `cards` DISABLE KEYS */;

INSERT INTO `cards` (`id`, `title`, `label`, `description`, `date1`, `date2`, `FK_id_user`)
VALUES
	(1,'Diseño del Front','6hrs','Hacer diseño principal.','2019-02-03','2019-02-05',1),
	(2,'Estructura de nase de datos','1hr',NULL,'2019-02-03','2019-02-05',NULL);

/*!40000 ALTER TABLE `cards` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla lanes_cards
# ------------------------------------------------------------

DROP TABLE IF EXISTS `lanes_cards`;

CREATE TABLE `lanes_cards` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `FK_id_lane` int(11) DEFAULT NULL,
  `FK_id_card` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `lanes_cards` WRITE;
/*!40000 ALTER TABLE `lanes_cards` DISABLE KEYS */;

INSERT INTO `lanes_cards` (`id`, `FK_id_lane`, `FK_id_card`)
VALUES
	(2,1,2),
	(3,2,1);

/*!40000 ALTER TABLE `lanes_cards` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla lanes
# ------------------------------------------------------------

DROP TABLE IF EXISTS `lanes`;

CREATE TABLE `lanes` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(120) DEFAULT NULL,
  `label` varchar(50) DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `lanes` WRITE;
/*!40000 ALTER TABLE `lanes` DISABLE KEYS */;

INSERT INTO `lanes` (`id`, `title`, `label`, `description`)
VALUES
	(1,'En Desarrollo','1/2','Descripción'),
	(2,'En Revisión','0/2','Descripción'),
	(3,'Terminado','0/2','Descripción');

/*!40000 ALTER TABLE `lanes` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla tasks
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tasks`;

CREATE TABLE `tasks` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(120) DEFAULT NULL,
  `date_end` date DEFAULT NULL,
  `FK_id_user` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Volcado de tabla users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(150) DEFAULT NULL,
  `title` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `name`, `title`)
VALUES
	(1,'Allison Moreno','Desarrollador Web');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
