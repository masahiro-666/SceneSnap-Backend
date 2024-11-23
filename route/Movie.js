const express = require("express")
const db = require("../config")
const router = express.Router()

router.get('/get', (req, res) => {
  const sql = "SELECT * FROM movie"
  db.getConnection().query(sql, (err, result) =>{
    if(err) return res.json({Message: "Error inside server"});
    return res.json(result);
  })
})

// router.get('/add/test', (req, res) => {
//   const sql = "INSERT INTO movie (`movie_title`) VALUES ('chainsaw man')";
//   db.getConnection().query(sql, (err, result) =>{
//     if(err) return res.json({Message: "Error inside server"});
//     return res.json(result);
//   })
// })

router.post('/add', (req, res) => {
  const sql = "INSERT INTO movie (`movie_thumbnail`, `movie_title`, `movie_trailer_video`, `movie_description`, `movie_genre`,`movie_rate`,`movie_duration`,`movie_dub`,`movie_sub`,) VALUES (?)";
  const values = [
    req.body.thumbnail,
    req.body.title,
    req.body.trailer_video,
    req.body.description,
    req.body.genre,
    req.body.rate,
    req.body.duration,
    req.body.dub,
    req.body.sub,
  ]
  db.getConnection().query(sql, [values], (err, result) => {
    if(err) return res.json(err);
    return res.json(result);
  })
})

router.post('/edit', (req, res) => {
  const sql = "UPDATE movie SET `movie_thumbnail` = ?, `movie_title` = ?, `movie_trailer_video` = ?, `movie_description` = ?, `movie_genre` = ?,`movie_rate` = ?,`movie_duration` = ?,`movie_dub` = ?,`movie_sub` = ? WHERE movie_id = ?";
  const values = [
    req.body.thumbnail,
    req.body.title,
    req.body.trailer_video,
    req.body.description,
    req.body.genre,
    req.body.rate,
    req.body.duration,
    req.body.dub,
    req.body.sub,
  ]
  db.getConnection().query(sql, [values], (err, result) => {
    if(err) return res.json(err);
    return res.json(result);
  })
})

router.get('/edit/test', (req, res) => {
  const sql = "UPDATE movie SET  `movie_genre` = ? WHERE movie_id = 1";
  const values = [
    req.body.thumbnail,
    req.body.title,
    req.body.trailer_video,
    req.body.description,
    req.body.genre,
    req.body.rate,
    req.body.duration,
    req.body.dub,
    req.body.sub,
  ]
  db.getConnection().query(sql, [values], (err, result) => {
    if(err) return res.json(err);
    return res.json(result);
  })
})

router.post('/delete', (req, res) => {
  const sql = "DELETE FROM movie WHERE movie_id = ?";
  db.getConnection().query(sql, [values], (err, result) => {
    if(err) return res.json(err);
    return res.json(result);
  })
})


module.exports = router