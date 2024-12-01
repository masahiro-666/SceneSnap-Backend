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

router.get('/getEachMovie/:movie_id', (req, res) => {
  const movieId = req.params.movie_id;
  const sql = "SELECT * FROM movie WHERE movie_id = ?";
  
  db.getConnection().query(sql, [movieId], (err, result) => {
    if(err) return res.json({Message: "Error fetching movie data"});
    if(result.length === 0) return res.json({Message: "Movie not found"});
    return res.json(result[0]);
  });
});

// router.get('/add/test', (req, res) => {
//   const sql = "INSERT INTO movie (`movie_title`) VALUES ('chainsaw man')";
//   db.getConnection().query(sql, (err, result) =>{
//     if(err) return res.json({Message: "Error inside server"});
//     return res.json(result);
//   })
// })

router.post('/add', (req, res) => {
  const sql = "INSERT INTO movie (`movie_thumbnail`, `movie_title`, `movie_trailer_video`, `movie_genre`,`movie_rate`,`movie_duration`,`movie_dub`,`movie_sub`) VALUES (?)";
  console.log(req.body)
  const values = [
    req.body.movie_thumbnail,
    req.body.movie_title,
    req.body.movie_trailer_video,
    req.body.movie_genre,
    req.body.movie_rate,
    req.body.movie_duration,
    req.body.movie_dub,
    req.body.movie_sub,
  ]
  db.getConnection().query(sql, [values], (err, result) => {
    if(err) return res.json(err);
    return res.json(result);
  })
})

router.put('/edit/:id', (req, res) => {
  const id = req.params.id
  const sql = "UPDATE movie SET `movie_thumbnail` = ?, `movie_title` = ?, `movie_trailer_video` = ?, `movie_genre` = ?,`movie_rate` = ?,`movie_duration` = ?,`movie_dub` = ?,`movie_sub` = ? WHERE movie_id = ?";
  //  const values = [
  //   req.body.movie_thumbnail,
  //   req.body.movie_title,
  //   req.body.movie_trailer_video,
  //   req.body.movie_genre,
  //   req.body.movie_rate,
  //   req.body.movie_duration,
  //   req.body.movie_dub,
  //   req.body.movie_sub,
  // ]
  // console.log(values)

  db.getConnection().query(sql, [
    req.body.movie_thumbnail,
    req.body.movie_title,
    req.body.movie_trailer_video,
    req.body.movie_genre,
    req.body.movie_rate,
    req.body.movie_duration,
    req.body.movie_dub,
    req.body.movie_sub, id], (err, result) => {
    if(err) return res.json(err);
    return res.json(result);
  })
})

router.get('/read/:id', (req, res) => {
  const sql = "SELECT * FROM movie WHERE movie_id = ?";
  const id = req.params.id
  console.log(id)

  db.getConnection().query(sql,[id], (err, result) => {
    if(err) return res.json({Message : "Error inside server"});
    return res.json(result);
  })
})

router.get('/edit/test', (req, res) => {
  const sql = "UPDATE movie SET  `movie_genre` = ? WHERE movie_id = 1";
  const values = [
    req.body.thumbnail,
    req.body.title,
    req.body.trailer_video,
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

router.delete('/delete/:id', (req, res) => {
  const sql = "DELETE FROM movie WHERE movie_id = ?";
  const id = req.params.id
  db.getConnection().query(sql, [id], (err, result) => {
    if(err) return res.json({Message: "Error inside server"});
    return res.json(result);
  })
})


module.exports = router