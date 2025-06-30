import Router from "express";
import { changePassword, getAllUsers, getUser, getUserById, login, logout, register } from "../controllers/User.js";
import isAuthorized from "../utils/userAuthorization.js";

const UserRouter = Router();

UserRouter.post("/register", register);
UserRouter.post("/login", login);
UserRouter.post("/change-password", isAuthorized, changePassword);
UserRouter.get("/logout", isAuthorized, logout);
UserRouter.get("/get-user", isAuthorized, getUser);
UserRouter.get("/get-user-by-id", isAuthorized, getUserById);
UserRouter.get("/get-all-users", isAuthorized, getAllUsers);

export default UserRouter;