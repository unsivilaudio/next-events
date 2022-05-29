import { useRouter } from 'next/router';
import { getAllEvents } from '../../dummy-data';
import EventList from '../../components/events/EventList';
import EventSearch from '../../components/events/EventSearch';
import classes from '../../styles/pages/AllEventsPage.module.scss';

const AllEventsPage = props => {
    const router = useRouter();
    const events = getAllEvents();

    function findEventsHandler(year, month) {
        console.log(year, month);
        router.push({
            pathname: '/events/[...slug]',
            query: {
                slug: [year, month],
            },
        });
    }

    return (
        <div className={classes.AllEventsPage}>
            <EventSearch onSearch={findEventsHandler} />
            <EventList items={events} />
        </div>
    );
};

export default AllEventsPage;
