import { useState } from 'react';
import Button from 'components/ui/Button';
import CommentsForm from './CommentsForm';
import CommentsListItem from './CommentsListItem';
import classes from 'styles/components/comments/CommentsList.module.scss';

const comments = [
    { id: '1', name: 'Maximilian', comment: 'This is an awesome event' },
    { id: '2', name: 'Hank', comment: 'Looking forward to this one' },
    { id: '3', name: 'Alex', comment: 'Hoping to make some new friends' },
];

const CommentsList = props => {
    const [showComments, setShowComments] = useState(false);

    function toggleShowComments() {
        setShowComments(st => !st);
    }

    return (
        <div className={classes.CommentsList}>
            <div className={classes.CommentsToggle}>
                <Button
                    theme={showComments ? 'danger' : 'primary'}
                    onClick={toggleShowComments}>
                    {showComments ? 'Hide Comments' : 'Show Comments'}
                </Button>
            </div>
            {showComments && (
                <div className={classes.Container}>
                    <CommentsForm />
                    <ul className={classes.List}>
                        {comments.map(comment => (
                            <CommentsListItem
                                key={comment.id}
                                comment={comment}
                            />
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CommentsList;
