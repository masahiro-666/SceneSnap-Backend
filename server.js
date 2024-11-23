const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const adminRouter = require('./route/Admin')
const movieRouter = require('./route/Movie')
const bookingRouter = require('./route/Booking')
const customerRouter = require('./route/Customer')

const app = express()
app.use(express.json())


// app.get('/', (req, res) => {
//   const sql = "SELECT * FROM admin"
//   connection.query(sql, (err, result) =>{
//     if(err) return res.json({Message: "Error inside server"});
//     return res.json(result);
//   })
// })

app.use("/admin", adminRouter)
app.use("/movie", movieRouter)
app.use("/customer", customerRouter)
app.use("/booking", bookingRouter)




app.get('/test', (req, res) => {
  res.send('test')
})





// app.post('/product', (req, res) => {
//   const sql = "INSERT INTO product (`pd_id`, `pd_name`, `pd_type`, `pd_unit_price`, `pd_status`) VALUES (?)";
//   console.log(req.body)
  // const values = [
  //   req.body.id,
  //   req.body.name,
  //   req.body.type,
  //   req.body.price,
  //   req.body.status
  // ]
  // connection.query(sql, [values], (err, result) => {
  //   if(err) return res.json(err);
  //   return res.json(result);
  // })
// })


app.listen(3306, ()=>{
  console.log("Listening")
})
