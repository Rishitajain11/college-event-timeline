# 🎓 College Event Timeline

A full-stack web application for managing and displaying college events — built with **React.js** and **Appwrite** as the cloud backend database.

---

## 📸 Project Overview

The College Event Timeline helps students stay updated with upcoming college events like Hackathons, Workshops, and Cultural Fests. Admins can add new events through a dedicated form, and students can view all events sorted chronologically with automatic status indicators.

---

## ✨ Features

- 📅 **Student View** — See all events sorted chronologically (soonest first)
- ➕ **Admin View** — Add new events with a clean, simple form
- 🏷️ **Category Tags** — Events tagged as Hackathon, Workshop, Cultural Fest, Seminar
- 🔴 **Status Indicators** — Events automatically marked as Upcoming / This Week / Today / Completed
- 🔘 **Filter System** — Filter events by category or status
- ⚫ **Completed Events** — Past events are automatically greyed out
- ☁️ **Live Database** — All events stored in and fetched from Appwrite Cloud in real time

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React.js** | Frontend UI and component-based structure |
| **Appwrite** | Backend-as-a-Service (cloud database) |
| **JavaScript (ES6+)** | Logic, date handling, sorting |
| **CSS3** | Styling and responsive layout |
| **Git & GitHub** | Version control and project submission |

---

## 📁 Project Structure

```
college-event-timeline/
├── public/
├── src/
│   ├── appwrite/
│   │   └── config.js          ← Appwrite connection + database functions
│   ├── components/
│   │   ├── EventCard.js       ← Reusable event card component
│   │   └── EventCard.css
│   ├── pages/
│   │   ├── StudentView.js     ← Timeline page for students
│   │   ├── StudentView.css
│   │   ├── AdminView.js       ← Form page for admins to add events
│   │   └── AdminView.css
│   ├── App.js                 ← Root component with tab navigation
│   └── App.css                ← Global styles
├── .env.example               ← Environment variable template
├── .gitignore
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/Rishitajain11/college-event-timeline.git
cd college-event-timeline
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up Appwrite
- Create a free account at [cloud.appwrite.io](https://cloud.appwrite.io)
- Create a new project
- Create a Database called `EventsDB`
- Create a Collection called `events` with these attributes:

| Attribute | Type | Size | Required |
|-----------|------|------|----------|
| title | String | 100 | Yes |
| date | String | 20 | Yes |
| venue | String | 200 | Yes |
| description | String | 1000 | No |
| type | String | 50 | Yes |

- Set Collection Permissions → Role: **Any** → Enable **Read** and **Create**
- Add a **Web Platform** with hostname: `localhost`

### 4. Configure environment variables
Create a `.env` file in the root folder:
```env
REACT_APP_APPWRITE_ENDPOINT=https://sgp.cloud.appwrite.io/v1
REACT_APP_PROJECT_ID=69fb06a8001ead5e0fea
REACT_APP_DATABASE_ID=databaseID
REACT_APP_COLLECTION_ID=CollectionTableID
```

### 5. Run the app
```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗄️ Database Schema

**Collection: `events`**

| Field | Type | Description |
|-------|------|-------------|
| title | String | Name of the event |
| date | String | Date in YYYY-MM-DD format |
| venue | String | Location of the event |
| description | String | Brief description (optional) |
| type | String | Category: Hackathon / Workshop / Cultural Fest / Seminar / Other |

---

## 💡 Key Concepts Used

- **React Hooks** — `useState` for managing data, `useEffect` for fetching events on page load
- **Component-based architecture** — Reusable `EventCard` component used for every event
- **Appwrite SDK** — `databases.listDocuments()` to fetch, `databases.createDocument()` to add events
- **Chronological sorting** — `Query.orderAsc("date")` ensures soonest events appear first
- **Dynamic status detection** — JavaScript `Date` comparison automatically detects past events

---

## 🔐 Security

- Secret credentials stored in `.env` file
- `.env` is listed in `.gitignore` and never pushed to GitHub
- `.env.example` provided as a safe template for setup

---

## 👩‍💻 Made By

**Rishita Jain**

Project submitted as part of college coursework.

---

## 📄 License

This project is open source and available for educational purposes.