import { Post } from "../interfaces/post.interface";

export type updatePostBody = Omit<Post, 'userId' | 'id'>

export enum AlgorithmTypes {
  SECUENCIAL = 'numerosSecuenciales',
  RANDOMIDS = 'numerosAleatorios'
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  creator: string;
  date: Date;
  type: AlgorithmTypes
}

export type Schema = {
  Tickets: Ticket[]
}