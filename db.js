import { Database } from 'fakebase';

const db = new Database('./data');

export const Company = db.table('companies');
export const Event = db.table('events');
export const User = db.table('users');
export const Data = db.table('data');
