async function connect(){
    const { Client } = require('pg')
    const client = new Client({
      database: process.env.DATABASE,
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT,10),
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
    })
    await client.connect()

    return client
}

//Save a gist id to the favorite table
async function saveFavorite(id){
  return new Promise((resolve, reject) => {
    connect().then(client => {
        client.query(
          `INSERT INTO Favorites (GIST_ID) VALUES ('${id}');`,
          (err, res) => {
            resolve({'result': err ? 'error':'success'})
            client.end()
        })
    })
  })
}

//Remove a gist id from the favorite table
async function removeFavorite(id){
  return new Promise((resolve, reject) => {
    connect().then(client => {
        client.query(
          `DELETE FROM Favorites WHERE GIST_ID= '${id}';`,
          (err, res) => {
            resolve({'result': err ? 'error' : 'success'})
            client.end()
        })
    })
  })
}

//Get only distinct values of the gist ids
async function getFavorites(){
  return new Promise((resolve,reject) => 
    connect().then(client => {
      client.query(`SELECT DISTINCT(GIST_ID) FROM Favorites;`,
        (err, res) => {
          ids = []
          for(i in res.rows)
            ids.push(res.rows[i].gist_id);
          resolve(ids)
      })
    }))
}

//Thought that this could come in handy before managing the logic in React instead
async function isFavorite(id){
  return new Promise((resolve, reject) => {
    connect().then(client => {
        client.query(
          `SELECT GIST_ID FROM Favorites WHERE GIST_ID = '${id}';`,
          (err, res) => {
            resolve({'isFavorite':res.rows.length > 0})
            client.end()
        })
    })
  })
}

module.exports = {saveFavorite, removeFavorite, getFavorites, isFavorite};