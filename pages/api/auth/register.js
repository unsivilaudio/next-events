import { getDBClient } from 'helpers/with-db';
import { isEmail } from 'helpers/email';
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
                        'Missing one or more request params: userId password',
                });
            }
            const findBy = isEmail(userId) ? 'email' : 'username';
            let user = await User.findOne({ [findBy]: userId });
            if (user) {
                return res.status(400).json({
                    status: 'fail',
                    message: 'User already registered.',
                });
            }
            console.log(findBy);

            if (findBy === 'username') {
                return res.status(422).json({
                    status: 'fail',
                    message: 'Please provide a valid email.',
                });
            }

            user = await User.create({
                email: userId,
                username: userId.split('@')[0],
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
