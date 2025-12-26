import express from 'express'
import cors from 'cors'
import mysql from "mysql2";

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",      // XAMPP default
    database: "project_db",
});

db.connect(err => {
    if (err) {
        console.error("MySQL connection failed", err);
    } else {
        console.log("MySQL connected");
    }
});


const app = express()
app.use(cors())
app.use(express.json());


app.use('/',(req, res) => {
  db.query("SELECT * FROM users", (err, data) => {
    if (err) return res.json(err);
    res.json(data);
  });

})

app.listen(5000, () => {
    console.log('server running on port')
})