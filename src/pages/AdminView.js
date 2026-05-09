import React, { useState } from "react";
import { addEvent } from "../appwrite/config";
import "./AdminView.css";

function AdminView() {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    venue: "",
    description: "",
    type: "Hackathon",
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess]       = useState(false);
  const [error, setError]           = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.venue) {
      setError("Please fill in Title, Date, and Venue.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await addEvent(formData);
      setFormData({ title: "", date: "", venue: "", description: "", type: "Hackathon" });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError("Failed to add event. Check your Appwrite connection.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="admin-view">
      <p className="admin-hint">
        Fill in the form below to add a new event. It will instantly appear in the Student Timeline.
      </p>

      {success && (
        <div className="alert alert-success">
          ✅ Event added successfully! Switch to Student View to see it.
        </div>
      )}

      {error && (
        <div className="alert alert-error">
          ⚠️ {error}
        </div>
      )}

      <div className="form-card">
        <div className="form-group">
          <label htmlFor="title">Event title *</label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Smart India Hackathon 2025"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="type">Category *</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="Hackathon">Hackathon</option>
              <option value="Workshop">Workshop</option>
              <option value="Cultural Fest">Cultural Fest</option>
              <option value="Seminar">Seminar</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="date">Date *</label>
            <input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="venue">Venue *</label>
          <input
            id="venue"
            name="venue"
            type="text"
            value={formData.venue}
            onChange={handleChange}
            placeholder="e.g. Main Auditorium, Block B"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Brief description of the event (optional)"
            rows={4}
          />
        </div>

        <button
          className="submit-btn"
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? "Adding event..." : "Add event to timeline"}
        </button>
      </div>
    </div>
  );
}

export default AdminView;