export {};

declare global {
  var _mongoClientPromise: Promise<import("mongodb").MongoClient>;
  var mongoose: {
    conn: import("mongoose").Mongoose | null;
    promise: Promise<import("mongoose").Mongoose> | null;
  };
}
