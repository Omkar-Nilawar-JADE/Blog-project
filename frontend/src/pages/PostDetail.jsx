import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext.jsx';
import ReactMarkdown from 'react-markdown';


const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const { fetchPostById, fetchCommentsByPostId } = useContext(StoreContext);

  useEffect(() => {
    (async () => {
      setPost(await fetchPostById(id));
      setComments(await fetchCommentsByPostId(id));
    })();
  }, [id]);

  if (!post) return <p className="text-center mt-12 font-mono">Loading…</p>;

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-[#fefff3] border-4 border-black rounded-sm shadow-[8px_8px_0_0_#000]">
      {/* Title */}
      <h1 className="text-3xl font-extrabold font-mono uppercase mb-3 text-left border-b-4 border-[#ff6f61] pb-2 text-black">
        {post.title}
      </h1>

      {/* Category */}
      <p className="inline-block text-xs uppercase font-bold bg-[#ff6f61] text-white px-3 py-1 border-2 border-black rounded-sm mb-4">
        {post.category}
      </p>

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
    </div>
  );
};

export default PostDetail;
