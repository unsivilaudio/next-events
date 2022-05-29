import Head from 'next/head';
import EventList from '../components/events/EventList';

import { getFeaturedEvents } from '../dummy-data';
import classes from '../styles/pages/HomePage.module.scss';

export default function HomePage() {
    const featuredEvents = getFeaturedEvents();
    return (
        <div className={classes.HomePage}>
            <Head>
                <title>Home | Next.js Events</title>
            </Head>
            <div>
                <EventList items={featuredEvents} />
            </div>
        </div>
    );
}
