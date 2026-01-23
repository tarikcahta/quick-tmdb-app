import Comment from '../Comment/Comment';
import { CommentsListProps } from '../../types/types';
import '../../styles/CommentsList.css';

const CommentsList: React.FC<CommentsListProps> = ({
  comments,
  currentUserId,
  editingCommentId,
  editingValue,
  onEditStart,
  onEditChange,
  onEditSave,
  onEditCancel,
  onDelete,
}) => {
  return (
    <div className="comments-list">
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          author={comment.author}
          text={comment.text}
          isOwner={Boolean(currentUserId && comment.user_id === currentUserId)}
          isEditing={editingCommentId === comment.id}
          editValue={editingCommentId === comment.id ? editingValue : undefined}
          onEditStart={() => onEditStart?.(comment.id, comment.text)}
          onEditChange={onEditChange}
          onEditSave={onEditSave}
          onEditCancel={onEditCancel}
          onDelete={() => onDelete?.(comment.id)}
        />
      ))}
    </div>
  );
};

export default CommentsList;
