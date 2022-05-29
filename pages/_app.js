import NavBar from '../components/layout/NavBar';
import Layout from '../components/layout/Layout';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <NavBar />
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
    );
}

export default MyApp;
