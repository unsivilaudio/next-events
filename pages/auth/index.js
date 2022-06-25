import { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

import withDebounce from 'hooks/with-debounce';
import { toastError, toastSuccess } from 'helpers/notification';
import axios from 'helpers/with-axios';
import AuthForm from 'components/auth/AuthForm';
import classes from 'styles/pages/AuthPage.module.scss';

export default function AuthPage(props) {
    const { data: session } = useSession();
    const { debounce, isActive } = withDebounce();
    const router = useRouter();
    const [authType, setAuthType] = useState('signin');

    useEffect(() => {
        if (session?.user && debounce && !isActive) {
            let message = '';
            switch (authType) {
                case 'signin':
                    message = `Hello again ${session.user.username}`;
                    break;
                case 'register':
                    message = `Welcome to next-events ${session.user.username}`;
                    break;
            }
            debounce(toastSuccess.bind(null, message));
            router.push('/');
        }
    }, [session, authType, debounce, isActive]);

    function toggleAuthType() {
        setAuthType(st => {
            if (st === 'signin') {
                return 'register';
            }
            return 'signin';
        });
    }

    async function handleAuthSubmit({ userId, password }) {
        try {
            if (authType === 'register') {
                await axios
                    .post('/auth/register', {
                        userId,
                        password,
                    })
                    .catch(err => {
                        let message = err.message;
                        if (err.response?.data?.message) {
                            message = err.response.data.message;
                        }
                        throw new Error(message);
                    });
            }

            const res = await signIn('credentials', {
                userId,
                password,
                redirect: false,
            });

            if (res.error) {
                throw new Error(res.error);
            }
        } catch (err) {
            toastError(err.message);
        }
    }

    return (
        <div className={classes.AuthPage}>
            <AuthForm
                type={authType}
                toggleAuth={toggleAuthType}
                handleAuthSubmit={handleAuthSubmit}
            />
        </div>
    );
}
