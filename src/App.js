import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import DramaCard from './components/DramaCard';
import AdminForm from './components/AdminForm';
import { db, auth } from './firebaseConfig'; 
import { collection, onSnapshot, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";

function App() {
  const [dramas, setDramas] = useState([]); 
  const [loading, setLoading] = useState(true); // Loading තත්ත්වය සඳහා අලුතින් එකතු කරන ලදී
  const [currentView, setCurrentView] = useState('home');
  const [editingDrama, setEditingDrama] = useState(null);
  const [reviewingDrama, setReviewingDrama] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('dramaFavorites');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [userRatings, setUserRatings] = useState(() => {
    const saved = localStorage.getItem('dramaUserRatings');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('dramaFavorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('dramaUserRatings', JSON.stringify(userRatings));
  }, [userRatings]);

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
  };

  const handleUserRate = (id, rating) => {
    setUserRatings(prev => ({ ...prev, [id]: rating }));
  };
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
  };

  const displayedDramas = dramas.filter(drama => {
    const matchesSearch = drama.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesView = currentView === 'favorites' ? favorites.includes(drama.id) : true;
    return matchesSearch && matchesView;
  });
  // Firebase එකෙන් දත්ත real-time ලබා ගැනීම
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "dramas"), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setDramas(data);
      setLoading(false); // දත්ත ලැබුණු පසු Loading පෙන්වීම නවත්වන්න
    });
    return () => unsubscribe();
  }, []);

  const handleAddOrUpdate = async (formData) => {
    try {
      if (editingDrama) {
        const dramaRef = doc(db, "dramas", editingDrama.id);
        await updateDoc(dramaRef, formData);
        setEditingDrama(null);
      } else {
        await addDoc(collection(db, "dramas"), formData);
      }
      setCurrentView('home');
    } catch (error) {
      console.error("Error saving to Firebase:", error);
    }
  };

  const handleEdit = (drama) => {
    setEditingDrama(drama);
    setCurrentView('admin');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this drama review?')) {
      await deleteDoc(doc(db, "dramas", id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar currentView={currentView} onViewChange={(view) => {
        setCurrentView(view);
        if (view !== 'admin') setEditingDrama(null);
      }} isAdmin={isAdmin} onLogout={() => setIsAdmin(false)} />

      {currentView === 'home' || currentView === 'favorites' ? (
        <>
          <header className="relative w-full overflow-hidden bg-gray-900 rounded-b-3xl shadow-xl mb-8">
            <div className="absolute inset-0">
              <img src="/hero_image.png" alt="Drama Collage Background" className="w-full h-full object-cover opacity-20 blur-sm" />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-gray-800/80"></div>
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-28 flex flex-col lg:flex-row items-center gap-12">
              <div className="text-left w-full lg:w-1/2">
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight drop-shadow-lg mb-6">
                  Welcome to <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Drama Diary</span>
                </h2>
                <p className="text-gray-300 mt-4 text-xl md:text-2xl max-w-xl drop-shadow-md font-medium leading-relaxed">
                  Tracking all my favorite Asian dramas and movies!
                </p>
              </div>
              <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                  <img src="/hero_image.png" alt="Drama Collage" className="relative rounded-2xl shadow-2xl w-full max-w-xl object-cover transform hover:-translate-y-1 hover:scale-[1.02] transition duration-500 ease-in-out border border-white/10" />
                </div>
              </div>
            </div>
          </header>

          <main className="flex-grow p-6 md:p-12 max-w-7xl mx-auto w-full">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-extrabold text-gray-900">
                {currentView === 'favorites' ? 'My Favorites' : 'My Latest Reviews'}
              </h2>
              {isAdmin && (
                <button onClick={() => setCurrentView('admin')} className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold shadow-md">
                  + Add Drama
                </button>
              )}
            </div>
            
            <div className="mb-8">
              <input 
                type="text" 
                placeholder="Search dramas by title..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full max-w-md px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
              />
            </div>
            
            {/* Loading තත්ත්වය සහ දත්ත දර්ශනය කිරීම */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <p className="text-indigo-600 text-xl font-semibold animate-pulse">Loading your dramas...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {displayedDramas.map((drama) => (
                  <DramaCard
                    key={drama.id}
                    {...drama}
                    onEdit={() => handleEdit(drama)}
                    onDelete={() => handleDelete(drama.id)}
                    onReviewMore={() => setReviewingDrama(drama)}
                    isAdmin={isAdmin}
                    isFavorite={favorites.includes(drama.id)}
                    onToggleFavorite={() => toggleFavorite(drama.id)}
                    userRating={userRatings[drama.id] || 0}
                    onUserRate={(rating) => handleUserRate(drama.id, rating)}
                  />
                ))}
              </div>
            )}
          </main>
        </>
      ) : (
        <main 
          className="flex-grow p-6 md:p-12 flex items-center justify-center min-h-[80vh] relative"
          style={{ backgroundImage: "url('/admin_bg.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
        >
          <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>
          <div className="relative z-10 w-full">
          {!isAdmin ? (
            <div className="w-full max-w-lg mx-auto mt-10 p-10 bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 mb-4 shadow-inner">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Admin Portal</h2>
                <p className="text-gray-500 mt-2 text-sm">Secure access for drama management</p>
              </div>
              <form onSubmit={async (e) => {
                e.preventDefault();
                try {
                  if (email.trim() === 'admin@drama.com' && password.trim() === 'admin123') {
                    setIsAdmin(true);
                    setPassword('');
                    setEmail('');
                  } else {
                    throw new Error('Invalid email or password.');
                  }
                } catch (error) {
                  console.error(error);
                  alert('Login failed: ' + error.message);
                }
              }} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Admin Email</label>
                  <div className="relative">
                    <input 
                      type="email" 
                      value={email} 
                      placeholder="admin@drama.com"
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-4 pr-10 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-sm placeholder-gray-400"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Admin Password</label>
                  <div className="relative">
                    <input 
                      type="password" 
                      value={password} 
                      placeholder="Enter the secure password"
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-4 pr-10 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-sm placeholder-gray-400"
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3.5 rounded-xl font-bold tracking-wide shadow-lg hover:shadow-indigo-500/30 transform hover:-translate-y-0.5 transition-all duration-200">
                  Authenticate
                </button>
              </form>
            </div>
          ) : (
            <AdminForm onSubmit={handleAddOrUpdate} initialData={editingDrama} onCancel={() => { setCurrentView('home'); setEditingDrama(null); }} />
          )}
          </div>
        </main>
      )}

      {/* Scrollable Review Modal */}
      {reviewingDrama && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50" onClick={() => setReviewingDrama(null)}>
          <div 
            className="bg-white p-8 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative" 
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setReviewingDrama(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-3xl font-bold"
            >
              &times;
            </button>

            <h2 className="text-3xl font-extrabold text-indigo-900 mb-6">{reviewingDrama.title}</h2>
            
            {reviewingDrama.trailerUrl && getYouTubeEmbedUrl(reviewingDrama.trailerUrl) && (
              <div className="mb-6 aspect-w-16 aspect-h-9 w-full">
                <iframe 
                  src={getYouTubeEmbedUrl(reviewingDrama.trailerUrl)} 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="w-full h-64 md:h-80 rounded-lg shadow-md"
                ></iframe>
              </div>
            )}
            
            <div className="text-gray-600 mb-6 font-medium bg-gray-50 p-4 rounded-lg">
              <p>Country: {reviewingDrama.country}</p>
              <p>Genre: {reviewingDrama.genre}</p>
              <p>Rating: {reviewingDrama.rating}/10</p>
            </div>

            <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-line border-t pt-4">
              {reviewingDrama.review}
            </p>

            <button 
              onClick={() => setReviewingDrama(null)} 
              className="mt-8 w-full px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all"
            >
              Close Review
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;