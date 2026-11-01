# Lab 1: Node.js and Express server

**Pinisetti Sai Babu** • **252U1R1192** • **Section: S-019**  
**Course:** Backend Development Fundamentals (Year II Term II) • Aurora  
**Faculty:** Joel Prashanth D  

---

## Live link
*Not applicable (Local development lab)*  
**GitHub Repository:** [https://github.com/Twilight-X9/backend-lab1](https://github.com/Twilight-X9/backend-lab1)

---

## Objective
Set up a clean Node.js backend project, explore package management with `npm`, and build a web server first using the built-in `http` module and subsequently using the `Express` web framework.

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
  # or directly: node server.js
  ```
  Server runs at: `http://localhost:3000`

* **Start Vanilla Node.js HTTP Server (Task 3 Demonstration):**
  ```bash
  npm run start:vanilla
  # or directly: node vanilla-server.js
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

## Viva Preparation Questions & Answers

### Q1: What is the difference between `package.json` and `node_modules`?
* **`package.json`**: A lightweight metadata manifest file (typically only a few kilobytes). It records the project configuration, script aliases, and names/versions of required dependencies. It is committed to Git.
* **`node_modules`**: The directory that stores the actual installed code and compiled binary files for all packages and their transitive dependencies. It is often very large (hundreds of megabytes) and should **never** be committed to Git (always ignored via `.gitignore`). `npm install` reconstructs `node_modules` from `package.json` at any time.

### Q2: What does `app.listen()` do?
* `app.listen(PORT, [callback])` binds the Express application to a specific network port (e.g., 3000) on the host machine and starts an underlying HTTP server that listens for incoming TCP network requests. The callback function executes as soon as the server has successfully started listening.

### Q3: What do `request` (`req`) and `response` (`res`) represent?
* **`req` (`http.IncomingMessage`)**: Represents the incoming HTTP request from the client (browser/Postman). It contains information sent by the client, such as URL path (`req.url`), HTTP method (`req.method`), headers (`req.headers`), query parameters (`req.query`), and body data (`req.body`).
* **`res` (`http.ServerResponse`)**: Represents the outgoing HTTP response being prepared by the server. It provides helper methods to send data back to the client, such as `res.status()`, `res.send()`, and `res.json()`.

---

## Notes: Problems Faced and Solutions

1. **Port 3000 Dual-Stack / Address Conflict (`EADDRINUSE`)**:
   * *Problem:* When attempting to start the server on port 3000, Node threw `listen EADDRINUSE: address already in use :::3000` because a previous background Vite development process was still running on port 3000.
   * *Solution:* Identified the process holding the port using `Get-NetTCPConnection` and gracefully terminated the conflicting background process. Additionally, designed `server.js` with `const PORT = process.env.PORT || 3000` so the server can easily bind to an alternate port if needed.

2. **IPv6 vs IPv4 Localhost Resolution**:
   * *Problem:* On Windows 11, `localhost` resolves to the IPv6 loopback address `::1` by default. When two separate processes bind to IPv4 (`127.0.0.1`) and IPv6 (`::1`), browser requests can mistakenly route to the wrong process.
   * *Solution:* Ensured the server cleanly binds across all network interfaces and verified route responses using explicit automated HTTP test requests.

3. **Preventing `node_modules` Git Pollution**:
   * *Problem:* Running `npm install express` generates dozens of folders inside `node_modules/`. Committing these causes huge repository bloat.
   * *Solution:* Created `.gitignore` containing `node_modules/` and `.env` before installing dependencies, ensuring the repository remains clean and adheres to course submission guidelines.

