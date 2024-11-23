const express = require("express")
const db = require("../config")
const router = express.Router()

router.get('/get', (req, res) => {
  const sql = "SELECT * FROM customer"
  db.getConnection().query(sql, (err, result) =>{
    if(err) return res.json({Message: "Error inside server"});
    return res.json(result);
  })
})

router.post('/add', (req, res) => {
  const sql = "INSERT INTO customer (`customer_username`, `customer_name`, `customer_surname`, `customer_email`, `customer_password`,`customer_credit`,`customer_phone_number`,) VALUES (?)";
  const values = [
    req.body.cs_username,
    req.body.cs_name,
    req.body.cs_surname,
    req.body.cs_email,
    req.body.cs_password,
    req.body.cs_credit,
    req.body.cs_phone_number,
  ]
  db.getConnection().query(sql, [values], (err, result) => {
    if(err) return res.json(err);
    return res.json(result);
  })
})

router.post('/edit', (req, res) => {
  const sql = "UPDATE customer SET `customer_username` = ?, `customer_name` = ?, `customer_surname` = ?, `customer_email` = ?, `customer_password` = ?,`customer_credit` = ?,`customer_phone_number` = ?  WHERE customer_id = ?";
  const values = [
    req.body.cs_username,
    req.body.cs_name,
    req.body.cs_surname,
    req.body.cs_email,
    req.body.cs_password,
    req.body.cs_credit,
    req.body.cs_phone_number,
  ]
  db.getConnection().query(sql, [values], (err, result) => {
    if(err) return res.json(err);
    return res.json(result);
  })
})

router.post('/delete', (req, res) => {
  const sql = "DELETE FROM customer WHERE customer_id = ?";
  db.getConnection().query(sql, [values], (err, result) => {
    if(err) return res.json(err);
    return res.json(result);
  })
})

module.exports = router