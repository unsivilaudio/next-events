import axios from 'helpers/with-axios';
import EventList from 'components/events/EventList';
import EventResults from 'components/events/EventResults';
import Button from 'components/ui/Button';
import classes from 'styles/pages/FilteredEventsPage.module.scss';

const FilteredEventsPage = props => {
    if (!props.events.length) {
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
            <EventResults date={new Date(props.year, props.month - 1)} />
            <EventList items={props.events} />
        </div>
    );
};

export async function getServerSideProps({ query }) {
    const [year, month] = query.slug;
    if (isNaN(+year) || isNaN(+month)) {
        return {
            redirect: {
                destination: '/',
            },
        };
    }

    const { data } = await axios.get('/events.json');
    if (!data) {
        return {
            props: {
                events: [],
            },
        };
    }

    const events = Object.keys(data)
        .map(id => ({
            id,
            ...data[id],
        }))
        .filter(x => {
            let xDate = new Date(x.date);
            if (
                xDate.getFullYear() === +year &&
                xDate.getMonth() === +month - 1
            ) {
                return true;
            }
            return false;
        });

    console.log(events);

    return {
        props: {
            events,
            year,
            month,
        },
    };
}

export default FilteredEventsPage;
