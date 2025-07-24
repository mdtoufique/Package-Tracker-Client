# 📦 Aamira Package Tracker – Client (Frontend)

This is the **frontend** of the Aamira Courier Package Tracker, built using **React** and **Tailwind CSS**, powered by **Vite**.

> ✅ This repo includes frontend work completed **up to now**:
> - Dashboard UI with Tailwind
> - Package list with status badge
> - Dummy data loading via `fetchActivePackages()`

---

## 🌐 Technologies Used

- ⚛️ React (via Vite)
- 🎨 Tailwind CSS
- 📦 Dummy API with `async/await`
- 🧠 Component-based structure
- (No WebSocket, routing, or backend integration yet)

---

## 🚀 Getting Started

### Prerequisites

- Node.js and npm installed

### Install dependencies

```bash
npm install
```
### Run locally
```bash
npm run dev
```
App will be available at: http://localhost:5173

### Project Structure (as of now)
aamira-client/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── PackageList.jsx       # Renders the table of packages
│   │   ├── StatusBadge.jsx       # Colored status labels
│   ├── pages/
│   │   └── Dashboard.jsx         # Main dashboard with data fetching + loading
│   ├── services/
│   │   └── api.js                # Mock fetchActivePackages() with dummy data
│   ├── App.jsx                   # Root component rendering <Dashboard />
│   ├── main.jsx                  # React entry point
│   └── index.css                 # Tailwind base layer
├── .env                          # (Optional) for API configs
├── index.html                    # Vite HTML template
├── package.json                  # Project metadata + scripts
├── tailwind.config.js            # Tailwind config
├── postcss.config.js             # PostCSS config (required for Tailwind)
└── vite.config.js                # Vite dev/build config

## ✅ Features (Current)

- Package dashboard UI
- Status badge with color per state
- Formatted time ago display (e.g., "12 minutes ago")
- Loading state
- Modular component structure
- Dummy API with delay

---

## 🔜 Planned (Next Steps)

- Package Detail view (timeline)
- WebSocket real-time updates
- Alerts for stuck packages
- Search/filter UI
- Backend API integration
- Routing with `react-router-dom`

## 📄 License

This project is for evaluation/demo purposes only.
