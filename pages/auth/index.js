import { useState } from 'react';
import { getSession } from 'next-auth/react';
import AuthForm from 'components/auth/AuthForm';
import classes from 'styles/pages/AuthPage.module.scss';

export default function AuthPage(props) {
    const [authType, setAuthType] = useState('signin');

    function toggleAuthType() {
        setAuthType(st => {
            if (st === 'signin') {
                return 'register';
            }
            return 'signin';
        });
    }

    function handleAuthSubmit({ userId, password }) {
        console.log(userId, password);
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
