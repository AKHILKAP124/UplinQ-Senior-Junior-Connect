import database from "../utils/database_connection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



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

        if (user.length <= 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user[0].password);

        if (isPasswordValid) {

            const uuid = jwt.sign({ id: user[0].id }, process.env.UUID_SECRET);
            res.cookie("uuid", uuid, {
                httpOnly: true,
                secure: true,
            });
            return res.status(200).json({ message: "User logged in successfully", data: user });
        } else {
            return res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
    
}

const logout = async (req, res) => {
    res.clearCookie("uuid");
    return res.status(200).json({ message: "User logged out successfully" });
};

const changePassword = async (req, res) => {

    try {
        const { password, newPassword } = req.body;
        const user = req?.user;

        if (!password || !newPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        await database.query("USE Uplinq");

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await database.query(
                "UPDATE user SET password = ? WHERE id = ?",
                [hashedPassword, user.id]
            );
            return res.status(200).json({ message: "Password changed successfully" });
        } else {
            return res.status(401).json({ message: "Invalid password" });
        }

    } catch (error) {
        
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
    
}

const getUser = async (req, res) => {
    try {
        const user = req?.user;
        return res.status(200).json({ message: "User fetched successfully", data: user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const getUserById = async (req, res) => {
    
    try {

        const userId = req.body;

        if (!userId) {
            return res.status(400).json({ message: "userId is required" });
        }

        await database.query("USE Uplinq");

        const [user] = await database.query(
            "SELECT * FROM user WHERE id = ?",
            [userId]
        );

        if (user.length <= 0) {
            return res.status(404).json({ message: "User not found" });
        }
        
        return res.status(200).json({ message: "User fetched successfully", data: user });
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

const getAllUsers = async (req, res) => {
    try {
        await database.query("USE Uplinq");
        const [users] = await database.query("SELECT * FROM user");
        return res.status(200).json({ message: "Users fetched successfully", data: users });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export { register, login, changePassword, logout, getUser, getUserById, getAllUsers };