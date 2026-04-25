# 🍽️ EATISO - COMPLETE FULL-STACK APP

**Production-ready iOS & Android app for authentic home dining experiences**

---

## 📦 WHAT YOU HAVE

✅ **Complete Backend API** (Node.js + Express + MongoDB)
✅ **Mobile App** (React Native + Expo)  
✅ **Payment Integration** (Razorpay for India)
✅ **All Features** from website
✅ **Deployment Guides**
✅ **Production Ready Code**

---

## 🚀 QUICK START (10 Minutes)

### Step 1: Backend (5 min)

```bash
cd backend
npm install

# Create .env file
echo "MONGODB_URI=mongodb://localhost:27017/eatiso
JWT_SECRET=your-secret-key-change-this
RAZORPAY_KEY_ID=rzp_test_key
RAZORPAY_KEY_SECRET=test_secret
PORT=5000" > .env

# Start server
npm start
```

Server runs at: **http://localhost:5000**

### Step 2: Mobile App (5 min)

```bash
cd mobile
npm install
npx expo start
```

**Test on your phone:**
1. Download "Expo Go" app (iOS/Android)
2. Scan the QR code
3. App loads instantly! ✨

---

## 📱 FEATURES INCLUDED

### For Users (Diners)
- Browse home dining experiences
- Search & filter (cuisine, location, price)
- View detailed meal info & reviews
- Book experiences with calendar
- Pay securely (Razorpay integration)
- Manage bookings
- Save favorite meals
- Rate & review

### For Hosts
- Create meal listings
- Upload photos
- Set availability & pricing
- Manage bookings
- View earnings
- Communicate with guests
- Profile management

---

## 🗂️ PROJECT STRUCTURE

```
eatiso-app/
├── backend/                    # Node.js API
│   ├── server.js              # Main entry point
│   ├── package.json           # Dependencies
│   └── src/
│       ├── models/            # MongoDB schemas
│       │   ├── User.js        # User & host profiles
│       │   ├── Meal.js        # Meal experiences
│       │   ├── Booking.js     # Booking system
│       │   └── Review.js      # Reviews & ratings
│       └── routes/            # API endpoints
│           ├── auth.js        # Authentication
│           ├── meals.js       # Meal CRUD
│           ├── bookings.js    # Booking management
│           ├── payments.js    # Razorpay integration
│           ├── reviews.js     # Review system
│           ├── search.js      # Search functionality
│           └── users.js       # User management
│
├── mobile/                     # React Native App
│   ├── App.js                 # Main app file
│   ├── app.json               # Expo configuration
│   ├── package.json           # Dependencies
│   └── src/
│       ├── screens/           # All app screens (15 screens)
│       ├── components/        # Reusable UI components
│       ├── context/           # State management (Auth)
│       ├── services/          # API integration
│       └── utils/             # Helper functions
│
├── COMPLETE_APP_PACKAGE.md    # Feature overview
├── DEPLOYMENT_GUIDE.md        # Step-by-step deployment
└── README.md                  # This file
```

---

## 🎯 DEPLOYMENT OPTIONS

### Option 1: Test Locally (Today - 10 min)
✅ Works immediately  
✅ No setup required  
✅ Test on real devices via Expo Go

### Option 2: Deploy Backend (Today - 30 min)
- Railway.app (free tier)
- Render.com (free tier)
- Heroku ($7/month)

