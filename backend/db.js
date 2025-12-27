import express from "express";
import cors from "cors";
import mysql from "mysql2";
import env from 'dotenv'
env.config()
const app = express();
app.use(cors());
app.use(express.json());

export const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,
});

db.connect(err => {
    if (err) console.error(err);
    else console.log("MySQL connected");
});

app.get("/api/users", (req, res) => {
    db.query("SELECT * FROM user;", (err, data) => {
        if (err) return res.status(500).json(err);
        res.json(data);
    });
});
app.get("/api/users/:id", (req, res) => {
    const id = req.params.id
    db.query("SELECT * FROM user WHERE id = ? ;",[id], (err, data) => {
        if (err) return res.status(500).json(err);
        res.json(data);
    });
});

const PORT = process.env.PORTS || 5000;
app.listen(PORT, () => console.log("Server running on", PORT));
