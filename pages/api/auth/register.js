import { getDBClient } from 'helpers/with-db';
import User from 'models/User';

export default async function useHandler(req, res) {
    const { method, body } = req;
    await getDBClient();

    switch (method) {
        case 'POST':
            const { userId, password } = body;
            if (!userId || !password) {
                return res.status(400).json({
                    status: 'fail',
                    message:
                        'Missing one or more request params: email password',
                });
            }

            let user = await User.create({
                email: userId,
                username: userId,
                password,
            });
            user.password = undefined;
            return res.status(201).json({
                status: 'success',
                message: 'Successfully created user.',
                user,
            });
        default:
            res.setHeaders('ALLOW', ['POST']);
            res.status(403).send(`Method ${method} not allowed.`);
    }
}
