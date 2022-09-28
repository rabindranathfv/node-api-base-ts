import { Router, Request, Response, NextFunction } from "express";
// import cron from 'node-cron';

import { automaticGenerateTicketsCtrl, generateTicketsCtrl } from './../controllers/ticket.controller';
import { filePayloadExist } from './../middlewares/filePayloadExist';
import { fileSizeLimiter } from './../middlewares/fileSizeLimiter';
import { fileExtensionLimit } from './../middlewares/fileExtensionLimit';

import { ALLOWED_EXT_TYPES } from './../constants';

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Ticket:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *          description: if of the ticket
 *        description:
 *          type: string
 *          description: description of the ticket
 *        date:
 *          type: string
 *          format: date
 *          description: creation date of the ticket
 *        type:
 *          type: string
 *          description: type of algorithm used for create the ticket
 *      example:
 *        id: 105b7exc4
 *        description: some descript
 *        date: 2022-09-28T17:39:39.940Z
 *        type: numerosAleatorios
 *  parameters:
 *    fileName:
 *      in: body
 *      name: fileName
 *      description: files on body
 *      required: true
 *      schema:
 *        type: string
 *        format: binary
 */

/**
 * @swagger
 *  tags:
 *    name: Tickets
 *    description: Tickets endpoints
 */

/**
 * @swagger
 * /ticket:
 *  post:
 *    summary: upload files to start app
 *    tags: [Tickets]
 *    requestBody:
 *      required: true
 *    parameters:
 *      - in: formData
 *        name: fileName
 *        type: string
 *        format: binary
 *        description: files with txt extension
 *        required: true
 *    responses:
 *      '200':
 *        description: generate tickets from files from body request
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                  description: return false
 *                msg:
 *                  type: string
 *                  description: msg from the endpoint used
 *                tickets:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Ticket'
 *      500:
 *        description: server side error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                  description: return false
 *                msg:
 *                  type: string
 *                  description: msg from the endpoint used
 *      '400':
 *        description: error missing files upload
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                  description: return false
 *                msg:
 *                  type: string
 *                  description: msg from the endpoint used
 *      '413':
 *        description: error with the size from all files upload
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                  description: when it is a error is false
 *                msg:
 *                  type: string
 *                  description: message about the failed upload process
 *      '422':
 *        description: error support extension for upload
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                  description: when it is a error is false
 *                msg:
 *                  type: string
 *                  description: message about the failed upload process
 */

router.post('',[filePayloadExist,fileExtensionLimit(ALLOWED_EXT_TYPES),fileSizeLimiter], (_req: Request, res: Response, _next: NextFunction) => {
  generateTicketsCtrl(_req, res, _next)
})

/**
 * @swagger
 * /ticket/generate:
 *  get:
 *    summary: generate all tickets from folder config
 *    tags: [Tickets]
 *    responses:
 *      '200':
 *        description: list of posts
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                  description: return if all was good or not with the request
 *                msg:
 *                  type: string
 *                  description: msg from the endpoint used
 *                tickets:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Ticket'
 *      '500':
 *        description: error generate Post from folder config
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                  description: returns false if was any troubls or errors
 *                msg:
 *                  type: string
 *                  description: msg from endpoint describe some about the error
 */
router.get('/generate', (_req: Request, res: Response, _next: NextFunction) => {
  automaticGenerateTicketsCtrl(_req, res, _next)
})

export default router;