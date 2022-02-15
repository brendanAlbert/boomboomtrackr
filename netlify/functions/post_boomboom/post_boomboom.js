const { MongoClient } = require("mongodb");
require("dotenv").config();
const uri = process.env.VITE_MONGO_URI;
const collectionname = process.env.VITE_MONGO_DB_COLLECTION_NAME;
const dbname = process.env.MONGO_DB_NAME;
const env = process.env.VITE_NODE_ENV;
const localDbUri = process.env.LOCAL_JSON_DB;

let cachedDb = null;

const connectToDatabase = async (uri) => {
  if (cachedDb) return cachedDb;

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  cachedDb = client.db(dbname);

  return cachedDb;
};

const postBoomBoom = async (db, document) => {
  let result = await db
    .collection(collectionname)
    .updateOne(
      { year_month: document.year_month },
      { $push: { booms: { day: document.day, time: document.time } } }
    );

  if (result.modifiedCount == 0) {
    result = await db.collection(collectionname).insertOne({
      year_month: document.year_month,
      booms: [{ day: document.day, time: document.time }],
    });
  }

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: "added or updated document to/in collection!",
      result,
    }),
  };
};

exports.handler = async function (event, context) {
  if (env === "prod") {
    context.callbackWaitsForEmptyEventLoop = false;

    const db = await connectToDatabase(uri);

    return postBoomBoom(db, JSON.parse(event.body));
  } else {
    const { readFile, writeFile } = require("fs/promises");

    const dbJson = JSON.parse(await readFile(new URL(localDbUri)));

    const mapTime = (time) => parseInt(time.replace(":", ""));

    let rawobj = JSON.parse(event.body);

    let newobj = {
      date: rawobj.year_month + "/" + rawobj.day,
      time: mapTime(rawobj.time),
    };

    dbJson.push(newobj);

    const newJsonDb = JSON.stringify(dbJson);

    await writeFile(new URL(localDbUri), newJsonDb);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: "successfully updated db ✅",
      }),
    };
  }
};
