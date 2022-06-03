import { useState } from 'react';

import axios from 'helpers/with-axios';
import Button from 'components/ui/Button';
import classes from 'styles/components/newsletter/NewsLetterForm.module.scss';
import { toastSuccess } from 'helpers/notification';

const NewsLetterForm = props => {
    const [email, setEmail] = useState('');

    async function subscribeFormHandler(e) {
        e.preventDefault();
        if (email !== '') {
            const { data } = await axios.post('/newsletter/subscribe', {
                email,
            });
            if (data?.message) {
                toastSuccess(data.message);
            }
            setEmail('');
        }
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
