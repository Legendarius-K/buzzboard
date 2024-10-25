import { useState } from 'react';
import CommentInput from './commentForm';
import { Comment } from './comment';

const CommentsItem = ({
    comment,
    onUpdateComments,
    depth = 0,
}: {
    comment: Comment;
    onUpdateComments: (replyContent: string) => void;
    depth?: number;
}) => {
    const [reply, setReply] = useState(false);

    return (
        <div
            style={{ marginLeft: depth === 0 ? '0' : `${depth * 12}px` }}
            className={`bg-white py-3 p-1 border-l-2 ${depth === 0 && 'my-2 rounded ml-0'}`}
        >
            <p className='text-[12px]'>{comment.content}</p>
            <div className=''>
                {reply && (
                    <CommentInput
                        handleAddComment={(replyContent) => {
                            onUpdateComments(replyContent); // Add reply
                            setReply(false); // Hide reply form after submitting
                        }}
                    />
                )}
                <button
                    className='bg-blue-300 ml-1 mt-1 px-3 rounded-full hover:bg-blue-400'
                    onClick={() => setReply(!reply)}
                >
                    {reply ? 'Cancel' : 'Reply'}
                </button>
            </div>

            {/* Render child comments recursively */}
            <div>
                {comment.children.map((child) => (
                    <CommentsItem
                        key={child.id}
                        comment={child}
                        depth={depth + 1} // Increment depth for nested comments
                        onUpdateComments={onUpdateComments} // Pass the same reply handler
                    />
                ))}
            </div>
        </div>
    );
};

export default CommentsItem;
