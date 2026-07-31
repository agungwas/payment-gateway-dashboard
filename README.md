# Payment Gateway Dashboard (Fullstack App)

**Tech Stack (Backend):**
- Go v1.25.5+
- Framework: Chi Router
- Architecture: Modular Clean Architecture
- Database: SQLite3
- Authentication: JWT (JSON Web Tokens)
- Documentation: OpenAPI (Swagger)

**Tech Stack (Frontend):**
- Framework: Vue 3 + Vite
- Language: TypeScript
- State Management: Pinia
- UI Library: Ant Design Vue
- Architecture: Feature-Sliced Design (FSD)
- Testing: Vitest + Vue Test Utils

**Ensure you have the following installed on your machine:**
```bash
go version go1.25.5+ # or higher
node v24.13.1+       # or higher
make
```

**Install the required dependencies and start the backend server:**
```bash
cd backend
cp env.sample .env
make dep
make gen-secret
make run
```
The backend server will start on http://localhost:8080.

**In a new terminal window, install dependencies and start the frontend development server:**
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```
The frontend will be accessible at http://localhost:5173.

`VITE_API_URL` in `.env` sets the backend API base URL (defaults to `http://localhost:8080` if unset).

**Or you can easily use make command**
```bash
make run-dev
```

**Build the backend for production:**
```bash
cd backend
go build -o server main.go
./server
```

**Build the backend Docker image:**
```bash
make docker-build-be
```

**Build the frontend for production:**
```bash
cd frontend
npm run build
npm run preview
```

**Build the frontend Docker image:**
```bash
make docker-build-fe
```

**Docker Compose**
```bash
# Start all services (Backend on port 8080, Frontend on port 5173)
make docker-up
make docker-down
```

**Run tests:**
```bash
# Backend unit tests
cd backend
go test ./...

# Frontend unit tests
cd frontend
npm run test
```

**To check the OpenAPI/Swagger documentation, visit this URL after running the backend server:**
```bash
http://localhost:8080/docs/index.html
```

**Login to the frontend application by visiting:**
```bash
http://localhost:5173/login
# email: cs@test.com / operation@test.com
# password: password
```

Note: The database seeder runs automatically when the backend starts.

Further Documentation:
- See Backend Documentation: backend/README.md
- See Frontend Documentation: frontend/README.md
