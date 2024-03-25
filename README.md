# Carpool Backend

## Feature Set

The Carpool Application is designed to facilitate ride-sharing between drivers and riders. Key features of the application include:

- User management: Users can sign up and log in as either administrators or normal users (drivers/riders).
- Ride creation: Drivers can create rides by specifying the source and destination coordinates.
- Ride search: Riders can search for available rides within a 20-point radius of their coordinates and destination.
- Ride booking: Riders can book available rides and cancel booked rides.
- Admin functionality: Administrators can view all rides and their relevant information.

## Endpoints

### User Management
- `POST /users/signup`: Sign up a new user.
- `POST /users/login`: Log in an existing user.

### Ride Management
- `POST /rides`: Create a new ride (for drivers).
- `GET /rides`: Get all rides (for admins).
- `GET /rides/search`: Search for available rides (for riders).
- `POST /rides/{rideId}/book`: Book a ride (for riders).
- `DELETE /rides/{rideId}/cancel`: Cancel a booked ride (for riders).

### Booking Management
- `GET /bookings`: Get the list of bookings (for riders).
- `PATCH /bookings/{bookingId}/cancel`: Cancel a booked ride (for riders).

### Location Selection
- `GET /locations`: Get a list of locations with hardcoded coordinates for quick selection.

## Import Postman Collection

To interact with the Carpool Application's endpoints, import the provided Postman collection file `Carpool-Application.postman_collection` into Postman. This collection contains pre-configured requests for each endpoint along with example payloads.

## Environment Variables

The application uses the following environment variables:

- `DATABASE_URL`: Connection URL for the PostgreSQL database.
  Example: `DATABASE_URL="postgresql://username:password@localhost:port/carpool?schema=public"`
- `JWT_SECRET`: Secret key for JWT token generation.
  Example: `JWT_SECRET='some-secret'`

## Running the Server and Database

To run the server and database:

1. Clone the repository to your local machine.
2. Install dependencies by running `npm install`.
3. Set up the database by running `npm run database`. It will spin up a docker container for Postgres and apply migrations
4. Start the server by running `npm start`.
5. The server should now be running and accessible at port: 3000.

Ensure that you have Node.js and npm installed on your machine before proceeding with the above steps.
