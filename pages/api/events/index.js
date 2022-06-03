import { getSession } from 'next-auth/react';
import { getDBClient } from 'helpers/with-db';
import Event from 'models/Event';

export default async function useHandler(req, res) {
    const { method, body, query } = req;
    const session = getSession({ req });

    await getDBClient();
    let events = [];
    switch (method) {
        case 'GET':
            events = await Event.find(query);
            return res.status(200).json({
                status: 'success',
                events,
            });
        case 'POST':
            if (!session?.user) {
                return res.status(401).json({
                    status: 'fail',
                    message: 'Please log in to use this route.',
                });
            }

            const requiredKeys = [
                'title',
                'description',
                'imageUrl',
                'location',
                'date',
            ];
            const bodyValid = requiredKeys.every(key => !!body[key]);
            if (!bodyValid) {
                return res.status(400).json({
                    status: 'fail',
                    message: `Missing one or more request parameters: ${requiredKeys.join(
                        ' '
                    )}`,
                });
            }

            const event = await Event.create({
                creator: session.user.id,
                ...body,
            });

            return res.status(201).json({
                status: 'success',
                event,
            });
        default:
            res.setHeader('ALLOW', ['GET', 'POST']);
            res.status(403).send(`Method ${method} not allowed.`);
    }
}
