import express, { type Application, type Request, type Response } from "express";
import { usersRouter } from "./modules/auth/users.route";


const app: Application = express();

app.use(express.json())


// initial get method response when the server is running
app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Issue Manager is running..."
    })
})

// use - users route for sign up
app.use("/api/auth", usersRouter)


export default app;
