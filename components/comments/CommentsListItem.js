import { getElapsedTime } from 'helpers/time';
import classes from 'styles/components/comments/CommentsListItem.module.scss';

const CommentsListItem = ({ comment }) => {
    return (
        <li className={classes.CommentsListItem}>
            <div className={classes.Text}>{comment.content}</div>
            <div className={classes.Author}>
                <div className={classes.Name}>
                    By <span>{comment.name}</span>
                </div>
                <div className={classes.Time}>
                    {getElapsedTime(comment.createdAt)}
                </div>
            </div>
        </li>
    );
};

export default CommentsListItem;
