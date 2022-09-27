import { Router, Request, Response, NextFunction } from "express";

import { generateTicketsCtrl } from './../controllers/ticket.controller';
import { filePayloadExist } from './../middlewares/filePayloadExist';
import { fileSizeLimiter } from './../middlewares/fileSizeLimiter';
import { fileExtensionLimit } from './../middlewares/fileExtensionLimit';

import { ALLOWED_EXT_TYPES } from './../constants';

const router = Router();

router.post('',[filePayloadExist,fileExtensionLimit(ALLOWED_EXT_TYPES),fileSizeLimiter], (_req: Request, res: Response, _next: NextFunction) => {
  generateTicketsCtrl(_req, res, _next)
})

export default router;