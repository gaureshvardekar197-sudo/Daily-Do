-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 30, 2026 at 12:35 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dailydo`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2026_01_19_113942_create_personal_access_tokens_table', 2),
(5, '2026_01_20_063106_add_role_to_users_table', 3),
(6, '2026_01_21_055819_create_tasks_table', 4);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'dailydo-token', '956274dcff8caaddadb54834b5ed348b82ed2898d620e68f6cb64c905cd008f4', '[\"*\"]', NULL, NULL, '2026-01-20 00:47:57', '2026-01-20 00:47:57'),
(2, 'App\\Models\\User', 1, 'dailydo-token', '1169aa56c06ad123e9844aa2c4839a7e3e9222516af55e76c563125f85a6e903', '[\"*\"]', NULL, NULL, '2026-01-20 01:21:45', '2026-01-20 01:21:45'),
(3, 'App\\Models\\User', 1, 'dailydo-token', 'd948db2a265057150fa078bfefc1eecb8eb7e00d7d579d595ef1e455eee8b8d9', '[\"*\"]', NULL, NULL, '2026-01-20 01:22:21', '2026-01-20 01:22:21'),
(4, 'App\\Models\\User', 1, 'dailydo-token', 'f7994141fd2ee56414012e4d71e8c079ee22c1f8526801c08c1dd9cdda66a2cb', '[\"*\"]', NULL, NULL, '2026-01-20 01:22:34', '2026-01-20 01:22:34'),
(5, 'App\\Models\\User', 1, 'dailydo-token', '49fcf26be813944a30f6dc4ea77d3c80fb9c65db1eb70d29525fb59549744d3c', '[\"*\"]', NULL, NULL, '2026-01-20 01:27:34', '2026-01-20 01:27:34'),
(6, 'App\\Models\\User', 2, 'dailydo-token', 'ba17406cfcc9987d8e983d57145fa0d53915f81cbfb1bf56c2b4c6e942460f87', '[\"*\"]', NULL, NULL, '2026-01-20 01:28:54', '2026-01-20 01:28:54'),
(7, 'App\\Models\\User', 2, 'dailydo-token', '70b8d0c527594969be4f7a68336500848b90eaa12dc9dfa5f3371e9a43d2fd69', '[\"*\"]', NULL, NULL, '2026-01-20 01:29:30', '2026-01-20 01:29:30'),
(8, 'App\\Models\\User', 2, 'dailydo-token', '49ca9b0a7168f97b327a16510b0a68f8f41bbc20ebd806ac2d3d503c7b49b751', '[\"*\"]', NULL, NULL, '2026-01-20 01:29:43', '2026-01-20 01:29:43'),
(9, 'App\\Models\\User', 2, 'dailydo-token', 'a0760e88e2b6f13673694270ece06aed9d235ce9cec994110777eeabbd88a5e7', '[\"*\"]', NULL, NULL, '2026-01-20 03:14:12', '2026-01-20 03:14:12'),
(10, 'App\\Models\\User', 3, 'dailydo-token', 'c55649dc89a8fa30f56a2d2aa9d314adcecc157e64d0a423e15c8510e1eac25f', '[\"*\"]', NULL, NULL, '2026-01-20 03:15:23', '2026-01-20 03:15:23'),
(11, 'App\\Models\\User', 4, 'dailydo-token', '2940ec13d5cce4c0936cc961518601d96f3227d6fe4d52e00c1849b150c9c38d', '[\"*\"]', NULL, NULL, '2026-01-20 03:42:38', '2026-01-20 03:42:38'),
(12, 'App\\Models\\User', 5, 'dailydo-token', '3b8b2e1b0d9583e377364498bab0c5c0416b4987b6aab9d980198b62556e140e', '[\"*\"]', NULL, NULL, '2026-01-20 04:24:42', '2026-01-20 04:24:42'),
(13, 'App\\Models\\User', 5, 'dailydo-token', '238c9cbf909e5d37188da34d107bdf092abc65addf75aa6c6fca8fdb4c2541b6', '[\"*\"]', NULL, NULL, '2026-01-20 04:25:09', '2026-01-20 04:25:09'),
(14, 'App\\Models\\User', 5, 'dailydo-token', '101c91ebc562038bc4fdc5860534a049323b39942acea2cf775923a668a9b2ce', '[\"*\"]', NULL, NULL, '2026-01-20 04:27:24', '2026-01-20 04:27:24'),
(15, 'App\\Models\\User', 5, 'dailydo-token', 'cceec870aefde00e75cddcdbb73566feb4d286c4c7a294d546239f3076bbe4d3', '[\"*\"]', NULL, NULL, '2026-01-20 04:29:33', '2026-01-20 04:29:33'),
(16, 'App\\Models\\User', 5, 'dailydo-token', '91ee1b74d24bd5e219f55665eaf2ea6a73201d8da8814d35fe50f642c76a4d8d', '[\"*\"]', NULL, NULL, '2026-01-20 04:36:09', '2026-01-20 04:36:09'),
(17, 'App\\Models\\User', 5, 'dailydo-token', '3e444fcd3a9e7f4f1b17a79e85038eb90bf3ee29bf4a2e6c27372e535fae8c02', '[\"*\"]', NULL, NULL, '2026-01-20 04:36:10', '2026-01-20 04:36:10'),
(18, 'App\\Models\\User', 5, 'dailydo-token', '06f52ee2b7310e92b58e49561e3ded97d45342c3d50d5102d327e966e172aafb', '[\"*\"]', NULL, NULL, '2026-01-20 04:42:40', '2026-01-20 04:42:40'),
(19, 'App\\Models\\User', 5, 'dailydo-token', '04d42ceb6433f6bd6c8086010fdecd4297d5d031c178f22a36de7a703f77cfeb', '[\"*\"]', NULL, NULL, '2026-01-20 04:42:42', '2026-01-20 04:42:42'),
(20, 'App\\Models\\User', 5, 'dailydo-token', '58dc641a63cf3329b3c5bfea662c8df534e619550ce5dea1d936298c79d65dd6', '[\"*\"]', NULL, NULL, '2026-01-20 04:42:44', '2026-01-20 04:42:44'),
(21, 'App\\Models\\User', 5, 'dailydo-token', 'ded54ad2ec4c87427ac099daad3c2d1f8b85be90b03a072177036e8e21aa2272', '[\"*\"]', NULL, NULL, '2026-01-20 04:43:22', '2026-01-20 04:43:22'),
(22, 'App\\Models\\User', 5, 'dailydo-token', 'a3f16cadef5e76fc7eef641944bc6410dc4efee2c45a31b9ed6192be17dad731', '[\"*\"]', NULL, NULL, '2026-01-20 04:44:37', '2026-01-20 04:44:37'),
(23, 'App\\Models\\User', 5, 'dailydo-token', 'ecd3334e60dd677efab7ea7b163008d6ac884ac2b34c70c0421e1b1f2f746533', '[\"*\"]', NULL, NULL, '2026-01-20 04:44:39', '2026-01-20 04:44:39'),
(24, 'App\\Models\\User', 2, 'dailydo-token', '3cc5c2f2023db8f710ce4e3c1d3d72db8836c42b1b3dc5c2e7f10eb300ee6040', '[\"*\"]', NULL, NULL, '2026-01-20 04:44:59', '2026-01-20 04:44:59'),
(25, 'App\\Models\\User', 5, 'dailydo-token', '7ccc6e526ecfc50846160cc7a5c98d32e3c9a6aa8a04aeccd83a3a1301fcd9d5', '[\"*\"]', NULL, NULL, '2026-01-20 04:47:08', '2026-01-20 04:47:08'),
(26, 'App\\Models\\User', 5, 'dailydo-token', '6bd1ad858e3e3847b283eadc05ea3b2c1991cad24a499df2fbaadf88614c440b', '[\"*\"]', NULL, NULL, '2026-01-20 04:50:02', '2026-01-20 04:50:02'),
(27, 'App\\Models\\User', 5, 'dailydo-token', '936e3f3428ab96cb6281e731a0a867700337124b795661329ebc01c05c3e250c', '[\"*\"]', NULL, NULL, '2026-01-20 04:52:46', '2026-01-20 04:52:46'),
(30, 'App\\Models\\User', 5, 'dailydo-token', '3733f183ea2e9ad4dbf7bdf5ebb535b41549da076ce49f21585241ef684f94fd', '[\"*\"]', NULL, NULL, '2026-01-20 05:08:32', '2026-01-20 05:08:32'),
(31, 'App\\Models\\User', 5, 'dailydo-token', '2d44b03388f25322df326eaa97af4a38c7616df1bcf3d9fd4f1175b5de308479', '[\"*\"]', NULL, NULL, '2026-01-20 05:08:34', '2026-01-20 05:08:34'),
(32, 'App\\Models\\User', 5, 'dailydo-token', '16efb6f507b1812fbdba2a3ba308f1b8f94cf92984c9be5e2bf1975034ddd3ee', '[\"*\"]', NULL, NULL, '2026-01-20 05:19:22', '2026-01-20 05:19:22'),
(33, 'App\\Models\\User', 2, 'dailydo-token', '18acc51afdcfafb4718d44205437a688d55de2eadf899a5e4b62691e6c42a255', '[\"*\"]', NULL, NULL, '2026-01-20 05:19:42', '2026-01-20 05:19:42'),
(34, 'App\\Models\\User', 5, 'dailydo-token', '14788c02b7714c511c7b9468d2a907676e51c98bbf2a295cdbbc933081f2464f', '[\"*\"]', NULL, NULL, '2026-01-20 05:20:27', '2026-01-20 05:20:27'),
(35, 'App\\Models\\User', 2, 'dailydo-token', 'f03478db326a597581f0642ae40f460675533faf560db1c64e314c2ad340b897', '[\"*\"]', NULL, NULL, '2026-01-20 05:20:45', '2026-01-20 05:20:45'),
(36, 'App\\Models\\User', 5, 'dailydo-token', '70ae4ab42a8336d98188ef9a3911d88c02e8443f4d8ef366f2b9b4394fe7c3ef', '[\"*\"]', NULL, NULL, '2026-01-20 05:21:43', '2026-01-20 05:21:43'),
(37, 'App\\Models\\User', 5, 'dailydo-token', '9b270e5e3de006aac123e563d5ac6d4d496c209f237a3ca3a12b6a6c708ce975', '[\"*\"]', NULL, NULL, '2026-01-20 05:21:45', '2026-01-20 05:21:45'),
(38, 'App\\Models\\User', 5, 'dailydo-token', 'df4629ca2b77cc2638d65163c19fc62de04898e13011d7279ba4fdea5dbf89fc', '[\"*\"]', NULL, NULL, '2026-01-20 05:29:46', '2026-01-20 05:29:46'),
(39, 'App\\Models\\User', 5, 'dailydo-token', 'a36c0c51e7346a5865588d94d86e0882f064011285c6dba3e8365db975f8c541', '[\"*\"]', NULL, NULL, '2026-01-20 05:31:25', '2026-01-20 05:31:25'),
(40, 'App\\Models\\User', 2, 'dailydo-token', 'd6b2e96b78fb5ff7569647f44bd178f45252dd4387feeeab88baf6050c2e3fae', '[\"*\"]', NULL, NULL, '2026-01-20 05:31:45', '2026-01-20 05:31:45'),
(41, 'App\\Models\\User', 5, 'dailydo-token', '7e7d10ce1d4b2d85f0035c2b7a6b50ac55cce86a75da073a6c52989ab3efee2b', '[\"*\"]', NULL, NULL, '2026-01-20 05:42:51', '2026-01-20 05:42:51'),
(42, 'App\\Models\\User', 5, 'dailydo-token', '3e6b77279dd90db6cfc38f4ff41a87bfd749edd5d864522597962b70cff1a4d0', '[\"*\"]', NULL, NULL, '2026-01-20 05:49:56', '2026-01-20 05:49:56'),
(43, 'App\\Models\\User', 5, 'dailydo-token', 'eec279030db60f5bc3097eac7558d34c806663901fbc7ae1510a4ac962748be3', '[\"*\"]', NULL, NULL, '2026-01-20 05:51:44', '2026-01-20 05:51:44'),
(44, 'App\\Models\\User', 4, 'dailydo-token', 'a4cbcb5e80714011cf12596cb700608418a15aec3506f0b5c1e63848e679360c', '[\"*\"]', NULL, NULL, '2026-01-20 05:55:48', '2026-01-20 05:55:48'),
(45, 'App\\Models\\User', 5, 'dailydo-token', 'e36d359b66939e9a98b0ec4b2ed83a1386003e082842c9f12a689ed9e5ab8e88', '[\"*\"]', NULL, NULL, '2026-01-20 06:20:29', '2026-01-20 06:20:29'),
(46, 'App\\Models\\User', 5, 'dailydo-token', '99b92cb418075c7dbc86d61a550a5c3f0045273b5fd0611017917b34c5ac0e5b', '[\"*\"]', NULL, NULL, '2026-01-20 06:22:09', '2026-01-20 06:22:09'),
(48, 'App\\Models\\User', 5, 'dailydo-token', '8779b0ac4fcd651c079659bbd2d8afd0c3b1c75854858a49f79b70c0e5ad8966', '[\"*\"]', NULL, NULL, '2026-01-20 06:58:12', '2026-01-20 06:58:12'),
(49, 'App\\Models\\User', 5, 'dailydo-token', '06671ef66263e653c66b1cd57e10b9306470c5e695f491a5c62c5c2eb44112d0', '[\"*\"]', NULL, NULL, '2026-01-20 07:25:40', '2026-01-20 07:25:40'),
(51, 'App\\Models\\User', 1, 'dailydo-token', '08d95e3f26ac2ec1802bd6e086b9604403a0138d10d0a276729253175ffd750c', '[\"*\"]', NULL, NULL, '2026-01-20 23:47:52', '2026-01-20 23:47:52'),
(52, 'App\\Models\\User', 2, 'dailydo-token', '97b9c1bfada708355028048c7631bf2510c911f1ead7461308b4e54ad397305c', '[\"*\"]', NULL, NULL, '2026-01-20 23:58:11', '2026-01-20 23:58:11'),
(53, 'App\\Models\\User', 1, 'dailydo-token', '56c2b647ab402a2f2d671bd3b96b627ac7ee94c8558bcbdfffa3afff1e998616', '[\"*\"]', NULL, NULL, '2026-01-21 01:14:50', '2026-01-21 01:14:50'),
(54, 'App\\Models\\User', 1, 'dailydo-token', '88812461a1269141745487416b68b24cf8f65717626fbbee0cd30f1cfcceba89', '[\"*\"]', NULL, NULL, '2026-01-21 01:17:57', '2026-01-21 01:17:57'),
(55, 'App\\Models\\User', 3, 'dailydo-token', '799c27a872a0c439ba7e69d681907c7e49be7c373fedf9d8ea251239ed941272', '[\"*\"]', NULL, NULL, '2026-01-21 01:26:50', '2026-01-21 01:26:50'),
(56, 'App\\Models\\User', 1, 'dailydo-token', '57a5b19e0b0978a6a2d3569de993737cc6edea68476980fb27b48bb4f49fd382', '[\"*\"]', NULL, NULL, '2026-01-21 01:38:25', '2026-01-21 01:38:25'),
(57, 'App\\Models\\User', 1, 'dailydo-token', '4ca7e08c8d4a5dc9260ddceb6e9facac664a1c8d8b7c1dbbd7fa7ef809a51f2b', '[\"*\"]', NULL, NULL, '2026-01-21 01:39:42', '2026-01-21 01:39:42'),
(58, 'App\\Models\\User', 1, 'dailydo-token', 'cdf0d9057b61b34abc0fbf53f1f10ce69563aa3d1d684233fa21ac49f4ab8998', '[\"*\"]', '2026-01-21 04:20:30', NULL, '2026-01-21 01:48:20', '2026-01-21 04:20:30'),
(59, 'App\\Models\\User', 1, 'dailydo-token', '596cf0c158930c2cb33919ded2c35f67f8500f92e80a974c05c5fea4d39cec8d', '[\"*\"]', NULL, NULL, '2026-01-21 05:18:57', '2026-01-21 05:18:57'),
(60, 'App\\Models\\User', 4, 'dailydo-token', '69607b19e1b7d7080ddb83c29cd1664f715ac2bca703f8d6fe5761d2efcc2016', '[\"*\"]', NULL, NULL, '2026-01-21 05:47:07', '2026-01-21 05:47:07'),
(61, 'App\\Models\\User', 1, 'dailydo-token', '3bb75873cf4dfe27bfa564ec8cc767e3536d58e6c9b34f286e6f6cffb3f54a67', '[\"*\"]', NULL, NULL, '2026-01-21 06:16:46', '2026-01-21 06:16:46'),
(62, 'App\\Models\\User', 1, 'dailydo-token', '1bb7d1ae40499108dedee91d7488aed3f82ba12d31db531a6e728fe595683aab', '[\"*\"]', NULL, NULL, '2026-01-22 00:00:44', '2026-01-22 00:00:44'),
(63, 'App\\Models\\User', 5, 'dailydo-token', '8c75443797ef04bda1a47f1ca57c515877518fbdc41b358b45dda630a4fad784', '[\"*\"]', NULL, NULL, '2026-01-22 00:02:57', '2026-01-22 00:02:57'),
(64, 'App\\Models\\User', 5, 'dailydo-token', 'e4a60aec47af939417ffca68457606cfeba02aa5c320f5ad886d14e71e247de0', '[\"*\"]', NULL, NULL, '2026-01-22 00:04:52', '2026-01-22 00:04:52'),
(65, 'App\\Models\\User', 1, 'dailydo-token', '29c27ae3671e25b6d219762684a1eaf08ee64f2a0f3235c2f87ef61d39d5e9d6', '[\"*\"]', NULL, NULL, '2026-01-22 00:19:46', '2026-01-22 00:19:46'),
(66, 'App\\Models\\User', 1, 'dailydo-token', '3a604c2fbe3bccd625605c47ff19f85f9d0c8427e6042d11f687e4894c5ea8b4', '[\"*\"]', NULL, NULL, '2026-01-22 00:19:49', '2026-01-22 00:19:49'),
(67, 'App\\Models\\User', 1, 'dailydo-token', '065188447ae2697936107533a61accbc50388bf8d7ee92c4932d1a321a05dd8e', '[\"*\"]', NULL, NULL, '2026-01-22 00:19:50', '2026-01-22 00:19:50'),
(68, 'App\\Models\\User', 1, 'dailydo-token', '8c502ecb324f2f4ef18edce15cc9d66b25e3813d52dc23025307ce8e91fc4e35', '[\"*\"]', NULL, NULL, '2026-01-22 00:19:50', '2026-01-22 00:19:50'),
(69, 'App\\Models\\User', 1, 'dailydo-token', 'a58e1e6a1568832836b7f6e326afa582f9e2dbcc7dd6b9b45b6f373c9f028c58', '[\"*\"]', NULL, NULL, '2026-01-22 00:19:51', '2026-01-22 00:19:51'),
(70, 'App\\Models\\User', 1, 'dailydo-token', 'd63c0b2d58bbcadb5df6b7d3fbfd0c368c6008e43f705725c8591f70fc94583e', '[\"*\"]', NULL, NULL, '2026-01-22 00:19:51', '2026-01-22 00:19:51'),
(71, 'App\\Models\\User', 1, 'dailydo-token', '17d94d6c0cdf0657103cc9185f14685191c39a72fa8149de2005253108c3e902', '[\"*\"]', NULL, NULL, '2026-01-22 00:19:52', '2026-01-22 00:19:52'),
(72, 'App\\Models\\User', 5, 'dailydo-token', 'a4d66fede6ec3bada783e3ccbd93aeb7e0a580eebc95882cabdff1b290a743bc', '[\"*\"]', '2026-01-22 03:11:55', NULL, '2026-01-22 00:21:44', '2026-01-22 03:11:55'),
(73, 'App\\Models\\User', 1, 'dailydo-token', '860ed2d051d0f494a68cfc0d0f716ca653172b332124833db7f0667fb544920b', '[\"*\"]', NULL, NULL, '2026-01-22 01:34:43', '2026-01-22 01:34:43'),
(74, 'App\\Models\\User', 1, 'dailydo-token', 'd22d1795aa85686b95efc6abb7aa011b77c3c6f69bf9d6420da50a9849225e22', '[\"*\"]', '2026-01-23 01:29:28', NULL, '2026-01-22 01:36:25', '2026-01-23 01:29:28'),
(75, 'App\\Models\\User', 1, 'dailydo-token', 'f14170ce7e6f4b812febfb39aabd449ff847f1930cecb985cad21e0d6f6ec239', '[\"*\"]', NULL, NULL, '2026-01-22 03:27:40', '2026-01-22 03:27:40'),
(76, 'App\\Models\\User', 5, 'dailydo-token', 'bda4bf0948ab7ee91b9fc5f452f9143036c7c6b01573154f2b355d640944c108', '[\"*\"]', NULL, NULL, '2026-01-22 03:28:09', '2026-01-22 03:28:09'),
(77, 'App\\Models\\User', 5, 'dailydo-token', 'fc8419533c750333f04f102afe09e144a5ff5d7744758d56308f158f39275dcb', '[\"*\"]', '2026-01-22 05:42:06', NULL, '2026-01-22 03:33:26', '2026-01-22 05:42:06'),
(78, 'App\\Models\\User', 1, 'dailydo-token', 'a442adbfd493bd92cf96a542dbc390731a5f1f07a5e793a0813faf9029ca33db', '[\"*\"]', NULL, NULL, '2026-01-22 05:42:43', '2026-01-22 05:42:43'),
(79, 'App\\Models\\User', 5, 'dailydo-token', '958e95839bcc040b651b8222078d860701dd6f33b137241fca03f1cf1e44a911', '[\"*\"]', '2026-01-22 06:03:40', NULL, '2026-01-22 05:43:22', '2026-01-22 06:03:40'),
(80, 'App\\Models\\User', 6, 'dailydo-token', '4b16ebf40c7049875d63659711acb29486d1275d35da7fd4ab6218565a999dce', '[\"*\"]', '2026-01-22 06:09:29', NULL, '2026-01-22 06:09:24', '2026-01-22 06:09:29'),
(81, 'App\\Models\\User', 7, 'dailydo-token', 'c92e8c9b3c30bb7301471e1464551edabb1a42128cf05892acc148cc97d7f8e8', '[\"*\"]', '2026-01-22 06:22:20', NULL, '2026-01-22 06:22:13', '2026-01-22 06:22:20'),
(82, 'App\\Models\\User', 7, 'dailydo-token', '898fd708d8f859c7ecbf8aa5dd8c61d66f9ea51398d2f9d5b0c4739e23b4116b', '[\"*\"]', '2026-01-22 06:33:03', NULL, '2026-01-22 06:32:57', '2026-01-22 06:33:03'),
(83, 'App\\Models\\User', 5, 'dailydo-token', 'da8f1aa2d66c3cb3b951d216e66cef683f05204c4f58cc25621cb54ee79669ce', '[\"*\"]', '2026-01-22 06:35:16', NULL, '2026-01-22 06:35:11', '2026-01-22 06:35:16'),
(84, 'App\\Models\\User', 5, 'dailydo-token', 'dfbefdcdaa64bb9c8f3f95f170d29bb21681eb31d93db9559a98e824677b9a26', '[\"*\"]', '2026-01-22 06:37:41', NULL, '2026-01-22 06:37:35', '2026-01-22 06:37:41'),
(85, 'App\\Models\\User', 5, 'dailydo-token', '2e6db3a330342f763722cc3f650cd5b1526c38e1bf9630e731b1d7a0ef6b40b7', '[\"*\"]', '2026-01-22 06:38:58', NULL, '2026-01-22 06:38:36', '2026-01-22 06:38:58'),
(86, 'App\\Models\\User', 8, 'dailydo-token', '17b74166377f5eaaf850182874eeaeb476305819a516aa8dba773bed68f8d904', '[\"*\"]', '2026-01-22 06:42:56', NULL, '2026-01-22 06:42:48', '2026-01-22 06:42:56'),
(87, 'App\\Models\\User', 8, 'dailydo-token', 'c4d2a39c3f791bf116f1de8d6023900073889b649268113ed305592fc551c00c', '[\"*\"]', '2026-01-22 06:43:45', NULL, '2026-01-22 06:43:38', '2026-01-22 06:43:45'),
(88, 'App\\Models\\User', 1, 'dailydo-token', '1747f201f361b55e930c2e390798948fb0be1007a7f9a37d9e2245f2dc8ec4ca', '[\"*\"]', NULL, NULL, '2026-01-22 06:49:20', '2026-01-22 06:49:20'),
(89, 'App\\Models\\User', 5, 'dailydo-token', '9e50aafe686be8a4069a138d5167c7691433ccf2226820d1d5830e3de023da28', '[\"*\"]', '2026-01-22 07:03:31', NULL, '2026-01-22 06:57:00', '2026-01-22 07:03:31'),
(90, 'App\\Models\\User', 1, 'dailydo-token', '3295c3d7c0adf5e5642a5ac6cd8103fec5ab9a2387c0bae0098146634c5bcfff', '[\"*\"]', NULL, NULL, '2026-01-22 07:03:58', '2026-01-22 07:03:58'),
(91, 'App\\Models\\User', 5, 'dailydo-token', '5e6836fc1479c1ef19592a41fef8b3c659fcc39e52e8841a7b75da2bfde3f674', '[\"*\"]', '2026-01-22 07:56:35', NULL, '2026-01-22 07:33:58', '2026-01-22 07:56:35'),
(92, 'App\\Models\\User', 9, 'dailydo-token', '943da713ed9fe83a6dd116c08100e34a421cb0c93b1f58e9a07235b822b68834', '[\"*\"]', '2026-01-22 07:54:29', NULL, '2026-01-22 07:50:53', '2026-01-22 07:54:29'),
(93, 'App\\Models\\User', 1, 'dailydo-token', 'f8d7f93737c4bf9073af6e839ca5266d49e5834205a9a3afa2dfe939ecbcd2c2', '[\"*\"]', NULL, NULL, '2026-01-22 07:54:53', '2026-01-22 07:54:53'),
(94, 'App\\Models\\User', 1, 'dailydo-token', '982056bf6bfc03e3f21e96e904caf2bae22cbfb368fe346490dfd885a58ab76a', '[\"*\"]', NULL, NULL, '2026-01-22 23:25:16', '2026-01-22 23:25:16'),
(95, 'App\\Models\\User', 5, 'dailydo-token', '556dc8dbbe42a941df833d71a5b3197a5a5bb9115dcaea32bcd2e60d779dc774', '[\"*\"]', '2026-01-22 23:34:53', NULL, '2026-01-22 23:25:51', '2026-01-22 23:34:53'),
(96, 'App\\Models\\User', 1, 'dailydo-token', '056d4fc4f83a2706595101cbfe3308337856a73d46e7b81f2a2e80bcf8f77c74', '[\"*\"]', NULL, NULL, '2026-01-22 23:54:06', '2026-01-22 23:54:06'),
(97, 'App\\Models\\User', 5, 'dailydo-token', '7b5588ba0f1332834a73feee715c30e7974f990487bbc64eb645b2f622e3da2f', '[\"*\"]', '2026-01-23 00:33:26', NULL, '2026-01-22 23:55:24', '2026-01-23 00:33:26'),
(98, 'App\\Models\\User', 1, 'dailydo-token', '14983c5172d136357b96d177d3340ca92d92d6d57371f86e92b449072b8720ef', '[\"*\"]', NULL, NULL, '2026-01-23 00:33:47', '2026-01-23 00:33:47'),
(99, 'App\\Models\\User', 10, 'dailydo-token', 'fcc9848ebbe2bbf829f1f3ef095563b55b019f3759c1dd56af77adf7d4eff2db', '[\"*\"]', '2026-01-23 01:23:52', NULL, '2026-01-23 01:21:33', '2026-01-23 01:23:52'),
(100, 'App\\Models\\User', 10, 'dailydo-token', '3d2e8cbcff466b54eb32e611c87155abcc387d6d4e9e49f4f144e7a231421994', '[\"*\"]', '2026-01-23 01:24:38', NULL, '2026-01-23 01:24:13', '2026-01-23 01:24:38'),
(101, 'App\\Models\\User', 1, 'dailydo-token', '6fe556a6fb41007986093ba95c6885e60f7ef14517681763e368e1541b57503d', '[\"*\"]', '2026-01-23 01:30:45', NULL, '2026-01-23 01:29:46', '2026-01-23 01:30:45'),
(102, 'App\\Models\\User', 1, 'dailydo-token', '52f289fa7132cd286a6f4c8cc982e3785bb12ec455f6cc5ae13d85b8b5162c8c', '[\"*\"]', '2026-01-23 02:01:39', NULL, '2026-01-23 02:00:28', '2026-01-23 02:01:39'),
(103, 'App\\Models\\User', 1, 'dailydo-token', '1c532ddca5e0671404ffe026461be7262ff02cd58f7394ca857aa4c713551772', '[\"*\"]', '2026-01-23 02:55:34', NULL, '2026-01-23 02:03:07', '2026-01-23 02:55:34'),
(104, 'App\\Models\\User', 10, 'dailydo-token', '1f73cb278b070fed5c95c3cdad680549f8cc9c51b7f0f6e93c6a324947b37dbe', '[\"*\"]', NULL, NULL, '2026-01-23 02:59:50', '2026-01-23 02:59:50'),
(105, 'App\\Models\\User', 1, 'dailydo-token', 'f27399c35af6464bb082ffb671d07b00981b41057203a7951f53cf0be8fe891e', '[\"*\"]', NULL, NULL, '2026-01-23 03:03:52', '2026-01-23 03:03:52'),
(106, 'App\\Models\\User', 10, 'dailydo-token', '8d0bd076ebb8faf8557af1070159640c72862d2822094df20ee19a59139e5f42', '[\"*\"]', '2026-01-23 04:17:47', NULL, '2026-01-23 03:25:18', '2026-01-23 04:17:47'),
(107, 'App\\Models\\User', 1, 'dailydo-token', '71eabb01605f3b22885aa7298b60d5f940d6e5bfaa9b7c103560c871b93880ad', '[\"*\"]', '2026-01-23 04:20:45', NULL, '2026-01-23 04:18:37', '2026-01-23 04:20:45'),
(108, 'App\\Models\\User', 5, 'dailydo-token', 'b8fd1515d7a9a9a58a9f9cb081fd0aab25d0a6117639fa821bf9e636ad06958b', '[\"*\"]', '2026-01-23 04:29:06', NULL, '2026-01-23 04:28:57', '2026-01-23 04:29:06'),
(109, 'App\\Models\\User', 1, 'dailydo-token', '94e70346a5bed2408789fb9791cdbdc1c732ec007abaebf1d4f4a8ee0daddb59', '[\"*\"]', '2026-01-23 04:48:31', NULL, '2026-01-23 04:34:51', '2026-01-23 04:48:31'),
(110, 'App\\Models\\User', 1, 'dailydo-token', 'ee9aad9deea92f66295e1f1f8e8f2d58cdcd97225ec9a1da476f240c2953d2bd', '[\"*\"]', '2026-01-23 04:58:04', NULL, '2026-01-23 04:49:04', '2026-01-23 04:58:04'),
(111, 'App\\Models\\User', 1, 'dailydo-token', 'c8cfc8424d87907423dfede8bfbda0110bf4d83eb6e119e040131e0fc6b51f57', '[\"*\"]', '2026-01-23 05:30:41', NULL, '2026-01-23 04:59:20', '2026-01-23 05:30:41'),
(112, 'App\\Models\\User', 1, 'dailydo-token', '9e9817a3b5f76fc0af95c751a614edc6458f2a4850b1bad6551dcbefc153b3f1', '[\"*\"]', '2026-01-23 05:56:26', NULL, '2026-01-23 05:46:11', '2026-01-23 05:56:26'),
(113, 'App\\Models\\User', 11, 'dailydo-token', 'c0455950fef1fd0493569b0b1fb4b4f33eb88b1b251eebb2f299def3445acc3d', '[\"*\"]', '2026-01-23 23:51:45', NULL, '2026-01-23 06:07:49', '2026-01-23 23:51:45'),
(114, 'App\\Models\\User', 1, 'dailydo-token', 'c9584c4e094b023b1f6592a623cc2fddbbf6bb6ae966ab9d9da48f8e922bd972', '[\"*\"]', '2026-01-27 23:46:47', NULL, '2026-01-23 23:52:23', '2026-01-27 23:46:47'),
(115, 'App\\Models\\User', 5, 'dailydo-token', '614bda668a776d4bde6e36f0568ce38e839eccd95e52ec5b7bffacaa9ee00354', '[\"*\"]', '2026-01-24 07:53:56', NULL, '2026-01-23 23:55:38', '2026-01-24 07:53:56'),
(116, 'App\\Models\\User', 1, 'dailydo-token', 'faadf530ff377fc3fa2152e4cf39d682271feaff5bf4ce24f71f8aa2cf5540f6', '[\"*\"]', '2026-01-24 04:16:22', NULL, '2026-01-24 04:14:47', '2026-01-24 04:16:22'),
(117, 'App\\Models\\User', 5, 'dailydo-token', 'fd04746da640389d4aa35c1a6129c3fb934967ce849474f2ce949eaf2bf50a31', '[\"*\"]', '2026-01-27 23:48:32', NULL, '2026-01-27 23:48:14', '2026-01-27 23:48:32'),
(118, 'App\\Models\\User', 1, 'dailydo-token', '53132e7ec118aaca817325ad9099ac0d18bed032dc9e027c0bfff4027f8df58e', '[\"*\"]', '2026-01-27 23:53:43', NULL, '2026-01-27 23:49:02', '2026-01-27 23:53:43'),
(119, 'App\\Models\\User', 5, 'dailydo-token', '8a65bef942f9c136686fcc535ff19e8fd4dfe07d3900ec1c94b5e41809d8fe8b', '[\"*\"]', '2026-01-27 23:54:39', NULL, '2026-01-27 23:54:29', '2026-01-27 23:54:39'),
(120, 'App\\Models\\User', 1, 'dailydo-token', '816b977237802fcb5b50639aec678f38822d664e32020280a507da79e0a49130', '[\"*\"]', '2026-01-28 00:45:42', NULL, '2026-01-27 23:55:13', '2026-01-28 00:45:42'),
(121, 'App\\Models\\User', 10, 'dailydo-token', 'ce3a86817b53f38293b84cc149485303f2c43562d49ed404d15db83f80c380d5', '[\"*\"]', '2026-01-28 00:53:33', NULL, '2026-01-28 00:46:43', '2026-01-28 00:53:33'),
(122, 'App\\Models\\User', 10, 'dailydo-token', '152ceacae2e1e1cd8e01f8083b52b14ad478587085ab815ec17f1fd9e150d8cd', '[\"*\"]', '2026-01-28 00:58:07', NULL, '2026-01-28 00:57:56', '2026-01-28 00:58:07'),
(123, 'App\\Models\\User', 10, 'dailydo-token', 'a0ba5d90ac53c9c306dff9e0b0d23680ebc9c092135252058bb841853cbfcc77', '[\"*\"]', '2026-01-28 01:00:01', NULL, '2026-01-28 00:59:51', '2026-01-28 01:00:01'),
(124, 'App\\Models\\User', 10, 'dailydo-token', 'f7ba0ce7fa4c450032547164770f64234f69cfd27ab7407bde8ad52d3c113656', '[\"*\"]', '2026-01-28 01:15:55', NULL, '2026-01-28 01:15:44', '2026-01-28 01:15:55'),
(125, 'App\\Models\\User', 10, 'dailydo-token', 'ea55683ec207effdb9b8c39ce80409558cec7319116068b0023fc1c06be615c6', '[\"*\"]', '2026-01-28 01:18:37', NULL, '2026-01-28 01:18:12', '2026-01-28 01:18:37'),
(126, 'App\\Models\\User', 10, 'dailydo-token', 'ec57c96469caa32917e15bfc1fc89f3158304e2bf891bc0efea1dd4a50270111', '[\"*\"]', '2026-01-28 01:20:03', NULL, '2026-01-28 01:19:38', '2026-01-28 01:20:03'),
(127, 'App\\Models\\User', 10, 'dailydo-token', '9a89fed909acebfd8dd8327e2c65ce8e65cc84ccbde6123b1d8237315c7a049f', '[\"*\"]', '2026-01-28 01:20:45', NULL, '2026-01-28 01:20:34', '2026-01-28 01:20:45'),
(128, 'App\\Models\\User', 10, 'dailydo-token', '75711a652a667ba3be418ed2338a01cfe7387e88d95dea70c1a7dcb7b3f8d554', '[\"*\"]', '2026-01-28 01:25:24', NULL, '2026-01-28 01:25:13', '2026-01-28 01:25:24'),
(129, 'App\\Models\\User', 10, 'dailydo-token', '8ad8f1f5384bfea4680ee6145ee288af6fac6b3b2b1d56cde1d6479e4b903a3b', '[\"*\"]', '2026-01-28 01:26:29', NULL, '2026-01-28 01:26:18', '2026-01-28 01:26:29'),
(130, 'App\\Models\\User', 10, 'dailydo-token', 'd8831f85a39e835d330625db61da50b3fd6152e913eb782ef526337fc7997663', '[\"*\"]', '2026-01-28 01:35:39', NULL, '2026-01-28 01:27:55', '2026-01-28 01:35:39'),
(131, 'App\\Models\\User', 10, 'dailydo-token', 'e45622ff200a4fee80d6d21247396ce8c073043a2ce320a06dfc0eab2ad90dc3', '[\"*\"]', '2026-01-28 01:37:27', NULL, '2026-01-28 01:36:44', '2026-01-28 01:37:27'),
(132, 'App\\Models\\User', 5, 'dailydo-token', 'dbbfe19b6f47c05cc70fe9c2394749f32a8a6bb1060ca15c217e54b8079fd8a5', '[\"*\"]', '2026-01-28 01:38:41', NULL, '2026-01-28 01:38:08', '2026-01-28 01:38:41'),
(133, 'App\\Models\\User', 10, 'dailydo-token', '98194f2525db4bce335eb2f21f76760862461160ccc2758df8e98dba133de819', '[\"*\"]', '2026-01-28 02:54:36', NULL, '2026-01-28 02:54:29', '2026-01-28 02:54:36'),
(134, 'App\\Models\\User', 10, 'dailydo-token', '999836a20bc060540f19bdb4d172b4afd8b1eca46fa17653d3d607d599f8cc1b', '[\"*\"]', '2026-01-28 02:55:28', NULL, '2026-01-28 02:55:22', '2026-01-28 02:55:28'),
(135, 'App\\Models\\User', 10, 'dailydo-token', '4d7c2ee3bda63ef2adf4fc86d09495baf7db908d02a365d93b80a9012a9489d1', '[\"*\"]', '2026-01-29 00:16:33', NULL, '2026-01-28 04:35:41', '2026-01-29 00:16:33'),
(136, 'App\\Models\\User', 5, 'dailydo-token', '8bc3a57a593d392fc552ca01c68f161f423015ebe0bafcf2f0ff1873ad6cc791', '[\"*\"]', '2026-01-29 01:04:16', NULL, '2026-01-28 23:44:42', '2026-01-29 01:04:16'),
(137, 'App\\Models\\User', 10, 'dailydo-token', '116579b48fedf277df731b1e44a22fffcbdc5e5204291e24c2d1967585932427', '[\"*\"]', '2026-01-29 08:00:30', NULL, '2026-01-29 00:17:17', '2026-01-29 08:00:30'),
(138, 'App\\Models\\User', 5, 'dailydo-token', '29b28ce13953428c8c3f82044f27611354f37790e185889e580133648f1e18ff', '[\"*\"]', '2026-01-29 01:05:12', NULL, '2026-01-29 01:05:04', '2026-01-29 01:05:12'),
(139, 'App\\Models\\User', 5, 'dailydo-token', '2c9c09f572b206f686005fe328a7e2573091a1d9ddca5073f4a146b65f3875fc', '[\"*\"]', '2026-01-29 01:09:56', NULL, '2026-01-29 01:05:45', '2026-01-29 01:09:56'),
(140, 'App\\Models\\User', 5, 'dailydo-token', '608f46305a37be35d3eaaa3cb79525ce123a935db5292975045f90e50984c93a', '[\"*\"]', '2026-01-29 01:16:01', NULL, '2026-01-29 01:12:41', '2026-01-29 01:16:01'),
(141, 'App\\Models\\User', 5, 'dailydo-token', 'd19787f444de251655fc0f0216545bec13d6f700e411386cd2335608a2ad6449', '[\"*\"]', '2026-01-29 02:58:18', NULL, '2026-01-29 01:17:08', '2026-01-29 02:58:18'),
(142, 'App\\Models\\User', 5, 'dailydo-token', 'cafaccf68c68bcd98a389ecaef2bb8eb52911968efae3b2322dbc6a4b062220a', '[\"*\"]', '2026-01-29 07:02:08', NULL, '2026-01-29 06:54:48', '2026-01-29 07:02:08'),
(143, 'App\\Models\\User', 1, 'dailydo-token', '709af6aa2d3f37d03788290593cc19542d31def4cae4fc60355cc8c851d9509d', '[\"*\"]', '2026-01-30 02:48:11', NULL, '2026-01-29 23:19:52', '2026-01-30 02:48:11');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('9LS1azag1NvCtNnu33wwQSwN6Jk1Ihz2pSAcjuGW', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiaVZDS3FTTzBhUk9nOUF6c1ZhN011ekRoWjBxbHFYdFdKU1ZySVVyeiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1768823337),
('GTMnXaBWZG5EdqJLas0YSuc8gl6MvudovFZWQaFY', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMWZ4aExnem9xcFhlWldmZG1TQWJRZjBRSFV1RXFibzhjQWgzUGJTYSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1768923929),
('R8zeNDAjBnK5uTbPzbjysSVIXAfIVnoeLx9sXzPt', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSUxVVmVPbGU3emIxRlUxb0k5SjFIQVZ5ZG0yTTRSM005bjlsT3dSZSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1769663474),
('VAbXnnUkDfDObSEgtulBZCdAeshjg2ZJRh6z23WR', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiS3RjVjNRdlpCRzVrdGlVZmsyNHNjakxJSndWRk9Ua0xPUkdWblRkWiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1768888718),
('x2N2biuPG2FKlcQcol7JBycbNLPtmnqfpW1bUF8m', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiOEVyOTdSMWMxSlRnMU9tOW1sdUNRQkJ2ZDcxRzFpang2anlpVU42VyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1769748345);

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `day` enum('today','tomorrow','later') NOT NULL DEFAULT 'today',
  `priority` enum('low','medium','high') NOT NULL DEFAULT 'medium',
  `completed` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `user_id`, `title`, `description`, `day`, `priority`, `completed`, `created_at`, `updated_at`) VALUES
(1, 1, 'Updated Task', 'Updated description', 'today', 'high', 0, '2026-01-21 01:51:01', '2026-01-21 01:56:32'),
(2, 1, 'Learn React Basics', 'Practice useState and useEffect', 'today', 'medium', 0, '2026-01-21 03:23:28', '2026-01-21 03:23:28'),
(3, 1, 'Learn React', 'Practice useState', 'today', 'medium', 1, '2026-01-21 03:24:36', '2026-01-24 01:37:31'),
(4, 1, 'React', 'Practice', 'today', 'medium', 1, '2026-01-21 03:37:44', '2026-01-24 01:37:39'),
(5, 1, 'Next.js', 'chatgpt', 'today', 'medium', 1, '2026-01-21 03:38:19', '2026-01-21 03:38:19'),
(6, 1, 'Next', 'chatgpt & Deepseek', 'today', 'medium', 1, '2026-01-21 04:20:30', '2026-01-21 04:20:30'),
(7, 1, 'Task title', 'Task description', 'today', 'medium', 1, '2026-01-22 02:44:49', '2026-01-24 01:36:48'),
(9, 5, 'vedicvibe', 'otp', 'today', 'high', 0, '2026-01-22 03:09:02', '2026-01-22 05:59:50'),
(10, 5, 'daily', 'rge', 'today', 'medium', 1, '2026-01-22 03:09:44', '2026-01-22 05:59:53'),
(11, 9, 'DailyDO', 'CRUD Operation', 'today', 'high', 1, '2026-01-22 07:54:15', '2026-01-22 07:54:29'),
(13, 5, 'Project', 'ajsoiucvir', 'tomorrow', 'low', 1, '2026-01-22 23:30:10', '2026-01-22 23:30:10'),
(14, 5, 'enoenef', 'ecvceiwdvs', 'later', 'high', 1, '2026-01-22 23:30:32', '2026-01-22 23:34:53'),
(15, 5, 'gifu', 'udufffo', 'today', 'high', 1, '2026-01-22 23:33:53', '2026-01-22 23:33:53'),
(16, 11, 'Vedic Live', 'have to make vedic live', 'today', 'high', 1, '2026-01-23 06:08:36', '2026-01-23 06:09:04'),
(17, 11, 'sccweoecw', 'ehcjdd', 'today', 'high', 1, '2026-01-23 06:18:49', '2026-01-23 06:18:49'),
(18, 11, 'fiufjejfoieoifkjwe', 'dbiweuuff', 'tomorrow', 'medium', 1, '2026-01-23 06:22:49', '2026-01-23 06:22:49'),
(20, 5, 'weigdirf', 'hufhchof', 'today', 'high', 1, '2026-01-23 23:56:11', '2026-01-23 23:56:11'),
(21, 5, 'djkjkj', 'dndd', 'today', 'medium', 0, '2026-01-24 01:23:24', '2026-01-24 01:53:50'),
(22, 5, 'gauresh', 'gauresh', 'tomorrow', 'high', 1, '2026-01-24 06:59:24', '2026-01-24 06:59:24'),
(23, 5, 'paragraph', 'A paragraph is defined as “a group of sentences or a single sentence that forms a unit” (Lunsford and Connors 116). Length and appearance do not determine whether a section in a paper is a paragraph. For instance, in some styles of writing, particularly journalistic styles, a paragraph can be just one sentence long.', 'today', 'medium', 1, '2026-01-28 23:46:25', '2026-01-28 23:46:25');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `role`, `status`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Gauresh', 'gaureshvardekar@gmail.com', NULL, '$2y$12$urN8TQP4V2BRmGZCV9xO4.QHBIC..bIbcabBxfSfR1ZlSYlc093iO', '1', 'active', NULL, '2026-01-20 23:47:52', '2026-01-20 23:47:52'),
(2, 'User', 'User@gmail.com', NULL, '$2y$12$AECE8le/O7v8V.fuJHFCpe0uLcOt2LCINh2p.TXa3/fmONvwDh62u', '0', 'blocked', NULL, '2026-01-20 23:58:11', '2026-01-24 00:49:09'),
(3, 'Learn React', 'test@gmail.com', NULL, '$2y$12$kmklw6w5Ct5Ci8oQl8R6J.ntqkIXZz8SeOIjwcuO3J/N0l7voRSXq', '0', 'active', NULL, '2026-01-21 01:26:50', '2026-01-29 23:43:18'),
(4, 'Moiz Khan', 'Moiz@gmail.com', NULL, '$2y$12$qlXfiIl9.ekzhM3oxpnfK.B7qXOxvSixLBMSEFt40DjGgYZKItmBm', '1', 'blocked', NULL, '2026-01-21 05:47:07', '2026-01-24 00:48:43'),
(5, 'Pratik Vardekar', 'pratik@gmail.com', NULL, '$2y$12$5sfi3S22h8TR9aRkRMRcQurAWHxJiNcfsBJVy9gvX5hrcTFm6iWAC', '0', 'active', NULL, '2026-01-22 00:02:57', '2026-01-24 03:44:46'),
(6, 'Jay Vardekar', 'jay@gmail.com', NULL, '$2y$12$ln.MF5RXXm0.Ik4Y8qaMOulS/ub5jttmvmtzExoRqZqr0wHF0qR7u', '0', 'active', NULL, '2026-01-22 06:09:23', '2026-01-29 23:43:28'),
(7, 'Yash Dalvi', 'Yash@gmail.com', NULL, '$2y$12$ScxihDVcTlQMtkK03A80HuJBmziiEoByG53Vr9YWuQdXoqqcZ6PL.', '0', 'blocked', NULL, '2026-01-22 06:22:13', '2026-01-24 00:49:38'),
(8, 'Anshu', 'Anshu@gmail.com', NULL, '$2y$12$tAmLbt6M.92ko4k6zt1LdOvqHFa3FVwllJl4.UlJ5d0fA3Jzq5TFK', '1', 'blocked', NULL, '2026-01-22 06:42:48', '2026-01-24 06:43:31'),
(9, 'Om Chavan', 'Om@gmail.com', NULL, '$2y$12$q4ARqYdFv.n4BSm9J1JIN.w477LnD37qHMrwzgX5x8cDYdOffGjuK', '0', 'blocked', NULL, '2026-01-22 07:50:52', '2026-01-24 02:53:33'),
(10, 'Vinay Tambe', 'Vinay@gmail.com', NULL, '$2y$12$p7IQ1xh.aUD922i7fQa2lucOiH.9fD6gTDWYO3LqoljQd2eUS4RM6', '1', 'active', NULL, '2026-01-23 01:21:32', '2026-01-24 00:49:31'),
(11, 'Janvi Singh', 'janvi@gmail.com', NULL, '$2y$12$eJ.hNJwl81SrxubTydJ13.EAuN/BBJTDByNBZtfNY7cZcP0.lQ2BG', '0', 'active', NULL, '2026-01-23 06:07:49', '2026-01-23 06:07:49');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tasks_user_id_foreign` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=144;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
