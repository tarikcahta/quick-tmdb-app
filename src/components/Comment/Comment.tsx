import { CommentProps } from '../../types/types';
import '../../styles/Comment.css';

const Comment: React.FC<CommentProps> = ({
  author,
  text,
  isOwner,
  isEditing,
  editValue,
  onEditStart,
  onEditChange,
  onEditSave,
  onEditCancel,
  onDelete,
}) => {
  return (
    <div className="comment">
      <div className="comment-header">
        <p className="comment-author">{author}</p>
        {isOwner && (
          <div className="comment-actions">
            {isEditing ? (
              <>
                <button className="comment-action" onClick={onEditSave}>
                  Save
                </button>
                <button
                  className="comment-action secondary"
                  onClick={onEditCancel}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button className="comment-action" onClick={onEditStart}>
                  Edit
                </button>
                <button
                  className="comment-action secondary"
                  onClick={onDelete}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        )}
      </div>
      {isEditing ? (
        <input
          className="comment-edit-input"
          type="text"
          value={editValue || ''}
          onChange={(e) => onEditChange?.(e.target.value)}
        />
      ) : (
        <p className="comment-text">{text}</p>
      )}
    </div>
  );
};

export default Comment;
