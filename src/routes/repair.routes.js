import express from "express"
import { getAllRepair, getRepairById, createRepair, updateRepair, deleteRepair} from "../controller/repair.controller.js"

const router = express.Router()

router.get("/", getAllRepair)
router.get("/:id", getRepairById)
router.post("/", createRepair)
router.put("/:id", updateRepair)
router.delete("/:id", deleteRepair)

export {router as repairroutes}
