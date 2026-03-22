import { Request, Response, NextFunction } from "express";
import { z } from "zod";
export declare const validate: (schema: z.ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=validate.middleware.d.ts.map