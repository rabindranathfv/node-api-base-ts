import { Request, Response, NextFunction } from "express";

export const filePayloadExist = (req: Request, res: Response, next: NextFunction): Response | void => {
  if (!req.files) {
    return res.status(400).json({
      ok: false,
      msg: 'Missing files'
    })
  }
  next()
}
