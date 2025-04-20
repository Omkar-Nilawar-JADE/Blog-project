import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext.jsx';
import axios from 'axios';

const PostDetail = () => {
  const { id } = useParams(); // get post id from route
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const { fetchPostById, fetchCommentsByPostId } = useContext(StoreContext);

  useEffect(() => {
    const fetchData = async () => {
      const postData = await fetchPostById(id);
      const commentData = await fetchCommentsByPostId(id);
      setPost(postData);
      setComments(commentData);
    };

    fetchData();
  }, [id, fetchPostById, fetchCommentsByPostId]);

  if (!post) return <p className="text-center mt-10">Loading post...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 mt-6 border-2 border-black shadow-[4px_4px_0_#000] rounded-lg bg-white">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-600 mb-4">Category: <span className="font-semibold">{post.category}</span></p>
      <p className="mb-4 whitespace-pre-line">{post.body}</p>

      <hr className="my-4 border-black" />
      <h2 className="text-xl font-semibold mb-2">Comments</h2>

      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className="border border-black p-3 rounded-lg mb-2 bg-gray-100 shadow-[2px_2px_0_#000]">
            <p className="text-sm">{comment.body}</p>
            <p className="text-xs text-gray-600 mt-1">— {comment.author}</p>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-500">No comments yet.</p>
      )}
    </div>
  );
};

export default PostDetail;
