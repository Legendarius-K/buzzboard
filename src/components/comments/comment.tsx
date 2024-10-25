'use client'

import { useEffect, useState } from "react";
import CommentInput from "./commentForm";
import CommentsItem from './commentItem';
import { getComments, addComment } from '../../../utils/supabase/queries'

export type Comment = {
    id: string;
    content: string;
    children: Comment[];
    parent_id: string | null;
};

const CommentComp = () => {
    const [comments, setComments] = useState<Comment[]>([]);

    // Fetch comments on component mount
    const fetchComments = async () => {
        const data = await getComments();
        const nestedComments = nestComments(data); // Nest comments based on parent_id
        setComments(nestedComments);
    };

    // Nest comments based on parent_id
    const nestComments = (comments: Comment[]) => {
        const map = new Map<string, Comment>();
        const roots: Comment[] = [];

        comments.forEach(comment => {
            comment.children = [];
            map.set(comment.id, comment);

            // If parent_id is null, it's a root comment
            if (!comment.parent_id) {
                roots.push(comment);
            } else {
                const parent = map.get(comment.parent_id);
                if (parent) {
                    parent.children.push(comment);
                }
            }
        });

        return roots;
    };

    // Handle adding a new comment or reply
    const handleAddComment = async (content: string, parent_id: string | null = null) => {
        const newComment = await addComment(content, parent_id);
        if (newComment) {
            fetchComments(); // Refresh comments after adding a new one
        }
    };

    useEffect(() => {
        fetchComments(); // Fetch comments on mount
    }, []);

    return (
        <main className="self-start">
            <div>
                {/* Top-level comment input */}
                <CommentInput handleAddComment={(content) => handleAddComment(content)} />

                {/* Render nested comments */}
                <div>
                    {comments.map((comment) => (
                        <CommentsItem
                            key={comment.id}
                            comment={comment}
                            onUpdateComments={(replyContent) => handleAddComment(replyContent, comment.id)} // Handle replies
                        />
                    ))}
                </div>
            </div>
        </main>
    );
};

export default CommentComp;
