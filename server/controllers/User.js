import database from "../utils/database_connection.js";
import bcrypt from "bcrypt";

const register = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
      if (!name || !email || !password || !role) {
        return res.status(400).json({ message: "All fields are required" });
        }

        await database.query( "USE Uplinq" );

        const [existingUser] = await database.query(
            "SELECT * FROM user WHERE email = ?",
            [email]
        );

        
        if (existingUser.length > 0) {
            return res.status(400).json({ message: "User already exists", data: existingUser });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        await database.query(
            "INSERT INTO user (name, email, password, role) VALUES (?, ?, ?, ?)",
            [name, email, hashedPassword, role]
        );

        const [user] = await database.query(
            "SELECT * FROM user WHERE email = ?",
            [email]
        );
        
        return res.status(200).json({ message: "User registered successfully", data: user });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        await database.query("USE Uplinq");

        const [user] = await database.query(
            "SELECT * FROM user WHERE email = ?",
            [email]
        );

        const isPasswordValid = await bcrypt.compare(password, user[0].password);

        if (isPasswordValid) {
            return res.status(200).json({ message: "User logged in successfully", data: user });
        } else {
            return res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
    
}

export { register, login };