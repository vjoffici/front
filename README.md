# Frontend - React Authentication App

A modern React application with user authentication, Google Sign-In, and protected routes.

## Features

- ✅ User Registration
- ✅ User Login
- ✅ Google OAuth Authentication
- ✅ Protected Routes
- ✅ JWT Token Management
- ✅ Beautiful Modern UI
- ✅ Responsive Design
- ✅ Context API for State Management

## Tech Stack

- **React 18** - UI Library
- **React Router v6** - Routing
- **@react-oauth/google** - Google Authentication
- **Axios** - HTTP Client
- **Lucide React** - Icons
- **Context API** - State Management

## Prerequisites

- Node.js (v14 or higher)
- Backend API running on `http://localhost:3000`
- Google Cloud Console project (for Google OAuth)

## Setup Instructions

### 1. Install Dependencies

```bash
cd NEWFINAL-frontend
npm install
```

### 2. Get Google OAuth Client ID

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable **Google+ API**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure OAuth consent screen
6. Create OAuth Client ID:
   - Application type: **Web application**
   - Authorized JavaScript origins: `http://localhost:3001`
   - Authorized redirect URIs: `http://localhost:3001`
7. Copy the **Client ID**

### 3. Configure Google Client ID

Open `src/App.js` and replace the placeholder:

```javascript
const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID_HERE";
```

With your actual Google Client ID:

```javascript
const GOOGLE_CLIENT_ID = "123456789-abcdefghijklmnop.apps.googleusercontent.com";
```

### 4. Start the Development Server

```bash
npm start
```

The app will open at `http://localhost:3001` (or the next available port)

## Project Structure

```
src/
├── api/
│   └── auth.js              # API calls to backend
├── context/
│   └── AuthContext.js       # Authentication context
├── pages/
│   ├── Login.js             # Login page with Google OAuth
│   ├── Register.js          # Registration page
│   ├── Home.js              # Protected home page
│   ├── Auth.css             # Auth pages styling
│   └── Home.css             # Home page styling
├── App.js                   # Main app with routing
├── index.js                 # Entry point
└── index.css                # Global styles
```

## Usage

### Register a New User

1. Navigate to the registration page
2. Fill in your name, email, and password
3. Click "Sign Up" or use "Sign up with Google"
4. You'll be redirected to the home page

### Login

1. Navigate to the login page
2. Enter your email and password
3. Click "Sign In" or use "Sign in with Google"
4. You'll be redirected to the home page

### Google Authentication

1. Click the "Sign in with Google" or "Sign up with Google" button
2. Select your Google account
3. Grant permissions
4. You'll be automatically logged in and redirected to home

## Features Explained

### Protected Routes

The home page is protected and only accessible to authenticated users. If you try to access it without logging in, you'll be redirected to the login page.

### Token Management

- JWT tokens are stored in `localStorage`
- Tokens are automatically included in API requests
- Tokens persist across browser sessions
- Logout clears all stored data

### Google OAuth Flow

1. User clicks Google Sign-In button
2. Google authentication popup appears
3. User selects account and grants permissions
4. Google returns a credential token
5. Token is decoded to get user info
6. User is logged in and redirected to home

## API Integration

The frontend connects to your backend API at `http://localhost:3000/api`

### Endpoints Used

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/users/profile` - Get user profile (protected)

## Customization

### Change API URL

Edit `src/api/auth.js`:

```javascript
const API_URL = 'http://your-backend-url/api';
```

### Modify Styling

- Global styles: `src/index.css`
- Auth pages: `src/pages/Auth.css`
- Home page: `src/pages/Home.css`

### Add More Routes

Edit `src/App.js` and add new routes:

```javascript
<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
```

## Troubleshooting

### Google Sign-In Not Working

1. Verify your Client ID is correct
2. Check that `http://localhost:3001` is in authorized origins
3. Clear browser cache and cookies
4. Make sure Google+ API is enabled

### Backend Connection Issues

1. Ensure backend is running on `http://localhost:3000`
2. Check CORS is enabled in backend
3. Verify API endpoints are correct

### Token Errors

1. Clear localStorage: `localStorage.clear()`
2. Re-login to get a fresh token
3. Check token expiration settings in backend

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Environment Variables

For production, create a `.env` file:

```env
REACT_APP_API_URL=https://your-production-api.com/api
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id
```

## Screenshots

### Login Page
- Modern gradient background
- Email/password form
- Google Sign-In button
- Link to registration

### Register Page
- Full name, email, password fields
- Password confirmation
- Google Sign-Up button
- Link to login

### Home Page
- Welcome message with user name
- Profile information card
- Dashboard cards
- Logout button

## License

ISC

## Support

For issues and questions, please check the backend API documentation.
