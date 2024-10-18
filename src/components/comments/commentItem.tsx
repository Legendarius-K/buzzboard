import { useState } from 'react';
import { Comment } from './comment';
import CommentInput from './commentForm';

const CommentsItem = ({
    comment,
    onUpdateComments,
    depth = 0, // Add default depth value
}: {
    comment: Comment;
    onUpdateComments: (updatedComments: Comment[]) => void;
    depth?: number; // Add depth prop to track nesting level
}) => {
    const [reply, setReply] = useState(false);

    const handleAddReply = (newComment: Comment) => {
        // Update the children comments
        onUpdateComments([...comment.children, newComment]);

        // After submitting, hide the reply form
        setReply(false);
    };

    return (
        <div style={{ marginLeft: depth === 0 ? '0' : `${depth + 12}px` }} className={`bg-white py-3 p-1 border-l-2 ${depth === 0 && 'my-2 rounded ml-0'}`} > {/* Apply margin based on depth */}
            <p>{comment.content}</p>
            <div className=''>
                {reply && (
                    <CommentInput
                        handleAddComment={handleAddReply} // Call handleAddReply instead of directly updating
                    />
                )}
                <button className='bg-blue-300 ml-1 mt-1 px-3 rounded-full hover:bg-blue-400' onClick={() => setReply(!reply)}>
                    {reply ? 'Cancel' : 'Reply'}
                </button>
            </div>
            <div>
                {comment.children.map((child, index) => (
                    <CommentsItem
                        key={index}
                        comment={child}
                        depth={depth + 1} // Pass incremented depth to children
                        onUpdateComments={(updatedChildren) => {
                            const updatedChildrenArray = [...comment.children];
                            updatedChildrenArray[index] = { ...child, children: updatedChildren };
                            onUpdateComments(updatedChildrenArray);
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default CommentsItem;


