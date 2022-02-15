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

const mapTime = (time) => parseInt(time.replace(":", ""));

const boomEventSorter = (a, b) => {
  const [yeara, montha, daya] = a.date.split("/");
  const [yearb, monthb, dayb] = b.date.split("/");

  if (parseInt(yeara) > parseInt(yearb)) {
    return 1;
  }

  if (parseInt(yeara) < parseInt(yearb)) {
    return -1;
  }

  // It must be same year, let's compare months
  if (parseInt(montha) > parseInt(monthb)) {
    return 1;
  }

  if (parseInt(montha) < parseInt(monthb)) {
    return -1;
  }

  // It must be same year and month , let's compare days
  if (parseInt(daya) > parseInt(dayb)) {
    return 1;
  }

  if (parseInt(daya) < parseInt(dayb)) {
    return -1;
  }

  // if multiple same day, compare times
  if (parseInt(a.time) < parseInt(b.time)) {
    return -1;
  }

  if (parseInt(a.time) > parseInt(b.time)) {
    return 1;
  }

  return 0;
};

const getBoomBooms = async (db) => {
  const bmbms = await db.collection(collectionname).find({}).toArray();

  let boomsarray = [];

  bmbms.forEach((yrmnth) => {
    result = yrmnth.booms.map((bm) => ({
      date: yrmnth.year_month + "/" + bm.day,
      time: mapTime(bm.time),
    }));
    boomsarray = [...boomsarray, result];
  });

  boomsarray = boomsarray.flat(1);

  boomsarray.sort(boomEventSorter);

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(boomsarray),
  };
};

exports.handler = async function (event, context) {
  if (env === "prod") {
    context.callbackWaitsForEmptyEventLoop = false;

    const db = await connectToDatabase(uri);

    return getBoomBooms(db);
  }

  if (env === "development") {
    const { readFile } = require("fs/promises");
    const json = JSON.parse(await readFile(new URL(localDbUri)));
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json),
    };
  }
};
