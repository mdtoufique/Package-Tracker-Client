# 📄 ASSUMPTIONS – Frontend (Aamira Package Tracker)

This file outlines assumptions, design choices, and trade-offs made while implementing the frontend for the Aamira Courier Package Tracker challenge.

---

## 🧠 General Assumptions

- The frontend is intended for **internal use by dispatchers and couriers**, not external customers.
- Real-time requirements (≤5s update delay) are fulfilled via **client-side polling** rather than WebSocket, for simplicity and deployment ease.
- All API endpoints require an `x-api-token` header for access. This token is securely loaded from `.env` using Vite's environment system.

---

## 🧩 Functional Assumptions

### 🗂 Package Display
- Only **active packages** (not in `DELIVERED` or `CANCELLED`) are shown in the dashboard.
- "Active" means packages updated within the last **24 hours**.

### 🛠 Real-Time Updates
- Real-time updates use **`setInterval()` polling every 5 seconds** to refetch the list of active packages.
- Polling is preferred over WebSocket here due to lower complexity and no persistent connection requirements in Vercel.

### 🚩 Stuck Package Alerts
- Packages flagged as `STUCK` (due to backend logic) are shown with a **red badge** in the UI.
- Alert counts are fetched separately and shown in the dashboard header.
- Only one alert is displayed per package until it progresses again, matching the backend rule.

### 📍 Location & ETA
- If `lat` and `lon` are available, they're shown as plain text.
- Uses the browser’s Geolocation API to automatically fetch the user’s current latitude and longitudewith precision.
- If `ETA` is not provided, a dash (—) is shown in its place.

### 📦 Package History Modal
- Clicking a package opens a modal that shows all events for that package, in **chronological order**.
- Time is displayed using "time ago" format for quick readability.

### 📝 Courier Update Form
- A simple form is available on a separate page to simulate courier-side event submission.
- The form allows status, lat/lon, ETA, and note entry.
- **The `timestamp` field is generated automatically by current time and not user-editable on the form,** ensuring data consistency and preventing manipulation. This decision was made to uphold trust in package reporting and to avoid any potential misuse or backdated entries by courier staff.

---

## 🧪 Testing & Demo Assumptions

- No automated tests are included due to time constraints, but the code is modular and manually tested.
- Component structure is maintained for readability and reusability.
- Form uses optimistic UI and basic error logging to the console for failed submissions.

---

## 📦 Deployment Assumptions

- The app is deployed on **Vercel**, with base API URL set using `VITE_API_BASE_URL` in `.env`.
- It is assumed that backend deployment is **publicly accessible** and stable.
- Environment variable (`.env`) must be configured during deployment with the correct API endpoint.

---

## 🚫 Limitations & Trade-offs

- ❌ Real-time updates use polling every 5 seconds instead of WebSocket or SSE.
- ❌ Lacks caching for better resilience.
- ❌ No comprehensive search/filter UI yet—basic filtering only.
- ❌ No authentication or role management implemented on frontend.

---

## 🔜 Future Improvements

- Replace polling with WebSocket for true real-time streaming.
- Add interactive map pins for package location.
- Route protection with login/auth for different roles.
- Mobile responsiveness and PWA support.

---

**Author:** [mdtoufique](https://github.com/mdtoufique)  
**Challenge:** Aamira Courier Package Tracker – Frontend  
