-- MySQL Script generated by MySQL Workbench
-- Sat Mar  4 18:53:36 2023
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema practica2sopes
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `practica2sopes` ;

-- -----------------------------------------------------
-- Schema practica2sopes
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `practica2sopes` DEFAULT CHARACTER SET utf8 ;
USE `practica2sopes` ;

-- -----------------------------------------------------
-- Table `practica2sopes`.`cpu_ram`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `practica2sopes`.`cpu_ram` ;

CREATE TABLE IF NOT EXISTS `practica2sopes`.`cpu_ram` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `ram_json` JSON NOT NULL,
  `cpu_json` JSON NOT NULL,
  `cpu_process` JSON NOT NULL,
  `percent_ram` INT NOT NULL,
  `percent_cpu` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
