import type { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "../constants/env";
import jwt from 'jsonwebtoken';
import type { BaseRequest } from "../models/base-request";

export default function useAuth(req: BaseRequest, res: Response, next: NextFunction) {
    const token = req.headers.authorization as string;

    if (!token) {
        return next();
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const userId = decoded.id;

    if (!userId) {
        return next();
    }
    
    req.user = { id: userId };
    next();
}
