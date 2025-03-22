import React, { useEffect, useState } from "react";
import { LiveblocksProvider, RoomProvider, useMyPresence, useOthers, useUpdateMyPresence } from "@liveblocks/react";
import { client } from "./liveblocks.config";
import "./App.css";

const GRID_SIZE = 20;
const CELL_SIZE = 30; // Pixels

function App() {
    return (
      <LiveblocksProvider     publicApiKey= "pk_dev_qppilCRaKz3YJJlMYze9P4suIGFiup3N-CMjmTsf1fzO3nRzSi5hLJLmJUIfV5eW" // Get this from liveblocks.io
>
      <RoomProvider id="conference-room" initialPresence={{ x: 0, y: 0, name: "User1" }}>
          <Grid />
      </RoomProvider>
  </LiveblocksProvider>
    );
}

function Grid() {
    const [map, setMap] = useState(null);
    const [myPresence, updateMyPresence] = useMyPresence();
    const others = useOthers();

    // Fetch the map
    useEffect(() => {
        fetch("http://localhost:3001/api/map")
            .then(res => res.json())
            .then(data => setMap(data));
    }, []);

    // Hardcoded spaces for now (like FireRed zones)
    const spaces = [
        { name: "Conference Table", x: 5, y: 5, width: 5, height: 5 }
    ];

    // Movement
    useEffect(() => {
        const handleKeyDown = (e) => {
            let { x, y } = myPresence;
            if (e.key === "ArrowUp" && y > 0) y--;
            if (e.key === "ArrowDown" && y < GRID_SIZE - 1) y++;
            if (e.key === "ArrowLeft" && x > 0) x--;
            if (e.key === "ArrowRight" && x < GRID_SIZE - 1) x++;
            updateMyPresence({ x, y });
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [myPresence, updateMyPresence]);

    // Check if in a space
    const currentSpace = spaces.find(s =>
        myPresence.x >= s.x && myPresence.x < s.x + s.width &&
        myPresence.y >= s.y && myPresence.y < s.y + s.height
    );

    if (!map) return <div>Loading...</div>;

    return (
        <div>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
                    width: GRID_SIZE * CELL_SIZE,
                    height: GRID_SIZE * CELL_SIZE,
                    border: "1px solid black"
                }}
            >
                {Array(GRID_SIZE * GRID_SIZE).fill().map((_, i) => {
                    const x = i % GRID_SIZE;
                    const y = Math.floor(i / GRID_SIZE);
                    const isMe = x === myPresence.x && y === myPresence.y;
                    const isOther = others.some(o => o.presence.x === x && o.presence.y === y);
                    return (
                        <div
                            key={i}
                            style={{
                                width: CELL_SIZE,
                                height: CELL_SIZE,
                                border: "1px solid #ccc",
                                background: isMe || isOther ? "blue" : "white"
                            }}
                        />
                    );
                })}
            </div>
            {/* Display my name and space */}
            <div style={{ position: "absolute", top: myPresence.y * CELL_SIZE - 20, left: myPresence.x * CELL_SIZE }}>
                {myPresence.name}
            </div>
            {currentSpace && <div>Space: {currentSpace.name}</div>}

            {/* Display others */}
            {others.map(other => (
                <div
                    key={other.connectionId}
                    style={{
                        position: "absolute",
                        top: other.presence.y * CELL_SIZE - 20,
                        left: other.presence.x * CELL_SIZE
                    }}
                >
                    {other.presence.name}
                </div>
            ))}
        </div>
    );
}

export default App;