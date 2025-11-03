Synergia Event Booking API

A simple Node.js + Express.js API for managing events and participant bookings.

Features

Create, view, update, and delete events

Create, view, update, and delete bookings

Validates input and handles errors gracefully

 Setup
git clone https://github.com/Sinchana7026/synergia-event-booking-api.git
cd synergia-event-booking-api
npm install
node server.js


Server runs at: http://localhost:3000

 API Routes
🗓 Events
Method	Endpoint	Description
GET	/events	Get all events
POST	/events/add	Add new event
GET	/event/:id	Get event by ID
PUT	/event/:id	Update event
DELETE	/event/:id	Delete event

Sample JSON:

{
  "name": "Tech Fest 2025",
  "date": "2025-11-10",
  "location": "Mangalore",
  "description": "Annual tech event"
}

 Bookings
Method	Endpoint	        Description
GET	/api/bookings	        Get all bookings
POST	/api/bookings	      Create booking
GET	/api/bookings/:id	    Get booking by ID
PUT	/api/bookings/:id	    Update booking
DELETE	/api/bookings/:id	Cancel booking
