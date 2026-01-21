-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 08, 2023 at 07:10 PM
-- Server version: 10.5.13-MariaDB-cll-lve
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u420708775_evolution`
--

-- --------------------------------------------------------

--
-- Table structure for table `function_code`
--

CREATE TABLE `function_code` (
  `id_path` int(11) NOT NULL,
  `RedZONERROR` varchar(15) NOT NULL,
  `Online` varchar(5) NOT NULL,
  `Bullet` varchar(5) DEFAULT NULL,
  `Aimbot` varchar(5) DEFAULT NULL,
  `Memory` varchar(5) DEFAULT NULL,
  `ModName` varchar(123) DEFAULT NULL,
  `Maintenance` varchar(250) DEFAULT NULL,
  `Hrs5` varchar(15) DEFAULT NULL,
  `Days1` varchar(15) DEFAULT NULL,
  `Days7` varchar(15) DEFAULT NULL,
  `Days15` varchar(15) DEFAULT NULL,
  `Days30` varchar(15) DEFAULT NULL,
  `Days60` varchar(15) DEFAULT NULL,
  `Currency` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `function_code`
--

INSERT INTO `function_code` (`id_path`, `RedZONERROR`, `Online`, `Bullet`, `Aimbot`, `Memory`, `ModName`, `Maintenance`, `Hrs5`, `Days1`, `Days7`, `Days15`, `Days30`, `Days60`, `Currency`) VALUES
(1, 'RedZONERROR', 'true', 'true', 'false', 'true', '@SrcTeam', ' ', '1', '1', '4', '7', '9', '15', '$');

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `id_history` int(11) NOT NULL,
  `keys_id` varchar(33) DEFAULT NULL,
  `user_do` varchar(33) DEFAULT NULL,
  `info` mediumtext NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `keys_code`
--

CREATE TABLE `keys_code` (
  `id_keys` int(11) NOT NULL,
  `game` varchar(32) NOT NULL,
  `user_key` varchar(32) DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `expired_date` datetime DEFAULT NULL,
  `max_devices` int(11) DEFAULT NULL,
  `devices` mediumtext DEFAULT NULL,
  `status` tinyint(1) DEFAULT 1,
  `registrator` varchar(32) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `key_reset_time` varchar(1) DEFAULT NULL,
  `key_reset_token` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `login_user`
--

CREATE TABLE `login_user` (
  `idx` int(11) NOT NULL,
  `namex` varchar(50) NOT NULL,
  `passwordx` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `referral_code`
--

CREATE TABLE `referral_code` (
  `id_reff` int(11) NOT NULL,
  `code` varchar(128) DEFAULT NULL,
  `set_saldo` int(11) DEFAULT NULL,
  `used_by` varchar(66) DEFAULT NULL,
  `created_by` varchar(66) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_users` int(11) NOT NULL,
  `fullname` varchar(155) DEFAULT NULL,
  `username` varchar(66) NOT NULL,
  `level` int(11) DEFAULT 2,
  `saldo` int(11) DEFAULT NULL,
  `status` tinyint(1) DEFAULT 1,
  `uplink` varchar(66) DEFAULT NULL,
  `password` varchar(155) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `loginDevices` varchar(150) DEFAULT NULL,
  `loginRsetTime` varchar(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_users`, `fullname`, `username`, `level`, `saldo`, `status`, `uplink`, `password`, `created_at`, `updated_at`, `loginDevices`, `loginRsetTime`) VALUES
(1, '', 'admin', 1, 999957, 1, 'SrcTeam', '$2y$08$YuG3D5BFl6n1hsWdgwa3BeExrzkHdL8GGcWis3pHaLNLu9Gf7Rihm', '2022-04-21 08:42:14', '2023-04-09 01:55:35', 'Linux-Android10-MIMAX3', '0');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `function_code`
--
ALTER TABLE `function_code`
  ADD PRIMARY KEY (`id_path`),
  ADD UNIQUE KEY `RedZONERROR` (`RedZONERROR`);

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`id_history`);

--
-- Indexes for table `keys_code`
--
ALTER TABLE `keys_code`
  ADD PRIMARY KEY (`id_keys`),
  ADD UNIQUE KEY `user_key` (`user_key`);

--
-- Indexes for table `login_user`
--
ALTER TABLE `login_user`
  ADD PRIMARY KEY (`idx`),
  ADD UNIQUE KEY `namex` (`namex`);

--
-- Indexes for table `referral_code`
--
ALTER TABLE `referral_code`
  ADD PRIMARY KEY (`id_reff`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_users`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `id_history` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `keys_code`
--
ALTER TABLE `keys_code`
  MODIFY `id_keys` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `referral_code`
--
ALTER TABLE `referral_code`
  MODIFY `id_reff` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_users` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
