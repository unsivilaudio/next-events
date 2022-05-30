import Head from 'next/head';
import EventList from 'components/events/EventList';

import axios from 'helpers/with-axios';
import classes from 'styles/pages/HomePage.module.scss';

export default function HomePage(props) {
    return (
        <div className={classes.HomePage}>
            <Head>
                <title>Home | Next.js Events</title>
                <meta description='Find a lot of great events that allow you to evolve!' />
            </Head>
            <div>
                {props.featuredEvents ? (
                    <EventList items={props.featuredEvents} />
                ) : (
                    <h3>Loading...</h3>
                )}
            </div>
        </div>
    );
}

export async function getStaticProps() {
    const { data } = await axios.get(
        '/events.json?orderBy="isFeatured"&startAt=true'
    );
    const featuredEvents = Object.keys(data).map(id => ({
        id,
        ...data[id],
    }));

    return {
        props: {
            featuredEvents,
        },
        revalidate: 86400,
    };
}
