# 🎭 Drama Diary

<div align="center">
  <img src="public/hero_image.png" alt="Drama Diary Hero Image" width="100%" style="border-radius: 16px; margin-bottom: 20px; box-shadow: 0 8px 30px rgba(0,0,0,0.15);" />

  [![React](https://img.shields.io/badge/React-19.2-blue?logo=react&logoColor=white&style=for-the-badge)](https://react.dev/)
  [![Firebase](https://img.shields.io/badge/Firebase-Firestore-orange?logo=firebase&logoColor=white&style=for-the-badge)](https://firebase.google.com/)
  [![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v3-38bdf8?logo=tailwind-css&logoColor=white&style=for-the-badge)](https://tailwindcss.com/)
  [![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
</div>

---

**Drama Diary** is a fully responsive, modern web application designed for tracking, rating, and reviewing your favorite Asian dramas and movies. It leverages a real-time serverless database to sync reviews instantly, offering a seamless experience for both readers and content managers.

---

## ✨ Features & Functionality

### 📱 User Features
- **🔍 Instant Search:** Live search bar to filter dramas by title in real-time.
- **❤️ Favorites List:** Bookmark your favorite dramas. Favorites are persisted locally using browser `localStorage`.
- **⭐ Personal Ratings:** Rate dramas individually using an interactive star system (stored locally).
- **🎬 Trailer Playback:** Seamlessly embeds YouTube trailers directly inside the detail modal.
- **💬 Detailed Reviews:** Scrollable modal viewing system to read complete synopsis, cast details, ratings, and custom thoughts.

### 🛡️ Admin Management Portal
- **🔐 Secure Login:** Dedicated, protected route with authentication to enter the administrative dashboard.
- **➕ Add New Reviews:** Rich form to upload cover images, descriptions, scores, YouTube links, tags, and category metadata.
- **✏️ Edit & Update:** Live edit mode allows modification of existing reviews, updating Firestore in real-time.
- **🗑️ Safe Deletion:** Interactive confirmation prompts before permanently removing review entries.

---

## 🛠️ Tech Stack & Tools

- **Frontend Library:** [React](https://react.dev/) (v19)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) for fluid, modern, glassmorphic UI design.
- **Backend-as-a-Service:** [Firebase](https://firebase.google.com/)
  - **Cloud Firestore:** Real-time NoSQL database.
  - **Firebase Hosting:** Distributed production deployment.
- **State Management & Storage:** Local Storage (for guest ratings & bookmarks) + React state management.

---

## 🚀 Getting Started

### 📋 Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### 🔧 Installation Steps

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/dramascape.git
   cd dramascape
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add your Firebase credentials:
   ```env
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

4. **Run the App Locally:**
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

---

## 📖 Scripts

- `npm start` - Runs the application in development mode.
- `npm run build` - Bundles the app for production in the `build/` folder.
- `npm test` - Launches the test runner.
