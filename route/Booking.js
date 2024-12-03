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
  const sql = "INSERT INTO booking (`customer_id`, `movie_id`, `booking_seat`) VALUES (?)";
  const { customer_id, movie_id, booking_seat } = req.body;
  const values = [
    customer_id,
    movie_id,
    booking_seat,
  ]
  db.getConnection().query(sql, [values], (err, result) => {
    if(err) return res.json(err);
    return res.json(result);
  })
})

module.exports = router