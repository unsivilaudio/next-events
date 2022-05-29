import classes from '../../styles/components/layout/Card.module.scss';

const Card = ({ children }) => {
    return <div className={classes.Card}>{children}</div>;
};

export default Card;
