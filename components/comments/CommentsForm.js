import { useState } from 'react';
import Input from 'components/ui/Input';
import Button from 'components/ui/Button';
import classes from 'styles/components/comments/CommentsForm.module.scss';

const CommentsForm = props => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');

    function handleChangeInputs(e) {
        const { name, value } = e.target;

        switch (name) {
            case 'email':
                setEmail(value);
                break;
            case 'name':
                setName(value);
                break;
            case 'comment':
                setComment(value);
                break;
            default:
                break;
        }
    }

    function submitCommentHandler(e) {
        e.preventDefault();
    }

    return (
        <form className={classes.CommentsForm} onSubmit={submitCommentHandler}>
            <div className={classes.FormGroup}>
                <Input
                    label='Your Email'
                    name='email'
                    value={email}
                    onChange={handleChangeInputs}
                />
            </div>
            <div className={classes.FormGroup}>
                <Input
                    label='Your Name'
                    name='name'
                    value={name}
                    onChange={handleChangeInputs}
                />
            </div>
            <div className={classes.FormGroup}>
                <Input
                    label='Your Comment'
                    type='textarea'
                    name='comment'
                    value={comment}
                    onChange={handleChangeInputs}
                />
            </div>
            <div className={classes.Actions}>
                <Button type='submit'>Add Comment</Button>
            </div>
        </form>
    );
};

export default CommentsForm;
