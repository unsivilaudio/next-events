import Link from 'next/link';
import classes from '../../styles/components/ui/Button.module.scss';

const Button = ({
    link,
    onClick,
    disabled,
    type = 'button',
    theme = 'primary',
    children,
}) => {
    const btnClasses = [classes.Button];

    switch (theme) {
        case 'primary':
            btnClasses.push(classes.Primary);
            break;
        case 'success':
            btnClasses.push(classes.Success);
            break;
        case 'danger':
            btnClasses.push(classes.Danger);
            break;
        case 'invert':
            btnClasses.push(classes.Invert);
            break;
    }

    if (link) {
        return (
            <Link href={link}>
                <a className={btnClasses.join(' ')}>{children}</a>
            </Link>
        );
    }

    return (
        <button
            className={btnClasses.join(' ')}
            type={type}
            onClick={onClick}
            disabled={disabled}>
            {children}
        </button>
    );
};

export default Button;
