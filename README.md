# Spark Khoj - AI-Powered Sports Talent Identification Platform

## Project Summary

Spark Khoj is a full-stack MERN (MongoDB, Express, React, Node.js) web application designed to identify, nurture, and connect sports talent. It provides a platform where athletes can submit performance videos for AI-powered analysis, build their profiles, and gain visibility. The application fosters a competitive ecosystem with dynamic leaderboards and facilitates connections with coaches and sponsors through an integrated messaging system.

---

## Core Features

-   **Full User Authentication**: Secure user registration and login using JWT (JSON Web Tokens) for session management and `bcryptjs` for password hashing.
-   **Persistent Cloud/Local Database**: User profiles, scores, and all application data are stored in a MongoDB database. The setup supports both a local MongoDB server and a live online database via MongoDB Atlas.
-   **AI-Powered Video Analysis**: A guided, multi-step flow for athletes to upload fitness and sport-specific videos. The AI is used to provide AI-generated feedback.
-   **Dynamic User Profiles**: Users create detailed profiles specifying their role (Athlete, Coach, Sponsor), sport, and location. Profiles are editable with profile picture upload support.
-   **Real-time Leaderboards**: View rankings at the District, State, and National levels, which are dynamically sorted by athlete scores.
-   **In-App Messaging**: A complete chat interface for users to engage in one-on-one conversations with features like copying and deleting messages.

---

## Tech Stack

-   **Frontend (Client)**:
    -   **Framework**: React with TypeScript
    -   **Styling**: Tailwind CSS
    -   **AI Integration**: Currently build AI model but on this worked Gemini API key (`API_Key`)
-   **Backend (Server)**:
    -   **Runtime**: Node.js
    -   **Framework**: Express.js
    -   **Database**: MongoDB with Mongoose
    -   **Authentication**: JSON Web Tokens (JWT) & bcryptjs

---

## Prerequisites

Before you begin, ensure you have the following software installed:

1.  **Node.js & npm**: [Download LTS version](https://nodejs.org/)
2.  **Git**: [Download here](https://git-scm.com/)
3.  **MongoDB Community Server**: [Download here](https://www.mongodb.com/try/download/community)
    -   **Crucially, ensure you install MongoDB Compass** during setup. It is the easiest way to manage your database.
4.  **VS Code**: [Download here](https://code.visualstudio.com/)
    -   **Recommended Extension**: [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) for running the frontend.

---

## Final Setup Guide: Step-by-Step

### Step 1: Get the Code

Clone the project repository to your local machine using Git.

```bash
git clone <your-repository-url>
cd spark-khoj
```

### Step 2: Backend Server Setup (`/server`)

1.  **Navigate to the server directory:**
    ```bash
    cd server
    ```

2.  **Install Dependencies:**
    Run this command to install all required backend packages.
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a new file named `.env` in the `server/` directory. This file stores your secret keys and database connection string. Copy the content below into it.

    **File: `server/.env`**
    ```
    PORT=5001
    MONGO_URI=mongodb://localhost:27017/sparkkhoj
    JWT_SECRET=this_is_a_very_long_and_secret_key_that_you_should_change
    ```

    > #### **Using a Live Online Database (MongoDB Atlas - Recommended)**
    >
    > 1.  [Create a free account on MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register).
    > 2.  Create a new **Free Tier (M0) Cluster**.
    > 3.  Under **Database Access**, create a database user with a secure password.
    > 4.  Under **Network Access**, click "Add IP Address" and select **"Allow Access from Anywhere"** (`0.0.0.0/0`).
    > 5.  Go back to your database cluster, click **"Connect"** -> **"Drivers"**, and copy the connection string.
    > 6.  **Replace the `MONGO_URI` in your `.env` file with this new string**, making sure to replace `<password>` with the database user password you created.

### Step 3: Frontend Client Setup (`/client`)

1.  **Set Up the Google Gemini API Key:**
    The AI features require a Google Gemini API key. Because this project's frontend runs directly in the browser without a build step, you must place your key directly in the code for local development.

    -   Navigate to `client/services/geminiService.ts`.
    -   Find the line `const API_KEY = "_API_KEY_HERE";`.
    -   **Replace the placeholder string with your actual key.**

    **File: `client/services/geminiService.ts` (Local Development Only)**
    ```typescript
    // IMPORTANT: Replace the line below with your actual  API Key for local development.
    const API_KEY = "AIzaSy...your...actual...key..."; // <-- REPLACE THIS
    ```
    > **⚠️ Security Warning:** Never commit your API key to a public repository like GitHub. This method is suitable for local testing only.

2.  **No `npm install` Needed**: The frontend dependencies are loaded directly from a CDN, so no installation is required.

---

## How to Run the Application

You must run the three components in order: **Database**, **Backend**, and **Frontend**.

### 1. Start the Database
-   If using a **local MongoDB server**, ensure the service is running. You can verify this by opening **MongoDB Compass** and connecting to `mongodb://localhost:27017`.
-   If using **MongoDB Atlas**, your database is already live in the cloud, so you can skip this step.

### 2. Start the Backend Server
-   Open a terminal in VS Code.
-   Navigate to the server directory: `cd server`
-   Start the server:
    ```bash
    node server.js
    ```
-   **Verification:** You should see the following output, confirming the server is running and connected to your database:
    ```
    MongoDB database connection established successfully
    Server is running on port: 5001
  

### 3. Start the Frontend Client
-   Open a **new** terminal (keep the server terminal running).
-   In the VS Code file explorer, navigate to the `client` folder.
-   Right-click on the `index.html` file and select **"Open with Live Server"**.
-   This will launch the Spark Khoj application in your default web browser.


## Final Setup Checklist Summary

Use this checklist to ensure every step has been completed correctly before running the application.

-   [ ] **Prerequisites Installed**: Node.js, Git, MongoDB, and VS Code (with Live Server) are all installed.
-   [ ] **Project Cloned**: The project code is on your local machine.
-   [ ] **Backend Dependencies**: `npm install` has been run successfully inside the `/server` folder.
-   [ ] **`.env` File Created**: The `server/.env` file exists.
-   [ ] **Database URI Configured**: `MONGO_URI` in `.env` is set to your local or Atlas database string.
-   [ ] **Gemini API Key Added**: Your API key has been manually added to `client/services/geminiService.ts`.
-   [ ] **Database Running**: Your local MongoDB server is running OR you have an active Atlas cluster.
-   [ ] **Backend Server Started**: The `node server.js` command is running without errors and shows a successful database connection.
-   [ ] **Frontend Launched**: The application is open in your browser via the "Open with Live Server" command.

