import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext.jsx';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FaUserAlt, FaShareAlt, FaFilePdf } from 'react-icons/fa';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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
    const res = await addComment(id, newComment);
    if (res.success) {
      setNewComment('');
      await loadPost();
    } else {
      alert(res.message || 'Error adding comment');
    }
    setIsSubmitting(false);
  };

  const handleShareLink = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: post.title, url });
    } else {
      navigator.clipboard.writeText(url).then(() => alert('Link copied'));
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(post.title, 14, 20);
    doc.setFontSize(10);
    doc.text(`Category: ${post.category}`, 14, 30);
    doc.text(`Author: ${post.author}`, 14, 36);
    doc.setFontSize(12);
    doc.text('Body:', 14, 46);
    doc.text(doc.splitTextToSize(post.body, 180), 14, 54);

    if (comments.length) {
      const rows = comments.map(c => [c.author, c.body]);
      autoTable(doc, {
        head: [['Author', 'Comment']],
        body: rows,
        startY: doc.lastAutoTable?.finalY ? doc.lastAutoTable.finalY + 10 : 80,
        styles: { fontSize: 8, cellWidth: 'wrap' },
        headStyles: { fillColor: [60, 60, 60] },
      });
    }

    doc.save(`post_${id}.pdf`);
  };

  if (!post) return <p className="text-center mt-12 font-mono">Loading…</p>;

  return (
    <div className="relative max-w-3xl mx-auto mt-8 p-6 bg-[#fefff3] border-4 border-black rounded-sm shadow-[8px_8px_0_0_#000]">
      {/* Top-right toolbar */}
      <div className="absolute top-2 right-2 flex gap-2">
        <button
          onClick={handleShareLink}
          className="p-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
          title="Share link"
        >
          <FaShareAlt />
        </button>
        <button
          onClick={handleDownloadPDF}
          className="p-1 bg-red-600 text-white rounded text-xs hover:bg-red-700"
          title="Download PDF"
        >
          <FaFilePdf />
        </button>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-extrabold font-mono uppercase mb-3 border-b-4 border-[#ff6f61] pb-2">
        {post.title}
      </h1>

      {/* Meta */}
      <div className="flex flex-wrap gap-3 mb-4">
        <span className="text-xs uppercase font-bold bg-[#ff6f61] text-white px-3 py-1 border-2 border-black rounded-sm">
          {post.category}
        </span>
        <span className="inline-flex items-center text-xs uppercase font-bold bg-[#4a90e2] text-white px-3 py-1 border-2 border-black rounded-sm">
          <FaUserAlt className="mr-2" />
          {post.author}
        </span>
      </div>

      {/* Body */}
      <div className="prose prose-sm mt-4 p-4 bg-white border-2 border-black rounded-sm shadow-[4px_4px_0_0_#000]">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            a: ({ node, ...props }) => (
              <a
                {...props}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800"
              />
            ),
          }}
        >
          {post.body}
        </ReactMarkdown>
      </div>

      {/* Comments */}
      <h2 className="text-2xl font-bold font-mono uppercase mt-8 mb-4 border-t-4 border-[#4a90e2] pt-2">
        Comments
      </h2>
      {comments.length ? (
        <div className="space-y-4">
          {comments.map(c => (
            <div
              key={c.id}
              className="p-4 bg-[#e6f7ff] border-4 border-black rounded-sm shadow-[4px_4px_0_0_#000]"
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  a: ({ node, ...props }) => (
                    <a
                      {...props}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline hover:text-blue-800"
                    />
                  ),
                }}
              >
                {c.body}
              </ReactMarkdown>
              <p className="text-xs italic text-right mt-2">— {c.author}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="italic text-gray-600">No comments yet.</p>
      )}

      {/* Add Comment */}
      {isLoggedIn && (
        <div className="mt-6">
          <textarea
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full p-3 border-2 border-black rounded-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#4a90e2]"
            rows={3}
          />
          <button
            onClick={handleAddComment}
            disabled={isSubmitting}
            className="mt-2 bg-[#4a90e2] text-white font-bold uppercase text-sm px-4 py-2 border-2 border-black rounded-sm shadow-[2px_2px_0_0_#000] hover:bg-[#3b7dc4] disabled:opacity-50"
          >
            {isSubmitting ? 'Posting…' : 'Post Comment'}
          </button>
        </div>
      )}
    </div>
  );
};

export default PostDetail;
