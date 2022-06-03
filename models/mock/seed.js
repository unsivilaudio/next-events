const mongoose = require('mongoose');
const mockEvents = require('./mock-events.json');

async function seedEvents(client) {
    const User = client.connection.db.collection('users');
    const Event = client.connection.db.collection('events');
    const user = await User.findOne({ email: 'test@test.com' });
    await Event.deleteMany({});
    const mockPromises = mockEvents.map(event => {
        event.date = new Date(event.date);
        return Event.insertOne({
            creator: user._id,
            ...event,
        });
    });

    await Promise.all(mockPromises);
}

async function seedDB() {
    let client,
        exitCode = 0;
    try {
        client = await mongoose.connect('mongodb://127.0.0.1:27017', {
            dbName: 'next-events-dev',
            connectTimeoutMS: 10000,
        });

        await seedEvents(client);
    } catch (err) {
        console.log(err.message);
        exitCode = 1;
    }

    if (client?.connection) {
        client.connection.close();
    }

    process.exit(exitCode);
}

seedDB();
