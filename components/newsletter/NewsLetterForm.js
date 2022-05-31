import { useState } from 'react';
import Button from 'components/ui/Button';
import Card from 'components/layout/Card';
import classes from 'styles/components/newsletter/NewsLetterForm.module.scss';

const NewsLetterForm = props => {
    const [email, setEmail] = useState('');

    function subscribeFormHandler(e) {
        e.preventDefault();
    }

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    return (
        <form
            className={classes.NewsLetterForm}
            onSubmit={subscribeFormHandler}>
            <div className={classes.Header}>Subscribe to stay informed!</div>
            <div className={classes.Content}>
                <div className={classes.FormGroup}>
                    <input
                        type='text'
                        value={email}
                        onChange={handleChangeEmail}
                        placeholder='Enter Your Email...'
                    />
                </div>
                <div className={classes.Actions}>
                    <Button type='submit' theme='invert'>
                        Subscribe
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default NewsLetterForm;
