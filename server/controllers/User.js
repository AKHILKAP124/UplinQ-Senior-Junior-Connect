import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import generateUniqueUsername from "../utils/helper.js";


const register = async (req, res) => {
  const { name, email, password } =
    req.body;
  try {
    // Check if all required fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Function to generate a unique username
    const UniqueUsername = generateUniqueUsername(name);

    // Create a new user
    const user = await User.create({
      username: UniqueUsername,
      name,
      email,
      password
    });

    // Save the user to the database
    return res
      .status(200)
      .json({ message: "User registered successfully", data: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const saveDetails = async (req, res) => {
  try {
    const { userId, college, avatar, branch, year, skills } = req.body;

    if (!college || !avatar || !branch || !year || !skills) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndUpdate(userId, {
      college,
      avatar,
      branch,
      year,
      skills,
    });
    
    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

const login = async (req, res) => {
  try {
    const { userCredentials , password } = req.body;
    if (!userCredentials || !password) {
      return res.status(400).json({ message: "All fields are required" });
      }
      
    // Check if the user exists
    const user = await User.findOne({ $or: [{ email: userCredentials }, { username: userCredentials }] });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const decodePassword = await bcrypt.compare(password, user.password);

    console.log(user, password, decodePassword);

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
      }

    // Generate a UUID token
    const token = jwt.sign({ id: user?.id }, process.env.UUID_SECRET, {
      expiresIn: "1d",
    });

    // Set the UUID token as a cookie
    res.cookie("uuid", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return res.status(200).json({ message: "User logged in successfully", data: user });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

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
      await database.query("UPDATE user SET password = ? WHERE id = ?", [
        hashedPassword,
        user.id,
      ]);
      return res.status(200).json({ message: "Password changed successfully" });
    } else {
      return res.status(401).json({ message: "Invalid password" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const user = req?.user;
    await database.query("USE Uplinq");
    await database.query(
      "UPDATE user SET name = ?, email = ?, role = ? WHERE id = ?",
      [name, email, role, user.id]
    );
    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const emailValidation = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (user) {
      console.log(user);
      return res.status(400).json({ message: "Email already exists" });
    }

    return res.status(200).json({ message: "Email is valid" });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getUser = async (req, res) => {
  try {
    const user = req?.user;
    return res
      .status(200)
      .json({ message: "User fetched successfully", data: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.body;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    await database.query("USE Uplinq");

    const [user] = await database.query("SELECT * FROM user WHERE id = ?", [
      userId,
    ]);

    if (user.length <= 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "User fetched successfully", data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    await database.query("USE Uplinq");
    const [users] = await database.query("SELECT * FROM user");
    return res
      .status(200)
      .json({ message: "Users fetched successfully", data: users });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export {
  register,
  saveDetails,
  login,
  changePassword,
  updateUser,
  emailValidation,
  logout,
  getUser,
  getUserById,
  getAllUsers,
};
