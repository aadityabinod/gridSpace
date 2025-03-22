import express from "express";
import connect from "./db/connect.js";
import Map from "./models/map.model.js";
import Element from "./models/element.model.js"; // Assuming you have this model
import cors from "cors"; // Corrected import

const app = express();
app.use(express.json());
app.use(cors('*'));

const port = 3001;

async function seedMap() {
    const existing = await Map.findOne({ type: "conference" });
    if (!existing) {
        const map = new Map({
            name: "Conference Room",
            width: 20,
            height: 20,
            capacity: 10, // Arbitrary for now
            type: "conference",
            mapElements: [] // Empty for now
        });
        await map.save();
        console.log("Conference map seeded!");
    }
}

async function seedElement() {
    const existing = await Element.findOne({ imageUrl: "🔵" }); // Changed to emoji
    if (!existing) {
        const element = new Element({
            width: 1,
            height: 1,
            imageUrl: "🔵" // Changed to emoji
        });
        await element.save();
        console.log("Blue dot emoji element seeded!"); // Updated log message
    }
}

app.get("/api/map", async (req, res) => {
    const map = await Map.findOne({ type: "conference" });
    res.json(map);
});

const server = async () => {
    try {
        await connect();
        
        // Seed the database when the server starts
        await seedMap();
        await seedElement();

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.log("Failed to start server.....", error.message);
        process.exit(1);
    }
};

server();
