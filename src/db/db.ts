import Lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { Schema } from '../types/types';

let db: Lowdb.LowdbSync<Schema>;

export const createConnection = async() => {
  const adapter = new FileSync('db_tickets.json')
  db = Lowdb(adapter)

  db.defaults({ tickets: []}).write();
}

export const getConnection = () => db;