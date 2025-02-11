import { Router } from "express";
import getAsteroidsListController from "./get-list/controller";
import getAsteroidsDetailController from "./get-detail/controller";

const AsteroidsRouter = Router();

AsteroidsRouter.get("/list", getAsteroidsListController);
AsteroidsRouter.get("/detail", getAsteroidsDetailController);

export default AsteroidsRouter;