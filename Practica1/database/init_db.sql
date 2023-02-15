CREATE DATABASE mydb;

USE mydb;

CREATE TABLE operacion (
    num1 VARCHAR(255),
    num2 VARCHAR(255),
    operator VARCHAR(255),
    resultado VARCHAR(255),
    fechayhora VARCHAR(255)
);
-- PRUEBA
INSERT INTO operacion VALUES ('5', '5', '*', '25', '15/2/2023'), ('15', '5', '+', '20', '15/2/2023');