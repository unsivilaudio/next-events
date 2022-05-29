import { useRouter } from 'next/router';
import EventDetail from '../../components/events/EventDetail';
import { getEventById } from '../../dummy-data';

import classes from '../../styles/pages/EventDetailPage.module.scss';

const EventDetailPage = props => {
    const router = useRouter();

    const eventId = router.query.eventId;
    const event = getEventById(eventId);

    if (!event) {
        return <p>No Event Found</p>;
    }

    return (
        <div className={classes.EventDetailPage}>
            <EventDetail event={event} />
        </div>
    );
};

export default EventDetailPage;
