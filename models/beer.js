const connection = require('../db-config');

const db = connection.promise();

const findMany = (type, ph) => {
    // si il y a des types et du ph de précisé, l'inclure dans la requête SQL
    let sql = 'SELECT * FROM beers '
    const sqlParams = [];
    if (type && ph) {
        sql += 'WHERE description LIKE ? AND ph >= ?'
        sqlParams.push(`%${type}%`, ph)
        console.log(sql)
        console.log(sqlParams)
    }
    return db.query(sql, sqlParams)
        .then(res => res[0])
}

const findOne = (id) => {
    return db.query('SELECT * FROM beers WHERE id = ?', [id])
    .then(res => res[0])
}

module.exports = {
    findMany,
    findOne,
  };