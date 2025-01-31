import express from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let events = [
  {
    id: "1",
    title: "Italiaanse Avond: Bruschetta workshop",
    description:
      "Leer de kunst van het maken van authentieke Italiaanse bruschetta met verse tomaten, basilicum en knoflook.",
    image: "/images/italiaanse_Avond_bruschetta_workshop.jpg",
    location: "Gusto's Italian Kitchen",
    startTime: "2023-12-01T19:00:00",
    endTime: "2023-12-01T22:00:00",
    categories: [1],
  },
  {
    id: "2",
    title: "Mexicaanse Taco Fiesta",
    description:
      "Maak je eigen taco’s met een verscheidenheid aan ingrediënten en sauzen. Perfect voor liefhebbers van de Mexicaanse keuken!",
    image: "/images/Mexicaanse_taco_fiesta.jpg",
    location: "El Taco Loco",
    startTime: "2023-12-05T18:00:00",
    endTime: "2023-12-05T21:00:00",
    categories: [2],
  },
  {
    id: "3",
    title: "Franse Patisserie Workshop",
    description:
      "Ontdek de geheimen van Franse gebakjes maken, inclusief éclairs, macarons en tartelettes.",
    image: "/images/Franse_Patesseri.jpg",
    location: "The Petit Chef",
    startTime: "2023-12-10T14:00:00",
    endTime: "2023-12-10T17:00:00",
    categories: [3],
  },
  {
    id: "4",
    title: "Japans Sushi Rols Avond",
    description:
      "Probeer de traditionele kunst van sushi rollen onder begeleiding van een Japanse chef.",
    image: "/images/Japanse_Sushi_avond.jpg",
    location: "Tokyo Delight",
    startTime: "2023-12-12T19:00:00",
    endTime: "2023-12-12T21:30:00",
    categories: [4],
  },
  {
    id: "5",
    title: "Griekse Meze Proeverij",
    description:
      "Geniet van een avond met verschillende meze-gerechten zoals tzatziki, dolmades en spanakopita.",
    image: "/images/Griekse_mezes.jpg",
    location: "Athenian Nights",
    startTime: "2023-12-15T17:30:00",
    endTime: "2023-12-15T20:30:00",
    categories: [5],
  },
];

let categories = [
  { id: 1, name: "Italiaanse keuken" },
  { id: 2, name: "Mexicaanse keuken" },
  { id: 3, name: "Franse keuken" },
  { id: 4, name: "Japanse keuken" },
  { id: 5, name: "Griekse keuken" },
];

// Haal alle evenementen op
app.get("/events", (req, res) => {
  res.json(events);
});

// Voeg een nieuw evenement toe

app.post("/events", (req, res) => {
  const newEvent = { id: uuidv4().toString(), ...req.body }; // Zorg ervoor dat id een string is
  events.push(newEvent);
  res.status(201).json(newEvent);
});

// Haal één evenement op
app.get("/events/:id", (req, res) => {
  console.log("Requested event ID (server):", req.params.id);
  const eventId = req.params.id.toString(); // Zorg ervoor dat eventId altijd een string is
  const event = events.find((e) => e.id === eventId);
  if (!event) {
    console.log(`Event with ID ${eventId} not found`);
    return res.status(404).send("Evenement niet gevonden");
  }
  console.log(`Event found:`, event);
  res.json(event);
});

// Update een evenement
app.put("/events/:id", (req, res) => {
  const eventId = req.params.id.toString(); // Zorg ervoor dat eventId altijd een string is
  const index = events.findIndex((e) => e.id === eventId);
  if (index === -1) return res.status(404).send("Evenement niet gevonden");

  events[index] = { ...events[index], ...req.body };
  res.json(events[index]);
});

// Verwijder een evenement
app.delete("/events/:id", (req, res) => {
  const eventId = req.params.id.toString(); // Zorg ervoor dat eventId altijd een string is
  events = events.filter((e) => e.id !== eventId);
  res.status(204).send();
});

// Haal alle categorieën op
app.get("/categories", (req, res) => {
  res.json(categories);
});

// Start de server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
