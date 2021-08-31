const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host:'localhost',
        user:'root',
        password: '',
        database: 'employeeTracker_db'
    },
    console.log("Connected to Employee Tracker")
);

const departments = () =>{
    db.query("SELECT * FROM departments", (err,data)=>{
        if(err){
            console.log(err)
            db.end();
        }else{
            console.log('working')
            console.log(data);
            main()
        }
    })
};

const employees = () => {
    db.query("SELECT employees.id, employees.first_name, employees.last_name, employees.manager_id, roles.title, roles.salary, roles.department_id, departments.name FROM employees JOIN roles on employees.role_id=roles.id JOIN departments ON roles.department_id=departments.id", (err,data)=>{
    if(err){
        console.log(err)
        db.end();
    }else{
        console.table(data);
        main();
    }
}
)};

const roles = () => {
    db.query("SELECT roles.title AS title, salary, departments.name AS department FROM roles JOIN departments ON roles.department_id=departments.id", (err,data)=>{
        if(err){
            console.log(err)
            db.end();
        }else{
            console.table(data);
            main();
        }
    }
    )};