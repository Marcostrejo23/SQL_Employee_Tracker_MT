INSERT INTO department (name) VALUES 
("Legal"),
("Engineering"),
("Finance");

INSERT INTO roles (title,salary,department_id) VALUES
("Salesperson",350000,1),
("Account Manager",100000,2),
("Lawyer",400000,3),
("Software Engineer",500000,4),
("Lead Engineer",100000,5);

INSERT INTO employees (first_name, last_name, role_id,manager_id) VALUES 
("Marcos","Trejo",1,1),
("Bob","Dole",2,2),
("Senior","Frog",3,3),
("Cat","Dog",4,4);