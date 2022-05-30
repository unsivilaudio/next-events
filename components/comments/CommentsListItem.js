import classes from 'styles/components/comments/CommentsListItem.module.scss';

const CommentsListItem = ({ comment }) => {
    return (
        <li className={classes.CommentsListItem}>
            <div className={classes.Text}>{comment.comment}</div>
            <div className={classes.Author}>By {comment.name}</div>
        </li>
    );
};

export default CommentsListItem;
