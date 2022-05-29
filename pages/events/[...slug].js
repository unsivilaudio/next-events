import { useRouter } from 'next/router';

import { getFilteredEvents } from '../../dummy-data';
import EventList from '../../components/events/EventList';
import EventResults from '../../components/events/EventResults';
import Button from '../../components/ui/Button';
import classes from '../../styles/pages/FilteredEventsPage.module.scss';

const FilteredEventsPage = props => {
    const router = useRouter();
    if (!router.query.slug) {
        return <p>Loading...</p>;
    }

    const year = +router.query.slug[0];
    const month = +router.query.slug[1];

    const events = getFilteredEvents({
        year,
        month,
    });

    if (!events.length) {
        return (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: '3rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem',
                }}>
                <p>No Events Found</p>
                <div>
                    <Button link='/events'>Show All Events</Button>
                </div>
            </div>
        );
    }

    return (
        <div className={classes.FilteredEventsPage}>
            <EventResults date={new Date(year, --month)} />
            <EventList items={events} />
        </div>
    );
};

export default FilteredEventsPage;
