import Link from 'next/link';

import classes from '../../styles/components/layout/NavBar.module.scss';

const NavBar = props => {
    return (
        <div className={classes.NavBar}>
            <div className={classes.Brand}>
                <Link href='/'>Next-Events</Link>
            </div>
            <ul className={classes.NavList}>
                <li className={classes.NavItem}>
                    <Link href='/events'>Browse All Events</Link>
                </li>
                <li className={classes.NavItem}>
                    <Link href='#'>Add Event</Link>
                </li>
            </ul>
        </div>
    );
};

export default NavBar;
