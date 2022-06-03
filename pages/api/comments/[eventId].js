export async function useHandler(req, res) {
    const { method, body, query } = req;
    const { eventId } = query;
    const { email, name, text } = body;
    switch (method) {
        case 'GET':
            console.log(eventId);
            return res.status(200).json({
                status: 'success',
                comments: [],
            });
        case 'POST':
            if (!email || !name || text) {
                return res.status(422).json({
                    status: 'fail',
                    message:
                        'Missing one or more route parameters: email name text',
                });
            }
            console.log(body);
            return res.status(201).json({
                status: 'success',
                message: 'Sucessfully added comment.',
            });
        default:
            res.setHeader('ALLOW', ['POST', 'GET']);
            res.status(403).send(`Method ${method} not allowed.`);
    }
}
