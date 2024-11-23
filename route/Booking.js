const express = require("express")
const db = require("../config")
const router = express.Router()

router.get('/get', (req, res) => {
  const sql = "SELECT * FROM booking"
  db.getConnection().query(sql, (err, result) =>{
    if(err) return res.json({Message: "Error inside server"});
    return res.json(result);
  })
})

router.post('/add', (req, res) => {
  const sql = "INSERT INTO booking (`booking_id`, `customer_id`, `movie_id`, `booking_seat`, `booking_at`) VALUES (?)";
  const values = [
    req.body.b_id,
    req.body.cs_id,
    req.body.m_id,
    req.body.b_seat,
    req.body.b_at,
  ]
  db.getConnection().query(sql, [values], (err, result) => {
    if(err) return res.json(err);
    return res.json(result);
  })
})

module.exports = router