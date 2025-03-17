const mongodb = require('mongodb');

const DB_CONN_STRING = "mongodb://localhost:27017";
const DB_NAME = "it";
const COLLECTION_NAME = "students";

async function main() {
    const client = new mongodb.MongoClient(DB_CONN_STRING, { useUnifiedTopology: true });

    try {
        await client.connect();
        console.log("Connected to the database");

        const db = client.db(DB_NAME);
        const collection = db.collection(COLLECTION_NAME);

        const student = { name: "Vadym", age: 16, city: "Lviv" };
        const result = await collection.insertOne(student);
        console.log("Student inserted successfully", result.insertedId);

        const cursor = collection.find({});
        for await (const doc of cursor) {
            console.dir(doc);
        }
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

main().catch(console.error);
