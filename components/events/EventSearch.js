import { useState } from 'react';

import eventYears from '../../lib/event-years';
import eventMonths from '../../lib/event-months';
import Card from '../layout/Card';
import Select from '../ui/Select';
import Button from '../ui/Button';
import classes from '../../styles/components/events/EventSearch.module.scss';

const EventSearch = ({ onSearch }) => {
    const [selectYear, setSelectYear] = useState(eventYears[0].value);
    const [selectMonth, setSelectMonth] = useState(eventMonths[0].value);

    function handleChangeYear(e) {
        setSelectYear(e.target.value);
    }

    function handleChangeMonth(e) {
        setSelectMonth(e.target.value);
    }

    function handleSearchEvent(e) {
        e.preventDefault();
        onSearch(selectYear, selectMonth);
    }

    return (
        <Card>
            <form onSubmit={handleSearchEvent} className={classes.EventSearch}>
                <div className={classes.Title}>Events Search</div>
                <div className={classes.SearchForm}>
                    <div className={classes.FormGroup}>
                        <Select
                            name='year'
                            label='Select Year'
                            options={eventYears}
                            onChange={handleChangeYear}
                            value={selectYear}
                        />
                    </div>
                    <div className={classes.FormGroup}>
                        <Select
                            name='month'
                            label='Select Month'
                            options={eventMonths}
                            onChange={handleChangeMonth}
                            value={selectMonth}
                        />
                    </div>
                </div>
                <div className={classes.Actions}>
                    <Button type='submit'>Find Event</Button>
                </div>
            </form>
        </Card>
    );
};

export default EventSearch;
