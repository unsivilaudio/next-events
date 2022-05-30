import Image from 'next/image';

import CalendarIcon from '../../assets/svg/calendar.svg';
import ArrowRightIcon from '../../assets/svg/arrow-right.svg';
import LocationMarkerIcon from '../../assets/svg/location-marker.svg';
import Card from '../layout/Card';
import Button from '../ui/Button';
import classes from '../../styles/components/events/EventItem.module.scss';

const EventItem = ({ title, image, date, location, id }) => {
    const readableDate = new Date(date).toLocaleDateString('en-us', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    const formattedAddress = location.replace(', ', '\n');
    const exploreLink = `/events/${id}`;

    return (
        <li className={classes.EventItem}>
            <Card>
                <div className={classes.ImageContainer}>
                    <Image
                        className={classes.Image}
                        src={'/' + image}
                        alt={title}
                        width={500}
                        height={400}
                    />
                </div>
                <div className={classes.Content}>
                    <div className={classes.Summary}>
                        <div className={classes.Title}>{title}</div>
                        <div className={classes.Date}>
                            <CalendarIcon />
                            <time>{readableDate}</time>
                        </div>
                        <div className={classes.Address}>
                            <LocationMarkerIcon />
                            <address>{formattedAddress}</address>
                        </div>
                    </div>
                    <div className={classes.Actions}>
                        <Button link={exploreLink} theme='invert'>
                            Explore Event <ArrowRightIcon />
                        </Button>
                    </div>
                </div>
            </Card>
        </li>
    );
};

export default EventItem;
