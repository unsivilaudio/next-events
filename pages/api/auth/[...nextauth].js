import NextAuth from 'next-auth/next';
import Credentials from 'next-auth/providers/credentials';
import User from 'models/User';
import { getDBClient } from 'helpers/with-db';

export default NextAuth({
    session: {
        strategy: 'jwt',
    },
    providers: [
        Credentials({
            name: 'Next-Events',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'text',
                    placeholder: 'john@smith.com',
                },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, req) {
                const { email, password } = credentials;
                try {
                    await getDBClient();
                    let user = await User.findOne({ email });
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
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        session: async ({ session, token }) => {
            if (session?.user) {
                const currentUser = await User.findById(token.sub);
                if (currentUser) {
                    session.user.id = currentUser._id;
                    session.user.username =
                        currentUser.username || currentUser.email;
                    return session;
                }
                return null;
            }
        },
    },
});
