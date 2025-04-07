import express from "express"
import { getAllOrders, getOrderById, createOrder, updateorder, deleteOrder } from "../controller/orders.controller.js"

const router = express.Router();

router.get("/", getAllOrders)
router.get("/:id", getOrderById)
router.post("/", createOrder)
router.put("/:id", updateorder)
router.delete("/:id", deleteOrder)

export {router as ordesRoutes}