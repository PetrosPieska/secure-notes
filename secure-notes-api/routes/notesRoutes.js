const express = require("express");
const pool = require("../db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM notes WHERE user_id = $1",
    [req.userId]
  );
  res.json(result.rows);
});

router.post("/", authMiddleware, async (req, res) => {
  const { title, content } = req.body;

  const result = await pool.query(
    "INSERT INTO notes (title, content, user_id) VALUES ($1, $2, $3) RETURNING *",
    [title, content, req.userId]
  );

  res.status(201).json(result.rows[0]);
});

router.put("/:id", authMiddleware, async (req, res) => {
  const { title, content } = req.body;
  const noteId = req.params.id;

  const result = await pool.query(
    "UPDATE notes SET title = $1, content = $2 WHERE id = $3 AND user_id = $4 RETURNING *",
    [title, content, noteId, req.userId]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Note not found" });
  }

  res.json(result.rows[0]);
});

router.delete("/:id", authMiddleware, async (req, res) => {
  const noteId = req.params.id;

  const result = await pool.query(
    "DELETE FROM notes WHERE id = $1 AND user_id = $2 RETURNING *",
    [noteId, req.userId]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Note not found" });
  }

  res.json({ message: "Note deleted" });
});

module.exports = router;

// delete note
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM notes WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});
