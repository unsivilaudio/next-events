import classes from '../../styles/components/ui/Select.module.scss';

const Select = ({ label, name, onChange, value, options }) => {
    const selectOptions = options.map(option => (
        <option key={option.value} value={option.value}>
            {option.label}
        </option>
    ));

    return (
        <div className={classes.Select}>
            <label htmlFor={name}>{label}</label>
            <div
                className={classes.SelectContainer}
                onChange={onChange}
                value={value}>
                <select name={name} id={name}>
                    {selectOptions}
                </select>
            </div>
        </div>
    );
};

export default Select;
