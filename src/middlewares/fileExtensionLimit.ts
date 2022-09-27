import { Request, Response, NextFunction } from "express";
import path from 'path';

import { parseObjectType } from './../utils/parseObjectType';

export const fileExtensionLimit = (allowedExtFiles: string[])=> {
  return (req: Request, res: Response, next: NextFunction): Response | void => {
    const files = parseObjectType(req.files);
    const filesExtensions: string[] = [];

    Object.keys(files.fileName.length > 0 ? files.fileName : files).forEach( key => {
      filesExtensions.push(path.extname(files.fileName.length > 0 ? files.fileName[key].name : files[key].name))
    })

    res.locals.filesNames = [ ...filesExtensions]
    // console.log("🚀 ~ file: fileExtensionLimit.ts ~ line 10 ~ return ~ filesExtensions", filesExtensions)
    const allowFilesExt = filesExtensions.every( ext => allowedExtFiles.includes(ext))
    if(!allowFilesExt) {
      const msg = `Upload failed. ${allowedExtFiles.toString()} files allowed.`.replaceAll(",", " ,")

      // 422 unprocesable entity, incompatibility type files
      return res.status(422).json({
        ok: false,
        msg
      })
    }
    next()
  }
}
