import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext.jsx';
import ReactMarkdown from 'react-markdown';
import { FaUserAlt } from 'react-icons/fa';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    fetchPostById,
    fetchCommentsByPostId,
    addComment,
    isLoggedIn,
    userInfo,
  } = useContext(StoreContext);

  const loadPost = async () => {
    setPost(await fetchPostById(id));
    setComments(await fetchCommentsByPostId(id));
  };

  useEffect(() => {
    loadPost();
  }, [id]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    setIsSubmitting(true);

    const response = await addComment(id, newComment);
    if (response.success) {
      setNewComment('');
      await loadPost(); // Reload comments after adding
    } else {
      alert(response.message || 'Error adding comment');
    }

    setIsSubmitting(false);
  };

  if (!post) return <p className="text-center mt-12 font-mono">Loading…</p>;

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-[#fefff3] border-4 border-black rounded-sm shadow-[8px_8px_0_0_#000]">
      {/* Title */}
      <h1 className="text-3xl font-extrabold font-mono uppercase mb-3 text-left border-b-4 border-[#ff6f61] pb-2 text-black">
        {post.title}
      </h1>

      {/* Meta: Category & Author */}
      <div className="flex flex-wrap gap-3 mb-4">
        <span className="inline-block text-xs uppercase font-bold bg-[#ff6f61] text-white px-3 py-1 border-2 border-black rounded-sm">
          {post.category}
        </span>
        <span className="inline-flex items-center text-xs uppercase font-bold bg-[#4a90e2] text-white px-3 py-1 border-2 border-black rounded-sm">
          <FaUserAlt className="mr-2" />
          {post.author}
        </span>
      </div>

      {/* Body */}
      <div className="mt-4 p-4 bg-white border-2 border-black rounded-sm shadow-[4px_4px_0_0_#000] whitespace-pre-line text-sm text-[#333]">
        <ReactMarkdown>{post.body}</ReactMarkdown>
      </div>

      {/* Comments Section */}
      <h2 className="text-2xl font-bold font-mono uppercase mt-8 mb-4 text-left border-t-4 border-[#4a90e2] pt-2 text-black">
        Comments
      </h2>

      {comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((c) => (
            <div
              key={c.id}
              className="p-4 bg-[#e6f7ff] border-4 border-black rounded-sm shadow-[4px_4px_0_0_#000]"
            >
              <p className="text-sm text-[#111] mb-2">{c.body}</p>
              <p className="text-xs italic text-right text-[#555]">— {c.author}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-600 italic">No comments yet.</p>
      )}

      {/* Add Comment Form */}
      {isLoggedIn && (
        <div className="mt-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full p-3 border-2 border-black rounded-sm text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#4a90e2]"
            rows={3}
          ></textarea>
          <button
            onClick={handleAddComment}
            disabled={isSubmitting}
            className="mt-2 bg-[#4a90e2] text-white font-bold uppercase text-sm px-4 py-2 border-2 border-black rounded-sm shadow-[2px_2px_0_0_#000] hover:bg-[#3b7dc4] disabled:opacity-50"
          >
            {isSubmitting ? "Posting..." : "Post Comment"}
          </button>
        </div>
      )}
    </div>
  );
};

export default PostDetail;
