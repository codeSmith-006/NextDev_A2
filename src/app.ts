import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { usersRouter } from "./modules/auth/users.route";
import { issuesRouter } from "./modules/issues/issues.route";
import cors from "cors";

const app: Application = express();
app.use(
  cors({
    origin: "*",
  }),
);
app.use(express.json());

// initial get method response when the server is running
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Issue Manager is running...",
  });
});

// use - users route for auth
app.use("/api/auth", usersRouter);

// use - issues route
app.use("/api/issues", issuesRouter);

export default app;
