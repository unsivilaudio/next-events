import NextAuth from 'next-auth/next';
import Credentials from 'next-auth/providers/credentials';
import User from 'models/User';
import { getDBClient } from 'helpers/with-db';
import { isEmail } from 'helpers/email';

export default NextAuth({
    jwt: {
        secret: 'helloworld',
    },
    session: {
        strategy: 'jwt',
    },
    providers: [
        Credentials({
            async authorize(credentials, req) {
                const { userId, password } = credentials;
                const findBy = isEmail(userId) ? 'email' : 'username';
                try {
                    await getDBClient();
                    let user = await User.findOne({ [findBy]: userId });
                    if (!user) {
                        throw Error('Invalid credentials.');
                    }
                    const valid = await user.comparePassword(password);
                    if (!valid) {
                        throw Error('Invalid credentials.');
                    }
                    user.password = undefined;
                    return user;
                } catch (err) {
                    console.log(err.message);
                    throw err;
                }
            },
        }),
    ],
    callbacks: {
        session: async ({ session, token }) => {
            if (session?.user) {
                await getDBClient();
                const currentUser = await User.findById(token.sub);
                if (currentUser) {
                    session.user.id = currentUser._id;
                    session.user.username =
                        currentUser.username || currentUser.email.split('@')[0];
                } else {
                    return;
                }
            }
            return session;
        },
    },
});
