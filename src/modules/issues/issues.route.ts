import { Router } from "express";
import { issuesController } from "./issues.controller";

const router = Router();

// post issues
router.post("/", issuesController.createIssues);

// get issues
router.get("/", issuesController.getIssues);

export const issuesRouter = router;
