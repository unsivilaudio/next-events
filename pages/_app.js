import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';

import NavBar from '../components/layout/NavBar';
import Layout from '../components/layout/Layout';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
    return (
        <SessionProvider>
            <NavBar />
            <Layout>
                <Head>
                    <title>Next.js Events</title>
                    <meta
                        name='description'
                        content='NextJS events management application'
                    />
                    <meta
                        name='viewport'
                        content='initial-scale=1.0, width=device-width'
                    />
                </Head>
                <Component {...pageProps} />
            </Layout>
        </SessionProvider>
    );
}

export default MyApp;
