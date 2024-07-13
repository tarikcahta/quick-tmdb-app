import Comment from '../Comment/Comment';
import { CommentsListProps } from '../../types/types';
import '../../styles/CommentsList.css';

const CommentsList: React.FC<CommentsListProps> = ({ comments }) => {
  return (
    <div className="comments-list">
      {comments.map((comment) => (
        <Comment key={comment.id} author={comment.author} text={comment.text} />
      ))}

      
    </div>
  );
};

export default CommentsList;
