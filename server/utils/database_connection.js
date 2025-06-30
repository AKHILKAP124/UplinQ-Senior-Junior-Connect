import mysql from "mysql2/promise";

const database = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Akhil@123",
    database: "Uplinq",
  });
  console.log("Database connected");

export default database;
