if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const express = require('express')
const mysql = require('mysql');
const bodyParser = require('body-parser')
const cors = require('cors')

var db = mysql.createConnection({
    host: 'sql6.freesqldatabase.com',
    user: 'sql6503995',
    password: "Mq5XMaZEjI",
    database: "sql6503995"
});

// CREATING CONNECTION
db.connect((err) => {
    if (err) {
        throw err
    }
    else {
        console.log("MySql Connected!!")
    }
});


// // CREATING NEW DATABASE
// db.query("CREATE DATABASE nodemysql", (err, result) => {
//     if (err) throw err;
//     console.log(result)
// })

// CREATING NEW TABLE EMPLOYEES
// db.query('CREATE TABLE employees(id int NOT NULL UNIQUE, name VARCHAR(20) NOT NULL)', function (error, results) {
//     if (error) throw error;
//     console.log(results);
// })
const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/getdata', (req, res) => {
    let sql = "SELECT * FROM employees"
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result)
    })
})
app.get('/getdata/:id', (req, res) => {
    const { id } = req.params;
    let sql = "SELECT * FROM employees WHERE id = ?"
    db.query(sql, id, (err, result) => {
        if (err) throw err;
        res.send(result)
    })
})

// INSERT NEW USER TO THE TABLE
app.post('/create', (req, res) => {
    let { id, name } = req.body
    let sql = `INSERT INTO employees(id, name) VALUES (?,?)`
    db.query(sql, [id, name], (err, result) => {
        if (err) throw err;
    })
})

// // FETCHING THE USER FROM THE TABLE
// app.get('/read', (req, res) => {
//     let sql = "SELECT * FROM employees WHERE id = 1"
//     db.query(sql, (err,result) => {
//         if(err) throw err;
//         console.log(result)
//         res.send("result fetched")
//     })
// })

// // UPDATING THE EXISTING USER IN THE TABLE
app.put('/update/:userid', (req, res) => {
    const { userid } = req.params
    const { id, name } = req.body
    let sql = "UPDATE employees SET id = ?, name = ? WHERE id = ?"
    db.query(sql, [id, name, userid], (err, result) => {
        if (err) throw err;
    })
})

// // DELETING THE USER FROM THE TABLE
app.delete('/delete/:id', (req, res) => {
    const { id } = req.params
    let sql = "DELETE FROM employees WHERE id = ?"
    db.query(sql, id, (err, result) => {
        if (err) throw err;
        console.log(result)
    })
})

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log("SERVER STARTED ON PORT " + port)
})