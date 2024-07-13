import { CommentProps } from '../../types/types';
import '../../styles/Comment.css';

const Comment: React.FC<CommentProps> = ({ author, text }) => {
  return (
    <div className="comment">
      <p className="comment-author">{author}</p>
      <p className="comment-text">{text}</p>
    </div>
  );
};

export default Comment;
