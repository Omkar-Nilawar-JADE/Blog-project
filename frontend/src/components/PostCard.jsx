import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';

const PostCard = ({
  post,
  idx,
  bgColor = 'bg-[#f8c291]',
  hoverColor = 'hover:bg-[#c198db]'
}) => {
  const timeAgo = formatDistanceToNow(new Date(post.created_at), { addSuffix: true });

  return (
    <Link to={`/post/${post.id}`}>
      <div
        className={`
          relative
          ${bgColor}
          ${hoverColor}
          transition-colors duration-300
          border-2 border-black
          shadow-[4px_4px_0_#000]
          rounded-lg
          p-4
          w-[300px]
          flex flex-col justify-between
        `}
      >
        <div>
          <h2 className="text-lg font-bold mb-2 leading-snug">{post.title}</h2>
          {post.description && (
            <p className="text-sm mb-4">{post.description}</p>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-gray-700 mb-2">
          <span>{timeAgo}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="bg-white text-black text-xs font-medium px-2 py-1 rounded-full border border-black shadow-[2px_2px_0_#000]">
            {post.category}
          </span>
          <div className="flex items-center text-sm font-medium">
            <FaUserCircle className="mr-1" />
            <span>{post.author}</span>
          </div>
        </div>

        {/* offset shadow layer */}
        <div className="absolute bottom-[-4px] right-[-4px] w-full h-full bg-black rounded-lg -z-10" />
      </div>
    </Link>
  );
};

export default PostCard;
