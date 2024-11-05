// // CommentComp.tsx
// "use client";

// import { useEffect, useState } from "react";
// import CommentInput from "./commentForm";
// import CommentsItem from "./commentItem";
// import { getComments, addComment } from "../../../utils/supabase/queries";

// export type Comment = {
//   id: string;
//   content: string;
//   children: Comment[];
//   parent_id: string | null;
// };

// const CommentComp = () => {
//   const [comments, setComments] = useState<Comment[]>([]);

//   const fetchComments = async () => {
//     const data = await getComments();
//     const nestedComments = nestComments(data);
//     setComments(nestedComments);
//   };

//   const nestComments = (comments: Comment[]) => {
//     const map = new Map<string, Comment>();
//     const roots: Comment[] = [];

//     comments.forEach((comment) => {
//       comment.children = [];
//       map.set(comment.id, comment);

//       if (!comment.parent_id) {
//         roots.push(comment);
//       } else {
//         const parent = map.get(comment.parent_id);
//         if (parent) {
//           parent.children.push(comment);
//         }
//       }
//     });

//     return roots;
//   };

//   const handleAddComment = async (
//     content: string,
//     parent_id: string | null = null
//   ) => {
//     const newComment = await addComment(content, parent_id);
//     if (newComment) {
//       fetchComments(); // Refresh comments after adding a new one
//     }
//   };

//   useEffect(() => {
//     fetchComments(); // Fetch comments on mount
//   }, []);

//   return (
//     <main className="self-start">
//       <div>
//         <CommentInput
//           handleAddComment={(content) => handleAddComment(content)}
//         />

//         <div>
//           {comments.map((comment) => (
//             <CommentsItem
//               key={comment.id}
//               comment={comment}
//               onUpdateComments={handleAddComment} // Pass `handleAddComment` for nested replies
//             />
//           ))}
//         </div>
//       </div>
//     </main>
//   );
// };

// export default CommentComp;
