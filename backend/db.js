import express from "express";
import cors from "cors";
import mysql from "mysql2";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
});

db.connect(err => {
  if (err) console.error(err);
  else console.log("MySQL connected");
});

app.get("/api/users", (req, res) => {
  db.query("SELECT * FROM users", (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on", PORT));
