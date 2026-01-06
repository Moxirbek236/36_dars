import { Router } from "express";
import SmartQueryController from "../controllers/smartQuery.controller.js";

const router = Router()
router.get('/smart', SmartQueryController.getSmartQuery)
export default router