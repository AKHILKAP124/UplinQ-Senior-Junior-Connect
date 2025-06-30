import Router from "express";
import { login, register } from "../controllers/User.js";

const UserRouter = Router();

UserRouter.post("/register", register);
UserRouter.post("/login", login);

export default UserRouter;