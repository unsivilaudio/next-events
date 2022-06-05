import { useState } from 'react';

import axios from 'helpers/with-axios';
import Button from 'components/ui/Button';
import CommentsForm from './CommentsForm';
import CommentsListItem from './CommentsListItem';
import classes from 'styles/components/comments/CommentsList.module.scss';
import { toastError, toastSuccess } from 'helpers/notification';

const __COMMENTS = [
    { id: '1', name: 'Maximilian', comment: 'This is an awesome event' },
    { id: '2', name: 'Hank', comment: 'Looking forward to this one' },
    { id: '3', name: 'Alex', comment: 'Hoping to make some new friends' },
];

const CommentsList = ({ currentUser, eventId }) => {
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([]);

    function toggleShowComments() {
        if (!showComments && !comments.length) {
            fetchComments();
        }
        setShowComments(st => !st);
    }

    function fetchComments() {
        axios.get(`/comments/${eventId}`).then(res => {
            console.log(res.data);
            setComments(res.data.comments);
        });
    }

    function handleSubmitComment(content) {
        if (currentUser) {
            axios
                .post(`/comments/${eventId}`, {
                    userId: currentUser.id,
                    eventId,
                    content,
                })
                .then(res => {
                    setComments(st => [res.data.comment, ...st]);
                    toastSuccess(res.data.message);
                })
                .catch(err => toastError(err.message));
        }
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
                    {currentUser && (
                        <CommentsForm
                            handleSubmitComment={handleSubmitComment}
                        />
                    )}
                    <div className={classes.CommentsTitle}>Comments</div>
                    <ul className={classes.List}>
                        {comments.map(comment => (
                            <CommentsListItem
                                key={comment._id}
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
