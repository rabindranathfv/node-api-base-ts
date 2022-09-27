import { Response, Request, NextFunction} from 'express';
import { deletePost, getAllPosts, getPost, updatePost } from '../services/post.service';

export const getAllPostsCtrl = (req: Request, res: Response, _next: NextFunction): void => {
  try {
    getAllPosts(req, res, _next);
  } catch (error) {
    console.log(error)
    res.status(400).json({
      ok: false,
      msg: 'error client side'
    })
  }
}

export const getPostCtrl = (req: Request, res: Response, _next: NextFunction): void => {
  try {
    const id: string = req.params.id ?? null;

    if (!id) {
      res.status(404).json({
        ok: true,
        msg: 'the id is missing'
      })
    }
    getPost(req, res, _next);
  } catch (error) {
    console.log(error)
    res.status(400).json({
      ok: false,
      msg: 'error client side'
    })
  }
}

export const updatePostCtrl = (req: Request, res: Response, _next: NextFunction): void => {
  try {
    const id: string = req.params.id ?? null;
    const title: string = req.body.title ?? null;
    const body: string = req.body.body ?? null;

    if (!id) {
      res.status(400).json({
        ok: true,
        msg: 'the id is missing'
      })
    }

    if (!(title || body)) {
      res.status(400).json({
        ok: true,
        msg: 'the body or title is missing'
      })
    }

    updatePost(req, res, _next);
  } catch (error) {
    console.log(error)
    res.status(400).json({
      ok: false,
      msg: 'error client side'
    })
  }
}

export const deletePostCtrl = (req: Request, res: Response, _next: NextFunction): void => {
  try {
    const id: string = req.params.id ?? null;

    if (!id) {
      res.status(404).json({
        ok: true,
        msg: 'the id is missing'
      })
    }
    deletePost(req, res, _next);
  } catch (error) {
    console.log(error)
    res.status(400).json({
      ok: false,
      msg: 'error client side'
    })
  }
}