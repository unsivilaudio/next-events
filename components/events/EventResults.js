import Card from '../layout/Card';
import Button from '../ui/Button';
import classes from '../../styles/components/events/EventResults.module.scss';

const EventResults = ({ date }) => {
    const humanReadableDate = new Date(date).toLocaleDateString('en-us', {
        month: 'long',
        year: 'numeric',
    });

    return (
        <Card>
            <div className={classes.EventResults}>
                <div className={classes.Header}>
                    Events in {humanReadableDate}
                </div>
                <div className={classes.Actions}>
                    <Button link='/events'>Show All Events</Button>
                </div>
            </div>
        </Card>
    );
};

export default EventResults;
