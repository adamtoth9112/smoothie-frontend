# Lilacode Smoothie

### Backend

Spring boot application with Security, Web and JPA functionalities (http://localhost:8080/)

#### Authentication

- Uses basic authentication with simple hardcoded user
- User can log in with username password (adam/adam)
- BasicAuthController returns AuthenticationBean on successful authentication

#### API

- Users can access (GET request) /api/v1/smoothies without authentication
- Authenticated user can use endpoint (PUT request) /api/v1/smoothies to save refreshed list to server
- Frontend app (http://localhost:4200) added as hardcoded CORS origin

#### DB

- Smoothies stored in inMemory H2 database
- Initial sample data inserted on startup
- API uses Repository interfaces to collect smoothies and ingredients
- Authenticated user can save updated list through REST API (currently only the smoothies, without ingredients)

### Frontend

Angular application with security features (http://localhost:4200)

#### Public view

- Users can access list of smoothies (landing page, /smoothies)
- Users can select a smoothie to see details and ingredients (/smoothies/{id})
- Users can log in with login button

#### Admin view

- Admin has public user rights
- Admin can edit/delete smoothies
- Admin can edit/delete smoothie ingredients
- Admin can create new smoothie
- Admin can create new ingredients
- Admin can save the edited list with Save to server button (currently only the smoothies, without ingredients)

#### Authentication

- Login (/login) with simple username/password (adam/adam)
- Logout (menu button) for authenticated user
- Admin pages guarded by AuthGuard
