const { MongoClient } = require('mongodb');
require('dotenv').config();
const uri = process.env.VITE_MONGO_URI;
const collectionname = process.env.VITE_MONGO_DB_COLLECTION_NAME;
const dbname = process.env.MONGO_DB_NAME;

let cachedDb = null;

const connectToDatabase = async (uri) => {
    if (cachedDb) return cachedDb;

    const client = await MongoClient.connect(uri, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    });

    cachedDb = client.db(dbname);

    return cachedDb;
}

const postBoomBoom = async (db, document) => {

    let result = await db.collection(collectionname).updateOne(
      { year_month: document.year_month },
      { $push: { booms: { day: document.day, time: document.time }}}
    );

    if (result.modifiedCount == 0) {
      result = await db.collection(collectionname).insertOne({ year_month: document.year_month, booms: [{day: document.day, time: document.time }]});
    }

    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({text: 'added or updated document to/in collection!', result}),
    };
};

exports.handler = async function (event, context) {

    context.callbackWaitsForEmptyEventLoop = false;

    const db = await connectToDatabase(uri);

    return postBoomBoom(db, JSON.parse(event.body));
};
