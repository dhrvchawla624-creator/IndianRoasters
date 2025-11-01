# ☕ Indian Roasters

**Discover, filter, and explore India's finest specialty coffee roasters through a seamless, interactive web experience.**

![Banner](./src/assets/header-coffee.jpg)

---

## 🚀 Live Demo

Explore Indian Roasters online: [indian-roasters.vercel.app](https://indian-roasters.vercel.app)

---

## ✨ Features

- 🔐 **User Authentication**  
  Firebase Authentication with Google & GitHub OAuth integration, secure session management, and protected routes.

- 🛣️ **Client-Side Routing**  
  Fast navigation between pages using React Router v7 with Home, Roasters, About, Blog, Contact, Profile, and Login pages.

- 📱 **Responsive Navigation**  
  Fixed navigation bar with gradient theming, mobile drawer menu, dark mode toggle, and user profile integration.

- 🔍 **Advanced Filtering System**  
  Filter coffee beans by roaster, origin, roast level, process, tasting notes, price range (with rc-slider), stock availability, and dynamic multi-criteria filters.

- ⚡ **Real-Time Search**  
  Instant search across coffee names, roasters, origins, and tasting profiles with debounced input.

- 🃏 **Coffee Bean Cards**  
  Card-based grid layout displaying optimized images via Cloudinary CDN, product details, and direct purchase links.

- 🎨 **Modern UI/UX**  
  Coffee-themed color palette with gradients, smooth animations, Tailwind CSS v4 for responsive design, and custom landing page with loading animations.

- 💾 **Live Data & Caching**  
  Scraped specialty coffee listings with 1-hour in-memory cache and manual refresh capability from 30+ Indian roasters.

- 🚀 **Lightning-Fast Performance**  
  React 18 + Vite 7 for optimal build times, instant HMR, code-splitting, lazy-loading, and Vercel Analytics & Speed Insights integration.

- 🛡️ **Error Handling**  
  Error boundary components provide graceful fallbacks, 404 Not Found page, and recovery options.

- ⭐ **Favorites & Collections**  
  Context-based favorites system allowing users to save and manage their preferred coffee beans.

- 🗺️ **Roasters Directory**  
  Interactive roaster cards with location information, profile details, and direct links to roaster websites.

- 📊 **Cloudinary CDN Integration**  
  Optimized image delivery with automatic format conversion, responsive sizing, and lazy loading via Cloudinary.

---

## 🛠️ Tech Stack

| Layer        | Tech                                                    |
| ------------ | ------------------------------------------------------- |
| Frontend     | React 18, TypeScript, Vite 7                            |
| Routing      | React Router DOM v7                                     |
| API          | Express.js, Node.js                                     |
| Scraping     | Node Fetch, Cheerio, Shopify JSON APIs                  |
| Database     | Firebase Firestore                                      |
| Auth         | Firebase Authentication (Google, GitHub OAuth)          |
| CDN          | Cloudinary (Image Optimization & Delivery)              |
| Caching      | In-memory cache (1-hour expiry)                         |
| Styling      | Tailwind CSS v4 with custom animations                  |
| Analytics    | Vercel Analytics & Speed Insights                       |
| Deployment   | Vercel (Serverless Functions)                           |

---

## 🧩 Architecture & Main Components

### Frontend (React)

**Component Architecture:**

- `App.tsx` — Root application component with routing configuration and protected routes
- `Navbar.tsx` — Navigation bar with mobile drawer, theme toggle, and user authentication status
- `Hero.tsx` — Home page hero section with stats and animations
- `PageHero.tsx` — Reusable hero component for secondary pages
- `LandingPage.tsx` — Animated loading screen with coffee-themed animations
- `FilterSection.tsx` — Search bar, price slider (rc-slider), and advanced filter controls
- `CoffeeGrid.tsx` — Product grid with pagination logic and favorites integration
- `CoffeeCard.tsx` — Individual coffee bean card with Cloudinary-optimized images
- `RoastersCard.tsx` — Roaster profile cards with location and details
- `LocationCard.tsx` — Location-based roaster information display
- `Footer.tsx` — Footer with last update timestamp and links
- `ErrorBoundary.tsx` — Error handling wrapper component
- `ProtectedRoute.tsx` — Route protection wrapper for authenticated pages
- `coffee.ts` — Coffee data types and interfaces

**Pages:**

- `Home.tsx` — Main coffee listing with filters, search, and favorites functionality
- `Roasters.tsx` — Roasters directory page with location cards and profiles
- `About.tsx` — Information about the platform and mission
- `Blog.tsx` — Blog section with brewing guides and coffee culture articles
- `Contact.tsx` — Contact page with form integration
- `LoginPage.tsx` — User authentication page with Google & GitHub OAuth
- `Profile.tsx` — User profile page with favorites and account management
- `NotFound.tsx` — 404 error page with navigation options

**Contexts:**

- `AuthContext.tsx` — Firebase authentication state management and user session handling
- `FavoritesContext.tsx` — Favorites/collections state management across the application

**Types:**

- `coffee.ts` — TypeScript interfaces for coffee beans and products
- `roasters.ts` — TypeScript interfaces for roaster data and locations

**Data:**

- `roastersData.ts` — Comprehensive database of 30+ Indian specialty coffee roasters

**Utils:**

- `imageOptimizer.ts` — Cloudinary CDN integration for image optimization and responsive delivery

### Backend (Express)

- `/api/coffee` — Returns cached or fresh coffee bean data from 30+ roasters
- `/api/coffee/refresh` — Manual cache refresh endpoint
- `/health` — Health check endpoint for monitoring

### Data Collection

- Aggregates data from 30+ Indian specialty coffee roasters
- Fetches product data from Shopify `/products.json` endpoints
- Automatic data normalization and tasting notes extraction
- Parallel fetching for improved performance
- Supports both local Express server and Vercel serverless functions

---

## 📦 Getting Started

### Prerequisites

- Node.js >= 18
- npm or yarn
- Firebase project (for authentication)
- Cloudinary account (for image CDN)

1. **Clone this repo:**

   ```bash
   git clone https://github.com/dhrvchawla624-creator/IndianRoasters.git
   cd IndianRoasters
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run locally (Vite + Express):**

   ```bash
   npm run dev
   ```
   
4. **Set up environment variables:**

```bash
Create a `.env` file in the root directory:
```

VITE_FIREBASE_API_KEY=your-firebase-api-key

VITE_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain

VITE_FIREBASE_PROJECT_ID=your-firebase-project-id

VITE_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket

VITE_FIREBASE_MESSAGING_SENDER_ID=your-firebase-sender-id

VITE_FIREBASE_APP_ID=your-firebase-app-id

VITE_CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name


5. **Set up Firebase:**
- Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
- Enable Authentication with Google & GitHub providers
- Set up the Firestore database
- Add your web app and copy the config values to `.env`

6. **Set up Cloudinary:**
- Create a Cloudinary account at [Cloudinary](https://cloudinary.com/)
- Copy your cloud name to `.env`

### Running Locally

5. **Visit:**
   [http://localhost:5173](http://localhost:5173)

### Available Scripts

- `npm run dev` - Run both frontend (Vite) and backend (Express) concurrently
- `npm run client` - Run only the frontend Vite dev server
- `npm run server` - Run only the Express backend server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build

---

## 🔄 Data Refresh

- **Automatic Caching:**  
  Coffee data is cached in memory for 1 hour to optimize performance.

- **Manual Refresh:**  
  Send a POST request to `/api/coffee/refresh` to force a cache refresh.

- **Live Data:**  
  Data is scraped in real-time from 50+ Indian specialty coffee roasters, including Blue Tokai, Corridor Seven, Fraction9, and more.

### Supported Coffee Roasters (50+)

The platform aggregates data from these premium Indian coffee roasters:

- Savourworks, Quick Brown Fox, Home Blends, Kaapi Kottai, Tulum, Classic Coffees, Baarbara Coffee, Devan's Coffee, Korebi Coffee, Naked Coffee, Caarabi Coffee, Caffnary, Hill Tiger, Beachville, Coffeeverse, Rossette, Black Baza, Bombay Island, Half Light, Ikkis Coffee, Kaffacerrado, Capulus, Genetics, Roast Coffee, Karma Kaapi

> **Note:** All roasters use Shopify-based stores for consistent data integration

---

## 🖼️ Screenshots

|                  Interactive Filters                  |                 Coffee Grid Cards                 |
| :---------------------------------------------------: | :-----------------------------------------------: |
| ![Interactive Filters](./src/assets/filters-demo.png) | ![Coffee Grid Cards](./src/assets/cards-demo.png) |

---

## 👨‍💻 File Structure

```text
├── src/
│ ├── components/
│ │ ├── CoffeeCard.tsx # Individual coffee product card
│ │ ├── CoffeeGrid.tsx # Grid with pagination & favorites
│ │ ├── ErrorBoundary.tsx # Error handling wrapper
│ │ ├── FilterSection.tsx # Search & filter controls
│ │ ├── Footer.tsx # Footer component
│ │ ├── Hero.tsx # Home page hero section
│ │ ├── LandingPage.tsx # Animated loading screen
│ │ ├── LocationCard.tsx # Roaster location display
│ │ ├── Navbar.tsx # Navigation with auth status
│ │ ├── PageHero.tsx # Reusable page headers
│ │ ├── ProtectedRoute.tsx # Route protection wrapper
│ │ ├── RoastersCard.tsx # Roaster profile cards
│ │ └── coffee.ts # Coffee data & types
│ ├── pages/
│ │ ├── About.tsx # About page
│ │ ├── Blog.tsx # Blog section
│ │ ├── Contact.tsx # Contact page
│ │ ├── Home.tsx # Main coffee listing
│ │ ├── LoginPage.tsx # Authentication page
│ │ ├── NotFound.tsx # 404 error page
│ │ ├── Profile.tsx # User profile & favorites
│ │ └── Roasters.tsx # Roasters directory
│ ├── contexts/
│ │ ├── AuthContext.tsx # Firebase auth state
│ │ └── FavoritesContext.tsx # Favorites management
│ ├── types/
│ │ ├── coffee.ts # Coffee type definitions
│ │ └── roasters.ts # Roaster type definitions
│ ├── data/
│ │ └── roastersData.ts # 30+ roaster database
│ ├── utils/
│ │ └── imageOptimizer.ts # Cloudinary CDN integration
│ ├── App.tsx # Root component with routing
│ ├── firebase.ts # Firebase config & exports
│ ├── index.css # Tailwind & custom styles
│ ├── main.tsx # React entry point
│ └── assets/ # Static assets
├── api/
│ ├── coffee.ts # Vercel serverless function
│ └── refresh.ts # Cache refresh endpoint
├── fetcher.ts # Web scraping logic (30+ roasters)
├── server.ts # Local Express server
├── vite.config.ts # Vite configuration
└── package.json # Dependencies & scripts
```

---


---

## 🌱 Roadmap

**Completed:**
- ✅ Client-side routing with React Router v7
- ✅ Firebase Authentication (Google & GitHub OAuth)
- ✅ User favorites and collections system
- ✅ Protected routes for authenticated users
- ✅ Responsive navigation with mobile drawer and dark mode toggle
- ✅ Integration with 30+ Indian coffee roasters
- ✅ Advanced filtering system (price, tasting notes, roast levels, origins, processes)
- ✅ Real-time search functionality
- ✅ Cloudinary CDN integration for optimized images
- ✅ Roasters directory with detailed profiles and locations
- ✅ Blog section with brewing guides
- ✅ Tailwind CSS v4 integration
- ✅ Dark mode implementation
- ✅ Performance optimizations (code splitting, lazy loading)

**In Progress:**
- 🔄 Functional contact form with email integration
- 🔄 User reviews and ratings for roasters

**Planned:**
- 📋 Coffee recommendation engine based on taste preferences
- 🗺️ Interactive roaster location map with geolocation
- 📊 Price tracking and alerts for favorite beans
- 🎯 Coffee brewing guides and tutorials
- 📱 PWA support for mobile installation
- 🔔 Push notifications for new roaster additions and deals

---

## 🤝 Contributing

Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Feel free to open Issues for bugs & features!

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 🙏 Credits & Acknowledgments

**Built by:** [Dhruv Chawla](https://github.com/dhrvchawla624-creator)

**Contributors:**
- [Pranav Bedre](https://github.com/ghpranav)

**Data Sources:**  
Coffee data sourced from 30+ top Indian specialty coffee roasters including Blue Tokai Coffee, Corridor Seven, Fraction9, Bloom Coffee, and more.

**Technologies:**  
Special thanks to the open-source communities behind React, Vite, Firebase, Cloudinary, Tailwind CSS, and all other amazing tools that made this project possible.

---

## 📞 Contact & Links

**Live Demo:** [indian-roasters.vercel.app](https://indian-roasters.vercel.app)  
**GitHub Repository:** [IndianRoasters](https://github.com/dhrvchawla624-creator/IndianRoasters)  
**Report Issues:** [GitHub Issues](https://github.com/dhrvchawla624-creator/IndianRoasters/issues)  
**Project Creator:** [Dhruv Chawla](https://github.com/dhrvchawla624-creator)

---

<div align="center">

**☕ Brew better. Discover deeper. Welcome to Indian Roasters. ☕**

Made with ❤️ and lots of ☕ in India



