# gridSpace

GridSpace
A simple, real-time, grid-based movement prototype built with the MERN stack (MongoDB, Express, React, Node.js) and Liveblocks. Users are represented as blue dots on a 20x20 grid, moving with arrow keys, with their names displayed above. Predefined zones (like "Conference Table") trigger pop-up labels when entered, inspired by classic Pokémon-style exploration. This is a starting point for a future 2D game upgrade using Phaser.js.

Features
Grid Layout: A 20x20 box grid rendered with CSS Grid.
Real-Time Movement: Move your blue dot using arrow keys; see others’ dots update instantly via Liveblocks.
Dynamic Labels: User names follow their dots; zone names pop up when entering predefined areas.
Backend: MongoDB stores a static "conference" map and user data.
Multiplayer: Liveblocks syncs multiple users’ positions and names in real-time.
Tech Stack
Frontend: React, CSS Grid, Liveblocks (real-time presence).
Backend: Node.js, Express, MongoDB (Mongoose).
Real-Time: Liveblocks for multiplayer sync.
Getting Started
Prerequisites
Node.js (v16+ recommended)
MongoDB (local or cloud instance)
A Liveblocks account and public API key
Installation
Clone the Repository
bash

Collapse

Wrap

Copy
git clone https://github.com/your-username/gridspace.git
cd gridspace
Backend Setup
Navigate to the server directory (or root if flat structure):
bash

Collapse

Wrap

Copy
cd server
npm install
Update server.js with your MongoDB URI if not using localhost:27017.
Add your Liveblocks public API key to the frontend (see below).
Start the server:
bash

Collapse

Wrap

Copy
node server.js
This seeds a 20x20 "conference" map and a blue dot element.
Frontend Setup
Navigate to the client directory:
bash

Collapse

Wrap

Copy
cd client
npm install
Install Liveblocks:
bash

Collapse

Wrap

Copy
npm install @liveblocks/client @liveblocks/react
Create liveblocks.config.js in client/src with your Liveblocks public API key:
javascript

Collapse

Wrap

Copy
import { createClient } from "@liveblocks/client";

export const client = createClient({
    publicApiKey: "pk_your-liveblocks-public-key"
});
Start the React app:
bash

Collapse

Wrap

Copy
npm start
Test It
Open two browser windows (e.g., Chrome + Incognito).
Edit App.js’s initialPresence in one to change the name (e.g., "User2").
Move with arrow keys—watch the blue dots and names sync, and see "Conference Table" pop up at (5,5) to (9,9).
Project Structure
text

Collapse

Wrap

Copy
gridspace/
├── server/               # Backend (Express + MongoDB)
│   ├── models/           # Mongoose schemas (Map, User, etc.)
│   └── server.js         # Express server
├── client/               # Frontend (React)
│   ├── src/
│   │   ├── App.js        # Main grid component
│   │   ├── liveblocks.config.js  # Liveblocks client config
│   │   └── App.css       # Basic styling
│   └── package.json
└── README.md             # This file
How It Works
Backend: Serves a static 20x20 "conference" map via /api/map.
Frontend: Renders a CSS grid; Liveblocks tracks user (x, y) positions and names.
Spaces: Hardcoded zones (e.g., "Conference Table") trigger labels when entered.
Future Plans
Add user authentication to pull names from the User model.
Enhance UI with smoother pop-ups and visuals.
Upgrade to Phaser.js for a tile-based 2D game experience with sprites.
Expand to multiple maps or dynamic zones.
