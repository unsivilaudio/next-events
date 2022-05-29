import React from 'react';
import classes from '../../styles/components/layout/Layout.module.scss';

const Layout = ({ children }) => {
    return <div className={classes.Layout}>{children}</div>;
};

export default Layout;
