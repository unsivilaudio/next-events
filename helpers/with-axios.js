import axios from 'axios';

const instance = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

function serialize(res) {
    res.data = JSON.parse(JSON.stringify(res.data));
    return res;
}

instance.interceptors.response.use(serialize, null);

export default instance;
