-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: localhost    Database: parkingguidance
-- ------------------------------------------------------
-- Server version	5.7.12-log

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
-- Table structure for table `cxj_path_mb_line`
--

DROP TABLE IF EXISTS `cxj_path_mb_line`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cxj_path_mb_line` (
  `cxj_item_id` int(11) DEFAULT NULL,
  `ID` int(11) DEFAULT NULL,
  `nIndex` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cxj_path_mb_line`
--

LOCK TABLES `cxj_path_mb_line` WRITE;
/*!40000 ALTER TABLE `cxj_path_mb_line` DISABLE KEYS */;
/*!40000 ALTER TABLE `cxj_path_mb_line` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cxj_path_mb_line_point`
--

DROP TABLE IF EXISTS `cxj_path_mb_line_point`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cxj_path_mb_line_point` (
  `line_id` int(11) DEFAULT NULL,
  `ID` int(11) DEFAULT NULL,
  `nIndex` int(11) DEFAULT NULL,
  `x` int(11) DEFAULT NULL,
  `y` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cxj_path_mb_line_point`
--

LOCK TABLES `cxj_path_mb_line_point` WRITE;
/*!40000 ALTER TABLE `cxj_path_mb_line_point` DISABLE KEYS */;
/*!40000 ALTER TABLE `cxj_path_mb_line_point` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dev_cxj`
--

DROP TABLE IF EXISTS `dev_cxj`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dev_cxj` (
  `ID` int(11) DEFAULT NULL,
  `name` varchar(250) DEFAULT NULL,
  `ip` varchar(250) DEFAULT NULL,
  `sRemark` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dev_cxj`
--

LOCK TABLES `dev_cxj` WRITE;
/*!40000 ALTER TABLE `dev_cxj` DISABLE KEYS */;
/*!40000 ALTER TABLE `dev_cxj` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dev_tcq`
--

DROP TABLE IF EXISTS `dev_tcq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dev_tcq` (
  `ID` int(11) DEFAULT NULL,
  `name` varchar(250) DEFAULT NULL,
  `ip` varchar(200) DEFAULT NULL,
  `remark` longtext,
  `group_id` int(11) DEFAULT NULL,
  `last_online_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dev_tcq`
--

LOCK TABLES `dev_tcq` WRITE;
/*!40000 ALTER TABLE `dev_tcq` DISABLE KEYS */;
/*!40000 ALTER TABLE `dev_tcq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dev_tcq_group`
--

DROP TABLE IF EXISTS `dev_tcq_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dev_tcq_group` (
  `ID` int(11) DEFAULT NULL,
  `group_name` varchar(200) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dev_tcq_group`
--

LOCK TABLES `dev_tcq_group` WRITE;
/*!40000 ALTER TABLE `dev_tcq_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `dev_tcq_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dev_ydp`
--

DROP TABLE IF EXISTS `dev_ydp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dev_ydp` (
  `ID` int(11) DEFAULT NULL,
  `name` varchar(200) DEFAULT NULL,
  `addr` varchar(200) DEFAULT NULL,
  `sub_addr` varchar(200) DEFAULT NULL,
  `cur_value` varchar(200) DEFAULT NULL,
  `time_change` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `time_update` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `sRemark` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dev_ydp`
--

LOCK TABLES `dev_ydp` WRITE;
/*!40000 ALTER TABLE `dev_ydp` DISABLE KEYS */;
/*!40000 ALTER TABLE `dev_ydp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `park_area`
--

DROP TABLE IF EXISTS `park_area`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `park_area` (
  `ID` int(11) DEFAULT NULL,
  `name` varchar(250) DEFAULT NULL,
  `dev_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `park_area`
--

LOCK TABLES `park_area` WRITE;
/*!40000 ALTER TABLE `park_area` DISABLE KEYS */;
/*!40000 ALTER TABLE `park_area` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `park_area_space`
--

DROP TABLE IF EXISTS `park_area_space`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `park_area_space` (
  `ID` int(11) DEFAULT NULL,
  `area_id` int(11) DEFAULT NULL,
  `space_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `park_area_space`
--

LOCK TABLES `park_area_space` WRITE;
/*!40000 ALTER TABLE `park_area_space` DISABLE KEYS */;
/*!40000 ALTER TABLE `park_area_space` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `park_map`
--

DROP TABLE IF EXISTS `park_map`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `park_map` (
  `ID` int(11) DEFAULT NULL,
  `name` varchar(250) DEFAULT NULL,
  `img_data` longblob,
  `img_w` int(11) DEFAULT NULL,
  `img_h` int(11) DEFAULT NULL,
  `raw_img_data` longblob,
  `sRemark` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `park_map`
--

LOCK TABLES `park_map` WRITE;
/*!40000 ALTER TABLE `park_map` DISABLE KEYS */;
/*!40000 ALTER TABLE `park_map` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `park_map_basepath_line`
--

DROP TABLE IF EXISTS `park_map_basepath_line`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `park_map_basepath_line` (
  `ID` int(11) DEFAULT NULL,
  `map_id` int(11) DEFAULT NULL,
  `pt_id_start` int(11) DEFAULT NULL,
  `pt_id_end` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `park_map_basepath_line`
--

LOCK TABLES `park_map_basepath_line` WRITE;
/*!40000 ALTER TABLE `park_map_basepath_line` DISABLE KEYS */;
/*!40000 ALTER TABLE `park_map_basepath_line` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `park_map_basepath_point`
--

DROP TABLE IF EXISTS `park_map_basepath_point`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `park_map_basepath_point` (
  `ID` int(11) DEFAULT NULL,
  `map_id` int(11) DEFAULT NULL,
  `x` int(11) DEFAULT NULL,
  `y` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `park_map_basepath_point`
--

LOCK TABLES `park_map_basepath_point` WRITE;
/*!40000 ALTER TABLE `park_map_basepath_point` DISABLE KEYS */;
/*!40000 ALTER TABLE `park_map_basepath_point` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `park_map_item_cxj`
--

DROP TABLE IF EXISTS `park_map_item_cxj`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `park_map_item_cxj` (
  `ID` int(11) DEFAULT NULL,
  `map_id` int(11) DEFAULT NULL,
  `cxj_id` int(11) DEFAULT NULL,
  `angle` double DEFAULT NULL,
  `x` int(11) DEFAULT NULL,
  `y` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `park_map_item_cxj`
--

LOCK TABLES `park_map_item_cxj` WRITE;
/*!40000 ALTER TABLE `park_map_item_cxj` DISABLE KEYS */;
/*!40000 ALTER TABLE `park_map_item_cxj` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `park_map_item_space`
--

DROP TABLE IF EXISTS `park_map_item_space`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `park_map_item_space` (
  `ID` int(11) DEFAULT NULL,
  `map_id` int(11) DEFAULT NULL,
  `space_id` int(11) DEFAULT NULL,
  `angle` double DEFAULT NULL,
  `x` int(11) DEFAULT NULL,
  `y` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `park_map_item_space`
--

LOCK TABLES `park_map_item_space` WRITE;
/*!40000 ALTER TABLE `park_map_item_space` DISABLE KEYS */;
/*!40000 ALTER TABLE `park_map_item_space` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `park_map_item_ydp`
--

DROP TABLE IF EXISTS `park_map_item_ydp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `park_map_item_ydp` (
  `ID` int(11) DEFAULT NULL,
  `map_id` int(11) DEFAULT NULL,
  `ydp_id` int(11) DEFAULT NULL,
  `angle` double DEFAULT NULL,
  `x` int(11) DEFAULT NULL,
  `y` int(11) DEFAULT NULL,
  `jtfx` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `park_map_item_ydp`
--

LOCK TABLES `park_map_item_ydp` WRITE;
/*!40000 ALTER TABLE `park_map_item_ydp` DISABLE KEYS */;
/*!40000 ALTER TABLE `park_map_item_ydp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `park_space`
--

DROP TABLE IF EXISTS `park_space`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `park_space` (
  `ID` int(11) DEFAULT NULL,
  `name` varchar(250) DEFAULT NULL,
  `fix_flag` int(11) DEFAULT NULL,
  `tcq_id` int(11) DEFAULT NULL,
  `nIndex` int(11) DEFAULT NULL,
  `cur_st` int(11) DEFAULT NULL,
  `time_st_change` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `time_st_update` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `platenumber` varchar(20) DEFAULT NULL,
  `pic_name` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `park_space`
--

LOCK TABLES `park_space` WRITE;
/*!40000 ALTER TABLE `park_space` DISABLE KEYS */;
/*!40000 ALTER TABLE `park_space` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `park_space_log`
--

DROP TABLE IF EXISTS `park_space_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `park_space_log` (
  `ID` int(11) DEFAULT NULL,
  `space_id` int(11) DEFAULT NULL,
  `space_name` varchar(250) DEFAULT NULL,
  `cur_st` int(11) DEFAULT NULL,
  `last_st` int(11) DEFAULT NULL,
  `time_last_change` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `platenumber` varchar(20) DEFAULT NULL,
  `pic_name` varchar(200) DEFAULT NULL,
  `rq` varchar(20) DEFAULT NULL,
  `sj` varchar(20) DEFAULT NULL,
  `rqsj` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `jc_log_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `park_space_log`
--

LOCK TABLES `park_space_log` WRITE;
/*!40000 ALTER TABLE `park_space_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `park_space_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `space_cxj_path`
--

DROP TABLE IF EXISTS `space_cxj_path`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `space_cxj_path` (
  `ID` int(11) DEFAULT NULL,
  `space_item_id` int(11) DEFAULT NULL,
  `cxj_item_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `space_cxj_path`
--

LOCK TABLES `space_cxj_path` WRITE;
/*!40000 ALTER TABLE `space_cxj_path` DISABLE KEYS */;
/*!40000 ALTER TABLE `space_cxj_path` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `space_cxj_path_line`
--

DROP TABLE IF EXISTS `space_cxj_path_line`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `space_cxj_path_line` (
  `ID` int(11) DEFAULT NULL,
  `path_id` int(11) DEFAULT NULL,
  `nIndex` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `space_cxj_path_line`
--

LOCK TABLES `space_cxj_path_line` WRITE;
/*!40000 ALTER TABLE `space_cxj_path_line` DISABLE KEYS */;
/*!40000 ALTER TABLE `space_cxj_path_line` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `space_cxj_path_line_point`
--

DROP TABLE IF EXISTS `space_cxj_path_line_point`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `space_cxj_path_line_point` (
  `ID` int(11) DEFAULT NULL,
  `line_id` int(11) DEFAULT NULL,
  `x` int(11) DEFAULT NULL,
  `y` int(11) DEFAULT NULL,
  `nIndex` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `space_cxj_path_line_point`
--

LOCK TABLES `space_cxj_path_line_point` WRITE;
/*!40000 ALTER TABLE `space_cxj_path_line_point` DISABLE KEYS */;
/*!40000 ALTER TABLE `space_cxj_path_line_point` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_unique`
--

DROP TABLE IF EXISTS `sys_unique`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sys_unique` (
  `name` varchar(50) DEFAULT NULL,
  `cur_value` double DEFAULT NULL,
  `sRemark` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_unique`
--

LOCK TABLES `sys_unique` WRITE;
/*!40000 ALTER TABLE `sys_unique` DISABLE KEYS */;
INSERT INTO `sys_unique` VALUES ('DEV_CXJ',1,NULL),('DEV_TCQ',1,NULL),('DEV_TCQ_GROUP',1,NULL),('DEV_YDP',1,NULL),('PARK_AREA',1,NULL),('PARK_AREA_SPACE',1,NULL),('PARK_MAP',1,NULL),('PARK_MAP_ITEM_CXJ',1,NULL),('PARK_MAP_ITEM_SPACE',1,NULL),('PARK_MAP_ITEM_YDP',1,NULL),('PARK_SPACE',1,NULL),('SPACE_CXJ_PATH',1,NULL),('SPACE_CXJ_PATH_LINE',1,NULL),('SPACE_CXJ_PATH_LINE_POINT',1,NULL),('tbRight',6,NULL);
/*!40000 ALTER TABLE `sys_unique` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_backup`
--

DROP TABLE IF EXISTS `t_backup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_backup` (
  `id` varchar(255) NOT NULL,
  `fileName` varchar(255) DEFAULT NULL,
  `backupTime` varchar(255) DEFAULT NULL,
  `userid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_backup`
--

LOCK TABLES `t_backup` WRITE;
/*!40000 ALTER TABLE `t_backup` DISABLE KEYS */;
INSERT INTO `t_backup` VALUES ('3ebbcfe6e4b811e897eb00ac6825238d','e:\\MyProject\\parkguid\\public\\backup\\parkingguidance-20181110151420.sql','2018-11-10 15:14:21','fa585205d3050aa123de76e8c68b4032'),('503fa044e3c411e8be520250f2000002','e:\\MyProject\\parkguid\\public\\backup\\parkingguidance-20181109100705.sql','2018-11-9 10:07:11','fa585205d3050aa123de76e8c68b4032'),('6b6ba2fae3c511e8be520250f2000002','d:\\MyProject\\parkguid\\public\\backup\\parkingguidance-20181109101505.sql','2018-11-9 10:15:07','fa585205d3050aa123de76e8c68b4032'),('71ca2f46e3c411e8be520250f2000002','d:\\MyProject\\parkguid\\public\\backup\\parkingguidance-20181109100805.sql','2018-11-9 10:08:08','fa585205d3050aa123de76e8c68b4032'),('8e9ad479e3c511e8be520250f2000002','d:\\MyProject\\parkguid\\public\\backup\\parkingguidance-20181109101605.sql','2018-11-9 10:16:06','fa585205d3050aa123de76e8c68b4032'),('ae8c3af5e3c611e8be520250f2000002','d:\\MyProject\\parkguid\\public\\backup\\parkingguidance-20181109102408.sql','2018-11-9 10:24:09','fa585205d3050aa123de76e8c68b4032');
/*!40000 ALTER TABLE `t_backup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_backup_config`
--

DROP TABLE IF EXISTS `t_backup_config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_backup_config` (
  `id` varchar(255) NOT NULL,
  `second` varchar(255) DEFAULT NULL,
  `minute` varchar(255) DEFAULT NULL,
  `hour` varchar(255) DEFAULT NULL,
  `dayofmonth` varchar(255) DEFAULT NULL,
  `month` varchar(255) DEFAULT NULL,
  `dayofweek` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `updateTime` varchar(255) DEFAULT NULL,
  `userid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_backup_config`
--

LOCK TABLES `t_backup_config` WRITE;
/*!40000 ALTER TABLE `t_backup_config` DISABLE KEYS */;
INSERT INTO `t_backup_config` VALUES ('2aae2ba3e3c411e8be520250f2000002','5','*','*','*','*','*','0','2018-11-9 10:06:00','fa585205d3050aa123de76e8c68b4032'),('3de012cae3c611e8be520250f2000002','6','*','*','*','*','*','0','2018-11-9 10:21:00','fa585205d3050aa123de76e8c68b4032'),('529808e7e3c511e8be520250f2000002','5','*','*','*','*','*','0','2018-11-9 10:14:25','fa585205d3050aa123de76e8c68b4032'),('703f6fd9e3c511e8be520250f2000002','5','*','*','*','*','*','0','2018-11-9 10:15:15','fa585205d3050aa123de76e8c68b4032'),('9fe84443e3c611e8be520250f2000002','8','*','*','*','*','*','0','2018-11-9 10:23:44','fa585205d3050aa123de76e8c68b4032'),('f2b14943e3c611e8be520250f2000002','7','*','*','*','*','*','0','2018-11-9 10:26:03','fa585205d3050aa123de76e8c68b4032');
/*!40000 ALTER TABLE `t_backup_config` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_log`
--

DROP TABLE IF EXISTS `t_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_log` (
  `id` varchar(255) NOT NULL,
  `userid` varchar(255) DEFAULT NULL,
  `createtime` varchar(255) DEFAULT NULL,
  `operation` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_log`
--

LOCK TABLES `t_log` WRITE;
/*!40000 ALTER TABLE `t_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_role_function_map`
--

DROP TABLE IF EXISTS `t_role_function_map`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_role_function_map` (
  `id` varchar(32) NOT NULL,
  `roleid` varchar(32) NOT NULL,
  `funcid` varchar(32) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `t_role_function_map_ix1` (`id`),
  KEY `t_role_function_map_fk1` (`roleid`),
  KEY `t_role_function_map_fk2` (`funcid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_role_function_map`
--

LOCK TABLES `t_role_function_map` WRITE;
/*!40000 ALTER TABLE `t_role_function_map` DISABLE KEYS */;
INSERT INTO `t_role_function_map` VALUES ('002e5c16912111e7bf6a184f320641b8','cb445376339911e7a3f56cae8b20846d','30295d9c1a6711e7803f3c970e8f4c17'),('0030dd21912111e7bf6a184f320641b8','cb445376339911e7a3f56cae8b20846d','111d79c5650e11e7a3f7184f320641b8'),('290567e8355611e7a3f56cae8b20846d','6ca3da981c1d11e7a6266cae8b249515','30295d9c1a6711e7803f3c970e8f4c17'),('29057b0b355611e7a3f56cae8b20846d','6ca3da981c1d11e7a6266cae8b249515','cb5197031a6711e7803f3c970e8f4c17'),('29057d96355611e7a3f56cae8b20846d','6ca3da981c1d11e7a6266cae8b249515','225368e41a6811e7803f3c970e8f4c17'),('29057fce355611e7a3f56cae8b20846d','6ca3da981c1d11e7a6266cae8b249515','69d1b0691a6811e7803f3c970e8f4c17'),('29058234355611e7a3f56cae8b20846d','6ca3da981c1d11e7a6266cae8b249515','93bc555d1a6811e7803f3c970e8f4c17'),('29058477355611e7a3f56cae8b20846d','6ca3da981c1d11e7a6266cae8b249515','ae3247b51a6811e7803f3c970e8f4c17'),('29059977355611e7a3f56cae8b20846d','6ca3da981c1d11e7a6266cae8b249515','5210610c1a6911e7803f3c970e8f4c17'),('29059e49355611e7a3f56cae8b20846d','6ca3da981c1d11e7a6266cae8b249515','20740cfe355611e7a3f56cae8b20846d'),('2940ea1850cb11e78c09184f320641b8','a428b83c1a7911e7803f3c970e8f4c17','30295d9c1a6711e7803f3c970e8f4c17'),('2943dfa050cb11e78c09184f320641b8','a428b83c1a7911e7803f3c970e8f4c17','4afb458c1a6711e7803f3c970e8f4c17'),('2943e12950cb11e78c09184f320641b8','a428b83c1a7911e7803f3c970e8f4c17','5b3008af1a6711e7803f3c970e8f4c17'),('2943e22e50cb11e78c09184f320641b8','a428b83c1a7911e7803f3c970e8f4c17','6bd6338e1a6711e7803f3c970e8f4c17'),('2943e32250cb11e78c09184f320641b8','a428b83c1a7911e7803f3c970e8f4c17','7bdf24061a6711e7803f3c970e8f4c17'),('2943e41e50cb11e78c09184f320641b8','a428b83c1a7911e7803f3c970e8f4c17','8567708d1a6711e7803f3c970e8f4c17'),('2943e4f050cb11e78c09184f320641b8','a428b83c1a7911e7803f3c970e8f4c17','cb5197031a6711e7803f3c970e8f4c17'),('2943e5c650cb11e78c09184f320641b8','a428b83c1a7911e7803f3c970e8f4c17','d4d32fa51a6711e7803f3c970e8f4c17'),('2943e69c50cb11e78c09184f320641b8','a428b83c1a7911e7803f3c970e8f4c17','dec250e01a6711e7803f3c970e8f4c17'),('2943e75c50cb11e78c09184f320641b8','a428b83c1a7911e7803f3c970e8f4c17','e6d71b641a6711e7803f3c970e8f4c17'),('2943e82150cb11e78c09184f320641b8','a428b83c1a7911e7803f3c970e8f4c17','f375a9151a6711e7803f3c970e8f4c17'),('2943e92e50cb11e78c09184f320641b8','a428b83c1a7911e7803f3c970e8f4c17','03812c2e1a6811e7803f3c970e8f4c17'),('2943ea0c50cb11e78c09184f320641b8','a428b83c1a7911e7803f3c970e8f4c17','0b1da2271a6811e7803f3c970e8f4c17'),('2943eaeb50cb11e78c09184f320641b8','a428b83c1a7911e7803f3c970e8f4c17','12e2c74c1a6811e7803f3c970e8f4c17'),('2943ebbc50cb11e78c09184f320641b8','a428b83c1a7911e7803f3c970e8f4c17','225368e41a6811e7803f3c970e8f4c17'),('2943ec9b50cb11e78c09184f320641b8','a428b83c1a7911e7803f3c970e8f4c17','2c8663551a6811e7803f3c970e8f4c17'),('2943ed8650cb11e78c09184f320641b8','a428b83c1a7911e7803f3c970e8f4c17','3a1e6b0c1a6811e7803f3c970e8f4c17'),('2943ee6950cb11e78c09184f320641b8','a428b83c1a7911e7803f3c970e8f4c17','479a3dd81a6811e7803f3c970e8f4c17'),('2943ef5050cb11e78c09184f320641b8','a428b83c1a7911e7803f3c970e8f4c17','b0e692e2296611e7a6266cae8b249515'),('2943f03b50cb11e78c09184f320641b8','a428b83c1a7911e7803f3c970e8f4c17','b9e90527296611e7a6266cae8b249515'),('2943f11950cb11e78c09184f320641b8','a428b83c1a7911e7803f3c970e8f4c17','c154fdad296611e7a6266cae8b249515'),('2943f1ef50cb11e78c09184f320641b8','a428b83c1a7911e7803f3c970e8f4c17','c72cc412296611e7a6266cae8b249515'),('2943f2bc50cb11e78c09184f320641b8','a428b83c1a7911e7803f3c970e8f4c17','e98e01a5355a11e7a3f56cae8b20846d'),('2943f39b50cb11e78c09184f320641b8','a428b83c1a7911e7803f3c970e8f4c17','063a7c3e355b11e7a3f56cae8b20846d'),('2943f47550cb11e78c09184f320641b8','a428b83c1a7911e7803f3c970e8f4c17','0fd687cd355b11e7a3f56cae8b20846d'),('2943f57a50cb11e78c09184f320641b8','a428b83c1a7911e7803f3c970e8f4c17','17a29a1e355b11e7a3f56cae8b20846d'),('2943f65850cb11e78c09184f320641b8','a428b83c1a7911e7803f3c970e8f4c17','10767d8950cb11e78c09184f320641b8'),('2943f74c50cb11e78c09184f320641b8','a428b83c1a7911e7803f3c970e8f4c17','15a5ca9050cb11e78c09184f320641b8'),('2943f83b50cb11e78c09184f320641b8','a428b83c1a7911e7803f3c970e8f4c17','1b4bcdbc50cb11e78c09184f320641b8'),('2943f91a50cb11e78c09184f320641b8','a428b83c1a7911e7803f3c970e8f4c17','1f7c435250cb11e78c09184f320641b8'),('3a2172bfe3c211e8be520250f2000002','a171d4ae1a7711e7803f3c970e8f4c17','0B5CBC115A5C53912A0CC68E89539060'),('3a296536e3c211e8be520250f2000002','a171d4ae1a7711e7803f3c970e8f4c17','111d79c5650e11e7a3f7184f320641b8'),('3a2966a2e3c211e8be520250f2000002','a171d4ae1a7711e7803f3c970e8f4c17','ac1201b41a6711e7803f3c970e8f4c17'),('3a2967afe3c211e8be520250f2000002','a171d4ae1a7711e7803f3c970e8f4c17','b61a8b231a6711e7803f3c970e8f4c17'),('3a2968b4e3c211e8be520250f2000002','a171d4ae1a7711e7803f3c970e8f4c17','333659e2e3c211e8be520250f2000002'),('466ca323355611e7a3f56cae8b20846d','af5c990a1c1d11e7a6266cae8b249515','30295d9c1a6711e7803f3c970e8f4c17'),('466cb7ae355611e7a3f56cae8b20846d','af5c990a1c1d11e7a6266cae8b249515','cb5197031a6711e7803f3c970e8f4c17'),('466cba51355611e7a3f56cae8b20846d','af5c990a1c1d11e7a6266cae8b249515','225368e41a6811e7803f3c970e8f4c17'),('466cbc75355611e7a3f56cae8b20846d','af5c990a1c1d11e7a6266cae8b249515','5210610c1a6911e7803f3c970e8f4c17'),('466cbe9e355611e7a3f56cae8b20846d','af5c990a1c1d11e7a6266cae8b249515','b0e692e2296611e7a6266cae8b249515'),('466cc12e355611e7a3f56cae8b20846d','af5c990a1c1d11e7a6266cae8b249515','30375695355611e7a3f56cae8b20846d'),('87e9b06c33b311e7a3f56cae8b20846d','45677a9333b311e7a3f56cae8b20846d','30295d9c1a6711e7803f3c970e8f4c17'),('87ed2aec33b311e7a3f56cae8b20846d','45677a9333b311e7a3f56cae8b20846d','cb5197031a6711e7803f3c970e8f4c17'),('87ed2d6c33b311e7a3f56cae8b20846d','45677a9333b311e7a3f56cae8b20846d','f375a9151a6711e7803f3c970e8f4c17'),('87ed2f9033b311e7a3f56cae8b20846d','45677a9333b311e7a3f56cae8b20846d','225368e41a6811e7803f3c970e8f4c17'),('87ed31af33b311e7a3f56cae8b20846d','45677a9333b311e7a3f56cae8b20846d','69d1b0691a6811e7803f3c970e8f4c17'),('87ed343e33b311e7a3f56cae8b20846d','45677a9333b311e7a3f56cae8b20846d','93bc555d1a6811e7803f3c970e8f4c17'),('87ed361533b311e7a3f56cae8b20846d','45677a9333b311e7a3f56cae8b20846d','ae3247b51a6811e7803f3c970e8f4c17'),('87ed37e233b311e7a3f56cae8b20846d','45677a9333b311e7a3f56cae8b20846d','c16642bb1a6811e7803f3c970e8f4c17'),('87ed39a533b311e7a3f56cae8b20846d','45677a9333b311e7a3f56cae8b20846d','b0e692e2296611e7a6266cae8b249515'),('87ed3b8133b311e7a3f56cae8b20846d','45677a9333b311e7a3f56cae8b20846d','e39e406b316011e7a3f56cae8b20846d'),('c98aecc7e32a11e8be520250f2000002','c08d745ae32a11e8be520250f2000002','111d79c5650e11e7a3f7184f320641b8'),('c994febfe32a11e8be520250f2000002','c08d745ae32a11e8be520250f2000002','ac1201b41a6711e7803f3c970e8f4c17'),('c995028ee32a11e8be520250f2000002','c08d745ae32a11e8be520250f2000002','b61a8b231a6711e7803f3c970e8f4c17'),('c9950ab5e32a11e8be520250f2000002','c08d745ae32a11e8be520250f2000002','0B5CBC115A5C53912A0CC68E89539060'),('e93fd421316011e7a3f56cae8b20846d','7e31094e1c1111e7803f3c970e8f4c17','30295d9c1a6711e7803f3c970e8f4c17'),('e9400fb5316011e7a3f56cae8b20846d','7e31094e1c1111e7803f3c970e8f4c17','cb5197031a6711e7803f3c970e8f4c17'),('e9401230316011e7a3f56cae8b20846d','7e31094e1c1111e7803f3c970e8f4c17','f375a9151a6711e7803f3c970e8f4c17'),('e940144f316011e7a3f56cae8b20846d','7e31094e1c1111e7803f3c970e8f4c17','225368e41a6811e7803f3c970e8f4c17'),('e9401659316011e7a3f56cae8b20846d','7e31094e1c1111e7803f3c970e8f4c17','69d1b0691a6811e7803f3c970e8f4c17'),('e940186e316011e7a3f56cae8b20846d','7e31094e1c1111e7803f3c970e8f4c17','817c1e451a6811e7803f3c970e8f4c17'),('e9401a3a316011e7a3f56cae8b20846d','7e31094e1c1111e7803f3c970e8f4c17','93bc555d1a6811e7803f3c970e8f4c17'),('e9401c11316011e7a3f56cae8b20846d','7e31094e1c1111e7803f3c970e8f4c17','ae3247b51a6811e7803f3c970e8f4c17'),('e9401dd9316011e7a3f56cae8b20846d','7e31094e1c1111e7803f3c970e8f4c17','c16642bb1a6811e7803f3c970e8f4c17'),('e9401fa1316011e7a3f56cae8b20846d','7e31094e1c1111e7803f3c970e8f4c17','e39e406b316011e7a3f56cae8b20846d'),('ffecbff3316011e7a3f56cae8b20846d','2ba871181c1d11e7a6266cae8b249515','30295d9c1a6711e7803f3c970e8f4c17'),('ffecd2ab316011e7a3f56cae8b20846d','2ba871181c1d11e7a6266cae8b249515','cb5197031a6711e7803f3c970e8f4c17'),('ffecd55e316011e7a3f56cae8b20846d','2ba871181c1d11e7a6266cae8b249515','f375a9151a6711e7803f3c970e8f4c17'),('ffecd7bf316011e7a3f56cae8b20846d','2ba871181c1d11e7a6266cae8b249515','225368e41a6811e7803f3c970e8f4c17'),('ffecd9c4316011e7a3f56cae8b20846d','2ba871181c1d11e7a6266cae8b249515','69d1b0691a6811e7803f3c970e8f4c17'),('ffecdbf8316011e7a3f56cae8b20846d','2ba871181c1d11e7a6266cae8b249515','817c1e451a6811e7803f3c970e8f4c17'),('ffecddc4316011e7a3f56cae8b20846d','2ba871181c1d11e7a6266cae8b249515','93bc555d1a6811e7803f3c970e8f4c17'),('ffecdf91316011e7a3f56cae8b20846d','2ba871181c1d11e7a6266cae8b249515','ae3247b51a6811e7803f3c970e8f4c17'),('ffece14f316011e7a3f56cae8b20846d','2ba871181c1d11e7a6266cae8b249515','c16642bb1a6811e7803f3c970e8f4c17'),('ffece316316011e7a3f56cae8b20846d','2ba871181c1d11e7a6266cae8b249515','e39e406b316011e7a3f56cae8b20846d');
/*!40000 ALTER TABLE `t_role_function_map` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_user`
--

DROP TABLE IF EXISTS `t_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_user` (
  `id` varchar(32) NOT NULL,
  `loginname` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `telphone` varchar(15) DEFAULT NULL,
  `lastlogintime` datetime DEFAULT NULL,
  `lastipaddress` varchar(200) DEFAULT NULL,
  `unit` varchar(160) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `charger` varchar(32) DEFAULT NULL,
  `duty` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `sigin` tinyint(1) NOT NULL DEFAULT '0',
  `sortorder` float NOT NULL DEFAULT '100',
  `levelgroup` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `t_user_ix1` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_user`
--

LOCK TABLES `t_user` WRITE;
/*!40000 ALTER TABLE `t_user` DISABLE KEYS */;
INSERT INTO `t_user` VALUES ('fa585205d3050aa123de76e8c68b4032','admin','123456','工作人员','123456','2018-03-29 15:10:29','::ffff:192.168.30.1','73b35a40920411e79cc1184f320641b8','','',0,999,'');
/*!40000 ALTER TABLE `t_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_user_function`
--

DROP TABLE IF EXISTS `t_user_function`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_user_function` (
  `id` varchar(32) NOT NULL,
  `btnid` varchar(200) DEFAULT NULL,
  `description` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `IframeId` varchar(255) DEFAULT NULL,
  `IframeName` varchar(255) DEFAULT NULL,
  `IframeSrc` varchar(255) DEFAULT NULL,
  `ItemId` varchar(255) DEFAULT NULL,
  `ParentsDir` varchar(255) DEFAULT NULL,
  `ParentsId` varchar(255) DEFAULT NULL,
  `orderby` varchar(255) DEFAULT NULL,
  `remark` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `t_user_function_ix1` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_user_function`
--

LOCK TABLES `t_user_function` WRITE;
/*!40000 ALTER TABLE `t_user_function` DISABLE KEYS */;
INSERT INTO `t_user_function` VALUES ('0B5CBC115A5C53912A0CC68E89539060','','管理员管理','jiedian','','','','','','1','2000',NULL),('111d79c5650e11e7a3f7184f320641b8','users_all_btn','用户账号','jiedian','usersui','usersui','/users','useraccount','管理员管理','0B5CBC115A5C53912A0CC68E89539060','2001',NULL),('333659e2e3c211e8be520250f2000002','backup_all_btn','数据库备份','jiedian','backupui','backupui','/backup','backup','管理员管理','0B5CBC115A5C53912A0CC68E89539060','2004','管理数据库备份功能'),('ac1201b41a6711e7803f3c970e8f4c17','users_role_btn','用户角色','jiedian','userroleui','userroleui','/userrole','userrole','管理员管理','0B5CBC115A5C53912A0CC68E89539060','2002','1234'),('b61a8b231a6711e7803f3c970e8f4c17','function_all_btn','功能管理','jiedian','appfunctionui','appfunctionui','/sysfunction','appfunction','管理员管理','0B5CBC115A5C53912A0CC68E89539060','2003',NULL);
/*!40000 ALTER TABLE `t_user_function` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_user_role`
--

DROP TABLE IF EXISTS `t_user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_user_role` (
  `id` varchar(32) NOT NULL,
  `rolename` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `parentid` varchar(32) DEFAULT NULL,
  `description` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `t_user_role_ix1` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_user_role`
--

LOCK TABLES `t_user_role` WRITE;
/*!40000 ALTER TABLE `t_user_role` DISABLE KEYS */;
INSERT INTO `t_user_role` VALUES ('a171d4ae1a7711e7803f3c970e8f4c17','超级管理员','null','系统功能的管理员'),('c08d745ae32a11e8be520250f2000002','操作员','a171d4ae1a7711e7803f3c970e8f4c17','使用系统的主体功能');
/*!40000 ALTER TABLE `t_user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_user_role_relation`
--

DROP TABLE IF EXISTS `t_user_role_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_user_role_relation` (
  `id` varchar(32) NOT NULL,
  `userid` varchar(32) NOT NULL,
  `roleid` varchar(32) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `t_user_role_relation_ix1` (`id`),
  KEY `t_user_role_relation_fk1` (`userid`),
  KEY `t_user_role_relation_fk2` (`roleid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_user_role_relation`
--

LOCK TABLES `t_user_role_relation` WRITE;
/*!40000 ALTER TABLE `t_user_role_relation` DISABLE KEYS */;
INSERT INTO `t_user_role_relation` VALUES ('0188e3ba41c311e7a3f56cae8b20846d','faf5c498ff43beb3b4b8ab10acb8f0ff','6ca3da981c1d11e7a6266cae8b249515'),('020d0aec299011e7a6266cae8b249515','aef260f80934d57bd61767a891239f98','a428b83c1a7911e7803f3c970e8f4c17'),('057f2714299111e7a6266cae8b249515','810ee5d58ad789213c079a9a7e823ae0','a428b83c1a7911e7803f3c970e8f4c17'),('07b38f67299211e7a6266cae8b249515','9b5930681f3ce66943cf3caa6deaa0fc','a428b83c1a7911e7803f3c970e8f4c17'),('086242e5912311e7bf6a184f320641b8','70a52ce7f625596d71b7859f12a4839b','cb445376339911e7a3f56cae8b20846d'),('0a24d0abe6a4610d837bc0e3d1ae5e82','32fbbec6b760aaf78001ab1664c97695','af5c990a1c1d11e7a6266cae8b249515'),('0b50281bf61907c0561ffc91d9334f80','f3e6d0715a0c032cb71493ce20da911b','af5c990a1c1d11e7a6266cae8b249515'),('10a574ee361a65d8a95d3c434a8c39ba','a15fbad24015c90e7f0b475dd7b6808d','af5c990a1c1d11e7a6266cae8b249515'),('11b7a1bc263a11e7a6266cae8b249515','3775d84f6c224a560cb71c339203ecb2','2ba871181c1d11e7a6266cae8b249515'),('140c9468912311e7bf6a184f320641b8','fa50d03c87f4e0871e6508e305965890','cb445376339911e7a3f56cae8b20846d'),('14a8e30e24a311e7a6266cae8b249515','805c280e203ce5673a632761d629bf53','af5c990a1c1d11e7a6266cae8b249515'),('1b514c541ac0c2c2d3f3d840c022a69d','50ff6b67fa5f25eee03e89dc1a7b9ef7','6ca3da981c1d11e7a6266cae8b249515'),('1d5f6a61912311e7bf6a184f320641b8','a74679dabf7e3c03397dacd7fa02103b','cb445376339911e7a3f56cae8b20846d'),('2254baed263a11e7a6266cae8b249515','7d860eed647396d81e6d24a0d47b8fbd','2ba871181c1d11e7a6266cae8b249515'),('26d5bbd5912311e7bf6a184f320641b8','77f41e7cc84c41b33456c13c4a79bad1','cb445376339911e7a3f56cae8b20846d'),('283832f1683111e7a3f7184f320641b8','b65eb2166e23116deea3535df91b342d','a171d4ae1a7711e7803f3c970e8f4c17'),('29e9d4987c8f9b3733f2fa736536dc3a','ac7c10fcda3ca48ce27cb123ade3c69b','af5c990a1c1d11e7a6266cae8b249515'),('2e993da841c311e7a3f56cae8b20846d','fb204e3cfec28404f981c6d872c535e2','6ca3da981c1d11e7a6266cae8b249515'),('34ad080a912311e7bf6a184f320641b8','b38c9f4aec39ca0bac16437fbec2d5aa','cb445376339911e7a3f56cae8b20846d'),('392e0de8d242cd7bbc5653298db3d980','2c6d4ec3581401cd33c175bdc5d6c337','af5c990a1c1d11e7a6266cae8b249515'),('39f0f4d543ac817ef92ec4674fa2aa1a','86d277b24961bb8e1b309c339b2bd355','a428b83c1a7911e7803f3c970e8f4c17'),('403a2365912311e7bf6a184f320641b8','80a72409ed2891311c988d0dc5ee7b09','cb445376339911e7a3f56cae8b20846d'),('4224af9fac8e839ecdf92251fcced8ca','1374213e6df7040a418f931c50d55d2b','af5c990a1c1d11e7a6266cae8b249515'),('44f72bfb299111e7a6266cae8b249515','df4e9ffdb296ed156e4730fd8d102963','a428b83c1a7911e7803f3c970e8f4c17'),('4adc5c95912311e7bf6a184f320641b8','1e6e8ca979a13ac046b68a0ae634fbb9','cb445376339911e7a3f56cae8b20846d'),('51b29c9bd6f104ab756954fff1654544','72563aa9dbce0f43405ae0954a45fb8a','af5c990a1c1d11e7a6266cae8b249515'),('53b69543cd6ec8083e3f8072a88bd5d0','bdd86461249cf05077c627bcdddd9e4b','6ca3da981c1d11e7a6266cae8b249515'),('53c967f4912311e7bf6a184f320641b8','8cef0851b820aee8244c3c428c08e936','cb445376339911e7a3f56cae8b20846d'),('53e2250f83bda0791c2beebc6440da98','f416f75fc0f1058f346081ceee998e18','af5c990a1c1d11e7a6266cae8b249515'),('5c440d96912211e7bf6a184f320641b8','b66c7d74b68116877628161a0c5b4377','cb445376339911e7a3f56cae8b20846d'),('5f4fe93d912311e7bf6a184f320641b8','a82285a94a1a546f866d0139bbd668da','cb445376339911e7a3f56cae8b20846d'),('5fc042923cb1beb82a5bfc20a843ac5c','a4e1a1fec2f850e30bc84747900564ad','6ca3da981c1d11e7a6266cae8b249515'),('608d1b03015aa4b992c317cc142aa16e','81b10a007e3b1b0126feb1c5d36bc6c3','6ca3da981c1d11e7a6266cae8b249515'),('64394d8facb8cc06ed4b1af951405d4f','3ac2ac15672830fa477b8789f66269bf','6ca3da981c1d11e7a6266cae8b249515'),('68b22f88912311e7bf6a184f320641b8','3274f782e3dfce3657ea37d97603aaac','cb445376339911e7a3f56cae8b20846d'),('6972b1079e080f4db6696d86db37d264','cdee790b2eff89502e379a6fc336fc39','af5c990a1c1d11e7a6266cae8b249515'),('6b139e299b35a61692aa400a181d5775','da5cc7da095c0c8c244ed0ee9c054c05','af5c990a1c1d11e7a6266cae8b249515'),('73a238e2912311e7bf6a184f320641b8','4139885f4e6e2cc88406759cc51a81d4','cb445376339911e7a3f56cae8b20846d'),('79812aaf41c111e7a3f56cae8b20846d','dcc816e038381ae2d4f284ca6172f6b6','6ca3da981c1d11e7a6266cae8b249515'),('7e569900912311e7bf6a184f320641b8','eda4e8d0f3e374a85a7235fef15c6d2b','cb445376339911e7a3f56cae8b20846d'),('7e72206454965b2da4fe1540c3318ae9','e1bb96dffa22f30dcb63afa17e1936a9','af5c990a1c1d11e7a6266cae8b249515'),('82d5dea5eea24be9b06a1d54ce50e4a4','fa585205d3050aa123de76e8c68b2030','af5c990a1c1d11e7a6266cae8b249515'),('850d63b2718c8958589c057cf58dccbd','7db64a1176b26d8700e647015566b60f','af5c990a1c1d11e7a6266cae8b249515'),('86acd348299111e7a6266cae8b249515','578d04ec5a77b5dd07496ed854c3d2f6','a428b83c1a7911e7803f3c970e8f4c17'),('895d2bbd912311e7bf6a184f320641b8','c02d347cb75ec4f0cc53ee3c3094e5d1','cb445376339911e7a3f56cae8b20846d'),('8e527fb3f5cb306a6e3db9ef9622fa85','65de7e5038cc93d5fa598606b819459a','af5c990a1c1d11e7a6266cae8b249515'),('933de143912311e7bf6a184f320641b8','adbbdba1b9b065fb4c26589a31ce12d3','cb445376339911e7a3f56cae8b20846d'),('93a66c83670e657fd2aa59b07db96fdb','8b5f0c2ac79519d77224aa3002cc7d0e','af5c990a1c1d11e7a6266cae8b249515'),('990e012580d51c2ae3f8e07eb1a49343','61786674ee13f8a51dae0a9cfd5aa6bd','a428b83c1a7911e7803f3c970e8f4c17'),('9ccf5d5a912311e7bf6a184f320641b8','08d037f77be68899923c29c58df8b10b','cb445376339911e7a3f56cae8b20846d'),('9eda61be8339a0db202d018487251b8f','162c793a42d9af00154c4be628a58209','af5c990a1c1d11e7a6266cae8b249515'),('9ee043aab645aa945cc753aa3ebd77bf','ef3326ec4c98741f336fd97e345dfca1','af5c990a1c1d11e7a6266cae8b249515'),('a1e872d52f35a7a58d2d8030ff8ba486','d317d72570073f856cfaf08ac9074d48','af5c990a1c1d11e7a6266cae8b249515'),('a469543443786f74856da141a679c490','699227ff05de6aaa5c4ed72e8188ef7e','a428b83c1a7911e7803f3c970e8f4c17'),('a5f2d604912311e7bf6a184f320641b8','bc04be82b7742ee456c8bf1766a5ab7c','cb445376339911e7a3f56cae8b20846d'),('ab272f3c2b335fd78c213923b8841a55','f3543d7beaae0fb4f3bac353dc707776','7e31094e1c1111e7803f3c970e8f4c17'),('abe13391299011e7a6266cae8b249515','1c38f2b52168cf6059ac982668dcd161','a428b83c1a7911e7803f3c970e8f4c17'),('b017a011912311e7bf6a184f320641b8','fb9967927ba05b37c8460e390e9c13e1','cb445376339911e7a3f56cae8b20846d'),('b13be64003923fec30ed4bf61ee3ab23','03873e98f52538d944b0143e707d8d97','af5c990a1c1d11e7a6266cae8b249515'),('b22de1e8ade2c8fc744cbc432d1a6290','09bc88170d21220ad417af9b9afb276a','6ca3da981c1d11e7a6266cae8b249515'),('b355a3d6416e5d905ad1bee26b537a7b','06ca93fb1bcd42ebae972f56aba5b72c','af5c990a1c1d11e7a6266cae8b249515'),('b983e28b912311e7bf6a184f320641b8','16016c671c26391e125198622f4258bf','cb445376339911e7a3f56cae8b20846d'),('bb8f3210299111e7a6266cae8b249515','72718d5337529b6ec1a43e7dbc96594e','a428b83c1a7911e7803f3c970e8f4c17'),('be0a7872912111e7bf6a184f320641b8','bd706daac1a497fa45676d6bebb8f73b','cb445376339911e7a3f56cae8b20846d'),('bffb757d6c37a8196269782d21bb9c02','32c3c4a14e3216fb2c17c733baa53107','af5c990a1c1d11e7a6266cae8b249515'),('c1f44a2d3f12855441eb615bf5bc4054','2d527b1fc0ccaa1e02c2bc9937cabf0f','af5c990a1c1d11e7a6266cae8b249515'),('c6ccc11ad76274447caa5183d7de23f3','659ee624269b5d768134334976932709','6ca3da981c1d11e7a6266cae8b249515'),('c73ac5a2912311e7bf6a184f320641b8','6aa06f127bde907cef71518a4f92b888','cb445376339911e7a3f56cae8b20846d'),('c82d1bd95805d9849d86c9eb60d35df4','fa585205d3050aa123de76e8c68b4032','a171d4ae1a7711e7803f3c970e8f4c17'),('cf593c9fc1ce68a006b65efefb6f1de1','25a92055e6d72d7bc752505a23e90e1a','6ca3da981c1d11e7a6266cae8b249515'),('d146659394ec9dbe840ad977b9f7aa34','f416f75fc0f1058f346081ceee999999','af5c990a1c1d11e7a6266cae8b249515'),('d25b5588912011e7bf6a184f320641b8','e7ceee0638d864ec022e8fad3db6209b','cb445376339911e7a3f56cae8b20846d'),('d2f03626316f11e7a3f56cae8b20846d','c3b5ab81f7f838c3122d1bddf2540401','2ba871181c1d11e7a6266cae8b249515'),('d9e8cc9c162983c70872b5afb5de451f','d1de7bad7e25f59ad1ca5e9642586816','6ca3da981c1d11e7a6266cae8b249515'),('ed22bfe98e808efdcdc211d345bd37a3','4627a6d022b4cd3f4a623e322085c53d','6ca3da981c1d11e7a6266cae8b249515'),('efbb08082e3402d494e3ff6d6b97c65c','64659f8c324c563dc6b2fcca18256ead','af5c990a1c1d11e7a6266cae8b249515'),('f0e32c5028c411e7a6266cae8b249515','d07f4c42daf45e1ebe61c7baf26da187','a428b83c1a7911e7803f3c970e8f4c17'),('f5e8d349316e11e7a3f56cae8b20846d','73beaed3212f20b833abc39b995fcd77','2ba871181c1d11e7a6266cae8b249515'),('f83cac8a912211e7bf6a184f320641b8','e4a50e64ed4eb5efbdeee23bf9a81242','cb445376339911e7a3f56cae8b20846d');
/*!40000 ALTER TABLE `t_user_role_relation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_user_unit`
--

DROP TABLE IF EXISTS `t_user_unit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_user_unit` (
  `id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `unit` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createtime` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `groupby` varchar(2) COLLATE utf8_unicode_ci DEFAULT NULL,
  `level` int(2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_user_unit`
--

LOCK TABLES `t_user_unit` WRITE;
/*!40000 ALTER TABLE `t_user_unit` DISABLE KEYS */;
INSERT INTO `t_user_unit` VALUES ('006d59026cf411e79e9d184f320641b8','新都区交通运输局','2017-09-08 15:21:08','2',11),('06a5817d6cf411e79e9d184f320641b8','武侯区交通和市政设施管理局','2017-09-08 15:20:42','1',7),('0c064ffc6cf411e79e9d184f320641b8','龙泉驿区交通运输局','2017-09-08 15:20:55','2',9),('10e0f72d6cf411e79e9d184f320641b8','新津县交通运输局','2017-09-08 15:22:08','2',21),('121a8180652511e7a3f7184f320641b8','锦江区建设和交通局','2017-09-08 15:20:24','1',4),('14fedba26cf411e79e9d184f320641b8','崇州市交通运输局','2017-09-08 15:21:46','2',18),('1982dbd66cf411e79e9d184f320641b8','金牛区建设和交通局','2017-09-08 15:20:37','1',6),('1e163c986cf411e79e9d184f320641b8','天府新区成都管委会规划建设和城市管理局','2017-09-08 15:20:20','2',3),('229460196cf411e79e9d184f320641b8','青白江区交通运输局','2017-09-08 15:21:02','2',10),('27114c9a6cf411e79e9d184f320641b8','温江区交通运输局','2017-09-08 15:21:15','2',12),('2b6cf0906cf411e79e9d184f320641b8','成都高新区规划建设局','2017-09-08 15:20:16','1',2),('2ff1fd626cf411e79e9d184f320641b8','青羊区建设和交通局','2017-09-08 15:20:30','1',5),('3443b7786cf411e79e9d184f320641b8','大邑县交通运输局','2017-09-08 15:22:11','2',22),('73b35a40920411e79cc1184f320641b8','成都市交通运输委员会','2017-09-08 15:19:58','1',1),('8a2dc592684311e7a3f7184f320641b8','成华区交通和市政局','2017-09-08 15:20:48','1',8),('daeadfec6cf311e79e9d184f320641b8','郫都区交通运输局','2017-09-08 15:21:51','2',19),('dff3c89b6cf311e79e9d184f320641b8','金堂县交通运输局','2017-09-08 15:22:01','2',20),('e452add36cf311e79e9d184f320641b8','邛崃市交通运输局','2017-09-08 15:21:38','2',17),('e8e3ce6f6cf311e79e9d184f320641b8','彭州市交通运输局','2017-09-08 15:21:35','2',16),('ee2f44726cf311e79e9d184f320641b8','都江堰市交通运输局','2017-09-08 15:21:30','2',15),('f2f8f9df6cf311e79e9d184f320641b8','蒲江县交通运输局','2017-09-08 15:22:13','2',23),('f73fe6f86cf311e79e9d184f320641b8','双流区交通运输局','2017-09-08 15:21:21','2',13),('fc268de36cf311e79e9d184f320641b8','简阳市交通运输局','2017-09-08 15:21:25','2',14);
/*!40000 ALTER TABLE `t_user_unit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbright`
--

DROP TABLE IF EXISTS `tbright`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbright` (
  `ID` int(11) DEFAULT NULL,
  `sRightName` varchar(250) DEFAULT NULL,
  `sDescription` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbright`
--

LOCK TABLES `tbright` WRITE;
/*!40000 ALTER TABLE `tbright` DISABLE KEYS */;
INSERT INTO `tbright` VALUES (2,'设备管理',NULL),(3,'地图管理',NULL),(4,'车位总揽',NULL),(5,'运维分析',NULL),(6,'设置',NULL),(30006,'菜单:修改我的登录密码',NULL),(30001,'菜单:用户管理',NULL),(30002,'菜单:数据库连接',NULL),(30003,'菜单:数据库初始化',NULL),(30004,'菜单:数据库备份',NULL),(30005,'菜单:数据库还原',NULL);
/*!40000 ALTER TABLE `tbright` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbrole`
--

DROP TABLE IF EXISTS `tbrole`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbrole` (
  `ID` int(11) DEFAULT NULL,
  `sRoleName` varchar(250) DEFAULT NULL,
  `sDescription` longtext,
  `nSystemFlag` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbrole`
--

LOCK TABLES `tbrole` WRITE;
/*!40000 ALTER TABLE `tbrole` DISABLE KEYS */;
INSERT INTO `tbrole` VALUES (1,'管理员','',0),(2,'普通用户','',0),(3,'厂家维护','',0);
/*!40000 ALTER TABLE `tbrole` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbroleright`
--

DROP TABLE IF EXISTS `tbroleright`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbroleright` (
  `ID` int(11) DEFAULT NULL,
  `nRoleID` int(11) DEFAULT NULL,
  `nRightID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbroleright`
--

LOCK TABLES `tbroleright` WRITE;
/*!40000 ALTER TABLE `tbroleright` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbroleright` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbsyssettingcatalog`
--

DROP TABLE IF EXISTS `tbsyssettingcatalog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbsyssettingcatalog` (
  `ID` int(11) DEFAULT NULL,
  `sName` varchar(50) DEFAULT NULL,
  `sComment` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbsyssettingcatalog`
--

LOCK TABLES `tbsyssettingcatalog` WRITE;
/*!40000 ALTER TABLE `tbsyssettingcatalog` DISABLE KEYS */;
INSERT INTO `tbsyssettingcatalog` VALUES (1,'我的',NULL),(2,'系统选项',NULL),(3,'本地设置',NULL);
/*!40000 ALTER TABLE `tbsyssettingcatalog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbsyssettingcmditem`
--

DROP TABLE IF EXISTS `tbsyssettingcmditem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbsyssettingcmditem` (
  `nGroupID` int(11) DEFAULT NULL,
  `nCmdID` int(11) DEFAULT NULL,
  `sName` varchar(50) DEFAULT NULL,
  `sComment` varchar(255) DEFAULT NULL,
  `nRightID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbsyssettingcmditem`
--

LOCK TABLES `tbsyssettingcmditem` WRITE;
/*!40000 ALTER TABLE `tbsyssettingcmditem` DISABLE KEYS */;
INSERT INTO `tbsyssettingcmditem` VALUES (2,30001,'用户管理',NULL,30001),(3,30002,'数据库连接',NULL,30002),(3,30003,'数据库初始化',NULL,30003),(3,30004,'数据库备份',NULL,30004),(3,30005,'数据库还原',NULL,30005),(1,30006,'修改我的登录密码',NULL,30006);
/*!40000 ALTER TABLE `tbsyssettingcmditem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbsyssettinggroup`
--

DROP TABLE IF EXISTS `tbsyssettinggroup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbsyssettinggroup` (
  `ID` int(11) DEFAULT NULL,
  `sName` varchar(50) DEFAULT NULL,
  `nCatalogID` int(11) DEFAULT NULL,
  `sComment` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbsyssettinggroup`
--

LOCK TABLES `tbsyssettinggroup` WRITE;
/*!40000 ALTER TABLE `tbsyssettinggroup` DISABLE KEYS */;
INSERT INTO `tbsyssettinggroup` VALUES (1,'账户管理',1,NULL),(2,'用户管理',2,NULL),(3,'系统设置',3,NULL);
/*!40000 ALTER TABLE `tbsyssettinggroup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbsystemconfig`
--

DROP TABLE IF EXISTS `tbsystemconfig`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbsystemconfig` (
  `ID` int(11) DEFAULT NULL,
  `strCatlog` varchar(250) DEFAULT NULL,
  `strName` varchar(250) DEFAULT NULL,
  `strValue` longtext,
  `sDesc` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbsystemconfig`
--

LOCK TABLES `tbsystemconfig` WRITE;
/*!40000 ALTER TABLE `tbsystemconfig` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbsystemconfig` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbuser`
--

DROP TABLE IF EXISTS `tbuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbuser` (
  `sUserID` varchar(50) DEFAULT NULL,
  `sLoginName` varchar(50) DEFAULT NULL,
  `tCreateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `sName` varchar(100) DEFAULT NULL,
  `sPwd` varchar(50) DEFAULT NULL,
  `nDisableFlag` int(11) DEFAULT NULL,
  `sPhone` varchar(100) DEFAULT NULL,
  `sRemark` longtext,
  `sSex` varchar(10) DEFAULT NULL,
  `sPinyinCode` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbuser`
--

LOCK TABLES `tbuser` WRITE;
/*!40000 ALTER TABLE `tbuser` DISABLE KEYS */;
INSERT INTO `tbuser` VALUES ('admin','admin','2018-11-07 07:04:01','管理员','19A2854144B63A8F7617A6F225019B12',0,NULL,'系统内置管理员',NULL,NULL);
/*!40000 ALTER TABLE `tbuser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbuserrole`
--

DROP TABLE IF EXISTS `tbuserrole`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbuserrole` (
  `ID` int(11) DEFAULT NULL,
  `sUserID` varchar(250) DEFAULT NULL,
  `nRoleID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbuserrole`
--

LOCK TABLES `tbuserrole` WRITE;
/*!40000 ALTER TABLE `tbuserrole` DISABLE KEYS */;
INSERT INTO `tbuserrole` VALUES (1,'admin',3),(2,'admin',1),(3,'admin',2);
/*!40000 ALTER TABLE `tbuserrole` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-11-10 16:10:46
