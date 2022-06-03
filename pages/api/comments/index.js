export async function useHandler(req, res) {
    const { method } = req;

    switch (method) {
        case 'GET':
            return res.status(200).json({
                status: 'success',
                comments: [],
            });
        default:
            res.setHeader('ALLOW', ['GET']);
            res.status(403).send(`Method ${method} not allowed.`);
    }
}
