# ☕ IndianRoasters

**Discover, filter, and explore India's finest specialty coffee roasters through a seamless, interactive web experience.**

![Banner](./src/assets/header-coffee.jpg)

---

## 🚀 Live Demo

Explore IndianRoasters online: [indian-roasters.vercel.app](https://indian-roasters.vercel.app)

---

## ✨ Features

- **Client-Side Routing**  
  Fast navigation between pages using React Router with dedicated Home, Roasters, About, Blog, and Contact pages.

- **Responsive Navigation Menu**  
  Fixed top menu bar with seamless gradient matching the hero section, smooth mobile drawer navigation, and dark theme toggle button for future implementation.

- **Interactive, real-time filtering**  
  Effortlessly filter beans by roaster, origin, roast level, process, tasting notes, price, and stock status.

- **Rich search experience**  
  Search across names, roasters, origins, and tasting profiles instantly.

- **Responsive coffee cards**  
  Clean, card-style grid showcasing bean images, details, and instant "Buy Now" links.

- **Modern UI/UX**  
  Coffee-themed colors, gradients, and smooth animations designed for comfort and clarity. Built with Tailwind CSS utility-first approach for maintainable and responsive design.

- **Auto-refresh & live data**  
  Freshly scraped specialty coffee listings with easy backend refresh support.

- **Fast, real-time UI with zero page reloads**  
  Built using React + Vite for lightning-fast performance.

- **Error Boundary Protection**  
  Graceful error handling with user-friendly error messages and recovery options.

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

**Modular Component Structure:**

- `App.tsx` — Main app component with routing setup
- `Navbar.tsx` — Fixed navigation bar with mobile drawer and theme toggle
- `Hero.tsx` — Landing header with stats and animations
- `FilterSection.tsx` — Search bar, price slider, and filter dropdowns
- `CoffeeGrid.tsx` — Product grid with pagination and empty states
- `CoffeeCard.tsx` — Individual coffee bean card component
- `Footer.tsx` — Footer with last update info
- `ErrorBoundary.tsx` — Graceful error handling wrapper

**Page Components:**

- `Home.tsx` — Main coffee listing page with filters and search
- `Roasters.tsx` — Roasters directory (placeholder for future content)
- `About.tsx` — About page with mission and features
- `Blog.tsx` — Blog page (placeholder for future content)
- `Contact.tsx` — Contact page (placeholder for future content)

### Backend (Express)

- `/api/coffee` — Serves cached & fresh bean data from 30+ roasters
- `/api/coffee/refresh` — Manual cache refresh endpoint
- Health check endpoint at `/health`

### Scraping Logic

- Targets 30+ Indian coffee roasters using Shopify stores
- Fetches from `/products.json` endpoints for real-time data
- Automatic data cleaning, tasting notes extraction, and metadata normalization
- Supports both local Express server and Vercel serverless deployment

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

## 🔄 Refresh Data (Backend)

- **Automatic Caching:**  
  Coffee data is automatically cached for 1 hour in memory for fast reloads.

- **Manual Refresh:**  
  Hit `POST /api/coffee/refresh` endpoint to force refresh the cache.

- **Real-time Data:**  
  Scrapes live data from 30+ roasters including Blue Tokai, Corridor Seven, Fraction9, and many more.

### Supported Coffee Roasters (30+)

The platform currently aggregates data from these premium Indian coffee roasters:

**Major Roasters:**

- Blue Tokai Coffee Roasters
- Corridor Seven
- Fraction9
- Bloom Coffee
- Maverick & Farmer
- Broot Coffee
- GreySoul Coffee

**Specialty Roasters:**

- Savourworks, Quick Brown Fox, Home Blends, Kaapi Kottai, Tulum, Classic Coffees, Baarbara Coffee, Devan's Coffee, Korebi Coffee, Naked Coffee, Caarabi Coffee, Caffnary, Hill Tiger, Beachville, Coffeeverse, Rossette, Black Baza, Bombay Island, Half Light, Ikkis Coffee, Kaffacerrado, Capulus, Genetics, Roast Coffee, Karma Kaapi

> **Note:** All roasters use Shopify-based stores for seamless data integration

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
│   │   ├── Hero.tsx           # Hero section with stats
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

- [x] **Client-Side Routing** - React Router implementation with multiple pages
- [x] **Responsive Navigation** - Fixed top menu bar with mobile drawer and dark theme toggle placeholder
- [x] **30+ Roaster Integration** - Blue Tokai, Corridor Seven, Fraction9, Bloom Coffee, etc.
- [x] **Advanced Filtering System** - Price range, tasting notes, roast levels, origins, processes
- [x] **Real-time Search** - Instant search across all coffee attributes
- [x] **Responsive Design** - Works perfectly on desktop and mobile
- [x] **Tailwind CSS Migration** - Modern utility-first CSS framework for better maintainability
- [ ] **Dark Mode Implementation** - Complete dark theme support for better accessibility
- [ ] **Roasters Directory Content** - Detailed profiles, locations, and stories
- [ ] **Blog Content** - Brewing guides, roaster interviews, and coffee culture articles
- [ ] **Contact Form** - Functional contact form with email integration
- [ ] Add user favorites & collections
- [ ] Coffee recommendation engine
- [ ] Roaster location mapping
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
Coffee data sourced from top Indian roasters, including Bluetokaicoffee.

---

**Brew better. Discover deeper. Welcome to IndianRoasters.**
