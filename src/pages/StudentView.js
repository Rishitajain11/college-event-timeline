import React, { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import { getAllEvents } from "../appwrite/config";
import "./StudentView.css";

function StudentView() {
  const [events, setEvents]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [filter, setFilter]   = useState("all");

  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await getAllEvents();
        setEvents(data);
      } catch (err) {
        setError("Could not load events. Check your Appwrite connection.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date + "T00:00:00");
    const isPast = eventDate < today;
    if (filter === "upcoming")     return !isPast;
    if (filter === "completed")    return isPast;
    if (filter === "Hackathon")    return event.type === "Hackathon";
    if (filter === "Workshop")     return event.type === "Workshop";
    if (filter === "Cultural Fest") return event.type === "Cultural Fest";
    return true;
  });

  const upcomingEvents  = filteredEvents.filter(e => new Date(e.date + "T00:00:00") >= today);
  const completedEvents = filteredEvents.filter(e => new Date(e.date + "T00:00:00") <  today);

  return (
    <div className="student-view">
      <div className="filter-bar">
        {["all", "upcoming", "completed", "Hackathon", "Workshop", "Cultural Fest"].map((f) => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {loading && <p className="state-msg">Loading events...</p>}
      {error   && <p className="state-msg error">{error}</p>}
      {!loading && !error && filteredEvents.length === 0 && (
        <p className="state-msg">No events found for this filter.</p>
      )}

      {!loading && upcomingEvents.length > 0 && (
        <div className="section">
          <h2 className="section-label">
            Upcoming <span className="count">{upcomingEvents.length}</span>
          </h2>
          {upcomingEvents.map((event) => (
            <EventCard key={event.$id} event={event} />
          ))}
        </div>
      )}

      {!loading && completedEvents.length > 0 && (
        <div className="section">
          <h2 className="section-label">
            Completed <span className="count">{completedEvents.length}</span>
          </h2>
          {completedEvents.map((event) => (
            <EventCard key={event.$id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}

export default StudentView;