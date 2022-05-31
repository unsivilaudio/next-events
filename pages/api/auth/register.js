import { getDBClient } from 'helpers/with-db';
import User from 'models/User';

export default async function useHandler(req, res) {
    const { method, body } = req;
    await getDBClient();

    switch (method) {
        case 'POST':
            const { email, username, password } = body;
            if (!email || !password) {
                return res.status(400).json({
                    status: 'fail',
                    message:
                        'Missing one or more request params: email password',
                });
            }

            let user = await User.create({
                email,
                username,
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
