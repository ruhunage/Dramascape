import React, { useState, useEffect } from 'react';

const AdminForm = ({ onSubmit, initialData, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '', country: '', genre: '', episodes: 0, rating: 5, review: '', image: '', trailerUrl: '',
  });
  const [imageSize, setImageSize] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      if (initialData.imageSize) setImageSize(initialData.imageSize);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'episodes' || name === 'rating' ? Number(value) : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const sizeInKB = (file.size / 1024).toFixed(2);
      setImageSize(`${sizeInKB} KB`);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result, imageSize: `${sizeInKB} KB` }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // පිටුව refresh වීම වැළැක්වීමට
    if (!formData.title.trim()) {
      alert('Drama name is required!');
      return;
    }
    // මෙතැනින් Firebase එකට දත්ත යැවීම ඉවත් කර, Parent එකට (App.js) දත්ත යවයි
    onSubmit(formData); 
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <h2 className="text-3xl font-extrabold text-indigo-900 mb-6">
        {initialData ? 'Edit Drama Review' : 'Add New Drama Review'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Input fields ටික එහෙමම තියෙන්න හරින්න */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Drama Name</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300" required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
            <input type="text" name="country" value={formData.country} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300" required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Genre</label>
            <input type="text" name="genre" value={formData.genre} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300" required />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Episodes</label>
            <input type="number" name="episodes" value={formData.episodes} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Rating (0.0 - 10.0)</label>
            <input type="number" name="rating" value={formData.rating} onChange={handleChange} min="0" max="10" step="0.1" className="w-full px-4 py-3 rounded-lg border border-gray-300" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Review / Comment</label>
          <textarea name="review" value={formData.review} onChange={handleChange} rows="4" className="w-full px-4 py-3 rounded-lg border border-gray-300" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">YouTube Trailer URL (Optional)</label>
          <input type="url" name="trailerUrl" value={formData.trailerUrl || ''} onChange={handleChange} placeholder="https://www.youtube.com/watch?v=..." className="w-full px-4 py-3 rounded-lg border border-gray-300" />
        </div>

        <div>
           <label className="block text-sm font-semibold text-gray-700 mb-2">Image</label>
           <input type="file" accept="image/*" onChange={handleImageChange} className="w-full" />
           {formData.image && <img src={formData.image} alt="Preview" className="w-32 mt-4" />}
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button type="button" onClick={onCancel} className="px-6 py-2.5 rounded-lg border border-gray-300">Cancel</button>
          <button type="submit" className="px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg">
            {initialData ? 'Update Drama' : 'Add Drama'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminForm;