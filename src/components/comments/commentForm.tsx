import { FormEvent } from 'react';
import { Comment } from './comment';

const CommentInput = ({
    handleAddComment,
}: {
    handleAddComment: (comment: Comment) => void;
}) => {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const comment = formData.get('comment') as string;
        if (!comment || comment.trim() === '') return alert('Comment is required');

        handleAddComment({ content: comment, children: [] });
        e.currentTarget.reset();
    };

    return (
        <div className='mt-3'>
            <form onSubmit={handleSubmit}>
                <input className='px-2 rounded' type="text" name="comment" placeholder="Add comment..." />
                <button className='bg-blue-300 ml-1 px-3 rounded-full hover:bg-blue-400' type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CommentInput;