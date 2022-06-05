import { useState } from 'react';
import Input from 'components/ui/Input';
import Button from 'components/ui/Button';
import classes from 'styles/components/comments/CommentsForm.module.scss';

const CommentsForm = props => {
    const [comment, setComment] = useState('');

    function handleChangeInputs(e) {
        const { name, value } = e.target;

        switch (name) {
            case 'comment':
                setComment(value);
                break;
            default:
                break;
        }
    }

    function submitCommentHandler(e) {
        e.preventDefault();
        if (comment !== '') {
            props.handleSubmitComment(comment);
            setComment('');
        }
    }

    return (
        <form className={classes.CommentsForm} onSubmit={submitCommentHandler}>
            <div className={classes.FormGroup}>
                <Input
                    label='Leave a comment'
                    type='textarea'
                    name='comment'
                    value={comment}
                    onChange={handleChangeInputs}
                />
            </div>
            <div className={classes.Actions}>
                <Button type='submit' theme='success'>
                    Add Comment
                </Button>
            </div>
        </form>
    );
};

export default CommentsForm;
