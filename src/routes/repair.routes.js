import express from "express"
import { getAllRepair, getRepairById, createRepair, updateRepair } from "../controller/repair.controller.js"

const router = express.Router()

router.get("/", getAllRepair)
router.get("/:id", getRepairById)
router.post("/", createRepair)
router.put("/:id", updateRepair)

export {router as repairroutes}
