import Head from 'next/head';
import axios from 'helpers/with-axios';
import EventDetail from 'components/events/EventDetail';
import CommentsList from 'components/comments/CommentsList';
import classes from 'styles/pages/EventDetailPage.module.scss';
import { getSession } from 'next-auth/react';

const EventDetailPage = props => {
    if (!props.event) {
        return <h3>Loading...</h3>;
    }

    return (
        <div className={classes.EventDetailPage}>
            <Head>
                <title>{props.event.title} | Next.js Events</title>
                <meta description='Find a lot of great events that allow you to evolve!' />
            </Head>
            <EventDetail event={props.event} />
            <CommentsList
                currentUser={props.currentUser}
                eventId={props.event._id}
            />
        </div>
    );
};

export async function getServerSideProps({ query, req }) {
    const { data } = await axios.get(`/events/${query.eventId}`);
    const session = await getSession({ req });

    if (!data) {
        return { notFound: true };
    }

    const event = data.event;

    return {
        props: {
            event,
            currentUser: session?.user || null,
        },
    };
}

export default EventDetailPage;
