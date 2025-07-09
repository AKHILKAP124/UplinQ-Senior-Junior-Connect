import Router from "express";
import {
  changePassword,
  emailValidation,
  getAllUsers,
  getUser,
  getUserById,
  login,
  logout,
  register,
  saveDetails,
} from "../controllers/User.js";
import isAuthorized from "../utils/userAuthorization.js";

const UserRouter = Router();

UserRouter.post("/register", register);
UserRouter.post("/save-details", saveDetails);
UserRouter.post("/login", login);
UserRouter.post("/change-password", isAuthorized, changePassword);
UserRouter.post("/email-validation", emailValidation);
UserRouter.get("/logout", isAuthorized, logout);
UserRouter.get("/get-user", isAuthorized, getUser);
UserRouter.get("/get-user-by-id", isAuthorized, getUserById);
UserRouter.get("/get-all-users", isAuthorized, getAllUsers);

export default UserRouter;
