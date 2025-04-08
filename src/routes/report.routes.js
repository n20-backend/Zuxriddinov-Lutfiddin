import express from "express"
import { getAllReport, getReportById, createReport, updateReport, deleteReport } from "../controller/report.controller.js";

const router = express.Router()

router.get("/", getAllReport)
router.get("/:id", getReportById)
router.post("/", createReport)
router.put("/:id", updateReport)
router.delete("/:id", deleteReport)

export {router as reportrouter}