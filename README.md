# ☕ Indian Roasters

**Discover, filter, and explore India's finest specialty coffee roasters through a seamless, interactive web experience.**

![Banner](./src/assets/header-coffee.jpg)

---

## 🚀 Live Demo

Explore Indian Roasters online: [indian-roasters.vercel.app](https://indian-roasters.vercel.app)

---

## ✨ Features

- **Client-Side Routing**  
  Fast navigation between pages using React Router with Home, Roasters, About, Blog, and Contact pages.

- **Responsive Navigation**  
  Fixed navigation bar with gradient theming, mobile drawer menu, and dark mode toggle.

- **Advanced Filtering System**  
  Filter coffee beans by roaster, origin, roast level, process, tasting notes, price range, and stock availability.

- **Real-Time Search**  
  Instant search across coffee names, roasters, origins, and tasting profiles.

- **Coffee Bean Cards**  
  Card-based grid layout displaying bean images, details, and direct purchase links.

- **Modern UI/UX**  
  Coffee-themed color palette with gradients and smooth animations. Tailwind CSS provides responsive, maintainable styling.

- **Live Data & Caching**  
  Scraped specialty coffee listings with 1-hour in-memory cache and manual refresh capability.

- **Lightning-Fast Performance**  
  React 18 + Vite for optimal build times and instant hot module replacement.

- **Error Handling**  
  Error boundary components provide graceful fallbacks and recovery options.

---

## 🛠️ Tech Stack

| Layer      | Tech                                |
| ---------- | ----------------------------------- |
| Frontend   | React 18, TypeScript, Vite          |
| Routing    | React Router DOM v6                 |
| API        | Express.js, Node.js                 |
| Scraping   | Node Fetch (Shopify JSON APIs)      |
| Caching    | In-memory cache (1-hour expiry)     |
| Styling    | Tailwind CSS with custom animations |
| Deployment | Vercel (Serverless Functions)       |

---

## 🧩 Architecture & Main Components

### Frontend (React)

**Component Architecture:**

- `App.tsx` — Root application component with routing configuration
- `Navbar.tsx` — Navigation bar with mobile drawer and theme toggle
- `Hero.tsx` — Home page hero section with stats and animations
- `PageHero.tsx` — Reusable hero component for secondary pages
- `FilterSection.tsx` — Search bar, price slider, and filter controls
- `CoffeeGrid.tsx` — Product grid with pagination logic
- `CoffeeCard.tsx` — Individual coffee bean card
- `Footer.tsx` — Footer with last update timestamp
- `ErrorBoundary.tsx` — Error handling wrapper component

**Pages:**

- `Home.tsx` — Main coffee listing with filters and search functionality
- `Roasters.tsx` — Roasters directory page
- `About.tsx` — Information about the platform
- `Blog.tsx` — Blog section
- `Contact.tsx` — Contact page

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

4. **Visit:**
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
  Data is scraped in real-time from 30+ Indian specialty coffee roasters including Blue Tokai, Corridor Seven, Fraction9, and more.

### Supported Coffee Roasters (30+)

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
│   ├── components/
│   │   ├── LandingPage.tsx    # Animated loading screen
│   │   ├── Navbar.tsx         # Navigation menu with mobile drawer
│   │   ├── Hero.tsx           # Hero section with stats (Home page)
│   │   ├── PageHero.tsx       # Reusable hero header (other pages)
│   │   ├── FilterSection.tsx  # Search and filters
│   │   ├── CoffeeGrid.tsx     # Grid with pagination
│   │   ├── CoffeeCard.tsx     # Individual product card
│   │   ├── Footer.tsx         # Footer component
│   │   └── ErrorBoundary.tsx  # Error handling
│   ├── pages/
│   │   ├── Home.tsx           # Main coffee listing page
│   │   ├── Roasters.tsx       # Roasters directory page
│   │   ├── About.tsx          # About page
│   │   ├── Blog.tsx           # Blog page
│   │   └── Contact.tsx        # Contact page
│   ├── types/
│   │   └── coffee.ts          # TypeScript interfaces
│   ├── App.tsx                # Main app with routing
│   ├── index.css              # Tailwind CSS config & custom animations
│   ├── main.tsx               # React entry point
│   └── assets/                # Static assets
├── api/
│   ├── coffee.ts              # Vercel serverless function
│   └── refresh.ts             # Cache refresh endpoint
├── server.ts                  # Local Express server
├── fetcher.ts                 # Web scraping logic (30+ roasters)
├── vite.config.ts             # Vite configuration (includes Tailwind plugin)
└── package.json               # Dependencies and scripts
```

---

## 🌱 Roadmap

- [x] Client-side routing with React Router
- [x] Responsive navigation with mobile drawer and dark mode toggle
- [x] Consistent page headers with PageHero component
- [x] Integration with 30+ Indian coffee roasters
- [x] Advanced filtering system (price, tasting notes, roast levels, origins, processes)
- [x] Real-time search functionality
- [x] Responsive design for desktop and mobile
- [x] Tailwind CSS v4 integration
- [x] Dark mode implementation
- [ ] Roasters directory with detailed profiles and locations
- [ ] Blog section with brewing guides and coffee culture articles
- [ ] Functional contact form with email integration
- [ ] User favorites and collections
- [ ] Coffee recommendation engine
- [ ] Interactive roaster location map
- [ ] Price tracking and alerts

---

## 🤝 Contributing

1. Fork + clone the repo
2. Create your feature branch (`git checkout -b feature/my-feature`)
3. Commit and push your changes
4. Open a Pull Request

Feel free to open Issues for bugs & features!

---

## 📄 License

MIT

---

## 🙏 Credits

Built by Dhruv Chawla.  
Coffee data sourced from 30+ top Indian specialty coffee roasters including Blue Tokai Coffee, Corridor Seven, Fraction9, Bloom Coffee, and more.

---

**Brew better. Discover deeper. Welcome to Indian Roasters.**
