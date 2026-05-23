import { Router } from "express";
import { issuesController } from "./issues.controller";
import { checkMaintainer } from "../../middleware/checkMaintainer";
import { updateRole } from "../../middleware/updateRole";

const router = Router();

// post issues
router.post("/", issuesController.createIssues);

// get issues
router.get("/", issuesController.getIssues);
// get issues by id
router.get("/:id", issuesController.getSingleIssue);
// patch method for update the fields
router.patch("/:id", updateRole, issuesController.updateIssue);
// not delete an issue
router.delete("/:id", checkMaintainer, issuesController.deleteIssues);

export const issuesRouter = router;
