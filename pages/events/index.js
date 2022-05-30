import { useRouter } from 'next/router';

import axios from 'helpers/with-axios';
import EventList from 'components/events/EventList';
import EventSearch from 'components/events/EventSearch';
import classes from 'styles/pages/AllEventsPage.module.scss';

const AllEventsPage = props => {
    const router = useRouter();

    function findEventsHandler(year, month) {
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
            <EventList items={props.events || []} />
        </div>
    );
};

export async function getServerSideProps() {
    const { data } = await axios.get('/events.json');
    const events = Object.keys(data).map(id => ({
        id,
        ...data[id],
    }));

    return {
        props: {
            events,
        },
    };
}

export default AllEventsPage;
