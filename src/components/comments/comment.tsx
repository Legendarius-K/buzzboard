'use client'

import { useState } from "react"
import CommentInput from "./commentForm";
import CommentsItem from './commentItem';

export type Comment = {
    content: string;
    children: Comment[];
    // username: string
    // date?: string
};

const CommentComp = () => {
    const [comments, setComments] = useState<Comment[]>([]);

    const handleAddComment = (comment: Comment) => {
        setComments((prevComments) => [...prevComments, comment]);
    };

    return (
        <main className="self-start">
            <div>
                <CommentInput handleAddComment={handleAddComment} />

                <div>
                    {comments.map((comment, index) => (
                        <CommentsItem
                            key={index}
                            comment={comment}
                            onUpdateComments={(updatedComments) => {
                                const updatedCommentsArray = [...comments];
                                updatedCommentsArray[index].children = updatedComments;
                                setComments(updatedCommentsArray);
                            }}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
};

export default CommentComp

