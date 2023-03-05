import { NextFunction, Request, Response } from 'express'

export type HandleContext = (
  req: Request,
  res: Response,
  next: NextFunction
) => void
