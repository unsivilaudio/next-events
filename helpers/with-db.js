import mongoose from 'mongoose';

let client;
export async function getDBClient() {
    if (!client) {
        const server = await mongoose.connect('mongodb://127.0.0.1:27017', {
            dbName: 'next-events-dev',
            connectTimeoutMS: 10000,
        });

        server.connection.on('connection', () => {
            console.log('[Mongoose] Connected to DB.');
        });

        server.connection.on('close', () => {
            console.log('[Mongoose] Disconnected from DB.');
        });

        client = mongoose.connection;
    }

    return client;
}
