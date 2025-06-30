import database from "./database_connection.js";
import jwt from "jsonwebtoken";


const isAuthorized = async (req, res, next) => {
    const uuid = req.cookies.uuid;
    if (!uuid) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const decodedToken = jwt.verify(uuid, process.env.UUID_SECRET);
     
    if (!decodedToken) {
        return res.status(401).json({ message: "Unauthorized User" });
    }

    database.query("USE Uplinq");
    const [user] = await database.query(
        "SELECT * FROM user WHERE id = ?",
        [decodedToken?.id]
    );

    if (user.length <= 0) {
        return res.status(401).json({ message: "Unauthorized User" });
    }

    req.user = user[0];
    next();
};

export default isAuthorized;