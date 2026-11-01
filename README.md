# Lab 1: Node.js and Express server

**Pinisetti Sai Babu** • **252U1R1192** • **Section: S-019**  
**Course:** Backend Development Fundamentals (Year II Term II) • Aurora  

---

## Live link
*Not applicable (Local development lab)*  
**GitHub Repository:** [https://github.com/Twilight-X9/backend-lab1](https://github.com/Twilight-X9/backend-lab1)

---

## Objective
I made a small server with Node.js first, then rebuilt it with Express. It has routes for a welcome message, my details, the current time, and unknown paths.

---

## How to Run

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended; developed with Node v26)
- npm (v9+; developed with npm v11)

### 1. Installation
Navigate into the `lab-01` directory and install dependencies:
```bash
cd lab-01
npm install
```

### 2. Environment Variables
No required external environment variables. Optionally, customize the listening port:
```env
PORT=3000
```

### 3. Execution Commands
* **Start Primary Express Server:**
  ```bash
  npm start
  ```
  Server runs at: `http://localhost:3000`

* **Start Vanilla Node.js HTTP Server (Task 3 Demonstration):**
  ```bash
  npm run start:vanilla
  ```
  Server runs at: `http://localhost:3000`

* **Development Mode (Auto-reload on file change):**
  ```bash
  npm run dev
  ```

---

## Endpoints Table

| Method | Endpoint | Description | Status Code | Expected Response Type |
| :--- | :--- | :--- | :---: | :--- |
| `GET` | `/` | Returns a friendly welcome message. | `200 OK` | `text/html; charset=utf-8` |
| `GET` | `/about` | Returns student details (name, roll number, section). | `200 OK` | `application/json` |
| `GET` | `/time` | Returns the server's current date and time using `new Date()`. | `200 OK` | `application/json` |
| `ALL` | `/*` (Unknown) | Catch-all handler for undefined routes. | `404 Not Found` | `application/json` |

---

## Explanation of `package.json` Fields

When running `npm init -y`, Node generates a `package.json` manifest. Here is what each field represents:

1. **`name`**: The unique identifier/name of the project or package (must be lowercase and URL-friendly).
2. **`version`**: The current semantic version of the application (`MAJOR.MINOR.PATCH`, e.g., `1.0.0`).
3. **`description`**: A short summary explaining what the project does.
4. **`main`**: The primary entry-point file of the application (e.g., `server.js`). When imported as a module, this file is loaded first.
5. **`scripts`**: An object containing terminal command aliases (e.g., `npm start` runs `node server.js`).
6. **`keywords`**: An array of search terms to help index and categorize the package on npm.
7. **`author`**: The creator/maintainer of the project (`Pinisetti Sai Babu`).
8. **`license`**: The legal open-source license governing code usage (e.g., `ISC` or `MIT`).
9. **`dependencies`**: A list of third-party libraries installed for the application to function in production (e.g., `express`).

---

## Screenshots

### 1. Route: `GET /` (Welcome Message)
![Route GET /](screenshots/Screenshot%202026-10-31%20143524.png)

---

### 2. Route: `GET /about` (Student Profile)
![Route GET /about](screenshots/Screenshot%202026-10-31%20143548.png)

---

### 3. Route: `GET /time` (Current Date and Time)
![Route GET /time](screenshots/Screenshot%202026-10-31%20143616.png)

---

### 4. Route: Unknown Path (404 Not Found Handler)
![Route 404 Not Found](screenshots/Screenshot%202026-10-31%20143834.png)

---

## Problems I faced

1. **Port 3000 Dual-Stack / Address Conflict (`EADDRINUSE`)**:
   * *Problem:* When attempting to start the server on port 3000, Node threw `listen EADDRINUSE: address already in use :::3000` because a previous background Vite development process was still running on port 3000.
   * *Solution:* Identified the process holding the port using `Get-NetTCPConnection` and gracefully terminated the conflicting background process. Additionally, designed `server.js` with `const PORT = process.env.PORT || 3000` so the server can easily bind to an alternate port if needed.

2. **IPv6 vs IPv4 Localhost Resolution**:
   * *Problem:* On Windows 11, `localhost` resolves to the IPv6 loopback address `::1` by default. When two separate processes bind to IPv4 (`127.0.0.1`) and IPv6 (`::1`), browser requests can mistakenly route to the wrong process.
   * *Solution:* Ensured the server cleanly binds across all network interfaces and verified route responses using explicit automated HTTP test requests.

3. **Preventing `node_modules` Git Pollution**:
   * *Problem:* Running `npm install express` generates dozens of folders inside `node_modules/`. Committing these causes huge repository bloat.
   * *Solution:* Created `.gitignore` containing `node_modules/` and `.env` before installing dependencies, ensuring the repository remains clean and adheres to course submission guidelines.

