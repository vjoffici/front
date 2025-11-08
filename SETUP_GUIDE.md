# Quick Setup Guide

## ✅ What's Already Done

1. ✅ Frontend React app created
2. ✅ Dependencies installed
3. ✅ All pages created (Login, Register, Home)
4. ✅ Google OAuth integration ready
5. ✅ Beautiful modern UI with animations

## 🚀 Next Steps

### Step 1: Get Google OAuth Client ID

**This is REQUIRED for Google Sign-In to work!**

1. Go to: https://console.cloud.google.com/
2. Create a new project (or select existing)
3. Click "APIs & Services" → "Credentials"
4. Click "Create Credentials" → "OAuth 2.0 Client ID"
5. If prompted, configure OAuth consent screen first:
   - User Type: External
   - App name: Your app name
   - User support email: Your email
   - Developer contact: Your email
6. Create OAuth Client ID:
   - Application type: **Web application**
   - Name: "Frontend App"
   - Authorized JavaScript origins: `http://localhost:3001`
   - Authorized redirect URIs: `http://localhost:3001`
7. Copy the **Client ID** (looks like: `123456-abc.apps.googleusercontent.com`)

### Step 2: Configure the Client ID

Open `src/App.js` and replace line 13:

```javascript
const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID_HERE";
```

With your actual Client ID:

```javascript
const GOOGLE_CLIENT_ID = "123456789-abcdefghijklmnop.apps.googleusercontent.com";
```

### Step 3: Start the Frontend

The frontend should already be starting. If not, run:

```bash
npm start
```

It will open at: **http://localhost:3001** (or next available port)

### Step 4: Make Sure Backend is Running

Your backend should be running on **http://localhost:3000**

If not, go to the backend folder and run:
```bash
cd ../NEWFINAL
npm run dev
```

## 🎯 Testing the App

### Test Regular Login/Register

1. Open http://localhost:3001
2. Click "Sign up" link
3. Fill in: Name, Email, Password
4. Click "Sign Up"
5. You'll be redirected to Home page

### Test Google Sign-In

1. Go to Login page
2. Click "Sign in with Google" button
3. Select your Google account
4. Grant permissions
5. You'll be logged in and redirected to Home

## 📁 Project Structure

```
NEWFINAL-frontend/
├── src/
│   ├── api/
│   │   └── auth.js           # Backend API calls
│   ├── context/
│   │   └── AuthContext.js    # Auth state management
│   ├── pages/
│   │   ├── Login.js          # Login page
│   │   ├── Register.js       # Register page
│   │   ├── Home.js           # Protected home page
│   │   ├── Auth.css          # Auth styling
│   │   └── Home.css          # Home styling
│   ├── App.js                # Main app + routing
│   ├── index.js              # Entry point
│   └── index.css             # Global styles
└── package.json
```

## 🎨 Features

- ✅ Modern gradient UI
- ✅ Smooth animations
- ✅ Responsive design
- ✅ Google OAuth integration
- ✅ Protected routes
- ✅ JWT token management
- ✅ Error handling
- ✅ Loading states

## 🔧 Troubleshooting

### Google Sign-In doesn't work
- Make sure you added the Client ID in `src/App.js`
- Verify authorized origins include `http://localhost:3001`
- Clear browser cache

### Can't connect to backend
- Make sure backend is running on port 3000
- Check backend has CORS enabled
- Verify API URL in `src/api/auth.js`

### Port already in use
- The app will automatically ask to use another port
- Just press 'Y' when prompted

## 📝 Important Files to Configure

1. **src/App.js** - Add your Google Client ID here (line 13)
2. **src/api/auth.js** - Backend API URL (already set to localhost:3000)

## 🎉 You're All Set!

Once you add the Google Client ID, everything will work perfectly!

The app includes:
- Beautiful login page with Google Sign-In
- Registration page with validation
- Protected home page with user info
- Automatic token management
- Smooth navigation and animations
