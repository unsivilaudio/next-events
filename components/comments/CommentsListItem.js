import classes from 'styles/components/comments/CommentsListItem.module.scss';

const CommentsListItem = ({ comment }) => {
    return (
        <li className={classes.CommentsListItem}>
            <div className={classes.Text}>{comment.comment}</div>
            <div className={classes.Author}>
                By <span>{comment.name}</span>
            </div>
        </li>
    );
};

export default CommentsListItem;
