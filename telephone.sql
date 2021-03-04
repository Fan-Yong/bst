/*
 Navicat Premium Data Transfer

 Source Server         : aliyun
 Source Server Type    : MySQL
 Source Server Version : 50718
 Source Host           : 39.105.91.142:3306
 Source Schema         : baishitong

 Target Server Type    : MySQL
 Target Server Version : 50718
 File Encoding         : 65001

 Date: 04/03/2021 13:16:18
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for telephone
-- ----------------------------
DROP TABLE IF EXISTS `telephone`;
CREATE TABLE `telephone`  (
  `id` int(255) UNSIGNED NOT NULL AUTO_INCREMENT,
  `type` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '1' COMMENT '机关，企事业，餐厅等',
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `detail` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `phone` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `inputer` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '录入者',
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '',
  `updatetime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `namedetail`(`name`, `detail`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 73 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of telephone
-- ----------------------------
INSERT INTO `telephone` VALUES (23, '1', '神韵送水站', '神韵水厂', '3820170，3820088，6670843', '高枕 ', '', '2021-03-02 13:43:16');
INSERT INTO `telephone` VALUES (31, '1', '物探局四号院居委会', '永安', '3737671', '高枕', '', '2021-03-04 12:47:14');
INSERT INTO `telephone` VALUES (35, '1', '中通客服', '中通快递客服', '95311', '高枕', '', '2021-03-02 15:20:15');
INSERT INTO `telephone` VALUES (41, '1', '红杏生态园', '', '3882323', '高枕 ', '', '2021-03-02 17:45:48');
INSERT INTO `telephone` VALUES (42, '1', '州一处饺子馆', '', '3739568', '高枕 ', '', '2021-03-02 17:46:52');
INSERT INTO `telephone` VALUES (46, '1', '物探局总机', '查号台', '3822114，3822114', '高枕', '甲秀路', '2021-03-04 12:50:00');
INSERT INTO `telephone` VALUES (48, '1', '物探局四号院南门菜鸟驿站', '', '156 3375 1573', '高枕', '', '2021-03-03 19:19:18');
INSERT INTO `telephone` VALUES (51, '1', '平安D区维修', '', '3737904', '胡', '', '2021-03-04 12:15:58');
INSERT INTO `telephone` VALUES (52, '1', '平安D区物业', '', '3738987', '胡', '', '2021-03-04 12:16:21');
INSERT INTO `telephone` VALUES (53, '1', '涿州公证处', '', '3632270', '胡', '', '2021-03-04 12:16:40');
INSERT INTO `telephone` VALUES (54, '1', '物探活动中心', '', '3737570', '胡', '', '2021-03-04 12:16:57');
INSERT INTO `telephone` VALUES (55, '1', '顺达汽修', '', '3853668', '胡', '', '2021-03-04 12:17:18');
INSERT INTO `telephone` VALUES (56, '1', '开发区通讯站维修', '', '3822112', '胡', '', '2021-03-04 12:17:39');
INSERT INTO `telephone` VALUES (57, '1', '永安门卫', '物探局四号院', '3739542', NULL, '', '2021-03-04 12:48:11');
INSERT INTO `telephone` VALUES (58, '1', '城区物业保修', '物探局', '3823022', NULL, '', '2021-03-04 12:48:43');
INSERT INTO `telephone` VALUES (59, '1', '急诊', '', '92120,120', NULL, '', '2021-03-04 12:50:24');
INSERT INTO `telephone` VALUES (60, '1', '冠云路歌华营业厅', '', '3600028', NULL, '', '2021-03-04 12:53:02');
INSERT INTO `telephone` VALUES (61, '1', '歌华客服', '', '3632444', NULL, '', '2021-03-04 12:53:15');
INSERT INTO `telephone` VALUES (62, '1', '涿州基地管理处物业服务热线', '物探局', '92345', NULL, '', '2021-03-04 12:55:04');
INSERT INTO `telephone` VALUES (64, '1', '城区物业24小时物业报修', '物探局', '3823022', NULL, '', '2021-03-04 12:57:48');
INSERT INTO `telephone` VALUES (66, '1', '平安小区24小时保修', '物探局', '3820444', NULL, '', '2021-03-04 13:01:08');
INSERT INTO `telephone` VALUES (67, '1', '平安C区物业报修', '物探局', '3736800', NULL, '', '2021-03-04 13:03:15');
INSERT INTO `telephone` VALUES (69, '1', '职工二医院急诊', '物探局宝石花', '92120', NULL, '', '2021-03-04 13:04:40');
INSERT INTO `telephone` VALUES (70, '1', '通讯维修', '物探局', '92112', NULL, '', '2021-03-04 13:05:20');
INSERT INTO `telephone` VALUES (71, '1', '滨海燃气24小时服务热线', '', '0312-3855678', NULL, '', '2021-03-04 13:07:23');
INSERT INTO `telephone` VALUES (72, '1', '涿州自来水公司客服', '', '0312-3633312', NULL, '', '2021-03-04 13:09:15');

SET FOREIGN_KEY_CHECKS = 1;
