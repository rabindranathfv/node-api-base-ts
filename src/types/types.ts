import { Post } from "../interfaces/post.interface";

export type updatePostBody = Omit<Post, 'userId' | 'id'>

export enum AlgorithmTypes {
  SECUENCIAL = 'numerosSecuenciales',
  RANDOMIDS = 'numerosAleatorios'
}