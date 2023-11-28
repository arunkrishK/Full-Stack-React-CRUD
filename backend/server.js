const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app= express();

app.use(express.json());

app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user : "root",
    password : "",
    database : "student"
})
app.get("/", (req, res) => {
    const sql = "SELECT * FROM addstudent";
    db.query(sql, (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.post("/create", (req, res) => {
    const sql = "INSERT INTO addstudent (`name`, `age`, `place`) VALUES (?, ? ,?)";
    const values = [req.body.name, req.body.age, req.body.place];

    console.log("SQL Query:", sql);
    console.log("Values:", values);

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error inserting data into the database" });
        }
        return res.status(200).json(result);
    });
});



app.put("/update/:id", (req, res) => {
    const sql = "update addstudent set `name` = ?,  `age` = ?, `place` = ? where id = ?";
    const values = [req.body.name, req.body.age, req.body.place];

    console.log("SQL Query:", sql);
    // console.log("Values:", values);

    const id= req.params.id;

    db.query(sql, [...values, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error inserting data into the database" });
        }
        return res.status(200).json(result);
    });
});




app.delete('/student/:id', (req, res) => {
    const sql = "DELETE  FROM addstudent WHERE id = ?";
    const id= req.params.id;

    db.query(sql, [id], (err, result) => {
        if (err) return res.json("Error");
        return res.json(result);
    });
});



app.listen(8081, () =>{
    console.log("server is running on port 8081");
})