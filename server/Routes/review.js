const pool = require("../db");

const router = require("express").Router();

router.post("/review", async (req, res) => {
  const { rating, comment, username, food_id, uid } = req.body;
  //   console.log(req.body);
  try {
    const exist = await pool.query(
      "SELECT * FROM review WHERE food_id = $1 AND uid = $2",
      [food_id, uid]
    );
    if (exist.rows.length) {
      throw new Error("You cant add multiple review on the same dish");
    }
    const foodDb = await pool.query(
      "INSERT INTO review (rating, uid, food_id, comment, username) VALUES ($1, $2, $3, $4, $5)",
      [rating, uid, food_id, comment, username]
    );
    return res.status(203).json({ msg: "Post Shared Successfully." });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(error.message);
  }
});

router.get("/review/:id", async (req, res) => {
  try {
    const foodDb = await pool.query("SELECT * FROM review WHERE food_id = $1", [
      req.params.id,
    ]);

    return res.status(200).send(foodDb.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

module.exports = router;
