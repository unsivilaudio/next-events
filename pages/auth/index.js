import { useState, useEffect } from 'react';
import { getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

import axios from 'helpers/with-axios';
import AuthForm from 'components/auth/AuthForm';
import classes from 'styles/pages/AuthPage.module.scss';

export default function AuthPage({ session }) {
    const router = useRouter();
    const [authType, setAuthType] = useState('signin');

    useEffect(() => {
        if (session?.user) {
            router.push('/');
        }
    }, [session]);

    function toggleAuthType() {
        setAuthType(st => {
            if (st === 'signin') {
                return 'register';
            }
            return 'signin';
        });
    }

    async function handleAuthSubmit({ userId, password }) {
        if (authType === 'register') {
            await axios.post('http://localhost:3000/api/auth/register', {
                userId,
                password,
            });
        }

        await signIn('credentials', {
            userId,
            password,
        });
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

export async function getServerSideProps({ req }) {
    const session = await getSession({ req });

    return {
        props: {
            session,
        },
    };
}
