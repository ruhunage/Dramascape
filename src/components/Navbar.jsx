import React from 'react';

const Navbar = ({ currentView, onViewChange, isAdmin, onLogout }) => {
  return (
    <nav className="p-5 bg-white shadow-md flex justify-between items-center sticky top-0 z-50">
      <h1 
        className="text-2xl font-extrabold text-indigo-600 cursor-pointer flex items-center gap-2 hover:scale-105 transition-transform"
        onClick={() => onViewChange('home')}
      >
        Drama Diary 🎬
      </h1>
      <ul className="flex gap-6 font-semibold text-gray-700">
        <li 
          onClick={() => onViewChange('home')}
          className={`cursor-pointer transition-colors duration-200 ${
            currentView === 'home' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'hover:text-indigo-600'
          }`}
        >
          Home
        </li>
        <li 
          onClick={() => onViewChange('favorites')}
          className={`cursor-pointer transition-colors duration-200 ${
            currentView === 'favorites' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'hover:text-indigo-600'
          }`}
        >
          My Favorites
        </li>
        <li 
          onClick={() => onViewChange('admin')}
          className={`cursor-pointer transition-colors duration-200 ${
            currentView === 'admin' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'hover:text-indigo-600'
          }`}
        >
          Admin
        </li>
        {isAdmin && (
          <li 
            onClick={onLogout}
            className="cursor-pointer transition-colors duration-200 text-red-500 hover:text-red-700"
          >
            Logout
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;