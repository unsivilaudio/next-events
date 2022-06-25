import classes from 'styles/components/ui/Input.module.scss';

const Input = ({ name, label, type = 'text', onChange, value }) => {
    if (type === 'textarea') {
        return (
            <div className={classes.FormGroup}>
                <label htmlFor={name}>{label}</label>
                <textarea
                    name={name}
                    cols='30'
                    rows='10'
                    value={value}
                    onChange={onChange}></textarea>
            </div>
        );
    }

    return (
        <div className={classes.FormGroup}>
            <label htmlFor={name}>{label}</label>
            <input type={type} name={name} value={value} onChange={onChange} />
        </div>
    );
};

export default Input;
