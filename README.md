# 💬 Real-Time Live Chat Application

A modern, full-stack real-time live chat application built with **React**, **TypeScript**, **Node.js**, **Express**, **Socket.io**, and **MongoDB**.

---

## ✨ Features

- **⚡ Real-Time Bidirectional Messaging**: Instant message delivery powered by Socket.io web sockets.
- **👥 Active Online User Tracking**: Live count and real-time tracking of currently connected users.
- **🔔 Join & Leave System Notifications**: Dynamic activity feed that announces when participants enter or leave the chat.
- **📜 Chat History Persistence**: Messages are saved in MongoDB and loaded automatically upon connection.
- **⏳ Auto-Expiring Messages (TTL)**: Built-in MongoDB TTL index to clean up messages automatically after 24 hours.
- **🎨 Modern & Responsive UI**: Clean glassmorphism styling, distinctive message bubbles, and mobile-friendly design.
- **🛡️ Full-Stack TypeScript**: Type-safe frontend and backend architecture.

---

## 🏗️ Project Architecture

```plaintext
live-chat-application/
├── client/                     # Frontend Application (React + Vite + TypeScript)
│   ├── src/
│   │   ├── components/         # Reusable UI components (MessageInput, MessageList, NameModal)
│   │   ├── pages/              # ChatPage view
│   │   ├── socket/             # Socket.io client instance
│   │   ├── type/               # TypeScript interfaces & types
│   │   ├── App.tsx             # Main application entry component
│   │   ├── index.css           # Styling & design system
│   │   └── main.tsx            # React DOM mounting
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── server/                     # Backend Application (Node.js + Express + Socket.io + TypeScript)
│   ├── src/
│   │   ├── config/             # Database connection setup (Mongoose/MongoDB)
│   │   ├── controller/         # Message controllers (CRUD operations)
│   │   ├── models/             # Mongoose schemas (Message model with 24h TTL)
│   │   ├── routes/             # REST API routes (if applicable)
│   │   ├── service/            # Business logic and database service layers
│   │   ├── socket/             # Socket.io connection & event handlers
│   │   ├── app.ts              # Express application configuration
│   │   └── server.ts           # HTTP server, Socket.io initialization & listener
│   ├── .env                    # Environment variables (PORT, MONGO_URI)
│   ├── package.json
│   └── tsconfig.json
│
└── README.md                   # Project documentation
```

---

## 🛠️ Tech Stack

### Frontend (Client)
- **Framework / Library**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vite.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **WebSocket Client**: [Socket.io Client](https://socket.io/docs/v4/client-api/)
- **Styling**: Vanilla CSS (Modern CSS3 with Variables & Flex/Grid)

### Backend (Server)
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express 5](https://expressjs.com/)
- **WebSocket Server**: [Socket.io](https://socket.io/)
- **Database / ODM**: [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Development Tooling**: [ts-node-dev](https://github.com/wclr/ts-node-dev) for hot-reloading

---

## 🔌 Socket Events Reference

| Event Name | Direction | Payload | Description |
| :--- | :--- | :--- | :--- |
| `join` | Client ➔ Server | `username: string` | Registers a user's presence in the chat |
| `onlineUsers` | Server ➔ Client | `count: number` | Emits current count of active connected users |
| `userJoined` | Server ➔ Client | `username: string` | Broadcasts when a new user joins |
| `userLeft` | Server ➔ Client | `username: string` | Broadcasts when a user disconnects |
| `getMessages` | Client ➔ Server | *(none)* | Requests full chat message history |
| `messageHistory` | Server ➔ Client | `Message[]` | Returns persisted message history to client |
| `sendMessage` | Client ➔ Server | `{ username: string, message: string }` | Sends a message to be saved and broadcast |
| `receiveMessage` | Server ➔ Client | `Message` | Broadcasts the new message to all clients |

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) / [pnpm](https://pnpm.io/)
- [MongoDB](https://www.mongodb.com/) running locally or a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) connection URI

---

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/live-chat-application.git
cd live-chat-application
```

---

### 2. Configure Backend Environment

Navigate to the `server` directory and configure the environment variables:

```bash
cd server
```

Create or edit `.env` inside the `server/` folder:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/chat-app
```

> 💡 *Replace the `MONGO_URI` value with your actual MongoDB connection string if using MongoDB Atlas.*

---

### 3. Install Dependencies & Run Server

From the `server` folder:

```bash
# Install server dependencies
npm install

# Start development server with auto-reload
npm run dev
```

The server will be running on `http://localhost:5000`.

---

### 4. Install Dependencies & Run Client

Open a new terminal tab/window and navigate to the `client` directory:

```bash
cd client

# Install client dependencies
npm install

# Start Vite dev server
npm run dev
```

The frontend client will be available at `http://localhost:5173`.

---

## 📝 Available Scripts

### Client (`/client`)
- `npm run dev`: Starts the Vite development server with HMR.
- `npm run build`: Compiles TypeScript and builds production-ready static assets.
- `npm run lint`: Runs ESLint for linting and code quality checks.
- `npm run preview`: Previews the production build locally.

### Server (`/server`)
- `npm run dev`: Starts the backend server using `ts-node-dev` with instant TypeScript transpile & reload.

---

## 📜 License

This project is open-source and available under the [ISC License](LICENSE).
