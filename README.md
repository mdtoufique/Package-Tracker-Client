# 📦 Aamira Courier Package Tracker – Client

This is the **frontend** for the Aamira Courier Package Tracker challenge, built using **React**, **Tailwind CSS**, and **Vite**. It displays package data in real-time, supports searching and filtering, shows alerts, and integrates with the backend via API.

---

## 📌 Additional Documentation

- [🧠 Assumptions & Design Decisions](./ASSUMPTIONS.md)

---

## 🔧 Tech Stack

- ⚛️ React (with Vite)
- 🎨 Tailwind CSS
- 🌐 REST API Integration
- 📦 Axios for HTTP requests
- 🕒 Polling for real-time updates

---

## Features

- **Package Dashboard UI**  
  Displays all active packages (not DELIVERED or CANCELLED) updated in the last 24 hours, including status, time since last update, and map coordinates.

- **Package Detail Timeline**  
  Clicking on a package shows a modal with full event history (reverse chronological), including timestamp, note, and status.

- **Real-Time Data Updates**  
  Uses 5-second polling to update the dashboard without manual refresh. Ensures dispatchers always see the latest package info.

- **Stuck Package Alerts**  
  Alerts are fetched and counted from the backend. A red icon with unresolved alert count is shown at the top for visibility.

- **Courier Update Form**  
  A separate view allows a courier to submit package status updates via a form. ETA is auto-adjusted to BD time.

- **Search & Filter**  
  Supports searching by `package_id` and filtering by current status (e.g., PICKED_UP, IN_TRANSIT).

- **Modular Component Design**  
  Clean component hierarchy with reusable components: StatusBadge, PackageList, HistoryModal, CourierForm, etc.

- **Responsive Design**  
  Mobile-friendly layout using Tailwind’s utility-first approach.

- **Environment Configurable API**  
  Uses `.env` file for backend API URL via `VITE_API_BASE_URL`.

---

## ⚙️ Functionality Implementation

**F1. Ingest Courier Updates** 
- The client includes a **Courier Update Form** where users (couriers) can submit package status updates.  
- Fields include: status, location, ETA, note, and timestamp.  
- Form sends data to `/api/packages/update` with API token and handles optimistic success UI.

**F2. Persist State & History** 
- It is backend concern (handled via MongoDB), but the frontend visualizes this history in the package timeline modal using `/api/packages/:id`.

**F3. Dispatcher Dashboard (Real-Time View)** 
- Implemented a web UI that lists all active packages (updated in the last 24 hours and not `DELIVERED` or `CANCELLED`).  
- Each row shows:  
  - `package_id`  
  - Current `status` (with color-coded badge)  
  - Time since last update (e.g., "12 minutes ago")  
  - Location coordinates (if available)  
  - ETA (or placeholder `—` if missing)  
- Drill-down supported: clicking a package opens a timeline modal showing all its updates chronologically.  
- Real-time updates are achieved using **polling every 5 seconds**.

**F4. Stuck-Package Alerting (>30 Minutes)**  
- UI highlights `STUCK` packages with a red alert badge.  
- Frontend fetches active alerts from backend via `/api/alerts/active` and displays visual indicators.  
- Alerts update automatically via polling mechanism.

**F5. Basic Security / Access Control (Lightweight)**   
- All frontend API requests send the required API token using the `x-api-token` header.  
- The token is stored securely in the `.env` file using `VITE_API_BASE_URL` and injected via frontend service module.

---

## 🚀 Live Frontend

🌍 **Client URL:**  
[https://package-tracker-client.vercel.app](https://package-tracker-client.vercel.app)

📡 **API Base URL (for .env):**

```ini
VITE_API_BASE_URL=https://package-tracker-server-sigma.vercel.app
VITE_API_TOKEN=aamira_2025_TOUFIQUE
```

---

## 📂 Project Structure

```plaintext
AAMIRA-CLIENT/
├── node_modules/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── CourierUpdateForm.jsx
│   │   ├── PackageHistoryModal.jsx
│   │   ├── PackageList.jsx
│   │   └── StatusBadge.jsx
│   ├── hooks/
│   │   └── useUnresolvedAlertCount.js
│   ├── pages/
│   │   ├── AlertDashboard.jsx
│   │   ├── Courier.jsx
│   │   ├── Dashboard.jsx
│   │   └── Home.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js

```

---

## ⚙️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/mdtoufique/Package-Tracker-Client.git
cd Package-Tracker-Client
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

Create a .env file in the root:

```ini
VITE_API_BASE_URL=your_backend_server_url
VITE_API_TOKEN=your_api_token_here
```

### 4. Run locally

```bash
npm run dev
```

App will be available at: http://localhost:5173

---

## 🌐 Main Functionalities

- 🖥️ **Live Dashboard**  
  Displays all active packages updated in the last 24 hours, with real-time status, ETA, and location info.  
  Supports search by ID and filter by status.

- 🔄 **Real-Time Updates**  
  Uses polling every 5 seconds to fetch the latest package data from the backend without needing to reload the page.

- ⚠️ **Alert Indicators**  
  Shows a red badge on any package marked as `STUCK`. Alerts are synced from the backend alert system.

---

## 🔐 Backend Integration

- Communicates securely with the backend API using the `x-api-token` header.  
- Backend base URL configured via `.env` using `VITE_API_BASE_URL`.

---

## 📤 Deployment

Frontend is deployed on **Vercel** using a React + Vite setup.  
Production-ready build is optimized and connected to the deployed backend.

---

## 📄 Related Repos

- **Backend**: [Package-Tracker-Server](https://github.com/mdtoufique/Package-Tracker-Server)

---

## 📧 Submission Info

- **GitHub**: [mdtoufique](https://github.com/mdtoufique)  
- **Email**: mdrehmant@email.com



