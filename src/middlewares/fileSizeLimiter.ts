import { Request, Response, NextFunction } from "express";
import { parseObjectType } from './../utils/parseObjectType';

import { FILE_SIZE_LIMIT, MB } from "../constants";

export const fileSizeLimiter = (req: Request, res: Response, next: NextFunction): Response | void | undefined => {
  const files = parseObjectType(req.files);
  const filesOverLimit: string[] = [];

  Object.keys(files.fileName.length > 0 ? files.fileName : files).forEach( key => {
    if ((files.fileName.length > 0 ? files.fileName[key].size : files[key].size) > FILE_SIZE_LIMIT) {
      filesOverLimit.push(files.fileName.length > 0 ? files.fileName[key].name : files[key].name)
    }
  })

  if(filesOverLimit.length) {
    const properVerb = filesOverLimit.length > 1 ? 'are' : 'is';

    const info = `Upload failed. ${filesOverLimit.toString()} ${properVerb} over the file size limit of ${MB} MB`.replaceAll(",", " ,");
    const msg = filesOverLimit.length < 3 ? info.replace(",", " and") : info.replace(/,(?=[^,]*$)/, " and");

    return res.status(413).json({
      ok: false,
      msg
    });
  }

  next();
}