# Website Structure & Navigation Flow

## 🌐 Public Pages (No Login Required)

### 1. **Landing Home** - `/`
- Welcome page with hero section
- Features showcase
- Call-to-action buttons
- Navigation to all pages
- **Anyone can access**

### 2. **Projects** - `/projects`
- Portfolio of 6 projects
- Tech stack information
- Project descriptions
- **Anyone can access**

### 3. **Login** - `/login`
- Email/password login
- Google Sign-In
- Link to register page
- **Anyone can access**

### 4. **Register** - `/register`
- Sign up form
- Google Sign-Up
- Link to login page
- **Anyone can access**

## 🔒 Protected Pages (Login Required)

### 5. **Dashboard** - `/dashboard`
- User profile information
- Welcome message
- Dashboard cards
- Logout button
- **REQUIRES LOGIN** - Redirects to `/login` if not authenticated

---

## 🔄 Navigation Flow

### For Non-Logged-In Users:
```
/ (Home) → Browse freely
/projects → Browse freely
/login → Login → /dashboard (after successful login)
/register → Register → /dashboard (after successful registration)
/dashboard → Redirects to /login (if not logged in)
```

### For Logged-In Users:
```
/ (Home) → Shows "Dashboard" button instead of "Login/Sign Up"
/projects → Shows "Dashboard" button
/dashboard → Full access to user dashboard
```

---

## 📱 Footer (Appears on all public pages)

Located at the bottom of:
- Landing Home (`/`)
- Projects (`/projects`)

**Social Media Links:**
- LinkedIn
- Twitter
- GitHub
- Email

**Quick Links:**
- Home
- Projects
- Login
- Sign Up

---

## 🎯 Current Behavior

✅ **Public Access:**
- Users can browse Home and Projects pages without logging in
- Footer with social links visible on public pages

✅ **Authentication Required:**
- Dashboard is protected
- Must login/register to access dashboard
- After login/register → automatically redirected to dashboard

✅ **Smart Navigation:**
- Navbar shows different buttons based on login status:
  - **Not logged in:** Login + Sign Up buttons
  - **Logged in:** Dashboard button

---

## 🔐 Security

- JWT tokens stored in localStorage
- Protected routes check authentication
- Automatic redirect if accessing protected pages without login
- Token included in API requests automatically

---

## 🎨 Design Consistency

All pages feature:
- Professional glassmorphism design
- Gradient purple/indigo theme
- Smooth animations
- Responsive layout
- Modern typography
- Interactive hover effects

---

## 📝 To Customize

### Update Social Media Links
Edit `src/components/Footer.js`:
- Line 28: LinkedIn URL
- Line 36: Twitter URL
- Line 44: GitHub URL
- Line 52: Email address

### Update Project Information
Edit `src/pages/Projects.js`:
- Lines 14-63: Project array with details

### Update Company Name
Search and replace "MyApp" with your company name in:
- `src/pages/LandingHome.js`
- `src/pages/Projects.js`
- `src/components/Footer.js`
- `src/pages/Home.js` (Dashboard)
