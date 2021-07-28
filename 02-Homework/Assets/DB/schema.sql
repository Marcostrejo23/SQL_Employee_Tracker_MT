DROP DATABASE IF EXISTS employeeTracker_db; 
CREATE DATABASE employeeTracker_db; 

USE employeeTracker_db;

CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL DEFAULT ""
)