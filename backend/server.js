import express from "express";
import cors from "cors";
import pg from "pg";

const app = express();
app.use(cors());
app.use(express.json());

const pool = new pg.Pool({
  user: "anikutusu",
  host: "db",           // Docker Compose kullanıyorsan service adı
  database: "anikutusu",
  password: "anikutusu123",
  port: 5432,
});

// Event oluşturma endpoint
app.post("/api/events", async (req, res) => {
  const { eventId, names, mail, date, theme } = req.body;

  if (!eventId || !names || !mail || !date || !theme) {
    return res.status(400).json({ error: "Eksik parametre" });
  }

  try {
    const query = `
      INSERT INTO events (event_id, names, mail, date, theme)
      VALUES ($1, $2, $3, $4, $5)
    `;
    await pool.query(query, [eventId, names, mail, date, theme]);

    res.status(201).json({ success: true, eventId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Event kaydedilemedi" });
  }
});

// Test endpoint
app.get("/api/events/:eventId", async (req, res) => {
  const { eventId } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM events WHERE event_id=$1",
      [eventId]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Event bulunamadı" });

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Hata oluştu" });
  }
});

// backend/index.js veya app.js
app.get("/api/events/:eventId", async (req, res) => {
  const { eventId } = req.params;

  try {
    const result = await pool.query(
      "SELECT event_id, names, mail, date, theme FROM events WHERE event_id = $1",
      [eventId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Event bulunamadı" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Event çekilemedi" });
  }
});


app.listen(5000, () => {
  console.log("Backend çalışıyor: http://localhost:5000");
});
