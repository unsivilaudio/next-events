export async function useHandler(req, res) {
    const { method, body, query } = req;

    switch (method) {
        case 'POST':
            console.log('SUBSCRIBED:', body.email);

            return res.send(200).json({
                status: 'success',
                message: 'Successfully subscribed to Next-Events!',
            });
        default:
            res.setHeader('ALLOW', ['POST']);
            res.status(403).send(`Method ${method} not allowed.`);
    }
}
