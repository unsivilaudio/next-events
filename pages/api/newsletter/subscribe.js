import Subscription from 'models/Subscription';
import { isEmail } from 'helpers/email';

export default async function useHandler(req, res) {
    const { method, body, query } = req;

    switch (method) {
        case 'POST':
            if (!isEmail(body.email)) {
                return res.status(422).json({
                    status: 'fail',
                    message: 'Not a valid email address.',
                });
            }
            let subscriber = await Subscription.findOne({ email: body.email });
            if (subscriber) {
                return res.status(400).json({
                    status: 'fail',
                    message: `Well this is embarassing. ${body.email} is already signed up.`,
                });
            }

            subscriber = await Subscription.create({ email: body.email });

            return res.status(201).json({
                status: 'success',
                message: 'Successfully subscribed to Next-Events!',
            });
        default:
            res.setHeader('ALLOW', ['POST']);
            res.status(403).send(`Method ${method} not allowed.`);
    }
}
