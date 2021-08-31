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