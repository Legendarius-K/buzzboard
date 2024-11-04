// CommentsItem.tsx
import { useState } from "react";
import CommentInput from "./commentForm";
import { Comment } from "./comment";

const CommentsItem = ({
  comment,
  onUpdateComments,
  depth = 0,
}: {
  comment: Comment;
  onUpdateComments: (content: string, parent_id: string | null) => void;
  depth?: number;
}) => {
  const [reply, setReply] = useState(false);

  return (
    <div
    //   style={{ marginLeft: depth === 0 ? "0" : `${depth * 12}px` }}
      className={`bg-white pl-3 border-l-2 border-b-2 pt-4 pb-1 ${depth === 0 && "my-2 rounded ml-0"
      }`}
    >
      <p className="text-[12px]">{comment.content}</p>
      <div className="">
        {reply && (
          <CommentInput
            handleAddComment={(replyContent) => {
              onUpdateComments(replyContent, comment.id); // Pass comment.id as parent_id
              setReply(false); // Hide reply form after submitting
            }}
          />
        )}
        <button
          className="bg-blue-300 ml-1 mt-1 px-3 rounded-full hover:bg-blue-400"
          onClick={() => setReply(!reply)}
        >
          {reply ? "Cancel" : "Reply"}
        </button>
      </div>

      {/* Render child comments recursively */}
      <div>
        {comment.children.map((child) => (
          <CommentsItem
            key={child.id}
            comment={child}
            depth={depth + 1}
            onUpdateComments={onUpdateComments} // Use the same handler for nested replies
          />
        ))}
      </div>
    </div>
  );
};

export default CommentsItem;
