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

router.get('/getEachUser/:customer_id', (req, res) => {
  const customerId = req.params.customer_id;
  const sql = "SELECT * FROM booking WHERE customer_id = ?";
  
  db.getConnection().query(sql, [customerId], (err, result) => {
    if (err) return res.json({ Message: "Error fetching user data" });
    if (result.length === 0) return res.json({ Message: "User not found" });
    return res.json(result); // Return all bookings
  });
});


router.post('/add', (req, res) => {
  const sql = "INSERT INTO booking (`customer_id`, `movie_id`, `booking_seat`, `booking_price`) VALUES (?)";
  const { customer_id, movie_id, booking_seat, booking_price} = req.body;
  const values = [
    customer_id,
    movie_id,
    booking_seat,
    booking_price,
  ]
  db.getConnection().query(sql, [values], (err, result) => {
    if(err) return res.json(err);
    return res.json(result);
  })
})

module.exports = router