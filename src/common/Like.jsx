import React from 'react';

export default function Like({ liked, handleLike }) {
  let likedClass = liked ? 'fa-heart' : 'fa-heart-o';
  return (
    <div onClick={handleLike}>
      <i
        className={`fa ${likedClass}`}
        aria-hidden="true"
        style={{ cursor: 'pointer' }}
      ></i>
    </div>
  );
}
