// Express app
import express from "express";
import AsteroidsRouter from "./features/asteroids";
import { initializeDatabase } from "./integrations/db";
import { PORT, ALLOWED_ORIGIN } from "./constants/env";
import cors from "cors";
import useAuth from "./middlewares/auth";
import AuthRouter from "./features/auth";
import UserRouter from "./features/user";

initializeDatabase();

const app = express();
app.use(cors({ origin: ALLOWED_ORIGIN }));
app.use(express.json());
app.use(useAuth);

app.use("/asteroids", AsteroidsRouter);
app.use("/auth", AuthRouter);
app.use("/user", UserRouter);

app.listen(PORT, () => {
    console.log(`ASTEROIDS SERVER is running on port ${PORT}`);
});
