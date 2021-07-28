DROP DATABASE IF EXISTS employeeTracker_db; 
CREATE DATABASE employeeTracker_db; 

USE employeeTracker_db;

CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
);

CREATE ROLE (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    title VARCHAR(30) NOT NULL, 
    salary DECIMAL NOT NULL, 
    department_id INT NOT NULL, 
    FOREIGN KEY (department_id)
        REFERENCES department(id)
        ON DELETE CASCADE
);