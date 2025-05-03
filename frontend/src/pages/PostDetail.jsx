import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext.jsx';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FaUserAlt, FaShareAlt, FaFilePdf, FaArrowLeft, FaFileExport, FaComment, FaClock } from 'react-icons/fa';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx'; 
import { formatDistanceToNow } from 'date-fns';


const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

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
    if (!isLoggedIn) {
      navigate('/auth');
    } else {
      loadPost();
    }
  }, [id, isLoggedIn, navigate]);

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
    const message = `Check out this post: ${url}`;
  
    // Copy to clipboard
    navigator.clipboard.writeText(message).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      // Then open Google Chat
      window.open('https://chat.google.com', '_blank');
    }).catch(err => {
      console.error('Clipboard write failed', err);
      // fallback: just open Chat
      window.open('https://chat.google.com', '_blank');
    });
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

  // Function to export post and comments to Excel
  const handleExportToExcel = () => {
    const worksheetData = [
      ['Title', post.title],
      ['Category', post.category],
      ['Author', post.author],
      ['Body', post.body],
    ];

    if (comments.length) {
      worksheetData.push(['Comments']); // Add header for comments
      comments.forEach(comment => {
        worksheetData.push([comment.author, comment.body]); // Add each comment
      });
    }

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData); // Convert data to sheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Post');
    XLSX.writeFile(workbook, `post_${id}.xlsx`);
  };

  if (!post) return (
    <div className="min-h-screen bg-gradient-to-b from-[#ffcbe1] to-[#ffd6e5] flex items-center justify-center">
      <div className="p-6 bg-white rounded-lg shadow-lg border-2 border-black animate-pulse">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-[#ff6f61] rounded-full"></div>
          <p className="text-lg font-mono font-bold">Loading post...</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#ffcbe1] to-[#ffd6e5] flex flex-col items-center px-4 pb-10">
      {/* Back Button */}
      <div className="w-full max-w-3xl mt-6 mb-2">
        <button
          onClick={() => navigate('/home')}
          className="flex items-center gap-2 px-3 py-2 bg-white text-black border-2 border-black rounded-md shadow-[2px_2px_0_0_#000] hover:bg-gray-100 transition-all duration-200 transform hover:-translate-y-1"
        >
          <FaArrowLeft />
          <span className="hidden sm:inline font-medium">Back to Posts</span>
        </button>
      </div>

      {/* Post Card */}
      <div className="relative w-full max-w-3xl mt-4 p-6 bg-[#fefff3] border-4 border-black rounded-lg shadow-[8px_8px_0_0_#000]">
        {/* Top-right toolbar */}
        <div className="absolute top-4 right-4 flex gap-2">
          <div className="relative">
            <button
              onClick={handleShareLink}
              className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-md text-sm hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:-translate-y-1 flex items-center gap-1"
              title="Share link"
            >
              <FaShareAlt />
              <span className="hidden sm:inline">Share</span>
            </button>
            {copied && (
              <div className="absolute -bottom-8 right-0 bg-black text-white text-xs px-2 py-1 rounded">
                Link copied!
              </div>
            )}
          </div>
          <button
            onClick={handleDownloadPDF}
            className="p-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-md text-sm hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:-translate-y-1 flex items-center gap-1"
            title="Download PDF"
          >
            <FaFilePdf />
            <span className="hidden sm:inline">PDF</span>
          </button>
          <button
            onClick={handleExportToExcel}
            className="p-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-md text-sm hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:-translate-y-1 flex items-center gap-1"
            title="Export to Excel"
          >
            <FaFileExport />
            <span className="hidden sm:inline">Excel</span>
          </button>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold font-mono uppercase mb-4 border-b-4 border-[#ff6f61] pb-3 mt-8 sm:mt-4">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap gap-3 mb-6">
          <span className="text-xs uppercase font-bold bg-[#ff6f61] text-white px-3 py-1 border-2 border-black rounded-md shadow-[1px_1px_0_0_#000]">
            {post.category}
          </span>
          <span className="inline-flex items-center text-xs uppercase font-bold bg-[#4a90e2] text-white px-3 py-1 border-2 border-black rounded-md shadow-[1px_1px_0_0_#000]">
            <FaUserAlt className="mr-2" />
            {post.author}
          </span>
          <span className="inline-flex items-center text-xs uppercase font-bold bg-[#6c757d] text-white px-3 py-1 border-2 border-black rounded-md shadow-[1px_1px_0_0_#000]">
            <FaComment className="mr-2" />
            {comments.length} comments
          </span>
          <span className="inline-flex items-center text-xs uppercase font-bold bg-[#28a745] text-white px-3 py-1 border-2 border-black rounded-md shadow-[1px_1px_0_0_#000]">
            <FaClock className="mr-2" />
            {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
          </span>
        </div>

        {/* Body */}
        <div className="prose prose-sm max-w-none mt-6 p-6 bg-white border-2 border-black rounded-lg shadow-[4px_4px_0_0_#000] break-words">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ node, ...props }) => (
                <a
                  {...props}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800 transition-colors duration-200"
                />
              ),
              h1: ({ node, ...props }) => (
                <h1 {...props} className="text-2xl font-bold mt-6 mb-4 border-b-2 border-gray-200 pb-2" />
              ),
              h2: ({ node, ...props }) => (
                <h2 {...props} className="text-xl font-bold mt-5 mb-3" />
              ),
              p: ({ node, ...props }) => (
                <p {...props} className="my-3 leading-relaxed" />
              ),
              ul: ({ node, ...props }) => (
                <ul {...props} className="list-disc pl-5 my-3" />
              ),
              ol: ({ node, ...props }) => (
                <ol {...props} className="list-decimal pl-5 my-3" />
              ),
              blockquote: ({ node, ...props }) => (
                <blockquote {...props} className="border-l-4 border-gray-300 pl-4 italic my-4" />
              ),
            }}
          >
            {post.body}
          </ReactMarkdown>
        </div>

        {/* Comments */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold font-mono uppercase mb-6 border-t-4 border-[#4a90e2] pt-4 flex items-center">
            <FaComment className="mr-3 text-[#4a90e2]" />
            Comments ({comments.length})
          </h2>
          
          {comments.length ? (
            <div className="space-y-4">
              {comments.map(c => (
                <div
                  key={c.id}
                  className="p-5 bg-[#f0f8ff] border-2 border-black rounded-lg shadow-[3px_3px_0_0_#000] hover:shadow-[1px_1px_0_0_#000] transition-all duration-200 hover:-translate-y-1"
                >
                  <div className="flex justify-between items-center mb-2 border-b border-gray-200 pb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#4a90e2] text-white flex items-center justify-center">
                        {c.author.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-medium">{c.author}</span>
                    </div>
                    <span className="text-xs text-gray-500">{formatDistanceToNow(new Date(c.created_at), { addSuffix: true })}</span>
                  </div>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      a: ({ node, ...props }) => (
                        <a
                          {...props}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline hover:text-blue-800 transition-colors duration-200"
                        />
                      ),
                    }}
                  >
                    {c.body}
                  </ReactMarkdown>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 bg-white border-2 border-dashed border-gray-300 rounded-lg text-center">
              <p className="text-gray-500 italic">No comments yet. Be the first to comment!</p>
            </div>
          )}
        </div>

        {/* Add Comment */}
        {isLoggedIn && (
          <div className="mt-8 bg-white p-5 border-2 border-black rounded-lg shadow-[4px_4px_0_0_#000]">
            <h3 className="text-xl font-bold mb-3 font-mono">Add your comment</h3>
            <textarea
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              placeholder="Share your thoughts..."
              className="w-full p-4 border-2 border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#4a90e2] focus:border-transparent transition-all duration-200"
              rows={3}
              maxLength={300}
            />
            <div className="flex justify-end mt-3">
              <button
                onClick={handleAddComment}
                disabled={isSubmitting}
                className={`
                  bg-gradient-to-r from-[#4a90e2] to-[#356bb3] 
                  text-white font-bold uppercase text-sm px-6 py-3 
                  border-2 border-black rounded-md 
                  shadow-[3px_3px_0_0_#000] 
                  hover:shadow-[1px_1px_0_0_#000] 
                  hover:-translate-y-1
                  transition-all duration-200
                  disabled:opacity-50 disabled:cursor-not-allowed
                  flex items-center gap-2
                `}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Posting...
                  </>
                ) : (
                  <>
                    <FaComment className="mr-1" />
                    Post Comment
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className="w-full max-w-3xl mt-8 text-center">
        <p className="text-sm text-gray-600">© 2025 Forum. All rights reserved.</p>
      </div>
    </div>
  );
};

export default PostDetail;