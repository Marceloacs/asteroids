import type { Request } from "express";

export interface BaseRequest extends Request {
    user?: {
        id: string;
    };
}

