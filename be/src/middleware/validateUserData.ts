import { Request, Response, NextFunction } from "express";
import { z } from "zod";
export const validateUserData =
  (schema: z.ZodObject<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
        file: req.file,
      });
      next();
    } catch (error: any) {
      let zodErrors = {};
      error.issues.forEach((issue: any) => {
        zodErrors = { ...zodErrors, [issue.path[1]]: issue.message };
      });
      return res.status(400).send({ errors: zodErrors });
    }
  };
