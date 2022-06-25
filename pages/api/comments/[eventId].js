import { getSession } from 'next-auth/react';
import Comment from 'models/Comment';
import User from 'models/User';

export default async function useHandler(req, res) {
    const session = await getSession({ req });
    const { method, body, query } = req;
    const { eventId } = query;
    const { userId, content } = body;
    switch (method) {
        case 'GET':
            let comments = await Comment.find({ eventId });
            comments = comments.map(
                comment =>
                    new Promise(async resolve => {
                        const user = await User.findById(comment.userId);
                        if (user) {
                            return resolve(
                                Object.assign({}, comment._doc, {
                                    email: user.email,
                                    name:
                                        user.username ||
                                        user.email.split('@')[0],
                                })
                            );
                        }
                        return resolve(comment);
                    })
            );

            comments = await Promise.all(comments);
            comments.sort((a, b) => b.createdAt - a.createdAt);
            return res.status(200).json({
                status: 'success',
                comments,
            });
        case 'POST':
            if (!userId || !content) {
                return res.status(422).json({
                    status: 'fail',
                    message:
                        'Missing one or more route parameters: userId content',
                });
            }

            if (!session?.user) {
                return res.status(401).json({
                    status: 'fail',
                    message: 'Please sign in to use this route.',
                });
            }

            const comment = await Comment.create({ eventId, userId, content });

            return res.status(201).json({
                status: 'success',
                message: 'Sucessfully added comment.',
                comment: Object.assign({}, comment._doc, {
                    email: session.user.email,
                    name:
                        session.user.username ||
                        session.user.email.split('@')[0],
                }),
            });
        default:
            res.setHeader('ALLOW', ['POST', 'GET']);
            res.status(403).send(`Method ${method} not allowed.`);
    }
}
