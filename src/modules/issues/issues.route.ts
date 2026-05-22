import { Router } from "express";
import { issuesController } from "./issues.controller";

const router = Router()

// post issues
router.post("/", issuesController.createIssues)

export const issuesRouter = router;