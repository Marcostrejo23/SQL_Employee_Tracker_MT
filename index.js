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
    db.query("SELECT * FROM department", (err,data)=>{
        if(err){
            console.log(err)
            db.end();
        }else{
        console.table(data);
           main()
        }
    })
};

const employees = () => {
    db.query("SELECT  employees.first_name, employees.last_name, employees.id, employees.manager_id, roles.salary, roles.title, roles.department_id, department.name FROM employees JOIN roles on employees.role_id=roles.id JOIN department ON roles.department_id=department.id", (err,data)=>{
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
    db.query("SELECT roles.title AS title, salary, department.name AS department FROM roles JOIN department ON roles.department_id=department.id", (err,data)=>{
        if(err){
            console.log(err)
            db.end();
        }else{
            console.table(data);
           main();
        }
    }
    )};

const insertD=()=>{
    inquirer.prompt([
        {
            type:"input",
            message:"What is the departments name?",
            name:"name"
        }
    ]).then(answers => {
        db.query(`INSERT INTO department (name) VALUES(?)`,[answers.name],(err,data) => {
            if(err){
                console.log(err);
                db.end();
            } else {
                console.log("department added!");
                departments();
            }
        })

    })
};

const insertE = () => {
    db.query("SELECT * FROM roles", (err,data)=>{
        if(err){console.log(err)
            db.end();
        }else {
        const insertEmployee = data.map( role => {
            return {
            name: role.title,
            value:role.id
            }
        });
        console.log(insertEmployee)
    inquirer.prompt([
        {
            type:"list",
            message:"What is the title of the employee?",
            choices:insertEmployee,
            name:"role_id"
        },
        {
            type:"input",
            message:"What is the first name of the employee?",
            name:"first_name"
        },
        {
            type:"input",
            message:"What is the last name of the employee?",
            name:"last_name"
        },
        {
            type:"input",
            message:"What is the employee_id for the manager of the new employee?",
            name:"manager_id"
        }

    ]).then(answers => {
        db.query(`INSERT INTO employees (first_name,last_name,role_id, manager_id) VALUES(?,?,?,?)`,
        [answers.first_name,answers.last_name,answers.role_id,answers.manager_id],(err,data) => {
            if(err){
                console.log(err);
                db.destroy();
            } else {
                console.log("employee has been added successfully");
                employees();
            }
        }
        )
    });
}
})
};


const main= ()=>{
    inquirer.prompt({
        type: "list",
        choices: ["departments","roles","employees","add new department","add new role","add new employees","finished"],
        message: "which would you like to do?",
        name: "options"
    }).then(({options}) =>{
        console.log(options)
        switch(options){
            case "departments":
                departments();
                break;
           case "add new department":
               insertD();
               break;
            case "roles":
                roles();
                break;
            case "add new role":
                insertE();
            case "employees":
                employees();
                break;
            case "add new employees":
                insertE();
                break;
            default:
                console.log("goodbye");
                db.end()
                break;
            
        }
    })
}
main();