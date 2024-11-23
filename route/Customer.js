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



module.exports = router