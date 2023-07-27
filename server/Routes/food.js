const router = require("express").Router();
const multer = require("multer");
const { storage } = require("../cloudinary");
const pool = require("../db");
const upload = multer({ storage });

router.post("/create", async (req, res) => {
  const { name, category, price, desc, image, uid } = req.body;
  //   console.log(req.body);
  try {
    const foodDb = await pool.query(
      'INSERT INTO food (name, uid, image, category, price, "desc") VALUES ($1, $2, $3, $4, $5, $6)',
      [name, uid, image, category, price, desc]
    );
    return res.status(203).json({ msg: "Post Shared Successfully." });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});

router.get("/food", async (req, res) => {
  try {
    const foodDb = await pool.query(`
        SELECT
          food.*,
          AVG(review.rating) AS average_rating
        FROM
          food
        LEFT JOIN
          review ON food.id = review.food_id
        GROUP BY
          food.id
      `);

    return res.status(200).send(foodDb.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});

router.get("/food/:id", async (req, res) => {
  const id = req.params.id;
  //   console.log(id);
  try {
    const foodDb = await pool.query(`SELECT * FROM food WHERE id = $1`, [id]);
    // console.log(foodDb.rows)
    return res.status(200).send(foodDb.rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});

router.post("/upload", upload.single("image"), async (req, res) => {
  const { path } = req.file;

  return res.status(203).json({ image: path });
});

module.exports = router;
