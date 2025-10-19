# ☕ IndianRoasters

**Discover, filter, and explore India's finest specialty coffee roasters through a seamless, interactive web experience.**

![Banner](./src/assets/header-coffee.jpg) <!-- Replace with your actual image path if needed -->

---

## 🚀 Live Demo

Explore IndianRoasters online: [indian-roasters.vercel.app](https://indian-roasters.vercel.app)

---

## ✨ Features

- **Interactive, real-time filtering**  
  Effortlessly filter beans by roaster, origin, roast level, process, tasting notes, price, and stock status.

- **Rich search experience**  
  Search across names, roasters, origins, and tasting profiles instantly.

- **Responsive coffee cards**  
  Clean, card-style grid showcasing bean images, details, and instant “Buy Now” links.

- **Modern UI/UX**  
  Coffee-themed colors, gradients, and smooth animations designed for comfort and clarity.

- **Auto-refresh & live data**  
  Freshly scraped specialty coffee listings with easy backend refresh support.

- **Fast, real-time UI with zero page reloads**  
  Built using React + Vite for lightning-fast performance.

---

## 🛠️ Tech Stack

| Layer     | Tech                           |
|-----------|-------------------------------|
| Frontend  | React 18, TypeScript, Vite     |
| API       | Express.js, Node.js            |
| Scraping  | Axios, Cheerio                 |
| Caching   | JSON file-based (90-day expiry)|
| Styling   | Pure CSS with gradients, animations |

---

## 🧩 Architecture & Main Components

### Frontend (React)
- Powerful Search + Filters UI
- Responsive Grid with Coffee Cards
- Instant feedback and animation states

### Backend (Express)
- `/api/coffee` — Serves cached & fresh bean data
- `/api/refresh` — Scrapes fresh beans from sources

### Scraping Logic
- Targets sites like bluetokaicoffe.com (extendable)
- Automatic data cleaning & normalization

---

## 📦 Getting Started

1. **Clone this repo:**

