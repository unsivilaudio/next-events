import Head from 'next/head';
import NavBar from '../components/layout/NavBar';
import Layout from '../components/layout/Layout';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
    return (
        <>
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
        </>
    );
}

export default MyApp;
