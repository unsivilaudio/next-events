import EventItem from './EventItem';
import classes from '../../styles/components/events/EventList.module.scss';

const EventList = ({ items }) => {
    return (
        <div className={classes.EventList}>
            <ul className={classes.List}>
                {items.map(x => (
                    <EventItem
                        id={x._id}
                        key={x._id}
                        title={x.title}
                        location={x.location}
                        image={x.image}
                        date={x.date}
                    />
                ))}
            </ul>
        </div>
    );
};

export default EventList;
