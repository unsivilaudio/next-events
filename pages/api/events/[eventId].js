import Event from 'models/Event';
import { validateId } from 'helpers/with-db';

export default async function useHandler(req, res) {
    const { method, body, query } = req;

    if (!validateId(query.eventId)) {
        return res.status(422).json({
            status: 'fail',
            message: 'Please provide a valid id.',
        });
    }

    let event;
    switch (method) {
        case 'GET':
            event = await Event.findById(query.eventId);
            if (!event) {
                return res.status(404).json({
                    status: 'fail',
                    message: 'No event found.',
                });
            }
            return res.status(200).json({
                status: 'success',
                event,
            });
        default:
            res.setHeader('ALLOW', ['GET']);
            res.status(403).send(`Method method not allowed.`);
    }
}
