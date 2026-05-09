import React from "react";
import "./EventCard.css";

function getStatus(dateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const eventDate = new Date(dateStr + "T00:00:00");
  const diffDays = Math.floor((eventDate - today) / (1000 * 60 * 60 * 24));
  if (diffDays < 0)   return "completed";
  if (diffDays === 0) return "today";
  if (diffDays <= 7)  return "soon";
  return "upcoming";
}

function formatDate(dateStr) {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getDaysLabel(dateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const eventDate = new Date(dateStr + "T00:00:00");
  const diff = Math.floor((eventDate - today) / (1000 * 60 * 60 * 24));
  if (diff === 0) return "Today!";
  if (diff > 0)   return `In ${diff} day${diff !== 1 ? "s" : ""}`;
  return `${Math.abs(diff)} day${Math.abs(diff) !== 1 ? "s" : ""} ago`;
}

const TYPE_COLORS = {
  Hackathon:       "tag-hackathon",
  Workshop:        "tag-workshop",
  "Cultural Fest": "tag-cultural",
  Seminar:         "tag-seminar",
  Other:           "tag-other",
};

function EventCard({ event }) {
  const status = getStatus(event.date);
  const isCompleted = status === "completed";

  return (
    <div className={`event-card ${isCompleted ? "completed" : ""}`}>
      <div className="card-top">
        <h3 className="card-title">{event.title}</h3>
        <div className="card-badges">
          <span className={`type-tag ${TYPE_COLORS[event.type] || "tag-other"}`}>
            {event.type}
          </span>
          <span className={`status-badge status-${status}`}>
            {status === "completed" ? "Completed"
             : status === "today"   ? "Today"
             : status === "soon"    ? "This week"
             : "Upcoming"}
          </span>
        </div>
      </div>

      <div className="card-meta">
        <span>📅 {formatDate(event.date)}</span>
        <span>⏰ {getDaysLabel(event.date)}</span>
        <span>📍 {event.venue}</span>
      </div>

      {event.description && (
        <p className="card-desc">{event.description}</p>
      )}
    </div>
  );
}

export default EventCard;