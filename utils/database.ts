// import { MongoClient, Db, MongoClientOptions } from 'mongodb';

// const uri: string = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017';
// const options: MongoClientOptions = {};

// const dbName: string = process.env.MONGO_DB || 'resturant';

// const client = new MongoClient(uri, options);

// let db: Db;

// export async function connectDB() {
//      if (!client.isConnected()) {
//           await client.connect();
//      }
//      db = client.db(dbName);
// }

// export function getDB(): Db {
//      return db;
// }
