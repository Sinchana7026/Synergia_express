const express = require("express");
const app = express();
app.use(express.json());


let events = [];
let bookings = [];


let eventId = 1;
let bookingId = 1;


app.get("/events", (req, res) => {
  res.json(events);
});


app.post("/events/add", (req, res) => {
  const { name, date, location, description } = req.body;

  if (!name || !date || !location) {
    return res.status(400).json({ message: "Name, date, and location are required" });
  }

  const newEvent = {
    id: eventId++,
    name,
    date,
    location,
    description: description || "No description provided",
  };

  events.push(newEvent);
  res.status(201).json({ message: "Event created successfully", event: newEvent });
});


app.get("/event/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const event = events.find(e => e.id === id);
  if (!event) return res.status(404).json({ message: "Event not found" });
  res.json(event);
});


app.put("/event/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const event = events.find(e => e.id === id);
  if (!event) return res.status(404).json({ message: "Event not found" });

  const { name, date, location, description } = req.body;
  if (name) event.name = name;
  if (date) event.date = date;
  if (location) event.location = location;
  if (description) event.description = description;

  res.json({ message: "Event updated successfully", event });
});


app.delete("/event/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = events.findIndex(e => e.id === id);
  if (index === -1) return res.status(404).json({ message: "Event not found" });

  const deletedEvent = events.splice(index, 1);
  res.json({ message: "Event cancelled successfully", deletedEvent });
});


app.get("/api/bookings", (req, res) => {
  res.json(bookings);
});


app.post("/api/bookings", (req, res) => {
  const { eventId: bookedEventId, participantName, email } = req.body;

  if (!bookedEventId || !participantName || !email) {
    return res.status(400).json({ message: "Event ID, participant name, and email are required" });
  }

  const event = events.find(e => e.id === bookedEventId);
  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  const newBooking = {
    id: bookingId++,
    eventId: bookedEventId,
    participantName,
    email,
    bookingDate: new Date().toISOString(),
  };

  bookings.push(newBooking);
  
  res.status(201).json({ message: "Booking created successfully", booking: newBooking });
});


app.get("/api/bookings/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const booking = bookings.find(b => b.id === id);
  if (!booking) return res.status(404).json({ message: "Booking not found" });
  res.json(booking);
});


app.put("/api/bookings/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const booking = bookings.find(b => b.id === id);
  if (!booking) return res.status(404).json({ message: "Booking not found" });

  const { participantName, email } = req.body;
  if (participantName) booking.participantName = participantName;
  if (email) booking.email = email;

  res.json({ message: "Booking updated successfully", booking });
});


app.delete("/api/bookings/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = bookings.findIndex(b => b.id === id);
  if (index === -1) return res.status(404).json({ message: "Booking not found" });

  const deletedBooking = bookings.splice(index, 1);
  res.json({ message: "Booking cancelled successfully", deletedBooking });
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Synergia Event Booking API running on http://localhost:${PORT}`);
});