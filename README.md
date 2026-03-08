Hotel Reservation Management System
The Hotel Reservation Management System is a full-stack web application developed using the MERN Stack (MongoDB, Express.js, React.js, Node.js).
This platform helps hotel staff efficiently manage guest reservations by allowing them to create, view, update, and delete reservation records. The system stores essential booking information such as guest details, room type, booking dates, payment status, and remarks. It also allows staff to search and filter reservations and includes additional smart features like Reservation Status Management and Payment Priority Management to improve operational efficiency.

Technologies Used
Frontend
* React.js
* React Router
* Axios
* Tailwind CSS
* DaisyUI
* React Hot Toast

Backend
* Node.js
* Express.js
* MongoDB
* Mongoose

Development Tools
* VS Code
* Postman
* Git & GitHub

Features
Reservation Management
* Add a new reservation
* Edit reservation details
* Delete reservation
* View reservation cards on homepage

Search and Filtering
* Search reservations by guest name, contact number
* Filter reservations by room type
* Filter reservations by payment status (Paid / Pending)

User Interface
* Responsive design using Tailwind CSS
* Clean UI with DaisyUI components
* Interactive reservation cards with hover effects

Notifications
* Toast notifications for:
* Reservation creation
* Reservation update
* Reservation deletion

Additional Features
Reservation Status Management

This feature automatically determines the current status of a reservation by comparing today's date with the check-in and check-out dates.
The system categorizes reservations into three states:
* Upcoming
  When today's date is before the check-in date
* Ongoing
  When today's date is between the check-in and check-out dates
* Completed
  When today's date is after the check-out date

Payment Priority Management
This feature helps hotel staff quickly identify customers whose payment is still pending.
* Each reservation has a payment status:
* Pending
* Paid

Project Structure

Hotel-Reservation-System
│
├── backend
│   ├── controllers
│   │   └── reservationController.js
│   │
│   ├── models
│   │   └── reservationModel.js
│   │
│   ├── routes
│   │   └── reservationRoutes.js
│   │
│   ├── config
│   │   └── db.js
│   │
│   ├── server.js
│   └── package.json
│
├── frontend
│ └── src
│
│   ├── components
│   │     ├── ReservationCard.jsx
│   │     ├── ReservationNotFound.jsx
│   │     └── Navbar.jsx
│   │
│   ├── pages
│   │     ├── ReservationDetailPage.jsx
│   │     ├── CreatePage.jsx
│   │     └── HomePage.jsx
│   │
│   ├── lib
│   │     ├── axios.js
│   │     └── utils.js
│   │
│   ├── App.jsx
│   └── main.jsx
│
└── README.md

Database Schema
Reservation Model
Field| Type| Description
guestName| String| Name of the guest
membersCount| Number| Number of guests staying
roomType| String| Type of room (Single / Double / Deluxe)
checkIn| Date| Check-in date
checkOut| Date| Check-out date
paymentStatus| String| Payment status (Pending / Paid)
contactNumber| String| Guest contact number
remarks| String| Additional notes or requests

Installation and Setup
Backend Setup
cd backend
npm install
npm run dev

Frontend Setup 
cd frontend
npm install
npm run dev

API Endpoints
Method| Endpoint| Description
GET| /reservations| Get all reservations
GET| /reservations/:id| Get reservation by ID
POST| /reservations| Create reservation
PUT| /reservations/:id| Update reservation
DELETE| /reservations/:id| Delete reservation

Conclusion
The Hotel Reservation Management System demonstrates the implementation of a full-stack MERN application with complete CRUD functionality, RESTful APIs, and modern frontend design.
