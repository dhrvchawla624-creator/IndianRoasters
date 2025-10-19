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
git clone https://github.com/dhrvchawla624-creator/IndianRoasters.git
cd IndianRoasters

npm install
2. **Install dependencies:*3. **Run locally (Vite + Express):**

npm run dev

4. **Visit:**
[http://localhost:5173](http://localhost:5173)

---

## 🔄 Refresh Data (Backend)

- **Local Scraping:**  
Run `npm run refresh` or hit `/api/refresh` to fetch the latest beans.

- **Caching:**  
Coffee data is cached for 90 days in `cache.json` for fast reloads.

---

## 🖼️ Screenshots

| Interactive Filters                  | Coffee Grid Cards                  |
| :-----------------------------------:| :--------------------------------: |
| ![](./src/assets/filters-demo.png)   | ![](./src/assets/cards-demo.png)   |

---

## 👨‍💻 File Structure

src/
App.tsx # Main UI logic
App.css # CSS styling, gradients, animations
assets/ # Images, icons, graphics
api/
coffee.ts # Fetch/cached coffee API
refresh.ts # Scraper endpoint
server.ts # Express server entry
fetcher.ts # Data scraper
cache.json # Local cache (auto)


---

## 🌱 Roadmap

- [ ] Add more roaster sources (Naivo, Subko, Devans)
- [ ] Advanced tasting notes filters
- [ ] User favorites & collections
- [ ] Mobile-first enhancements

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
