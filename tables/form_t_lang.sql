-- MySQL dump 10.13  Distrib 8.0.29, for Linux (x86_64)
--
-- Host: localhost    Database: form
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `t_lang`
--

DROP TABLE IF EXISTS `t_lang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_lang` (
  `l_id` int NOT NULL AUTO_INCREMENT,
  `l_name` varchar(45) DEFAULT NULL,
  `spek` varchar(45) DEFAULT NULL,
  `writ` varchar(45) DEFAULT NULL,
  `reade` varchar(45) DEFAULT NULL,
  `t_id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`l_id`),
  KEY `id_idx` (`t_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_lang`
--

LOCK TABLES `t_lang` WRITE;
/*!40000 ALTER TABLE `t_lang` DISABLE KEYS */;
INSERT INTO `t_lang` VALUES (1,'hindi','yes','yes','yes','1'),(2,'gujrati','yes','yes','yes','1'),(3,'english','yes','yes','yes','1'),(4,'gujrati','yes','yes','yes','2'),(5,'english','yes','yes','yes','2'),(6,'hindi','yes','yes','yes','3'),(7,'gujrati','no','no','yes','3'),(8,'english','yes','no','no','3'),(9,'hindi','yes','no','no','4'),(10,'gujrati','no','yes','no','4'),(11,'english','no','no','yes','4'),(12,'g','yes','yes','yes','5'),(13,'u','yes','yes','yes','5'),(14,'j','yes','yes','yes','5'),(15,'r','yes','yes','yes','5'),(16,'a','yes','yes','yes','5'),(17,'t','yes','yes','yes','5'),(18,'i','yes','yes','yes','5'),(19,'hindi','yes','no','no','7'),(20,'gujrati','no','yes','no','7'),(21,'english','no','no','yes','7'),(22,'maithili','yes','yes','yes','7'),(23,'hindi','yes','no','no','8'),(24,'gujrati','yes','yes','yes','8'),(25,'english','yes','no','no','8'),(26,'maithili','yes','no','no','8');
/*!40000 ALTER TABLE `t_lang` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-17 11:26:00
