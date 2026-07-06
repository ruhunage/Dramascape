// DramaCard.jsx
import React from 'react';

const DramaCard = ({ title, genre, rating, image, country, episodes, review, onEdit, onDelete, onReviewMore, isAdmin, isFavorite, onToggleFavorite, userRating, onUserRate }) => {
  const renderStars = (rating) => {
    const starCount = Math.round(rating / 2);
    return (
      <div className="flex gap-1" title={`${rating}/10`}>
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < starCount ? "text-yellow-400 text-lg" : "text-gray-300 text-lg"}>★</span>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between hover:shadow-xl transition-all border border-gray-100">
      <div>
        {image ? (
          <img src={image} alt={title} className="w-full h-48 object-cover rounded-md mb-4 border border-gray-100"/>
        ) : (
          <div className="w-full h-48 bg-indigo-50 flex items-center justify-center text-indigo-400 font-semibold rounded-md mb-4">
            No Image
          </div>
        )}
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-xl font-extrabold text-gray-800">{title}</h3>
          <button 
            onClick={onToggleFavorite} 
            className="text-2xl hover:scale-110 transition-transform focus:outline-none"
            title="Add to Favorites"
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </div>
        <span className="inline-block bg-indigo-50 text-indigo-700 text-xs px-2.5 py-1 rounded-full font-semibold mb-3">
          {genre}
        </span>
        
        <div className="flex items-center gap-2 mb-3 bg-gray-50 p-2 rounded-lg w-fit">
          {renderStars(rating)}
          <span className="text-sm font-bold text-gray-900">{rating}/10</span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4 bg-gray-50 p-2.5 rounded-lg">
          <div>🎬 <span className="font-bold text-gray-900">{episodes || 'N/A'} Ep</span></div>
          <div>🌍 Country: <span className="font-bold text-gray-900">{country || 'N/A'}</span></div>
        </div>

        {review && (
          <p className="text-gray-600 text-sm italic mb-4 line-clamp-2">
            "{review}"
          </p>
        )}

        <div className="mt-2 pt-3 border-t border-gray-100">
          <p className="text-xs font-semibold text-gray-500 mb-1">My Personal Rating</p>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <span 
                key={i} 
                className={`cursor-pointer text-2xl ${i < (userRating || 0) ? "text-yellow-400" : "text-gray-300"} hover:text-yellow-300 transition-colors drop-shadow-sm`}
                onClick={() => onUserRate(i + 1)}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100">
        <button
          onClick={onReviewMore}
          className="flex-1 px-3 py-1.5 bg-indigo-600 text-white rounded text-xs font-semibold hover:bg-indigo-700 transition-all text-center"
        >
          Review More
        </button>
        {isAdmin && (
          <>
            <button
              onClick={onEdit}
              className="px-3 py-1.5 bg-yellow-500 text-white rounded text-xs font-semibold hover:bg-yellow-600 transition-all text-center"
            >
              Edit
            </button>
            <button
              onClick={onDelete}
              className="px-3 py-1.5 bg-red-500 text-white rounded text-xs font-semibold hover:bg-red-600 transition-all text-center"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default DramaCard; // මේක අනිවාර්යයෙන්ම මේ විදිහට තියෙන්න ඕනේ