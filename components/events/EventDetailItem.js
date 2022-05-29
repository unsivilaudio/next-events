import classes from '../../styles/components/events/EventDetailItem.module.scss';

const EventDetailItem = ({ title, children }) => {
    return (
        <div className={classes.EventDetailItem}>
            <div className={classes.Title}>{title}</div>
            <div className={classes.Content}>{children}</div>
        </div>
    );
};

export default EventDetailItem;
