
import axios, { AxiosResponse } from 'axios';
import {Response, Request, NextFunction} from 'express';

import { Post } from '../interfaces/post.interface';

import { EXTERNAL_API } from '../config/config';
import { updatePostBody } from '../types/types';

export const getAllPosts = async (_req: Request, res: Response, _next: NextFunction) => {
  try {
    const result: AxiosResponse = await axios.get(EXTERNAL_API ?? `https://jsonplaceholder.typicode.com/posts`);
    const posts: [Post] = result?.data;
    return res.status(200).json({
      ok: true,
      msg: 'get all posts suceesfully',
      posts
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'server side error'
    })
  }
}

export const getPost = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const id: string = req.params.id;
    const result: AxiosResponse = await axios.get(`${EXTERNAL_API}/${id}` ?? `https://jsonplaceholder.typicode.com/posts/${id}`);
    const post: [Post] = result?.data;
    return res.status(200).json({
      ok: true,
      msg: `get post suceesfully`,
      post
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'server side error getting a specific post'
    })
  }
}

export const updatePost = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const id: string = req.params.id;
    const title: string = req.body.title
    const body: string = req.body.body
    const result: AxiosResponse<Post | updatePostBody>  = await axios.put<Post | updatePostBody>(`${EXTERNAL_API}/${id}` ?? `https://jsonplaceholder.typicode.com/posts/${id}`, {
      title,
      body
  });;
    const post: Post | updatePostBody = result?.data;
    return res.status(200).json({
      ok: true,
      msg: 'update post info succesfully',
      post
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'server side error updating a post'
    })
  }
}

export const deletePost = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const id: string = req.params.id;
    const {data, status}: AxiosResponse = await axios.delete(`${EXTERNAL_API}/${id}` ?? `https://jsonplaceholder.typicode.com/posts/${id}`);
    const post: [Post] = data;
    if (status === 200 && Object.keys(post).length === 0) {
      return res.status(200).json({
        ok: true,
        msg: 'delete the post succesfully',
      });
    }

    return res.status(200).json({
      ok: true,
      msg: 'the post was not deleted succesfully',
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'server side error in delete a post'
    })
  }
}