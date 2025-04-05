import express from "express";
import { getAllUsers,  getUserById, createUser, updateUser, deleteUser } from "../controller/users.controller.js";


const router = express.Router();

router.get("/", getAllUsers )
router.get("/:id",getUserById)
router.post("/", createUser)
router.put("/:id", updateUser)
router.delete("/:id", deleteUser)

export {router as userRoutes};