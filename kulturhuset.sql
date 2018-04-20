-- phpMyAdmin SQL Dump
-- version 4.8.0-dev
-- https://www.phpmyadmin.net/
--
-- Vært: 127.0.0.1
-- Genereringstid: 20. 04 2018 kl. 09:28:04
-- Serverversion: 10.1.26-MariaDB
-- PHP-version: 7.1.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kulturhuset`
--

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `arrangementer`
--

CREATE TABLE `arrangementer` (
  `id` int(11) NOT NULL,
  `navn` varchar(55) NOT NULL,
  `Pris` int(11) NOT NULL,
  `Dato` datetime NOT NULL,
  `Sal_fk` int(11) NOT NULL,
  `beskrivelse` varchar(55) NOT NULL,
  `billede` varchar(55) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `arrangementer`
--

INSERT INTO `arrangementer` (`id`, `navn`, `Pris`, `Dato`, `Sal_fk`, `beskrivelse`, `billede`) VALUES
(1, 'Star Wars', 2147483647, '2018-04-19 00:00:00', 5, 'Star Wars Film', 'star_wars.jpg');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `sale`
--

CREATE TABLE `sale` (
  `id` int(11) NOT NULL,
  `Navn` varchar(55) NOT NULL,
  `Pladser` int(11) NOT NULL,
  `type_fk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `sale`
--

INSERT INTO `sale` (`id`, `Navn`, `Pladser`, `type_fk`) VALUES
(5, 'Sal 1', 75, 17),
(6, 'Store Sal', 0, 19);

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `type`
--

CREATE TABLE `type` (
  `id` int(11) NOT NULL,
  `Navn` varchar(55) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `type`
--

INSERT INTO `type` (`id`, `Navn`) VALUES
(17, 'Film'),
(21, 'Foredrag'),
(19, 'Koncert'),
(18, 'Teater'),
(20, 'Udstilling');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(55) NOT NULL,
  `last_name` varchar(55) NOT NULL,
  `mob_no` int(11) NOT NULL,
  `user_name` varchar(55) NOT NULL,
  `password` varchar(55) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `mob_no`, `user_name`, `password`) VALUES
(1, '', '', 0, 'admin', 'admin');

--
-- Begrænsninger for dumpede tabeller
--

--
-- Indeks for tabel `arrangementer`
--
ALTER TABLE `arrangementer`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `navn` (`navn`),
  ADD KEY `Sal_fk` (`Sal_fk`);

--
-- Indeks for tabel `sale`
--
ALTER TABLE `sale`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Navn` (`Navn`),
  ADD KEY `type_fk_2` (`type_fk`);

--
-- Indeks for tabel `type`
--
ALTER TABLE `type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Navn` (`Navn`);

--
-- Indeks for tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`user_name`),
  ADD UNIQUE KEY `mob_no` (`mob_no`);

--
-- Brug ikke AUTO_INCREMENT for slettede tabeller
--

--
-- Tilføj AUTO_INCREMENT i tabel `arrangementer`
--
ALTER TABLE `arrangementer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Tilføj AUTO_INCREMENT i tabel `sale`
--
ALTER TABLE `sale`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Tilføj AUTO_INCREMENT i tabel `type`
--
ALTER TABLE `type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Tilføj AUTO_INCREMENT i tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Begrænsninger for dumpede tabeller
--

--
-- Begrænsninger for tabel `arrangementer`
--
ALTER TABLE `arrangementer`
  ADD CONSTRAINT `arrangementer_ibfk_1` FOREIGN KEY (`Sal_fk`) REFERENCES `sale` (`id`);

--
-- Begrænsninger for tabel `sale`
--
ALTER TABLE `sale`
  ADD CONSTRAINT `sale_ibfk_1` FOREIGN KEY (`type_fk`) REFERENCES `type` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
