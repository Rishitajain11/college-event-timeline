import { Client, Databases, ID, Query } from "appwrite";

// This file connects your React app to your Appwrite database
// All your secret IDs come from the .env file — never hardcode them here

const client = new Client();

client
  .setEndpoint(process.env.REACT_APP_APPWRITE_ENDPOINT) // e.g. https://cloud.appwrite.io/v1
  .setProject(process.env.REACT_APP_PROJECT_ID);        // Your Project ID from Appwrite dashboard

export const databases = new Databases(client);

// These are the IDs of your specific database and collection
export const DATABASE_ID  = process.env.REACT_APP_DATABASE_ID;
export const COLLECTION_ID = process.env.REACT_APP_COLLECTION_ID;

// ─── DATABASE FUNCTIONS ────────────────────────────────────────────────────

// Fetch ALL events from Appwrite, sorted by date (soonest first)
export async function getAllEvents() {
  const response = await databases.listDocuments(
    DATABASE_ID,
    COLLECTION_ID,
    [Query.orderAsc("date")] // sorts chronologically — soonest event first
  );
  return response.documents; // returns an array of event objects
}

// Add a new event to the database (used by Admin view)
export async function addEvent(eventData) {
  const response = await databases.createDocument(
    DATABASE_ID,
    COLLECTION_ID,
    ID.unique(), // Appwrite generates a unique ID automatically
    eventData    // the object with title, date, venue, description, type
  );
  return response;
}