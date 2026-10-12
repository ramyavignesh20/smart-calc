# Smart Calculator Application

Full-stack calculator application:
- Frontend: React + Vite + Material UI
- Backend: Spring Boot 3.5.5 + Java 17
- Database: MySQL
- Theme: Lavender with blue accents
- Languages: English + Tamil
- Features: BMI, Math, Trigonometry (sine/cosine/tangent and reciprocal functions in degrees), Interest, Discount, Roots, Sq Feet/Cent, Length, Area, Calculation History
- Calculator history is saved to the signed-in user's account.
- Calculator number fields use a mobile-friendly numeric keypad.
- Every page includes a footer with contact details.

## Run Backend

1. Create MySQL database by running `database/calculator_db.sql`.
2. Edit `backend/src/main/resources/application.properties` and set your MySQL password.
3. Open a terminal in `backend`:
   mvn spring-boot:run

Backend runs at:
http://localhost:8080

## Run Frontend

Open another terminal in `frontend`:

npm install
npm run dev

Frontend:
http://localhost:5173

## API examples

GET /api/calculator/add?a=10&b=5
GET /api/calculator/bmi?weight=65&height=153
GET /api/calculator/sqfeet-to-cent?value=1000
GET /api/calculator/cent-to-sqfeet?value=2
GET /api/calculator/simple-interest?principal=10000&rate=7&time=2
GET /api/calculator/discount?price=1000&percent=10
GET /api/calculator/square-root?value=25
GET /api/calculator/cube-root?value=27
GET /api/calculator/nth-root?value=81&root=4

The current starter includes registration/login, JWT authentication, calculator APIs, history storage, dashboard, settings and English/Tamil switching.
