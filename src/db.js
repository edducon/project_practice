const { MongoClient } = require('mongodb');
const uri = process.env.MONGO_URI;
if (!uri) { console.error('MONGO_URL не задан'); process.exit(1); }
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connect() {
    await client.connect();
    return client.db('telegram_bot');
}
module.exports = { connect };