import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';

import classes from '../../styles/components/layout/NavBar.module.scss';

const NavBar = props => {
    const { data: session } = useSession();
    const router = useRouter();

    function handleAuthNav(e) {
        e.preventDefault();
        if (session?.user) {
            signOut();
            router.push('/');
            return;
        }

        router.push('/auth');
    }

    return (
        <div className={classes.NavBar}>
            <div className={classes.Brand}>
                <Link href='/'>Next-Events</Link>
            </div>
            <ul className={classes.NavList}>
                <li className={classes.NavItem}>
                    <a onClick={handleAuthNav}>
                        {session?.user ? 'Logout' : 'Login'}
                    </a>
                </li>
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
