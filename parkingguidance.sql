/*
Navicat MySQL Data Transfer

Source Server         : 本机
Source Server Version : 50712
Source Host           : localhost:3306
Source Database       : parkingguidance

Target Server Type    : MYSQL
Target Server Version : 50712
File Encoding         : 65001

Date: 2018-11-05 09:42:28
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_deptment
-- ----------------------------
DROP TABLE IF EXISTS `t_deptment`;
CREATE TABLE `t_deptment` (
  `id` varchar(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `deptmentName` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `sortorder` float DEFAULT NULL,
  `charger` varchar(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `isshow` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_deptment
-- ----------------------------
INSERT INTO `t_deptment` VALUES ('5e54a3d7fcc511e7b46a44a842f4c4c8', '合约管理部', '3', 'fa585205d3050aa123de76e8c68b4032', '1');
INSERT INTO `t_deptment` VALUES ('6034e413fb7811e7b46a44a842f4c4c8', '信息港领导', '1', 'fa585205d3050aa123de76e8c68b4032', '0');
INSERT INTO `t_deptment` VALUES ('69f17935fcc511e7b46a44a842f4c4c8', '运行维护部', '7', 'fa585205d3050aa123de76e8c68b4032', '0');
INSERT INTO `t_deptment` VALUES ('6fc8e8fffcc511e7b46a44a842f4c4c8', '财务部', '8', 'fa585205d3050aa123de76e8c68b4032', '0');
INSERT INTO `t_deptment` VALUES ('7851fbadfa8c11e7b46a44a842f4c4c8', '市场部', '5', 'fa585205d3050aa123de76e8c68b4032', '0');
INSERT INTO `t_deptment` VALUES ('7a82d8a5fcc511e7b46a44a842f4c4c8', '系统工程部', '2', 'fa585205d3050aa123de76e8c68b4032', '1');
INSERT INTO `t_deptment` VALUES ('810c4863fa8b11e7b46a44a842f4c4c8', '综合部', '6', '67426e703496cb7027364e2de94e31e4', '0');
INSERT INTO `t_deptment` VALUES ('fa585205d3050aa123de76e8c68b4012', '软件开发部', '4', 'fa585205d3050aa123de76e8c68b4032', '1');

-- ----------------------------
-- Table structure for t_role_function_map
-- ----------------------------
DROP TABLE IF EXISTS `t_role_function_map`;
CREATE TABLE `t_role_function_map` (
  `id` varchar(32) NOT NULL,
  `roleid` varchar(32) NOT NULL,
  `funcid` varchar(32) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `t_role_function_map_ix1` (`id`),
  KEY `t_role_function_map_fk1` (`roleid`),
  KEY `t_role_function_map_fk2` (`funcid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_role_function_map
-- ----------------------------
INSERT INTO `t_role_function_map` VALUES ('002e5c16912111e7bf6a184f320641b8', 'cb445376339911e7a3f56cae8b20846d', '30295d9c1a6711e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('0030dd21912111e7bf6a184f320641b8', 'cb445376339911e7a3f56cae8b20846d', '111d79c5650e11e7a3f7184f320641b8');
INSERT INTO `t_role_function_map` VALUES ('290567e8355611e7a3f56cae8b20846d', '6ca3da981c1d11e7a6266cae8b249515', '30295d9c1a6711e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('29057b0b355611e7a3f56cae8b20846d', '6ca3da981c1d11e7a6266cae8b249515', 'cb5197031a6711e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('29057d96355611e7a3f56cae8b20846d', '6ca3da981c1d11e7a6266cae8b249515', '225368e41a6811e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('29057fce355611e7a3f56cae8b20846d', '6ca3da981c1d11e7a6266cae8b249515', '69d1b0691a6811e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('29058234355611e7a3f56cae8b20846d', '6ca3da981c1d11e7a6266cae8b249515', '93bc555d1a6811e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('29058477355611e7a3f56cae8b20846d', '6ca3da981c1d11e7a6266cae8b249515', 'ae3247b51a6811e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('29059977355611e7a3f56cae8b20846d', '6ca3da981c1d11e7a6266cae8b249515', '5210610c1a6911e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('29059e49355611e7a3f56cae8b20846d', '6ca3da981c1d11e7a6266cae8b249515', '20740cfe355611e7a3f56cae8b20846d');
INSERT INTO `t_role_function_map` VALUES ('2940ea1850cb11e78c09184f320641b8', 'a428b83c1a7911e7803f3c970e8f4c17', '30295d9c1a6711e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('2943dfa050cb11e78c09184f320641b8', 'a428b83c1a7911e7803f3c970e8f4c17', '4afb458c1a6711e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('2943e12950cb11e78c09184f320641b8', 'a428b83c1a7911e7803f3c970e8f4c17', '5b3008af1a6711e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('2943e22e50cb11e78c09184f320641b8', 'a428b83c1a7911e7803f3c970e8f4c17', '6bd6338e1a6711e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('2943e32250cb11e78c09184f320641b8', 'a428b83c1a7911e7803f3c970e8f4c17', '7bdf24061a6711e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('2943e41e50cb11e78c09184f320641b8', 'a428b83c1a7911e7803f3c970e8f4c17', '8567708d1a6711e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('2943e4f050cb11e78c09184f320641b8', 'a428b83c1a7911e7803f3c970e8f4c17', 'cb5197031a6711e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('2943e5c650cb11e78c09184f320641b8', 'a428b83c1a7911e7803f3c970e8f4c17', 'd4d32fa51a6711e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('2943e69c50cb11e78c09184f320641b8', 'a428b83c1a7911e7803f3c970e8f4c17', 'dec250e01a6711e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('2943e75c50cb11e78c09184f320641b8', 'a428b83c1a7911e7803f3c970e8f4c17', 'e6d71b641a6711e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('2943e82150cb11e78c09184f320641b8', 'a428b83c1a7911e7803f3c970e8f4c17', 'f375a9151a6711e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('2943e92e50cb11e78c09184f320641b8', 'a428b83c1a7911e7803f3c970e8f4c17', '03812c2e1a6811e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('2943ea0c50cb11e78c09184f320641b8', 'a428b83c1a7911e7803f3c970e8f4c17', '0b1da2271a6811e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('2943eaeb50cb11e78c09184f320641b8', 'a428b83c1a7911e7803f3c970e8f4c17', '12e2c74c1a6811e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('2943ebbc50cb11e78c09184f320641b8', 'a428b83c1a7911e7803f3c970e8f4c17', '225368e41a6811e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('2943ec9b50cb11e78c09184f320641b8', 'a428b83c1a7911e7803f3c970e8f4c17', '2c8663551a6811e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('2943ed8650cb11e78c09184f320641b8', 'a428b83c1a7911e7803f3c970e8f4c17', '3a1e6b0c1a6811e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('2943ee6950cb11e78c09184f320641b8', 'a428b83c1a7911e7803f3c970e8f4c17', '479a3dd81a6811e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('2943ef5050cb11e78c09184f320641b8', 'a428b83c1a7911e7803f3c970e8f4c17', 'b0e692e2296611e7a6266cae8b249515');
INSERT INTO `t_role_function_map` VALUES ('2943f03b50cb11e78c09184f320641b8', 'a428b83c1a7911e7803f3c970e8f4c17', 'b9e90527296611e7a6266cae8b249515');
INSERT INTO `t_role_function_map` VALUES ('2943f11950cb11e78c09184f320641b8', 'a428b83c1a7911e7803f3c970e8f4c17', 'c154fdad296611e7a6266cae8b249515');
INSERT INTO `t_role_function_map` VALUES ('2943f1ef50cb11e78c09184f320641b8', 'a428b83c1a7911e7803f3c970e8f4c17', 'c72cc412296611e7a6266cae8b249515');
INSERT INTO `t_role_function_map` VALUES ('2943f2bc50cb11e78c09184f320641b8', 'a428b83c1a7911e7803f3c970e8f4c17', 'e98e01a5355a11e7a3f56cae8b20846d');
INSERT INTO `t_role_function_map` VALUES ('2943f39b50cb11e78c09184f320641b8', 'a428b83c1a7911e7803f3c970e8f4c17', '063a7c3e355b11e7a3f56cae8b20846d');
INSERT INTO `t_role_function_map` VALUES ('2943f47550cb11e78c09184f320641b8', 'a428b83c1a7911e7803f3c970e8f4c17', '0fd687cd355b11e7a3f56cae8b20846d');
INSERT INTO `t_role_function_map` VALUES ('2943f57a50cb11e78c09184f320641b8', 'a428b83c1a7911e7803f3c970e8f4c17', '17a29a1e355b11e7a3f56cae8b20846d');
INSERT INTO `t_role_function_map` VALUES ('2943f65850cb11e78c09184f320641b8', 'a428b83c1a7911e7803f3c970e8f4c17', '10767d8950cb11e78c09184f320641b8');
INSERT INTO `t_role_function_map` VALUES ('2943f74c50cb11e78c09184f320641b8', 'a428b83c1a7911e7803f3c970e8f4c17', '15a5ca9050cb11e78c09184f320641b8');
INSERT INTO `t_role_function_map` VALUES ('2943f83b50cb11e78c09184f320641b8', 'a428b83c1a7911e7803f3c970e8f4c17', '1b4bcdbc50cb11e78c09184f320641b8');
INSERT INTO `t_role_function_map` VALUES ('2943f91a50cb11e78c09184f320641b8', 'a428b83c1a7911e7803f3c970e8f4c17', '1f7c435250cb11e78c09184f320641b8');
INSERT INTO `t_role_function_map` VALUES ('466ca323355611e7a3f56cae8b20846d', 'af5c990a1c1d11e7a6266cae8b249515', '30295d9c1a6711e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('466cb7ae355611e7a3f56cae8b20846d', 'af5c990a1c1d11e7a6266cae8b249515', 'cb5197031a6711e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('466cba51355611e7a3f56cae8b20846d', 'af5c990a1c1d11e7a6266cae8b249515', '225368e41a6811e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('466cbc75355611e7a3f56cae8b20846d', 'af5c990a1c1d11e7a6266cae8b249515', '5210610c1a6911e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('466cbe9e355611e7a3f56cae8b20846d', 'af5c990a1c1d11e7a6266cae8b249515', 'b0e692e2296611e7a6266cae8b249515');
INSERT INTO `t_role_function_map` VALUES ('466cc12e355611e7a3f56cae8b20846d', 'af5c990a1c1d11e7a6266cae8b249515', '30375695355611e7a3f56cae8b20846d');
INSERT INTO `t_role_function_map` VALUES ('87e9b06c33b311e7a3f56cae8b20846d', '45677a9333b311e7a3f56cae8b20846d', '30295d9c1a6711e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('87ed2aec33b311e7a3f56cae8b20846d', '45677a9333b311e7a3f56cae8b20846d', 'cb5197031a6711e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('87ed2d6c33b311e7a3f56cae8b20846d', '45677a9333b311e7a3f56cae8b20846d', 'f375a9151a6711e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('87ed2f9033b311e7a3f56cae8b20846d', '45677a9333b311e7a3f56cae8b20846d', '225368e41a6811e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('87ed31af33b311e7a3f56cae8b20846d', '45677a9333b311e7a3f56cae8b20846d', '69d1b0691a6811e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('87ed343e33b311e7a3f56cae8b20846d', '45677a9333b311e7a3f56cae8b20846d', '93bc555d1a6811e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('87ed361533b311e7a3f56cae8b20846d', '45677a9333b311e7a3f56cae8b20846d', 'ae3247b51a6811e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('87ed37e233b311e7a3f56cae8b20846d', '45677a9333b311e7a3f56cae8b20846d', 'c16642bb1a6811e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('87ed39a533b311e7a3f56cae8b20846d', '45677a9333b311e7a3f56cae8b20846d', 'b0e692e2296611e7a6266cae8b249515');
INSERT INTO `t_role_function_map` VALUES ('87ed3b8133b311e7a3f56cae8b20846d', '45677a9333b311e7a3f56cae8b20846d', 'e39e406b316011e7a3f56cae8b20846d');
INSERT INTO `t_role_function_map` VALUES ('e6ea003d920311e79cc1184f320641b8', 'a171d4ae1a7711e7803f3c970e8f4c17', '30295d9c1a6711e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('e6f15cba920311e79cc1184f320641b8', 'a171d4ae1a7711e7803f3c970e8f4c17', '4afb458c1a6711e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('e6f15dd4920311e79cc1184f320641b8', 'a171d4ae1a7711e7803f3c970e8f4c17', '5b3008af1a6711e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('e6f15ee1920311e79cc1184f320641b8', 'a171d4ae1a7711e7803f3c970e8f4c17', '6bd6338e1a6711e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('e6f15f7b920311e79cc1184f320641b8', 'a171d4ae1a7711e7803f3c970e8f4c17', '7bdf24061a6711e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('e6f160af920311e79cc1184f320641b8', 'a171d4ae1a7711e7803f3c970e8f4c17', '8567708d1a6711e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('e6f161d6920311e79cc1184f320641b8', 'a171d4ae1a7711e7803f3c970e8f4c17', 'ac1201b41a6711e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('e6f162b0920311e79cc1184f320641b8', 'a171d4ae1a7711e7803f3c970e8f4c17', 'b61a8b231a6711e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('e6f16382920311e79cc1184f320641b8', 'a171d4ae1a7711e7803f3c970e8f4c17', '111d79c5650e11e7a3f7184f320641b8');
INSERT INTO `t_role_function_map` VALUES ('e6f16464920311e79cc1184f320641b8', 'a171d4ae1a7711e7803f3c970e8f4c17', 'e252451c920311e79cc1184f320641b8');
INSERT INTO `t_role_function_map` VALUES ('e93fd421316011e7a3f56cae8b20846d', '7e31094e1c1111e7803f3c970e8f4c17', '30295d9c1a6711e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('e9400fb5316011e7a3f56cae8b20846d', '7e31094e1c1111e7803f3c970e8f4c17', 'cb5197031a6711e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('e9401230316011e7a3f56cae8b20846d', '7e31094e1c1111e7803f3c970e8f4c17', 'f375a9151a6711e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('e940144f316011e7a3f56cae8b20846d', '7e31094e1c1111e7803f3c970e8f4c17', '225368e41a6811e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('e9401659316011e7a3f56cae8b20846d', '7e31094e1c1111e7803f3c970e8f4c17', '69d1b0691a6811e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('e940186e316011e7a3f56cae8b20846d', '7e31094e1c1111e7803f3c970e8f4c17', '817c1e451a6811e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('e9401a3a316011e7a3f56cae8b20846d', '7e31094e1c1111e7803f3c970e8f4c17', '93bc555d1a6811e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('e9401c11316011e7a3f56cae8b20846d', '7e31094e1c1111e7803f3c970e8f4c17', 'ae3247b51a6811e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('e9401dd9316011e7a3f56cae8b20846d', '7e31094e1c1111e7803f3c970e8f4c17', 'c16642bb1a6811e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('e9401fa1316011e7a3f56cae8b20846d', '7e31094e1c1111e7803f3c970e8f4c17', 'e39e406b316011e7a3f56cae8b20846d');
INSERT INTO `t_role_function_map` VALUES ('ffecbff3316011e7a3f56cae8b20846d', '2ba871181c1d11e7a6266cae8b249515', '30295d9c1a6711e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('ffecd2ab316011e7a3f56cae8b20846d', '2ba871181c1d11e7a6266cae8b249515', 'cb5197031a6711e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('ffecd55e316011e7a3f56cae8b20846d', '2ba871181c1d11e7a6266cae8b249515', 'f375a9151a6711e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('ffecd7bf316011e7a3f56cae8b20846d', '2ba871181c1d11e7a6266cae8b249515', '225368e41a6811e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('ffecd9c4316011e7a3f56cae8b20846d', '2ba871181c1d11e7a6266cae8b249515', '69d1b0691a6811e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('ffecdbf8316011e7a3f56cae8b20846d', '2ba871181c1d11e7a6266cae8b249515', '817c1e451a6811e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('ffecddc4316011e7a3f56cae8b20846d', '2ba871181c1d11e7a6266cae8b249515', '93bc555d1a6811e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('ffecdf91316011e7a3f56cae8b20846d', '2ba871181c1d11e7a6266cae8b249515', 'ae3247b51a6811e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('ffece14f316011e7a3f56cae8b20846d', '2ba871181c1d11e7a6266cae8b249515', 'c16642bb1a6811e7803f3c970e8f4c17');
INSERT INTO `t_role_function_map` VALUES ('ffece316316011e7a3f56cae8b20846d', '2ba871181c1d11e7a6266cae8b249515', 'e39e406b316011e7a3f56cae8b20846d');

-- ----------------------------
-- Table structure for t_user
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
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

-- ----------------------------
-- Records of t_user
-- ----------------------------
INSERT INTO `t_user` VALUES ('08d037f77be68899923c29c58df8b10b', 'pzsjt_cx', '08d037f77be6', '工作人员', '', '2018-05-09 09:58:22', '::ffff:117.176.252.90', 'e8e3ce6f6cf311e79e9d184f320641b8', '', '', '1', '1', '区县交通局');
INSERT INTO `t_user` VALUES ('16016c671c26391e125198622f4258bf', 'slqjt_cx', '16016c671c26', '工作人员', '', '2017-09-04 13:47:35', '::1', 'f73fe6f86cf311e79e9d184f320641b8', '', '', '0', '1', '区县交通局');
INSERT INTO `t_user` VALUES ('1e6e8ca979a13ac046b68a0ae634fbb9', 'wjqjt_cx', '1e6e8ca979a1', '工作人员', '', '2018-05-08 09:20:17', '::ffff:222.212.24.80', '27114c9a6cf411e79e9d184f320641b8', '', '', '1', '1', '区县交通局');
INSERT INTO `t_user` VALUES ('3274f782e3dfce3657ea37d97603aaac', 'dyxjt_cx', '3274f782e3df', '工作人员', '', '2018-04-03 10:12:07', '::ffff:125.70.106.88', '3443b7786cf411e79e9d184f320641b8', '', '', '1', '1', '区县交通局');
INSERT INTO `t_user` VALUES ('4139885f4e6e2cc88406759cc51a81d4', 'chqjt_cx', '4139885f4e6e', '工作人员', '', '2018-03-13 15:25:19', '::ffff:125.70.210.10', '8a2dc592684311e7a3f7184f320641b8', '', '', '1', '1', '区县交通局');
INSERT INTO `t_user` VALUES ('6aa06f127bde907cef71518a4f92b888', 'jysjt_cx', '6aa06f127bde', '工作人员', '', '2017-09-04 11:47:31', '', 'fc268de36cf311e79e9d184f320641b8', '', '', '0', '1', '区县交通局');
INSERT INTO `t_user` VALUES ('70a52ce7f625596d71b7859f12a4839b', 'xjxjt_cx', 'zfd123', '工作人员', '', '2018-05-10 09:21:39', '::ffff:119.6.249.171', '10e0f72d6cf411e79e9d184f320641b8', '', '', '1', '1', '区县交通局');
INSERT INTO `t_user` VALUES ('77f41e7cc84c41b33456c13c4a79bad1', 'jnqjt_cx', '77f41e7cc84c', '工作人员', '', '2018-05-21 10:13:35', '::ffff:221.237.151.188', '1982dbd66cf411e79e9d184f320641b8', '', '', '1', '1', '区县交通局');
INSERT INTO `t_user` VALUES ('80a72409ed2891311c988d0dc5ee7b09', 'qbjqjt_cx', '80a72409ed28', '工作人员', '', '2018-05-14 15:49:21', '::ffff:182.139.133.110', '229460196cf411e79e9d184f320641b8', '', '', '1', '1', '区县交通局');
INSERT INTO `t_user` VALUES ('8cef0851b820aee8244c3c428c08e936', 'gxqjt_cx', '8cef0851b820', '工作人员', '', '2017-09-13 14:29:39', '::1', '2b6cf0906cf411e79e9d184f320641b8', '', '', '1', '1', '区县交通局');
INSERT INTO `t_user` VALUES ('a74679dabf7e3c03397dacd7fa02103b', 'czsjt_cx', 'a74679dabf7e', '工作人员', '', '2017-10-13 20:42:19', '::1', '14fedba26cf411e79e9d184f320641b8', '', '', '1', '1', '区县交通局');
INSERT INTO `t_user` VALUES ('a82285a94a1a546f866d0139bbd668da', 'qyqjt_cx', 'a82285a94a1a', '工作人员', '', '2018-02-28 14:53:44', '::ffff:222.209.71.56', '2ff1fd626cf411e79e9d184f320641b8', '', '', '1', '1', '区县交通局');
INSERT INTO `t_user` VALUES ('adbbdba1b9b065fb4c26589a31ce12d3', 'qlsjt_cx', 'adbbdba1b9b0', '工作人员', '', '2017-09-04 11:46:04', '', 'e452add36cf311e79e9d184f320641b8', '', '', '0', '1', '区县交通局');
INSERT INTO `t_user` VALUES ('b38c9f4aec39ca0bac16437fbec2d5aa', 'tfxqjt_cx', 'b38c9f4aec39', '工作人员', '', '2018-05-08 13:04:10', '::ffff:171.213.58.50', '1e163c986cf411e79e9d184f320641b8', '', '', '1', '1', '区县交通局');
INSERT INTO `t_user` VALUES ('b66c7d74b68116877628161a0c5b4377', 'whqjt_cx', 'b66c7d74b681', '工作人员', '', '2018-05-10 13:46:45', '::ffff:118.113.3.63', '06a5817d6cf411e79e9d184f320641b8', '', '', '1', '1', '区县交通局');
INSERT INTO `t_user` VALUES ('bc04be82b7742ee456c8bf1766a5ab7c', 'djyjt_cx', 'bc04be82b774', '工作人员', '', '2018-05-09 10:02:30', '::ffff:125.70.242.31', 'ee2f44726cf311e79e9d184f320641b8', '', '', '1', '1', '区县交通局');
INSERT INTO `t_user` VALUES ('c02d347cb75ec4f0cc53ee3c3094e5d1', 'jtxjt_cx', 'c02d347cb75e', '工作人员', '', '2018-05-07 14:13:42', '::ffff:171.221.97.99', 'dff3c89b6cf311e79e9d184f320641b8', '', '', '1', '1', '区县交通局');
INSERT INTO `t_user` VALUES ('e4a50e64ed4eb5efbdeee23bf9a81242', 'lqyqjt_cx', '147258', '工作人员', '', '2018-05-15 09:42:46', '::ffff:171.217.54.126', '0c064ffc6cf411e79e9d184f320641b8', '', '', '1', '1', '区县交通局');
INSERT INTO `t_user` VALUES ('e7ceee0638d864ec022e8fad3db6209b', 'xdqjt_cx', 'e7ceee0638d8', '工作人员', '', '2018-05-10 10:26:57', '::ffff:119.6.249.52', '006d59026cf411e79e9d184f320641b8', '', '', '1', '1', '区县交通局');
INSERT INTO `t_user` VALUES ('eda4e8d0f3e374a85a7235fef15c6d2b', 'pdqjt_cx', 'eda4e8d0f3e3', '工作人员', '', '2017-12-19 14:34:39', '::ffff:171.221.176.6', 'daeadfec6cf311e79e9d184f320641b8', '', '', '1', '1', '区县交通局');
INSERT INTO `t_user` VALUES ('fa50d03c87f4e0871e6508e305965890', 'jjqjt_cx', 'fa50d03c87f4', '工作人员', '', '2018-05-09 09:36:40', '::ffff:117.173.150.194', '121a8180652511e7a3f7184f320641b8', '', '', '1', '1', '区县交通局');
INSERT INTO `t_user` VALUES ('fa585205d3050aa123de76e8c68b4032', 'admin', '123456', '工作人员', '', '2018-03-29 15:10:29', '::ffff:192.168.30.1', '73b35a40920411e79cc1184f320641b8', '', '', '0', '999', '');
INSERT INTO `t_user` VALUES ('fb9967927ba05b37c8460e390e9c13e1', 'pjxjt_cx', 'fb9967927ba0', '工作人员', '', '2018-05-08 14:12:29', '::ffff:220.166.204.71', 'f2f8f9df6cf311e79e9d184f320641b8', '', '', '1', '1', '区县交通局');

-- ----------------------------
-- Table structure for t_user_function
-- ----------------------------
DROP TABLE IF EXISTS `t_user_function`;
CREATE TABLE `t_user_function` (
  `id` varchar(32) NOT NULL,
  `funccode` int(11) NOT NULL,
  `btnid` varchar(200) DEFAULT NULL,
  `description` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `t_user_function_ix1` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_user_function
-- ----------------------------
INSERT INTO `t_user_function` VALUES ('111d79c5650e11e7a3f7184f320641b8', '10', 'postPDF_edit_btn', '查看收文');
INSERT INTO `t_user_function` VALUES ('30295d9c1a6711e7803f3c970e8f4c17', '1', null, '修改密码');
INSERT INTO `t_user_function` VALUES ('4afb458c1a6711e7803f3c970e8f4c17', '2', null, '重置密码');
INSERT INTO `t_user_function` VALUES ('5210610c1a6911e7803f3c970e8f4c17', '9', null, '接收任务');
INSERT INTO `t_user_function` VALUES ('5b3008af1a6711e7803f3c970e8f4c17', '3', null, '查询用户账号');
INSERT INTO `t_user_function` VALUES ('6bd6338e1a6711e7803f3c970e8f4c17', '4', 'users_add_btn', '新增用户账号');
INSERT INTO `t_user_function` VALUES ('7bdf24061a6711e7803f3c970e8f4c17', '5', 'users_edit_btn', '修改用户账号');
INSERT INTO `t_user_function` VALUES ('8567708d1a6711e7803f3c970e8f4c17', '6', 'users_del_btn', '删除用户账号');
INSERT INTO `t_user_function` VALUES ('ac1201b41a6711e7803f3c970e8f4c17', '7', 'users_role_btn', '用户角色管理');
INSERT INTO `t_user_function` VALUES ('b61a8b231a6711e7803f3c970e8f4c17', '8', 'sys_all_btn', 'APP功能管理');
INSERT INTO `t_user_function` VALUES ('e252451c920311e79cc1184f320641b8', '11', 'unit_all_btn', '单位管理');

-- ----------------------------
-- Table structure for t_user_role
-- ----------------------------
DROP TABLE IF EXISTS `t_user_role`;
CREATE TABLE `t_user_role` (
  `id` varchar(32) NOT NULL,
  `rolename` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `parentid` varchar(32) DEFAULT NULL,
  `description` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `t_user_role_ix1` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_user_role
-- ----------------------------
INSERT INTO `t_user_role` VALUES ('a171d4ae1a7711e7803f3c970e8f4c17', '管理员', null, 'PC端系统管理');
INSERT INTO `t_user_role` VALUES ('cb445376339911e7a3f56cae8b20846d', '区县交通局', '2ba871181c1d11e7a6266cae8b249515', '执行任务');

-- ----------------------------
-- Table structure for t_user_role_relation
-- ----------------------------
DROP TABLE IF EXISTS `t_user_role_relation`;
CREATE TABLE `t_user_role_relation` (
  `id` varchar(32) NOT NULL,
  `userid` varchar(32) NOT NULL,
  `roleid` varchar(32) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `t_user_role_relation_ix1` (`id`),
  KEY `t_user_role_relation_fk1` (`userid`),
  KEY `t_user_role_relation_fk2` (`roleid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_user_role_relation
-- ----------------------------
INSERT INTO `t_user_role_relation` VALUES ('0188e3ba41c311e7a3f56cae8b20846d', 'faf5c498ff43beb3b4b8ab10acb8f0ff', '6ca3da981c1d11e7a6266cae8b249515');
INSERT INTO `t_user_role_relation` VALUES ('020d0aec299011e7a6266cae8b249515', 'aef260f80934d57bd61767a891239f98', 'a428b83c1a7911e7803f3c970e8f4c17');
INSERT INTO `t_user_role_relation` VALUES ('057f2714299111e7a6266cae8b249515', '810ee5d58ad789213c079a9a7e823ae0', 'a428b83c1a7911e7803f3c970e8f4c17');
INSERT INTO `t_user_role_relation` VALUES ('07b38f67299211e7a6266cae8b249515', '9b5930681f3ce66943cf3caa6deaa0fc', 'a428b83c1a7911e7803f3c970e8f4c17');
INSERT INTO `t_user_role_relation` VALUES ('086242e5912311e7bf6a184f320641b8', '70a52ce7f625596d71b7859f12a4839b', 'cb445376339911e7a3f56cae8b20846d');
INSERT INTO `t_user_role_relation` VALUES ('0a24d0abe6a4610d837bc0e3d1ae5e82', '32fbbec6b760aaf78001ab1664c97695', 'af5c990a1c1d11e7a6266cae8b249515');
INSERT INTO `t_user_role_relation` VALUES ('0b50281bf61907c0561ffc91d9334f80', 'f3e6d0715a0c032cb71493ce20da911b', 'af5c990a1c1d11e7a6266cae8b249515');
INSERT INTO `t_user_role_relation` VALUES ('10a574ee361a65d8a95d3c434a8c39ba', 'a15fbad24015c90e7f0b475dd7b6808d', 'af5c990a1c1d11e7a6266cae8b249515');
INSERT INTO `t_user_role_relation` VALUES ('11b7a1bc263a11e7a6266cae8b249515', '3775d84f6c224a560cb71c339203ecb2', '2ba871181c1d11e7a6266cae8b249515');
INSERT INTO `t_user_role_relation` VALUES ('140c9468912311e7bf6a184f320641b8', 'fa50d03c87f4e0871e6508e305965890', 'cb445376339911e7a3f56cae8b20846d');
INSERT INTO `t_user_role_relation` VALUES ('14a8e30e24a311e7a6266cae8b249515', '805c280e203ce5673a632761d629bf53', 'af5c990a1c1d11e7a6266cae8b249515');
INSERT INTO `t_user_role_relation` VALUES ('1b514c541ac0c2c2d3f3d840c022a69d', '50ff6b67fa5f25eee03e89dc1a7b9ef7', '6ca3da981c1d11e7a6266cae8b249515');
INSERT INTO `t_user_role_relation` VALUES ('1d5f6a61912311e7bf6a184f320641b8', 'a74679dabf7e3c03397dacd7fa02103b', 'cb445376339911e7a3f56cae8b20846d');
INSERT INTO `t_user_role_relation` VALUES ('2254baed263a11e7a6266cae8b249515', '7d860eed647396d81e6d24a0d47b8fbd', '2ba871181c1d11e7a6266cae8b249515');
INSERT INTO `t_user_role_relation` VALUES ('26d5bbd5912311e7bf6a184f320641b8', '77f41e7cc84c41b33456c13c4a79bad1', 'cb445376339911e7a3f56cae8b20846d');
INSERT INTO `t_user_role_relation` VALUES ('283832f1683111e7a3f7184f320641b8', 'b65eb2166e23116deea3535df91b342d', 'a171d4ae1a7711e7803f3c970e8f4c17');
INSERT INTO `t_user_role_relation` VALUES ('29e9d4987c8f9b3733f2fa736536dc3a', 'ac7c10fcda3ca48ce27cb123ade3c69b', 'af5c990a1c1d11e7a6266cae8b249515');
INSERT INTO `t_user_role_relation` VALUES ('2e993da841c311e7a3f56cae8b20846d', 'fb204e3cfec28404f981c6d872c535e2', '6ca3da981c1d11e7a6266cae8b249515');
INSERT INTO `t_user_role_relation` VALUES ('34ad080a912311e7bf6a184f320641b8', 'b38c9f4aec39ca0bac16437fbec2d5aa', 'cb445376339911e7a3f56cae8b20846d');
INSERT INTO `t_user_role_relation` VALUES ('392e0de8d242cd7bbc5653298db3d980', '2c6d4ec3581401cd33c175bdc5d6c337', 'af5c990a1c1d11e7a6266cae8b249515');
INSERT INTO `t_user_role_relation` VALUES ('39f0f4d543ac817ef92ec4674fa2aa1a', '86d277b24961bb8e1b309c339b2bd355', 'a428b83c1a7911e7803f3c970e8f4c17');
INSERT INTO `t_user_role_relation` VALUES ('403a2365912311e7bf6a184f320641b8', '80a72409ed2891311c988d0dc5ee7b09', 'cb445376339911e7a3f56cae8b20846d');
INSERT INTO `t_user_role_relation` VALUES ('4224af9fac8e839ecdf92251fcced8ca', '1374213e6df7040a418f931c50d55d2b', 'af5c990a1c1d11e7a6266cae8b249515');
INSERT INTO `t_user_role_relation` VALUES ('44f72bfb299111e7a6266cae8b249515', 'df4e9ffdb296ed156e4730fd8d102963', 'a428b83c1a7911e7803f3c970e8f4c17');
INSERT INTO `t_user_role_relation` VALUES ('4adc5c95912311e7bf6a184f320641b8', '1e6e8ca979a13ac046b68a0ae634fbb9', 'cb445376339911e7a3f56cae8b20846d');
INSERT INTO `t_user_role_relation` VALUES ('51b29c9bd6f104ab756954fff1654544', '72563aa9dbce0f43405ae0954a45fb8a', 'af5c990a1c1d11e7a6266cae8b249515');
INSERT INTO `t_user_role_relation` VALUES ('53b69543cd6ec8083e3f8072a88bd5d0', 'bdd86461249cf05077c627bcdddd9e4b', '6ca3da981c1d11e7a6266cae8b249515');
INSERT INTO `t_user_role_relation` VALUES ('53c967f4912311e7bf6a184f320641b8', '8cef0851b820aee8244c3c428c08e936', 'cb445376339911e7a3f56cae8b20846d');
INSERT INTO `t_user_role_relation` VALUES ('53e2250f83bda0791c2beebc6440da98', 'f416f75fc0f1058f346081ceee998e18', 'af5c990a1c1d11e7a6266cae8b249515');
INSERT INTO `t_user_role_relation` VALUES ('5c440d96912211e7bf6a184f320641b8', 'b66c7d74b68116877628161a0c5b4377', 'cb445376339911e7a3f56cae8b20846d');
INSERT INTO `t_user_role_relation` VALUES ('5f4fe93d912311e7bf6a184f320641b8', 'a82285a94a1a546f866d0139bbd668da', 'cb445376339911e7a3f56cae8b20846d');
INSERT INTO `t_user_role_relation` VALUES ('5fc042923cb1beb82a5bfc20a843ac5c', 'a4e1a1fec2f850e30bc84747900564ad', '6ca3da981c1d11e7a6266cae8b249515');
INSERT INTO `t_user_role_relation` VALUES ('608d1b03015aa4b992c317cc142aa16e', '81b10a007e3b1b0126feb1c5d36bc6c3', '6ca3da981c1d11e7a6266cae8b249515');
INSERT INTO `t_user_role_relation` VALUES ('64394d8facb8cc06ed4b1af951405d4f', '3ac2ac15672830fa477b8789f66269bf', '6ca3da981c1d11e7a6266cae8b249515');
INSERT INTO `t_user_role_relation` VALUES ('68b22f88912311e7bf6a184f320641b8', '3274f782e3dfce3657ea37d97603aaac', 'cb445376339911e7a3f56cae8b20846d');
INSERT INTO `t_user_role_relation` VALUES ('6972b1079e080f4db6696d86db37d264', 'cdee790b2eff89502e379a6fc336fc39', 'af5c990a1c1d11e7a6266cae8b249515');
INSERT INTO `t_user_role_relation` VALUES ('6b139e299b35a61692aa400a181d5775', 'da5cc7da095c0c8c244ed0ee9c054c05', 'af5c990a1c1d11e7a6266cae8b249515');
INSERT INTO `t_user_role_relation` VALUES ('73a238e2912311e7bf6a184f320641b8', '4139885f4e6e2cc88406759cc51a81d4', 'cb445376339911e7a3f56cae8b20846d');
INSERT INTO `t_user_role_relation` VALUES ('79812aaf41c111e7a3f56cae8b20846d', 'dcc816e038381ae2d4f284ca6172f6b6', '6ca3da981c1d11e7a6266cae8b249515');
INSERT INTO `t_user_role_relation` VALUES ('7e569900912311e7bf6a184f320641b8', 'eda4e8d0f3e374a85a7235fef15c6d2b', 'cb445376339911e7a3f56cae8b20846d');
INSERT INTO `t_user_role_relation` VALUES ('7e72206454965b2da4fe1540c3318ae9', 'e1bb96dffa22f30dcb63afa17e1936a9', 'af5c990a1c1d11e7a6266cae8b249515');
INSERT INTO `t_user_role_relation` VALUES ('82d5dea5eea24be9b06a1d54ce50e4a4', 'fa585205d3050aa123de76e8c68b2030', 'af5c990a1c1d11e7a6266cae8b249515');
INSERT INTO `t_user_role_relation` VALUES ('850d63b2718c8958589c057cf58dccbd', '7db64a1176b26d8700e647015566b60f', 'af5c990a1c1d11e7a6266cae8b249515');
INSERT INTO `t_user_role_relation` VALUES ('86acd348299111e7a6266cae8b249515', '578d04ec5a77b5dd07496ed854c3d2f6', 'a428b83c1a7911e7803f3c970e8f4c17');
INSERT INTO `t_user_role_relation` VALUES ('895d2bbd912311e7bf6a184f320641b8', 'c02d347cb75ec4f0cc53ee3c3094e5d1', 'cb445376339911e7a3f56cae8b20846d');
INSERT INTO `t_user_role_relation` VALUES ('8e527fb3f5cb306a6e3db9ef9622fa85', '65de7e5038cc93d5fa598606b819459a', 'af5c990a1c1d11e7a6266cae8b249515');
INSERT INTO `t_user_role_relation` VALUES ('933de143912311e7bf6a184f320641b8', 'adbbdba1b9b065fb4c26589a31ce12d3', 'cb445376339911e7a3f56cae8b20846d');
INSERT INTO `t_user_role_relation` VALUES ('93a66c83670e657fd2aa59b07db96fdb', '8b5f0c2ac79519d77224aa3002cc7d0e', 'af5c990a1c1d11e7a6266cae8b249515');
INSERT INTO `t_user_role_relation` VALUES ('990e012580d51c2ae3f8e07eb1a49343', '61786674ee13f8a51dae0a9cfd5aa6bd', 'a428b83c1a7911e7803f3c970e8f4c17');
INSERT INTO `t_user_role_relation` VALUES ('9ccf5d5a912311e7bf6a184f320641b8', '08d037f77be68899923c29c58df8b10b', 'cb445376339911e7a3f56cae8b20846d');
INSERT INTO `t_user_role_relation` VALUES ('9eda61be8339a0db202d018487251b8f', '162c793a42d9af00154c4be628a58209', 'af5c990a1c1d11e7a6266cae8b249515');
INSERT INTO `t_user_role_relation` VALUES ('9ee043aab645aa945cc753aa3ebd77bf', 'ef3326ec4c98741f336fd97e345dfca1', 'af5c990a1c1d11e7a6266cae8b249515');
INSERT INTO `t_user_role_relation` VALUES ('a1e872d52f35a7a58d2d8030ff8ba486', 'd317d72570073f856cfaf08ac9074d48', 'af5c990a1c1d11e7a6266cae8b249515');
INSERT INTO `t_user_role_relation` VALUES ('a469543443786f74856da141a679c490', '699227ff05de6aaa5c4ed72e8188ef7e', 'a428b83c1a7911e7803f3c970e8f4c17');
INSERT INTO `t_user_role_relation` VALUES ('a5f2d604912311e7bf6a184f320641b8', 'bc04be82b7742ee456c8bf1766a5ab7c', 'cb445376339911e7a3f56cae8b20846d');
INSERT INTO `t_user_role_relation` VALUES ('ab272f3c2b335fd78c213923b8841a55', 'f3543d7beaae0fb4f3bac353dc707776', '7e31094e1c1111e7803f3c970e8f4c17');
INSERT INTO `t_user_role_relation` VALUES ('abe13391299011e7a6266cae8b249515', '1c38f2b52168cf6059ac982668dcd161', 'a428b83c1a7911e7803f3c970e8f4c17');
INSERT INTO `t_user_role_relation` VALUES ('b017a011912311e7bf6a184f320641b8', 'fb9967927ba05b37c8460e390e9c13e1', 'cb445376339911e7a3f56cae8b20846d');
INSERT INTO `t_user_role_relation` VALUES ('b13be64003923fec30ed4bf61ee3ab23', '03873e98f52538d944b0143e707d8d97', 'af5c990a1c1d11e7a6266cae8b249515');
INSERT INTO `t_user_role_relation` VALUES ('b22de1e8ade2c8fc744cbc432d1a6290', '09bc88170d21220ad417af9b9afb276a', '6ca3da981c1d11e7a6266cae8b249515');
INSERT INTO `t_user_role_relation` VALUES ('b355a3d6416e5d905ad1bee26b537a7b', '06ca93fb1bcd42ebae972f56aba5b72c', 'af5c990a1c1d11e7a6266cae8b249515');
INSERT INTO `t_user_role_relation` VALUES ('b983e28b912311e7bf6a184f320641b8', '16016c671c26391e125198622f4258bf', 'cb445376339911e7a3f56cae8b20846d');
INSERT INTO `t_user_role_relation` VALUES ('bb8f3210299111e7a6266cae8b249515', '72718d5337529b6ec1a43e7dbc96594e', 'a428b83c1a7911e7803f3c970e8f4c17');
INSERT INTO `t_user_role_relation` VALUES ('be0a7872912111e7bf6a184f320641b8', 'bd706daac1a497fa45676d6bebb8f73b', 'cb445376339911e7a3f56cae8b20846d');
INSERT INTO `t_user_role_relation` VALUES ('bffb757d6c37a8196269782d21bb9c02', '32c3c4a14e3216fb2c17c733baa53107', 'af5c990a1c1d11e7a6266cae8b249515');
INSERT INTO `t_user_role_relation` VALUES ('c1f44a2d3f12855441eb615bf5bc4054', '2d527b1fc0ccaa1e02c2bc9937cabf0f', 'af5c990a1c1d11e7a6266cae8b249515');
INSERT INTO `t_user_role_relation` VALUES ('c6ccc11ad76274447caa5183d7de23f3', '659ee624269b5d768134334976932709', '6ca3da981c1d11e7a6266cae8b249515');
INSERT INTO `t_user_role_relation` VALUES ('c73ac5a2912311e7bf6a184f320641b8', '6aa06f127bde907cef71518a4f92b888', 'cb445376339911e7a3f56cae8b20846d');
INSERT INTO `t_user_role_relation` VALUES ('c82d1bd95805d9849d86c9eb60d35df4', 'fa585205d3050aa123de76e8c68b4032', 'a171d4ae1a7711e7803f3c970e8f4c17');
INSERT INTO `t_user_role_relation` VALUES ('cf593c9fc1ce68a006b65efefb6f1de1', '25a92055e6d72d7bc752505a23e90e1a', '6ca3da981c1d11e7a6266cae8b249515');
INSERT INTO `t_user_role_relation` VALUES ('d146659394ec9dbe840ad977b9f7aa34', 'f416f75fc0f1058f346081ceee999999', 'af5c990a1c1d11e7a6266cae8b249515');
INSERT INTO `t_user_role_relation` VALUES ('d25b5588912011e7bf6a184f320641b8', 'e7ceee0638d864ec022e8fad3db6209b', 'cb445376339911e7a3f56cae8b20846d');
INSERT INTO `t_user_role_relation` VALUES ('d2f03626316f11e7a3f56cae8b20846d', 'c3b5ab81f7f838c3122d1bddf2540401', '2ba871181c1d11e7a6266cae8b249515');
INSERT INTO `t_user_role_relation` VALUES ('d9e8cc9c162983c70872b5afb5de451f', 'd1de7bad7e25f59ad1ca5e9642586816', '6ca3da981c1d11e7a6266cae8b249515');
INSERT INTO `t_user_role_relation` VALUES ('ed22bfe98e808efdcdc211d345bd37a3', '4627a6d022b4cd3f4a623e322085c53d', '6ca3da981c1d11e7a6266cae8b249515');
INSERT INTO `t_user_role_relation` VALUES ('efbb08082e3402d494e3ff6d6b97c65c', '64659f8c324c563dc6b2fcca18256ead', 'af5c990a1c1d11e7a6266cae8b249515');
INSERT INTO `t_user_role_relation` VALUES ('f0e32c5028c411e7a6266cae8b249515', 'd07f4c42daf45e1ebe61c7baf26da187', 'a428b83c1a7911e7803f3c970e8f4c17');
INSERT INTO `t_user_role_relation` VALUES ('f5e8d349316e11e7a3f56cae8b20846d', '73beaed3212f20b833abc39b995fcd77', '2ba871181c1d11e7a6266cae8b249515');
INSERT INTO `t_user_role_relation` VALUES ('f83cac8a912211e7bf6a184f320641b8', 'e4a50e64ed4eb5efbdeee23bf9a81242', 'cb445376339911e7a3f56cae8b20846d');

-- ----------------------------
-- Table structure for t_user_unit
-- ----------------------------
DROP TABLE IF EXISTS `t_user_unit`;
CREATE TABLE `t_user_unit` (
  `id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `unit` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createtime` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `groupby` varchar(2) COLLATE utf8_unicode_ci DEFAULT NULL,
  `level` int(2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of t_user_unit
-- ----------------------------
INSERT INTO `t_user_unit` VALUES ('006d59026cf411e79e9d184f320641b8', '新都区交通运输局', '2017-09-08 15:21:08', '2', '11');
INSERT INTO `t_user_unit` VALUES ('06a5817d6cf411e79e9d184f320641b8', '武侯区交通和市政设施管理局', '2017-09-08 15:20:42', '1', '7');
INSERT INTO `t_user_unit` VALUES ('0c064ffc6cf411e79e9d184f320641b8', '龙泉驿区交通运输局', '2017-09-08 15:20:55', '2', '9');
INSERT INTO `t_user_unit` VALUES ('10e0f72d6cf411e79e9d184f320641b8', '新津县交通运输局', '2017-09-08 15:22:08', '2', '21');
INSERT INTO `t_user_unit` VALUES ('121a8180652511e7a3f7184f320641b8', '锦江区建设和交通局', '2017-09-08 15:20:24', '1', '4');
INSERT INTO `t_user_unit` VALUES ('14fedba26cf411e79e9d184f320641b8', '崇州市交通运输局', '2017-09-08 15:21:46', '2', '18');
INSERT INTO `t_user_unit` VALUES ('1982dbd66cf411e79e9d184f320641b8', '金牛区建设和交通局', '2017-09-08 15:20:37', '1', '6');
INSERT INTO `t_user_unit` VALUES ('1e163c986cf411e79e9d184f320641b8', '天府新区成都管委会规划建设和城市管理局', '2017-09-08 15:20:20', '2', '3');
INSERT INTO `t_user_unit` VALUES ('229460196cf411e79e9d184f320641b8', '青白江区交通运输局', '2017-09-08 15:21:02', '2', '10');
INSERT INTO `t_user_unit` VALUES ('27114c9a6cf411e79e9d184f320641b8', '温江区交通运输局', '2017-09-08 15:21:15', '2', '12');
INSERT INTO `t_user_unit` VALUES ('2b6cf0906cf411e79e9d184f320641b8', '成都高新区规划建设局', '2017-09-08 15:20:16', '1', '2');
INSERT INTO `t_user_unit` VALUES ('2ff1fd626cf411e79e9d184f320641b8', '青羊区建设和交通局', '2017-09-08 15:20:30', '1', '5');
INSERT INTO `t_user_unit` VALUES ('3443b7786cf411e79e9d184f320641b8', '大邑县交通运输局', '2017-09-08 15:22:11', '2', '22');
INSERT INTO `t_user_unit` VALUES ('73b35a40920411e79cc1184f320641b8', '成都市交通运输委员会', '2017-09-08 15:19:58', '1', '1');
INSERT INTO `t_user_unit` VALUES ('8a2dc592684311e7a3f7184f320641b8', '成华区交通和市政局', '2017-09-08 15:20:48', '1', '8');
INSERT INTO `t_user_unit` VALUES ('daeadfec6cf311e79e9d184f320641b8', '郫都区交通运输局', '2017-09-08 15:21:51', '2', '19');
INSERT INTO `t_user_unit` VALUES ('dff3c89b6cf311e79e9d184f320641b8', '金堂县交通运输局', '2017-09-08 15:22:01', '2', '20');
INSERT INTO `t_user_unit` VALUES ('e452add36cf311e79e9d184f320641b8', '邛崃市交通运输局', '2017-09-08 15:21:38', '2', '17');
INSERT INTO `t_user_unit` VALUES ('e8e3ce6f6cf311e79e9d184f320641b8', '彭州市交通运输局', '2017-09-08 15:21:35', '2', '16');
INSERT INTO `t_user_unit` VALUES ('ee2f44726cf311e79e9d184f320641b8', '都江堰市交通运输局', '2017-09-08 15:21:30', '2', '15');
INSERT INTO `t_user_unit` VALUES ('f2f8f9df6cf311e79e9d184f320641b8', '蒲江县交通运输局', '2017-09-08 15:22:13', '2', '23');
INSERT INTO `t_user_unit` VALUES ('f73fe6f86cf311e79e9d184f320641b8', '双流区交通运输局', '2017-09-08 15:21:21', '2', '13');
INSERT INTO `t_user_unit` VALUES ('fc268de36cf311e79e9d184f320641b8', '简阳市交通运输局', '2017-09-08 15:21:25', '2', '14');
