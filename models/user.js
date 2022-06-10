const connection = require('../db-config');
const argon2 = require('argon2');

const db = connection.promise();

const hashingOptions = {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 5,
    parallelism: 1
}

const hashPassword = (password) => {
    return argon2.hash(password, hashingOptions)
}

const verifyPassword = (password, hashedPassword) => {
    return argon2.verify(hashedPassword, password, hashingOptions)
}

const create = ({email, password}) => {
    return hashPassword(password).then((hashedPassword) => {
        return db.query('INSERT INTO users SET ?', {email, hashedPassword}).then((results) => results[0])
    })
};

const findByEmail = (email) => {
    return db
      .query('SELECT * FROM users WHERE email = ?', [email])
      .then(([results]) => results[0]);
  };

module.exports = {
    create,
    findByEmail,
    verifyPassword
  };