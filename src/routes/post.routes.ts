import { NextFunction, Request, Response, Router } from 'express'
import { getAllPostsCtrl, getPostCtrl, updatePostCtrl, deletePostCtrl } from '../controllers/posts.controller'

const router = Router()

/**
 * @swagger
 * components:
 *  schemas:
 *    Post:
 *      type: object
 *      properties:
 *        userId:
 *          type: number
 *          description: user id identifier
 *        id:
 *          type: number
 *          description: if of the post
 *        title:
 *          type: string
 *          description: title of the post
 *        body:
 *          type: string
 *          description: body of the post
 *      required:
 *        - title
 *        - body
 *      example:
 *        title: this is the title of the post
 *        body: body of the post, is large text
 *  parameters:
 *    postId:
 *      in: path
 *      name: id
 *      description: if of the post
 *      required: true
 *      schema:
 *        type: number
 */

/**
 * @swagger
 *  tags:
 *    name: Posts
 *    description: Posts endpoints
 */

/**
 * @swagger
 * /post:
 *  get:
 *    summary: get all posts
 *    tags: [Posts]
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
 *                posts:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Post'
 */

router.get('', (_req: Request, res: Response, _next: NextFunction) => {
  getAllPostsCtrl(_req, res, _next)
})

/**
 * @swagger
 * /post/{id}:
 *  get:
 *    summary: get post by id
 *    tags: [Posts]
 *    responses:
 *      200:
 *        description: get info from specific post based on his Id
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
 *                post:
 *                  type: object
 *                  $ref: '#/components/schemas/Post'
 */
router.get('/:id', (_req: Request, res: Response, _next: NextFunction) => {
  getPostCtrl(_req, res, _next)
})

/**
 * @swagger
 * /post/{id}:
 *  put:
 *    summary: delete post by id
 *    tags: [Posts]
 *    requestBody:
 *      required: true
 *    parameters:
 *      - in: formData
 *        name: title
 *        type: string
 *        description: title of the post
 *        required: true
 *      - in: formData
 *        name: body
 *        type: string
 *        description: body of the post, large text
 *        required: true
 *      - $ref: '#/components/parameters/postId'
 *    responses:
 *      200:
 *        description: delete specific post based on his Id
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
 *                post:
 *                  type: object
 *                  $ref: '#/components/schemas/Post'
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
 *                  description: msg from the endpoint used\
 *      400:
 *        description: error client, missing data on request check title and body
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
 */
router.put('/:id', (_req: Request, res: Response, _next: NextFunction) => {
  updatePostCtrl(_req, res, _next)
})

/**
 * @swagger
 * /post/{id}:
 *  delete:
 *    summary: delete post by id
 *    tags: [Posts]
 *    parameters:
 *     - $ref: '#/components/parameters/postId'
 *    responses:
 *      200:
 *        description: delete specific post based on his Id
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
 */
router.delete('/:id', (_req: Request, res: Response, _next: NextFunction) => {
  deletePostCtrl(_req, res, _next)
})


export default router