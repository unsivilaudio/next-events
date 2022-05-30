import axios from 'helpers/with-axios';
import EventDetail from 'components/events/EventDetail';
import classes from 'styles/pages/EventDetailPage.module.scss';

const EventDetailPage = props => {
    if (!props.event) {
        return <h3>Loading...</h3>;
    }

    console.log(props.event);

    return (
        <div className={classes.EventDetailPage}>
            <EventDetail event={props.event} />
        </div>
    );
};

export async function getServerSideProps({ query }) {
    const { data } = await axios.get(`/events/${query.eventId}.json`);

    if (!data) {
        return { notFound: true };
    }

    const event = {
        id: query.eventId,
        ...data,
    };

    return {
        props: {
            event,
        },
    };
}

export default EventDetailPage;
