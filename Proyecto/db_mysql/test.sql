use dbproy1sopes;

CREATE TABLE IF NOT EXISTS `dbproy1sopes`.`Voto` (
  `idVoto` INT NOT NULL AUTO_INCREMENT,
  `sede` INT NOT NULL,
  `municipio` VARCHAR(100) NOT NULL,
  `departamento` VARCHAR(100) NOT NULL,
  `papeleta` VARCHAR(100) NOT NULL,
  `partido` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idVoto`));
  
  INSERT INTO Voto (sede, municipio, departamento, papeleta, partido) 
VALUES (1, 'gutemela', 'guatemela', 'arcoiris', 'patriota');


SELECT * FROM Voto;