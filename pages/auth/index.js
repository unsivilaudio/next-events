import { getSession } from 'next-auth/react';

export default function AuthPage(props) {
    console.log(props.session);

    return (
        <div>
            <h1>
                You are signed in as: {props.session?.user.email || 'NOONE'}
            </h1>
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
