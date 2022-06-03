import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';

import NavBar from '../components/layout/NavBar';
import Layout from '../components/layout/Layout';
import 'react-toastify/dist/ReactToastify.min.css';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
    return (
        <SessionProvider>
            <ToastContainer theme='colored' />
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
