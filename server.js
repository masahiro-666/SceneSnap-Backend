import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
  host: "scenesnap.c92wg8iy607d.ap-southeast-1.rds.amazonaws.com",
  user: "root",
  password: "SceneSnap666!",
  database: "SceneSnap"
})

app.get('/', (req, res) => {
  const sql = "SELECT * FROM admin"
  db.query(sql, (err, result) =>{
    if(err) return res.json({Message: "Error inside server"});
    return res.json(result);
  })
})

app.get('/test', (req, res) => {
  res.send('test')
})


// app.post('/product', (req, res) => {
//   const sql = "INSERT INTO product (`pd_id`, `pd_name`, `pd_type`, `pd_unit_price`, `pd_status`) VALUES (?)";
//   console.log(req.body)
//   const values = [
//     req.body.id,
//     req.body.name,
//     req.body.type,
//     req.body.price,
//     req.body.status
//   ]
//   db.query(sql, [values], (err, result) => {
//     if(err) return res.json(err);
//     return res.json(result);
//   })
// })

app.listen(3306, ()=>{
  console.log("Listening")
})