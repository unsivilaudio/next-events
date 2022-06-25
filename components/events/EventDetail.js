import classes from '../../styles/components/events/EventDetail.module.scss';
import Card from '../layout/Card';
import EventDetailItem from './EventDetailItem';

const EventDetail = ({ event }) => {
    const readableDate = new Date(event.date).toLocaleDateString('en-us', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    const formattedAddress = event.location.replace(', ', '\n');

    return (
        <div className={classes.EventDetail}>
            <div className={classes.Header}>
                <p>{event.title}</p>
                <span className={classes.HeaderBg}>
                    <img src={'/' + event.imageUrl} alt='event image' />
                </span>
            </div>
            <Card>
                <div className={classes.Content}>
                    <EventDetailItem title='what'>
                        {event.description}
                    </EventDetailItem>
                    <EventDetailItem title='where'>
                        <span style={{ whiteSpace: 'pre' }}>
                            {formattedAddress}
                        </span>
                    </EventDetailItem>
                    <EventDetailItem title='when'>
                        {readableDate}
                    </EventDetailItem>
                </div>
            </Card>
        </div>
    );
};

export default EventDetail;