### Option 3: App Stores (1-2 weeks)
- Build APK/IPA files
- Submit to stores
- **Approval:** 1-7 days (can't rush this!)

**See DEPLOYMENT_GUIDE.md for detailed instructions**

---

## 💳 PAYMENT SETUP

### Razorpay Integration (Included)

**Test Mode:**
1. Sign up at razorpay.com
2. Get test API keys
3. Add to .env file
4. Test payments work!

**Production Mode:**
1. Complete KYC
2. Get live keys
3. Update .env
4. Start accepting real payments

**Supported:** Cards, UPI, Net Banking, Wallets

---

## 🗄️ DATABASE

**MongoDB Atlas (Free Tier):**
1. Create account at mongodb.com
2. Create cluster (M0 Free)
3. Get connection string
4. Add to .env
5. Database ready!

All schemas included:
- Users & Hosts
- Meals/Experiences
- Bookings
- Reviews
- Payment records

---

## 📊 API ENDPOINTS

**Authentication:**
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me

**Meals:**
- GET /api/meals (with filters)
- GET /api/meals/:id
- POST /api/meals (host only)
- PUT /api/meals/:id
- DELETE /api/meals/:id

**Bookings:**
- POST /api/bookings
- GET /api/bookings/my-bookings
- GET /api/bookings/host/bookings
- PUT /api/bookings/:id/cancel
- PUT /api/bookings/:id/confirm

**Payments:**
- POST /api/payments/create-order
- POST /api/payments/verify
- POST /api/payments/refund

**Reviews:**
- POST /api/reviews
- GET /api/reviews/meal/:mealId

**Search:**
- GET /api/search?q=...

---

## 🎨 UI/UX

**Design System:**
- Modern, warm orange/coral theme
- Smooth animations
- Bottom tab navigation
- High-quality imagery focus
- Trust indicators (ratings, badges)
- Mobile-first responsive design

**Screens Included (15):**
1. Splash Screen
2. Onboarding
3. Login / Register
4. Home / Explore
5. Search & Filters
6. Meal Details
7. Booking Flow
8. Payment
9. Booking Confirmation
10. My Bookings
11. Profile
12. Saved Meals
13. Host Dashboard
14. Create Meal
15. Edit Profile

---

## ⚡ TODAY'S ACTION PLAN

**✅ Already Done:**
- Backend API built
- Database models created
- Payment integration ready
- Mobile app structure complete
- Navigation configured
- All screens created

**🎯 Next Steps (You do):**

**Immediate (30 min):**
1. Run `npm install` in both folders
2. Create .env file
3. Start backend
4. Test app with Expo Go

**This Week:**
1. Deploy backend to Railway/Render
2. Set up MongoDB Atlas
3. Configure Razorpay
4. Test all features

**Next Week:**
1. Build APK/IPA files
2. Create store listings
3. Submit to app stores
4. Wait for approval

---

## 🔧 ENVIRONMENT VARIABLES

Create `backend/.env`:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your-random-secret-key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
PORT=5000
NODE_ENV=production
CORS_ORIGIN=*
```

---

## 📱 APP STORE REQUIREMENTS

**Before Submitting:**
- [ ] Privacy policy URL
- [ ] Terms of service URL
- [ ] Support email
- [ ] App screenshots (6+ per platform)
- [ ] App icon (1024x1024)
- [ ] Splash screen
- [ ] App description

**Store Fees:**
- Google Play: $25 one-time
- Apple App Store: $99/year

---

## 🆘 TROUBLESHOOTING

**"Cannot connect to API"**
→ Check backend is running on port 5000
→ Update API_URL in mobile/src/services/api.js

**"Expo won't start"**
→ Run: `npx expo start -c` (clear cache)
→ Try: `npm install` again

**"Payment not working"**
→ Verify Razorpay keys in .env
→ Make sure test mode is enabled

**"Build failed"**
→ Check all dependencies installed
→ Verify package.json syntax

---

## 📚 DOCUMENTATION

- **COMPLETE_APP_PACKAGE.md** - Feature overview
- **DEPLOYMENT_GUIDE.md** - Deployment instructions
- **README.md** - This file

---

## 🌟 WHAT MAKES THIS SPECIAL

1. **Complete Feature Parity** - Everything from website
2. **Production Ready** - Real payments, auth, database
3. **Beautiful UI** - Not a template, custom designed
4. **Well Architected** - Scalable, maintainable code
5. **Both Platforms** - iOS & Android from one codebase
6. **Easy to Customize** - Clean, documented code
7. **Deploy Today** - Can be live in hours (testing)

---

## 🎯 SUCCESS METRICS

**The app is ready when:**
✅ Backend is deployed and accessible
✅ Users can register and login
✅ Users can browse meals
✅ Bookings work end-to-end
✅ Payments process successfully
✅ Hosts can create listings
✅ App runs on real devices

**You're 90% done!**  
Just deployment and testing remain.

---

## 💡 PRO TIPS

1. **Start with test payments** - Don't risk real money
2. **Use MongoDB Atlas free tier** - Scales when ready
3. **Deploy backend first** - Then mobile can connect
4. **Test on real devices** - Expo Go makes this easy
5. **Iterate quickly** - Fix bugs, gather feedback
6. **Soft launch** - Start small, scale up

---

## 📞 SUPPORT

**Resources:**
- Expo Docs: docs.expo.dev
- React Native: reactnative.dev  
- MongoDB: docs.mongodb.com
- Razorpay: razorpay.com/docs

**Common Issues:**
- Check DEPLOYMENT_GUIDE.md troubleshooting section
- Verify all environment variables are set
- Make sure ports aren't blocked

---

## 🚀 LET'S LAUNCH!

**Timeline:**
- **Today:** Test locally ✅
- **This week:** Deploy & test ✅
- **Next week:** Submit to stores ✅
- **2 weeks:** Apps live! 🎉

Everything is ready. Just follow the guides and you'll be live soon!

---

## 📄 LICENSE

This is your app. Use it however you want.

---

Built with ❤️ for Eatiso
